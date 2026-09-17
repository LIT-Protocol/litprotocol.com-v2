"""Make an offline-readable archive from the public Content API preview cache.

Preserves API content as JSON, renders portable HTML, downloads article images,
and records failures and external embeds. This is not a Ghost database export.
"""
import argparse
import concurrent.futures
import hashlib
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import urljoin, urlsplit
from urllib.request import Request, urlopen
from datetime import datetime, timezone
from zipfile import ZipFile, ZIP_DEFLATED

parser = argparse.ArgumentParser()
parser.add_argument("--input", type=Path, required=True)
parser.add_argument("--output", type=Path, required=True)
args = parser.parse_args()
source = json.loads(args.input.read_text())
records = [("posts", p) for p in source["posts"]] + [("pages", p) for p in source["pages"]]
out = args.output.resolve()
for folder in ("media", "posts", "pages"):
    (out / folder).mkdir(parents=True, exist_ok=True)

images, embeds = set(), set()
class MediaParser(HTMLParser):
    def __init__(self, base):
        super().__init__()
        self.base = base
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "img":
            for name in ("src", "data-src"):
                if attrs.get(name):
                    images.add(urljoin(self.base, attrs[name]))
            for item in attrs.get("srcset", "").split(","):
                if item.strip():
                    images.add(urljoin(self.base, item.strip().split()[0]))
        if tag in ("iframe", "video", "audio", "source") and attrs.get("src"):
            embeds.add(urljoin(self.base, attrs["src"]))
for _, post in records:
    p = MediaParser(post["url"])
    p.feed(post.get("html") or "")
    if post.get("feature_image"):
        images.add(post["feature_image"])
    for author in post.get("authors", []):
        if author.get("profile_image"):
            images.add(author["profile_image"])
images = sorted(u for u in images if urlsplit(u).scheme in ("http", "https"))

def download(url):
    suffix = Path(urlsplit(url).path).suffix.lower()
    if not re.fullmatch(r"\.[a-z0-9]{1,5}", suffix):
        suffix = ".img"
    name = hashlib.sha256(url.encode()).hexdigest()[:24] + suffix
    target = out / "media" / name
    try:
        if not target.exists():
            request = Request(url, headers={"User-Agent": "LitProtocol-Archive/1.0"})
            with urlopen(request, timeout=25) as response:
                data = response.read()
                if not response.headers.get("Content-Type", "").startswith("image/"):
                    raise ValueError("URL did not return an image")
                target.write_bytes(data)
        return {"url": url, "file": "media/" + name, "bytes": target.stat().st_size,
                "sha256": hashlib.sha256(target.read_bytes()).hexdigest()}
    except Exception as e:
        return {"url": url, "error": str(e)}

results = []
print(f"Archiving {len(source['posts'])} posts, {len(source['pages'])} pages, {len(images)} image URLs", flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    for result in pool.map(download, images):
        results.append(result)
        if len(results) % 50 == 0:
            print(f"Processed {len(results)}/{len(images)} images", flush=True)

local_media = {r["url"]: "../" + r["file"] for r in results if "file" in r}
def filename(record):
    slug = re.sub(r"[^a-zA-Z0-9_-]", "-", record["slug"])
    return slug + ".html"
local_posts = {p["url"].rstrip("/"): "../" + section + "/" + filename(p) for section, p in records}

class LocalHTML(HTMLParser):
    def __init__(self, base):
        super().__init__(convert_charrefs=False)
        self.base, self.output = base, []
    def handle_starttag(self, tag, attrs):
        updated = []
        for name, value in attrs:
            if value is not None and name in ("src", "data-src", "href", "poster"):
                absolute = urljoin(self.base, value)
                value = local_media.get(absolute, local_posts.get(absolute.rstrip("/"), absolute))
            elif value and name == "srcset":
                choices = []
                for part in value.split(","):
                    bits = part.strip().split()
                    if bits:
                        absolute = urljoin(self.base, bits[0])
                        bits[0] = local_media.get(absolute, absolute)
                        choices.append(" ".join(bits))
                value = ", ".join(choices)
            updated.append(name if value is None else f'{name}="{html.escape(value, quote=True)}"')
        self.output.append("<" + tag + (" " + " ".join(updated) if updated else "") + ">")
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
    def handle_endtag(self, tag): self.output.append(f"</{tag}>")
    def handle_data(self, data): self.output.append(data)
    def handle_entityref(self, name): self.output.append(f"&{name};")
    def handle_charref(self, name): self.output.append(f"&#{name};")

style = "body{max-width:760px;margin:48px auto;padding:0 24px;font:18px/1.7 system-ui;color:#171717;background:#fafaf7}h1,h2,h3{line-height:1.2}a{color:inherit}img,video,iframe{max-width:100%;height:auto}figure{margin:32px 0}pre,table{display:block;overflow:auto}pre{background:#eee;padding:20px}figcaption,time{font-size:14px;color:#666}li{margin:12px 0}"
def document(title, body):
    return f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>{html.escape(title)}</title><style>{style}</style></head><body>{body}</body></html>'
index = ["<h1>Lit Protocol public blog archive</h1><p>Published articles and pages, saved independently of Ghost. Embedded third-party services may still require an internet connection.</p><ul>"]
for section, post in records:
    renderer = LocalHTML(post["url"])
    renderer.feed(post.get("html") or "")
    cover = ""
    if post.get("feature_image"):
        src = local_media.get(post["feature_image"], post["feature_image"])
        cover = f'<figure><img src="{html.escape(src)}" alt="{html.escape(post.get("feature_image_alt") or "")}"></figure>'
    authors = ", ".join(a["name"] for a in post.get("authors", []))
    body = f'<a href="../index.html">← Archive</a><h1>{html.escape(post["title"])}</h1><p>{html.escape(authors)} · <time>{html.escape(post.get("published_at", "")[:10])}</time></p>{cover}{"".join(renderer.output)}<hr><a href="{html.escape(post["url"])}">Original URL</a>'
    (out / section / filename(post)).write_text(document(post["title"], body))
    index.append(f'<li><time>{post.get("published_at", "")[:10]}</time> — <a href="{section}/{filename(post)}">{html.escape(post["title"])}</a></li>')
index.append("</ul>")
(out / "index.html").write_text(document("Lit Protocol public blog archive", "".join(index)))
(out / "content.json").write_text(json.dumps({"posts": source["posts"], "pages": source["pages"]}, ensure_ascii=False, indent=2))
manifest = {"created_at": datetime.now(timezone.utc).isoformat(), "source": "https://spark.litprotocol.com", "posts": len(source["posts"]), "pages": len(source["pages"]), "images_saved": sum("file" in r for r in results), "images_failed": sum("error" in r for r in results), "media": results, "external_embeds": sorted(embeds), "limitations": ["Public content only; no drafts, private posts, editor source, members, comments, or settings.", "Content API JSON is portable source data, not a native Ghost import file.", "Third-party embeds are referenced, not downloaded.", "Unavailable images are recorded in media entries with an error."]}
(out / "manifest.json").write_text(json.dumps(manifest, indent=2))
(out / "README.txt").write_text("Open index.html to read the archive without Ghost.\ncontent.json contains the original public Content API records.\nmanifest.json records image checksums, failures, external embeds, and archive limits.\nThis is a public-content archive, not a full database backup or native Ghost import.\nFor a full migration, also export content/settings, theme, members, and media through Ghost Admin/support.\n")
archive = out.with_suffix(".zip")
with ZipFile(archive, "w", ZIP_DEFLATED) as bundle:
    for file in sorted(out.rglob("*")):
        if file.is_file(): bundle.write(file, file.relative_to(out.parent))
print(json.dumps({k: manifest[k] for k in ("posts", "pages", "images_saved", "images_failed")}), flush=True)
print(archive, flush=True)

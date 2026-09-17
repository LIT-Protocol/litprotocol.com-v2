/* Read-only preview of the actual theme templates using public Ghost content.
 * This adapter implements the helpers used by this theme; Ghost remains the
 * production renderer and the authority for membership, metadata, and access.
 */
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const H = require('handlebars').create();
const root = path.resolve(__dirname, '..');
const theme = path.join(root, 'lit-editorial');
const cache = path.join(root, '.preview-cache.json');
const source = 'https://spark.litprotocol.com';
const port = Number(process.env.BLOG_PREVIEW_PORT || 4320);
const local = `http://127.0.0.1:${port}`;
const safe = value => new H.SafeString(value);
const escape = H.escapeExpression;

async function getPublicContent() {
  if (fs.existsSync(cache) && !process.argv.includes('--refresh')) {
    return JSON.parse(fs.readFileSync(cache, 'utf8'));
  }
  const response = await fetch(source);
  if (!response.ok) throw new Error(`Blog returned ${response.status}`);
  const html = await response.text();
  // This is the read-only Content API key already published in Ghost's HTML.
  const key = html.match(/data-key="([^"]+)"/)?.[1];
  if (!key)
    throw new Error('Public Ghost Content API configuration not found.');
  const posts = [];
  let page = 1;
  while (page) {
    const endpoint = new URL(
      '/ghost/api/content/posts/',
      'https://spark.ghost.io'
    );
    endpoint.search = new URLSearchParams({
      key,
      limit: '100',
      include: 'authors,tags',
      formats: 'html',
      page: String(page),
    });
    const result = await fetch(endpoint);
    if (!result.ok) throw new Error(`Content API returned ${result.status}`);
    const data = await result.json();
    posts.push(...data.posts);
    page = data.meta.pagination.next;
  }
  const pagesEndpoint = new URL(
    '/ghost/api/content/pages/',
    'https://spark.ghost.io'
  );
  pagesEndpoint.search = new URLSearchParams({
    key,
    limit: '100',
    include: 'authors,tags',
    formats: 'html',
  });
  const pagesResponse = await fetch(pagesEndpoint);
  if (!pagesResponse.ok)
    throw new Error(`Pages API returned ${pagesResponse.status}`);
  const pages = (await pagesResponse.json()).pages;
  const content = { posts, pages, key };
  fs.writeFileSync(cache, JSON.stringify(content));
  return content;
}

function compile(name) {
  return H.compile(
    fs
      .readFileSync(path.join(theme, name + '.hbs'), 'utf8')
      .replace(/{{!< default}}/, '')
  );
}
function registerPartials() {
  for (const file of fs.readdirSync(path.join(theme, 'partials'))) {
    if (file.endsWith('.hbs'))
      H.registerPartial(
        file.slice(0, -4),
        fs.readFileSync(path.join(theme, 'partials', file), 'utf8')
      );
  }
}
H.registerHelper('asset', name => '/assets/' + name);
H.registerHelper('url', function () {
  return this.url ? new URL(this.url).pathname : '/';
});
H.registerHelper('img_url', (url, options) => {
  if (!url) return '';
  const size = { s: 400, m: 800, l: 1400, xl: 2000 }[options.hash.size];
  return size && url.includes('/content/images/')
    ? url.replace(
        /\/content\/images\/(?:size\/w\d+\/)?/,
        `/content/images/size/w${size}/`
      )
    : url;
});
H.registerHelper('date', function (options) {
  const d = new Date(this.published_at || Date.now());
  if (options.hash.format === 'YYYY') return String(d.getUTCFullYear());
  if (options.hash.format === 'YYYY-MM-DD') return d.toISOString().slice(0, 10);
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'America/Los_Angeles',
  });
});
H.registerHelper('reading_time', function () {
  return `${this.reading_time || 1} min read`;
});
H.registerHelper('excerpt', function (options) {
  const text = this.custom_excerpt || this.excerpt || '';
  const words = text.split(/\s+/);
  const count = Number(options.hash.words || words.length);
  return words.length > count ? words.slice(0, count).join(' ') + '…' : text;
});
H.registerHelper('post_class', function () {
  return this.feature_image ? 'post' : 'post no-image';
});
H.registerHelper('content', function () {
  return safe(this.html || '');
});
// Comment threads and membership access are verified in Ghost, not simulated.
H.registerHelper('comments', () => '');
H.registerHelper('authors', function () {
  return safe(
    (this.authors || [])
      .map(
        a =>
          `<a href="${escape(new URL(a.url).pathname)}">${escape(a.name)}</a>`
      )
      .join(', ')
  );
});
H.registerHelper('post', function (options) {
  return options.fn(this.post);
});
for (const key of ['primary_tag', 'tag', 'author']) {
  H.registerHelper(key, function (options) {
    return this[key] ? options.fn(this[key]) : options.inverse(this);
  });
}
H.registerHelper('foreach', function (items, options) {
  if (!items?.length) return options.inverse(this);
  return items
    .map((item, index) => {
      const data = H.createFrame(options.data);
      data.index = index;
      data.first = index === 0;
      data.last = index === items.length - 1;
      return options.fn(item, { data });
    })
    .join('');
});
H.registerHelper('is', function (context, options) {
  return context
    .split(',')
    .map(x => x.trim())
    .includes(options.data.root.context)
    ? options.fn(this)
    : options.inverse(this);
});
H.registerHelper('match', function (value, options) {
  return value ? options.fn(this) : options.inverse(this);
});
H.registerHelper('page_url', (page, options) => {
  const base = options.data.root.archiveBase || '';
  return page === 1 ? base + '/' : `${base}/page/${page}/`;
});
H.registerHelper('pagination', function (options) {
  return safe(
    compile('partials/pagination')(this.pagination, { data: options.data })
  );
});
let content;
H.registerHelper('get', function (resource, options) {
  const posts = content.posts
    .filter(p => p.id !== this.id)
    .slice(0, Number(options.hash.limit || 3));
  return options.fn(this, { blockParams: [posts] });
});

function render(url) {
  const parts = url.pathname.split('/').filter(Boolean);
  const pageIndex = parts.indexOf('page');
  const page = pageIndex >= 0 ? Number(parts[pageIndex + 1]) : 1;
  let posts = content.posts,
    template = 'index',
    context = page === 1 ? 'home' : 'index',
    archiveBase = '';
  let post, tag, author;
  if (parts[0] === 'tag') {
    tag = posts
      .flatMap(p => p.tags)
      .find(t => t.slug === parts[1] && t.visibility !== 'internal');
    posts = posts.filter(p => p.tags.some(t => t.slug === parts[1]));
    template = tag ? 'tag' : 'error-404';
    context = 'tag';
    archiveBase = '/tag/' + parts[1];
  } else if (parts[0] === 'author') {
    author = posts.flatMap(p => p.authors).find(a => a.slug === parts[1]);
    posts = posts.filter(p => p.authors.some(a => a.slug === parts[1]));
    template = author ? 'author' : 'error-404';
    context = 'author';
    archiveBase = '/author/' + parts[1];
  } else if (parts[0] && parts[0] !== 'page') {
    post = content.posts.find(p => p.slug === parts[0]);
    if (post) {
      template = 'post';
      context = 'post';
    } else {
      post = content.pages.find(p => p.slug === parts[0]);
      template = post ? 'page' : 'error-404';
      context = template;
    }
  }
  const pages = Math.max(1, Math.ceil(posts.length / 13));
  if (!Number.isInteger(page) || page < 1 || page > pages)
    template = 'error-404';
  const pagination = {
    page,
    pages,
    total: posts.length,
    prev: page > 1 ? page - 1 : null,
    next: page < pages ? page + 1 : null,
  };
  const title = post?.title || tag?.name || author?.name || 'Blog';
  const data = {
    site: { url: local, locale: 'en', members_enabled: true },
    page: { show_title_and_feature_image: true },
  };
  const ctx = {
    context,
    post,
    tag,
    author,
    archiveBase,
    pagination,
    posts: posts.slice((page - 1) * 13, page * 13),
    meta_title: title + ' | Lit Protocol',
    body_class: context + '-template',
  };
  registerPartials();
  const body = compile(template)(ctx, { data });
  const head = `<meta name="robots" content="noindex,nofollow"><link rel="canonical" href="${escape(source + url.pathname)}"><link rel="stylesheet" href="${source}/public/cards.min.css"><script defer src="${source}/public/cards.min.js"></script><script defer src="https://cdn.jsdelivr.net/ghost/sodo-search@~1.8/umd/sodo-search.min.js" data-key="${escape(content.key)}" data-styles="https://cdn.jsdelivr.net/ghost/sodo-search@~1.8/umd/main.css" data-sodo-search="https://spark.ghost.io/" data-locale="en" crossorigin="anonymous"></script>`;
  // The preview uses the live read-only search. Membership links open Ghost's
  // existing portal on its own origin; no membership writes occur here.
  const html = compile('default')(
    { ...ctx, body, ghost_head: safe(head), ghost_foot: '' },
    { data }
  ).replaceAll('href="#/portal/', `href="${source}/#/portal/`);
  return { html, status: template === 'error-404' ? 404 : 200 };
}

(async () => {
  content = await getPublicContent();
  http
    .createServer((req, res) => {
      try {
        const url = new URL(req.url, local);
        if (url.pathname.startsWith('/assets/')) {
          const assetRoot = path.join(theme, 'assets');
          const file = path.resolve(
            theme,
            '.' + decodeURIComponent(url.pathname)
          );
          if (
            !file.startsWith(assetRoot + path.sep) ||
            !fs.existsSync(file) ||
            !fs.statSync(file).isFile()
          ) {
            res.writeHead(404);
            res.end();
            return;
          }
          const type =
            {
              '.css': 'text/css',
              '.js': 'text/javascript',
              '.woff2': 'font/woff2',
              '.svg': 'image/svg+xml',
            }[path.extname(file)] || 'application/octet-stream';
          res.writeHead(200, { 'Content-Type': type });
          fs.createReadStream(file).pipe(res);
          return;
        }
        if (url.pathname === '/rss/') {
          res.writeHead(302, { Location: source + '/rss/' });
          res.end();
          return;
        }
        const result = render(url);
        res.writeHead(result.status, {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Robots-Tag': 'noindex, nofollow',
        });
        res.end(result.html);
      } catch (e) {
        console.error(e.message);
        res.writeHead(500);
        res.end('Preview could not render this page.');
      }
    })
    .listen(port, '127.0.0.1', () =>
      console.log(
        `Blog preview: ${local} (${content.posts.length} public posts)`
      )
    );
})().catch(e => {
  console.error(e.message);
  process.exit(1);
});

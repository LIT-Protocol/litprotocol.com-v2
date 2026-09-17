# Lit blog theme

This is a standalone Ghost 6 theme for `spark.litprotocol.com`. It uses the
main website’s Lit mark, Favorit typeface, warm background, and restrained
navigation. It is independent of the Next.js/Vercel deployment.

The theme changes presentation only. Existing post bodies, slugs, authors,
dates, memberships, and URLs remain in Ghost. The newest article leads the
home page; archives use explicit pagination with 13 posts per page.

## Local review

```sh
npm ci --prefix integrations/ghost
npm --prefix integrations/ghost run preview
```

Open `http://127.0.0.1:4320`. The preview fetches public posts and pages through
Ghost’s read-only Content API and caches them locally. Pass `-- --refresh` to
refresh the cache. Content and media are not committed to this repository.

The preview renders the actual theme templates through a small Handlebars
adapter. It is **not a Ghost server**. Search uses Ghost’s live public index;
result links open the current live blog. Subscription/sign-in links open the
existing Ghost portal. Comments and restricted content are not simulated.
Verify those features in Ghost’s theme preview before activation.

## Validation and package

```sh
npm --prefix integrations/ghost run check
npm --prefix integrations/ghost run package
```

GScan checks Ghost 6 compatibility. Packaging produces
`integrations/ghost/dist/lit-editorial.zip`, ready for upload in Ghost Admin.
Fonts are the existing Lit website assets; this theme is for Lit’s own sites.

## Activation after design approval

1. Download the current active theme and export content/settings from Ghost
   Admin. Preserve existing code injection separately.
2. Upload `dist/lit-editorial.zip` and use Ghost’s preview before activation.
3. Verify a public article, an older technical article (code, images, cards),
   tag and author archives, pagination, search, mobile layout, and member flows.
4. Set publication title to **Lit Protocol Blog**, description to **Product
   updates and notes from the Lit team.**, and accent to `#bc3b12` if approved.
   Update the old Spark logo/social images and `@ghost` social metadata in
   Ghost’s branding settings. The theme intentionally supplies its own Lit mark.
5. Remove the legacy B612 font import/body override from code injection.
   Preserve analytics and any needed Prism code-highlighting scripts/styles.
   Leave Ghost font selection at its theme defaults to use Favorit; custom
   Ghost font settings are supported when explicitly configured.
6. Disable Portal’s floating signup launcher (the header provides Subscribe).
   Confirm that email signup and account links work on the actual Ghost origin.
7. Activate only after approval. Re-select the previous theme to roll back.

Uploading/activating this theme is a separate release from merging website PRs.
No Ghost production setting or content has been changed by this work.

## Portable public archive

After running the preview to fetch public content:

```sh
python3 integrations/ghost/scripts/archive.py \
  --input integrations/ghost/.preview-cache.json \
  --output .context/blog-review/public-archive
```

This produces an offline-readable HTML archive, original public API records
in JSON, downloaded images, checksums, a failure report, and a ZIP. It excludes
the public API key from the archive. Keep the archive outside the Git repo.

This is not a native Ghost database export: it does not contain drafts, private
posts, editor source, settings, members, or comments. Third-party video and
other embeds remain external. Broken image URLs are recorded, not silently
treated as backed up. For a full migration, obtain the Ghost Admin content
export and theme ZIP, and a media backup through Ghost’s supported export or
support process. See https://ghost.org/help/exports/.

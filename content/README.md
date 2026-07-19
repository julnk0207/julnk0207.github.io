# Adding a post

1. Copy `posts/_template.md` to `posts/your-post-slug.md`.
2. Update the frontmatter and write the post in Markdown.
3. Commit and push the new file.

That is all. The filename becomes the URL (`/writing/your-post-slug/`), and the site automatically generates the article page, archive entry, home-page card, publication date, reading time, and table of contents.

Put post images in `public/posts/` and reference them with an absolute Markdown path such as `![Description](/posts/my-image.png)`.

Only `title` and `date` are required. The other fields have useful defaults:

- `description` uses the first paragraph when omitted.
- `category` defaults to `Notes`.
- `subcategory` defaults to `General`.
- `tags` defaults to an empty list.

Markdown files whose names start with `_` are ignored, so `_template.md` is never published.

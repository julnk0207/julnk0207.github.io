# Personal Tech Blog

A personal portfolio and Markdown-based technical blog, intended for publication with GitHub Pages.

## Project status

The first interactive design draft is implemented with placeholder personal content and automatically deployed through GitHub Pages.

## Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`. Saving a source file refreshes the preview automatically.

## Add a post

Copy `content/posts/_template.md` to a new Markdown file in the same folder, then edit it. The filename becomes the post URL and the site handles the archive, home-page card, date formatting, reading time, and table of contents automatically.

For example, `content/posts/my-new-post.md` is published at `/writing/my-new-post/`.

See [`content/README.md`](content/README.md) for the short frontmatter reference.

## Deployment

Every push to `main` builds a static version of the site and deploys it to:

`https://julnk0207.github.io/`

## Goals

- Present a clear professional identity and body of work.
- Publish technical articles written in Markdown.
- Transfer useful content from the existing blog.
- Provide a fast, accessible, responsive reading experience.
- Deploy through GitHub Pages with the option to add a custom domain later.

## Current draft

- Home page with profile, professional highlights, and featured writing
- About page with academic experience, certifications, and publication structure
- Writing archive with category and tag presentation
- Sample article showing the long-form reading experience

## Next decisions

1. Replace placeholder copy and imagery with personal information.
2. Review and transfer the existing blog content.
3. Finalize categories, subcategories, and tags.

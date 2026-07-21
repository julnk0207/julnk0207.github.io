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

## LinkedIn publishing metadata

Every post can carry a LinkedIn publishing record:

```yaml
linkedin:
  status: draft
  summary: ""
  postId: ""
```

The status controls the publishing lifecycle:

- `draft`: not ready for LinkedIn.
- `generate`: request an automatically generated LinkedIn draft.
- `review`: the generated draft is ready to review.
- `publish`: the approved summary is ready to publish once.
- `published`: the post has been published and `postId` identifies the existing LinkedIn post.

Ordinary article edits do not change this status. Keep `postId` after publication so later builds can update the existing LinkedIn post instead of creating a duplicate. A `publish` entry must have a non-empty summary, and a `published` entry must have a post ID.

Markdown files whose names start with `_` are ignored, so `_template.md` is never published.

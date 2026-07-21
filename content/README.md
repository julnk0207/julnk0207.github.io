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

## Social publishing metadata

Every post can carry independent LinkedIn and X publishing records:

```yaml
linkedin:
  status: draft
  summary: ""
  postId: ""
x:
  status: draft
  summary: ""
  postId: ""
```

The status controls the publishing lifecycle:

- `draft`: not ready for the social platform.
- `generate`: request an automatically generated social draft.
- `review`: the generated draft is ready to review.
- `publish`: the approved summary is ready to publish once.
- `published`: the post has been published and `postId` identifies the existing Buffer post.

Ordinary article edits do not change these statuses. Each platform has its own immutable `postId`; never copy an ID between LinkedIn, X, or different articles. Keep each ID after publication so later workflow runs cannot create duplicates. A `publish` entry must have a non-empty summary, and a `published` entry must have a post ID.

### Buffer draft test

The **Create Buffer draft** GitHub Actions workflow accepts a post slug and a platform (`linkedin` or `x`). It creates a draft for the single matching channel connected to Buffer and never publishes directly. After Buffer returns a post ID, the workflow changes that platform's article status to `review`, records the ID in the matching block, and commits the record so rerunning the workflow cannot create a duplicate.

The workflow requires a repository Actions secret named `BUFFER_API_KEY`. Never put the key in frontmatter, source files, workflow inputs, or logs.

Markdown files whose names start with `_` are ignored, so `_template.md` is never published.

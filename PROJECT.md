# Project Brief

## Purpose

Build a personal tech blog that works primarily as professional PR while remaining easy to maintain through Markdown posts.

## Deployment

- Target: GitHub Pages
- Initial address: `https://<github-username>.github.io/<repository>/`
- Optional later address: a custom domain

## Core requirements

- Markdown or MDX posts
- Syntax highlighting for code
- Responsive design
- Strong metadata for search engines and social sharing
- Projects and About content alongside the blog
- Redirect strategy where old URLs need to be preserved
- Simple repeatable publishing workflow

## Information architecture

### Home

- Profile photograph and concise professional introduction
- Key points such as current role, technical focus, interests, and availability
- Clear links to About, Writing, GitHub, and professional contact channels
- A featured-writing area showing the latest or manually selected 3–5 posts
- Post previews with title, summary, date, category, tags, and estimated reading time
- Optional compact banner for a highlighted project, announcement, or article

### About

- Longer personal and professional introduction
- Academic background and academic experiments or research projects
- Work and project experience
- Certifications
- Publications and talks
- Skills and current interests
- Contact and professional links

Sections are content-driven. Empty sections, including Publications initially, should not be rendered until an entry exists.

### Writing

- Searchable or filterable post archive
- One primary category per post
- Optional subcategory within the primary category
- Multiple free-form tags per post
- Category, subcategory, and tag archive pages
- Post previews showing essential metadata and a short summary

### Article

- Markdown or MDX body content
- Title, publication date, optional updated date, and reading time
- Category, optional subcategory, and tags
- Syntax-highlighted code blocks with copy controls
- Optional table of contents for longer posts
- Previous/next post navigation and related-post recommendations
- Social-sharing and search metadata

## Content model

Each post should use frontmatter similar to:

```yaml
title: "Example article"
description: "A short summary used in previews and search results."
published: 2026-07-17
updated: 2026-07-17
category: "Backend"
subcategory: "Databases"
tags:
  - PostgreSQL
  - Performance
featured: false
draft: false
cover: "/images/posts/example/cover.webp"
```

Category and subcategory values should come from a controlled list. Tags may be created as needed, with case and spelling normalized during the site build.

## Visual direction

- Simple, modern, and professional
- Quiet editorial article layouts with strong readability
- Restrained card-based layout on the Home page
- Developer-notebook details for code and metadata
- Responsive light and dark themes

## Open inputs

- Existing blog URL or exported files
- GitHub username
- Preferred project/repository name
- Profile photograph and personal information
- Whether the site should use the root GitHub Pages address or a repository subpath

## Working principles

- Keep content portable and stored separately from presentation where practical.
- Prefer static generation for speed, reliability, and inexpensive hosting.
- Preserve useful old URLs and metadata during migration.
- Treat accessibility and mobile layouts as core requirements.

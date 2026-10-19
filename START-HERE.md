# Your blog: edit → commit → push

Live website: https://infty1010.github.io/
Repository: https://github.com/infty1010/infty1010.github.io
Your working folder: `~/Desktop/infty1010-blog`

## 1. Open and edit

Open the whole `infty1010-blog` folder in Visual Studio Code (File → Open Folder).
Use this Desktop folder for future edits. It is a Git checkout already connected to your existing repository.

| What you want to change | File or folder |
| --- | --- |
| Blog posts | `src/content/posts/` |
| About page | `src/content/pages/about.md` |
| Homepage welcome and introduction | `src/pages/index.astro` |
| Site title, description, author, social links | `astro-paper.config.ts` |
| Images | `public/images/` |

## 2. Write your first post

Open `src/content/posts/my-first-post.md`. It is an unpublished example (`draft: true`). Replace its title, summary, date, and body with your own writing. Rename it to a short filename such as `my-notes.md`.

For the next article, duplicate that Markdown file with a new filename. The filename becomes its URL, for example `/posts/my-notes/`; avoid changing it after publication if you want existing links to keep working.

The block between the two `---` lines is metadata:

```yaml
---
title: "My notes / 我的笔记"
pubDatetime: 2026-10-18T12:00:00-07:00
description: "A short summary of this post."
tags: [notes, mathematics]
lang: zh-CN
featured: false
draft: false
---

Write your article here.

## A section heading

支持中文，也支持 English。
```

- Use `lang: zh-CN` for Chinese or `lang: en` for English; this sets the page language and Chinese reading spacing.
- `draft: true` hides the post from the website. Set it to `false` when ready. Drafts committed to this public GitHub repository are still readable on GitHub; they are not private storage.
- Use a real date/time, including its time-zone offset. `-07:00` is Los Angeles daylight time; `-08:00` is standard time. `Z` means UTC. Future-dated posts need another deployment once their date arrives (there is no scheduled rebuild).
- `featured: true` puts the article in the Featured section on the homepage.
- Keep `description` as a short summary and `tags` as a list.
- `##` creates a heading; `**bold**` creates bold text; `[label](https://example.com)` creates a link.
- Put an image in `public/images/photo.jpg`, then write `![Image description](/images/photo.jpg)` in your article.

## 3. Publish with GitHub Desktop (recommended)

One-time setup:

1. Install GitHub Desktop from https://desktop.github.com/ and sign in as `zixin2006`, the account with access to the `infty1010` organization.
2. Choose **File → Add Local Repository**, then select `~/Desktop/infty1010-blog`. This folder already has the correct remote; you do not need to create or publish a new repository.
3. Keep **Current Branch** on `main`.

For each update:

1. Before editing, click **Fetch origin**, and **Pull origin** if offered, to get changes made elsewhere.
2. Edit and save the files in VS Code.
3. In GitHub Desktop, review the changed files and select the files to include.
4. Enter a short summary such as `Add my first post` and click **Commit to main**.
5. Click **Push origin**. Committing alone only saves locally; pushing sends it to GitHub.
6. Open https://github.com/infty1010/infty1010.github.io/actions and wait for **Deploy blog to GitHub Pages** to turn green.
7. Refresh https://infty1010.github.io/ . Publishing usually takes a few minutes.

If deployment fails, open the failed run and its build step to see the error. The previous successful version stays live. Fix the reported problem and commit/push again.

GitHub's official instructions:
- https://docs.github.com/en/desktop/adding-and-cloning-repositories/adding-a-repository-from-your-local-computer-to-github-desktop
- https://docs.github.com/en/desktop/making-changes-in-a-branch/pushing-changes-to-github-from-github-desktop

## 4. Optional: preview before publishing

Preview is local; it does not publish your changes.

Install Node.js 24 LTS from https://nodejs.org/ if needed. Open Terminal and run:

```sh
cd ~/Desktop/infty1010-blog
npm install --global pnpm@11.19.0
pnpm install --frozen-lockfile
pnpm dev
```

Open the Local URL printed in Terminal (usually http://localhost:4321). Save your files to see updates. Stop the server with Control-C. Drafts are hidden even in local preview: set `draft: false` to preview a post, then restore `true` before committing if you are not ready to publish.

For the production build and working search:

```sh
pnpm build
pnpm preview
```

Open the printed Local URL. With no published posts, the Search page shows an empty message. Search is generated at build time.

## 5. Optional: publish from Terminal

GitHub Desktop is the easier sign-in path. If Git authentication is already configured, you can instead run:

```sh
cd ~/Desktop/infty1010-blog
git pull --ff-only
# Edit and save your files, then review the changes:
git status
git diff
# Stage the files you edited, for example:
git add src/content/posts/my-first-post.md
git commit -m "Publish my first post"
git push origin main
```

Use the actual filename if you renamed it. If Git asks for authentication, use GitHub Desktop rather than entering your GitHub account password into Terminal. Never use force-push to resolve a rejected push.

## What is already set up

- AstroPaper layout, Inter + Georgia, and Chinese font fallbacks.
- GitHub Pages hosting and automatic deployment on pushes to `main`.
- No published demo articles. The starter post is marked as a draft.
- The site title is Infty; change `site.title` in `astro-paper.config.ts` to rename it.
- Old demo articles remain recoverable in Git history.

## English / 中文 versions

Use the **中文 / English** button beside the site name to switch languages. It keeps the current page, article, tag or archive section. English URLs remain unchanged; Chinese pages use `/zh/`.

For your first post:

- English: `src/content/posts/my-first-post.md`
- Chinese: `src/content/translations/zh/my-first-post.md`

For each new English article:

1. Create `src/content/posts/my-notes.md` as usual, with `lang: en`. This original file owns the publication date, tags, draft status and featured setting for BOTH versions.
2. Create `src/content/translations/zh/my-notes.md` with the same filename and any matching subfolders.
3. The translation file only needs a translated title, description and Markdown body:

```markdown
---
title: "我的笔记"
description: "这篇文章的中文简介。"
---

在这里写中文正文。
```

The original article must have `draft: false` before either version can appear. Translation files never create separate articles in the list. Translations are written by you; future posts are not automatically translated. If a translation is missing, that language's page shows the original article with a notice.

You can also write the original in Chinese (`lang: zh-CN`) and put its English translation at `src/content/translations/en/my-notes.md`. A translation file overrides the title, summary and body in that language, so edit that file when updating the translation.

Edit the English About page at `src/content/pages/about.md` and the Chinese one at `src/content/pages/about-zh.md`. Menu labels and homepage text live in `src/i18n/lang/en.ts` and `src/i18n/lang/zh.ts`.

After editing, commit and push normally. One deployment publishes both languages.

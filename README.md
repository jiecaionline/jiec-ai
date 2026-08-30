# Jie Cai — personal site

Static recreation of the [Notion site](https://standing-giver-4af.notion.site/Jie-Cai-440827106e3849e781b33cf79523a6f7), ready to host on **jiec.ai**.

## Preview locally

```bash
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080).

## Deploy (GitHub Pages)

1. Create a GitHub repo and push this project.
2. In the repo: **Settings → Pages → Deploy from a branch** (`main`, `/` root).
3. Pages will pick up the `CNAME` file (`jiec.ai`).

## Point Namecheap at the site

In Namecheap → Domain List → **jiec.ai** → Advanced DNS:

| Type | Host | Value |
|------|------|--------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `<your-github-user>.github.io.` |

Wait for DNS to propagate, then confirm GitHub Pages shows the custom domain as verified.

Cloudflare Pages, Netlify, and Vercel also work: upload this folder (or connect the repo) and set the custom domain to `jiec.ai`.

# 90-Minute Reads — Landing Page

A simple, high‑converting landing page for the spicy rom‑com novella series. Focused on Book 1, “Best Efforts,” with room to grow to six books.

## What’s inside
- `index.html` — The single-page site with all sections
- `styles/main.css` — The theme (rom‑com palette + typography)
- `scripts/main.js` — Small UX niceties (smooth scroll, demo form)
- `assets/images/book-mockup.svg` — Placeholder book mockup
- `privacy.html` — Basic privacy policy stub

## Run locally
This is a static site. You can open `index.html` directly, or serve it over HTTP. Serving is recommended to avoid CORS issues with some embeds.

Option A — Quick open:
- Double‑click `index.html` in your file explorer, or open in VS Code’s Live Preview if installed.

Option B — Simple local server (Python 3):

```bash
python3 -m http.server 8080
```

Then visit:

```
http://localhost:8080/
```

## Customize
1) Book links: In `index.html`, search for `store-btn` and replace the `href` values with your Amazon and Apple Books URLs.

2) MailerLite embed: In the “Signup” section of `index.html`, replace the placeholder with your MailerLite form embed. Remove the fallback `<form id="fallback-form">` block once your embed is working.

3) Copy: Replace the blurb, character intros, and author bio with your real content.

4) Images: Swap `assets/images/book-mockup.svg` with your real 3D cover mockup (optimize for web).

5) Social links: Update the TikTok/Instagram/Goodreads links in the author section.

## Deploy
Any static hosting works:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

Point the host to the repo root (no build step needed).

## License
MIT

Reese Pace Author Page

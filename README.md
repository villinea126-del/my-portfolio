# Abhay Kale — Portfolio

A premium, single-page developer portfolio built with **semantic HTML5, modern CSS3, and vanilla JavaScript (ES6+)**. No frameworks, no build step — open `index.html` and it works.

**Design direction:** code-editor inspired dark tech. The hero reads like a JS object literal, section eyebrows are styled like file names (`about.js`, `education.md`, `skills.json`...), and cards use a nested "double-bezel" frame throughout. Dark and light themes are both fully supported.

---

## 1. Run it locally

No build tools required.

```bash
# Option A — just open it
open index.html          # macOS
start index.html         # Windows

# Option B — serve it (recommended, avoids any file:// quirks)
python3 -m http.server 5500
# then visit http://localhost:5500
```

## 2. Project structure

```
portfolio/
├── index.html          # all markup / sections
├── style.css            # design tokens + all styles
├── script.js             # theme toggle, scroll reveal, nav, form validation
├── assets/
│   ├── images/            # headshot, project screenshots, og-cover.png
│   ├── icons/              # optional custom svg icons
│   ├── fonts/               # optional self-hosted font files
│   ├── illustrations/        # optional decorative art
│   └── resume/                # Abhay_Kale_Resume.pdf goes here
├── favicon/
│   └── favicon.svg
├── robots.txt
├── sitemap.xml
└── README.md
```

## 3. Customize content

Everything lives directly in `index.html` — no CMS, no data files, so it's easy to hand-edit.

| Section | Where | What to change |
|---|---|---|
| Hero | `#hero` | Headline object, subtitle, CTA links |
| About | `#about` | Bio copy, quick facts card |
| Education | `#education` | Timeline entries — duplicate a `.timeline-item` for more |
| Skills | `#skills` | Chips inside each `.skill-group` — duplicate `.skill-chip` for more |
| Projects | `#projects` | Duplicate a `.project-card` `<article>` for each real project |
| Achievements | `#achievements` | Duplicate a `.achievement-card` for each entry |
| Contact | `#contact` | Email / LinkedIn / GitHub links, contact form |

### Add your resume
Drop your PDF at `assets/resume/Abhay_Kale_Resume.pdf` — the "Download résumé" button already points there.

### Add real images
- `assets/images/profile.jpg` — swap into the hero visual if you want a photo instead of the terminal illustration.
- `assets/images/og-cover.png` (1200×630px) — used for social share previews, referenced in `<head>`.
- `assets/images/project-*.jpg` — replace the CSS gradient placeholders in `.project-thumb` with `<img>` tags.

### Wire up the contact form
The form validates client-side but has **no backend**. To make it actually send email, either:
1. Point the `fetch()` call (add one in `script.js`, inside the `submit` handler) at a service like [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com/), or
2. Swap the `<form>` for a plain POST to your own backend endpoint.

## 4. Theming

Colors, type, spacing, and radii are all CSS custom properties at the top of `style.css` under `:root` and `[data-theme="light"]`. Change a value once, it cascades everywhere. Theme preference is saved to `localStorage` and respects the visitor's OS preference on first visit.

## 5. Performance & accessibility notes

- Fonts load via `font-display: swap`; only the weights actually used are requested.
- All motion respects `prefers-reduced-motion`.
- Scroll-triggered reveals use `IntersectionObserver`, not scroll listeners.
- Every interactive element has a visible focus state and an accessible label.
- Update `robots.txt`, `sitemap.xml`, and the canonical/OG URLs in `index.html` once you have a real domain.

## 6. Deploying

This is a static site — drag the `portfolio/` folder into **Vercel**, **Netlify**, **GitHub Pages**, or any static host. No build command needed.

---

Built by Abhay Somnath Kale.

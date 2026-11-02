# Kuldeep Kumar — Portfolio Website

Fully animated, single-page developer portfolio. Hand-coded with **pure HTML, CSS & JavaScript** — koi framework nahi, koi build step nahi. Iseeda GitHub Pages par seedha host hota hai.

> **Live preview (deploy ke baad):** `https://<your-username>.github.io`

---

## Files

```
kuldeep-portfolio/
├── index.html                     → poori website ka content
├── css/style.css                  → design + animations
├── js/main.js                     → particles, typing effect, counters, etc.
├── assets/
│   ├── Kuldeep-Kumar-Resume.pdf   → resume (Resume button isko download karta hai)
│   └── og-image.png               → WhatsApp/social share preview image
├── .nojekyll                      → GitHub Pages ke liye zaroori
└── README.md
```

---

## GitHub Par Free Host Kaise Karein (5 minute)

### Option A — Sabse aasan (recommended): `username.github.io`

1. **[github.com](https://github.com)** par account banao / login karo.
2. Right-top **`+` → New repository** pe click karo.
3. Repository name **exactly** aisa rakho: `<apna-username>.github.io`
   (Example: agar username `kuldeep98` hai → repo name = `kuldeep98.github.io`)
4. **Public** selected rakho → **Create repository**.
5. **"uploading an existing file"** link pe click karo.
6. `kuldeep-portfolio` folder ke **andar ki saari files** (index.html, css, js, assets, .nojekyll) drag karke drop karo — folder khud nahi, uske andar ki cheezein.
7. Neeche **Commit changes** pe click karo.
8. **Settings → Pages** mein jao → Source: **Deploy from a branch** → Branch: **main** → **Save**.
9. 1–2 minute wait karo. Bas! Aapka link ready:
   **`https://<your-username>.github.io`**
10. Ye link kisi ko bhi bhejo — WhatsApp, Instagram, resume, kahin bhi. Sab kholein to yahi website khulegi.

### Option B — Koi bhi naam wala repo

Agar aap repo ka naam kuch aur rakhna chahte ho (jaise `portfolio`):
- Repo banao → files upload karo → Settings → Pages → main branch → Save.
- Link hoga: `https://<username>.github.io/portfolio/`
- **Note:** is case mein `index.html` ke `<head>` mein og:image ko full URL karna hoga (neeche dekho).

### Option C — Git commands se (agar comfortable ho)

```bash
git clone https://github.com/<username>/<username>.github.io
cd <username>.github.io
# saari files copy karo is folder se
git add .
git commit -m "Add portfolio website"
git push origin main
```

---

## Apna Content Kaise Edit Karein

Sab kuch **`index.html`** mein hai — koi bhi text editor (Notepad bhi chalega) mein kholo:

| Kya badalna hai | Kahan milega |
|---|---|
| Name / intro text | `<section id="home">` (hero) mein |
| Typing wali roles | `js/main.js` → `ROLES` array |
| Skills / chips | `<section id="skills">` mein `<span class="chip">` |
| Timeline entries | `<section id="journey">` mein `timeline-item` copy-paste karo |
| Naya project add karna | `<section id="projects">` mein koi `project-card` copy karke edit karo |
| GitHub repo link | `id="githubRepoLink"` wale `<a>` ka `href` apne repo URL se badlo |
| Resume update | `assets/Kuldeep-Kumar-Resume.pdf` ko nayi file se replace karo (naam same rakhna) |

Edit karke GitHub par upload/commit karo — **1 minute mein live update** ho jayega. 🚀

---

## WhatsApp / Social Share Image Fix

Deploy hone ke baad `index.html` mein ye 2 lines dhundo:

```html
<meta property="og:image" content="assets/og-image.png" />
<meta name="twitter:image" content="assets/og-image.png" />
```

Inko full URL bana do (Option A wale case mein bhi best practice hai):

```html
<meta property="og:image" content="https://<username>.github.io/assets/og-image.png" />
<meta name="twitter:image" content="https://<username>.github.io/assets/og-image.png" />
```

---

## Bonus: Apna Khud Ka Domain (upcomingfuture.space)

Aapke paas pehle se domain hai — GitHub Pages par free connect ho jata hai:

1. Repo mein ek file banao: `CNAME` (bina extension) — usme sirf likho: `www.upcomingfuture.space`
2. Apne domain/DNS provider ke control panel mein jao aur ye records add karo:
   - `A` record: `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record: `www` → `<username>.github.io`
3. GitHub **Settings → Pages → Custom domain** mein `www.upcomingfuture.space` likho → Save.
4. DNS propagate hone ke baad (kuch minutes se kuch ghante) site aapke domain par live hogi, HTTPS bhi auto enable ho jayega.

---

## Localhost Par Chalana (optional)

```bash
cd kuldeep-portfolio
python -m http.server 8000
# browser mein kholo: http://localhost:8000
```

Ya seedha `index.html` double-click karo — bina server ke bhi chalti hai.

---

**Made with ❤ — HTML + CSS + JS, no frameworks.**

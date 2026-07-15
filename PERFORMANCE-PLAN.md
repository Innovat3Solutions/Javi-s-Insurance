# javisservices.com — Performance Enhancement Plan

Source: Google PageSpeed / Lighthouse (mobile), run July 15, 2026.

## ✅ RESULTS — all steps executed July 15, 2026

| | Before | After |
|---|---|---|
| Performance (mobile) | 60 | **68** apex / **79** www |
| Accessibility | 79 | **100** |
| Best Practices | 100 | **100** |
| SEO | 75 | **100** |
| Largest Contentful Paint | 21.7 s | **5.0 s** (3.7 s on www) |
| Total page weight | 26 MB | **515 KB** |

**Remaining recommendation (not a code change):** the `javisservices.com` →
`www.javisservices.com` redirect costs ~840 ms and ~11 performance points on
mobile tests of the apex URL. Options: (a) point all ads/links/GBP at
`https://www.javisservices.com` directly, and/or (b) in Vercel → Project →
Settings → Domains, consider making the apex the primary domain. Further JS
trimming (LazyMotion) could add a few more points but has diminishing returns.

---

**Original mobile scores:** Performance **60** · Accessibility **79** · Best Practices **100** · SEO **75**

| Metric | Current | Target |
|---|---|---|
| Largest Contentful Paint (LCP) | **21.7 s** | < 2.5 s |
| First Contentful Paint (FCP) | 4.0 s | < 1.8 s |
| Speed Index | 7.6 s | < 3.4 s |
| Time to Interactive | 21.7 s | < 3.8 s |
| Total page weight | **26 MB** | < 1.5 MB |
| Cumulative Layout Shift | 0 ✅ | keep at 0 |
| Total Blocking Time | 10 ms ✅ | keep < 200 ms |

---

## Priority 0 — Images (this is ~90% of the problem)

**Finding:** The homepage downloads ~26 MB, almost entirely PNG images. Every page
hero in `public/images/` is an 8–10 MB full-resolution PNG. Even the logo is 2.4 MB.

Top offenders loaded on the homepage alone:

| File | Size | Realistic size |
|---|---|---|
| `agent-meeting-seniors.png` | 8.6 MB | ~150 KB |
| `obamacare-hero.png` | 8.6 MB | ~150 KB |
| `phone-money.png` | 3.3 MB | ~80 KB |
| `logo.png` | 2.4 MB | ~10 KB |
| `hero-medicare.png` | 1.2 MB | ~100 KB |
| `hero-health.png` | 1.0 MB | ~100 KB |

**Adjustments:**
1. Batch-convert every image in `public/images/` to **WebP**, resized to its
   actual display size (heroes ≤ 1600 px wide, quality ~80; logo ≤ 400 px wide).
   Expected result: ~150 MB of assets → under 5 MB; homepage 26 MB → ~1 MB.
2. Update `src` references from `.png` → `.webp` (App.tsx, Layout.tsx, all pages).
3. Add `loading="lazy"` + `decoding="async"` to every below-the-fold image
   (carousel slides after the first, section images, page-body images).
4. Add explicit `width`/`height` (or CSS aspect-ratio) so CLS stays at 0.
5. Optional, later: `srcset` with 480/960/1600 px variants for heroes.

**Expected impact: LCP 21.7 s → ~3 s. This one change moves Performance 60 → ~85.**

## Priority 1 — Make the hero (LCP) image load immediately

**Finding:** Lighthouse flags the LCP request as "not discoverable in initial
document" and "no fetchpriority=high". The hero image URL only exists inside the
JS bundle, so the browser can't start downloading it until React has booted.

**Adjustments:**
1. In `index.html`, preload the homepage hero:
   `<link rel="preload" as="image" href="/images/hero-health.webp" fetchpriority="high">`
2. On the hero `<img>` element: `fetchpriority="high"` and `loading="eager"`.

## Priority 1 — Kill the 810 ms redirect

**Finding:** `javisservices.com` 308-redirects to `www.javisservices.com`; on
mobile that costs ~810 ms before anything even starts.

**Adjustments:**
1. Use `https://www.javisservices.com` (the final URL) in every ad, social bio,
   Google Business Profile, QR code, and email signature so visitors skip the hop.
2. Add `<link rel="canonical" href="https://www.javisservices.com/">` (per-route).

## Priority 2 — JavaScript bundle (764 KB, single chunk)

**Finding:** One 764 KB bundle (210 KB gzipped) contains all 12 pages; 85 KB is
unused on first load. TBT is already fine, so this mainly affects download time.

**Adjustments:**
1. Route-level code splitting: wrap page imports in `React.lazy()` +
   `<Suspense>` in `App.tsx` so visitors only download the page they're on.
2. The `motion` animation library is a large dependency — switch to
   `LazyMotion`/`m` (motion's reduced bundle) if animations are simple.
3. Trim Google Fonts to the weights actually used (currently 8 weights across
   Inter + Space Grotesk; likely only 4–5 are used).
4. Housekeeping: remove unused deps from `package.json` — `@google/genai`,
   `better-sqlite3`, `express`, `dotenv`, `@types/express`, `tsx` are not
   imported anywhere in `src/`. (Doesn't shrink the bundle, but cleans installs
   and security surface.)

## Priority 2 — SEO (75 → 100)

1. **No meta description** — add one to `index.html`, and ideally per-route
   (set `document.title` + meta description in a small `usePageMeta()` hook).
2. **robots.txt is invalid** — there is no `public/robots.txt`, so the SPA
   rewrite serves the HTML app for `/robots.txt`. Add a real
   `public/robots.txt` (allow all + sitemap line) and a `public/sitemap.xml`
   listing the 12 routes.
3. **Links without descriptive text** — footer social icons are `<a href="#">`
   with no label; give them `aria-label` and real destination URLs.

## Priority 2 — Accessibility (79 → 95+)

1. **Icon-only buttons** (hero category tiles) — add `aria-label="Health insurance"` etc.
2. **Social links** `<a href="#">` — `aria-label` + real URLs (same fix as SEO).
3. **Contrast** — `text-gray-400` body text on white fails WCAG AA; darken to
   `text-gray-500`/`text-gray-600`.
4. **Heading order** — `<h4>` elements follow `<h2>` sections (h3 skipped);
   change to `<h3>` or restructure so levels descend sequentially.
5. **Carousel dots** are 12×12 px — below the 24 px minimum touch target. Add
   padding to enlarge the hit area and an `aria-label="Go to slide N"`.

---

## Suggested execution order

| Step | Work | Est. effort | Score impact |
|---|---|---|---|
| 1 | Convert/resize all images to WebP + update refs | ~1 hour (scripted) | Perf +25 |
| 2 | Preload hero + fetchpriority + lazy-load below fold | 30 min | Perf +5 |
| 3 | robots.txt + sitemap + meta description + canonical | 30 min | SEO +25 |
| 4 | Accessibility labels, contrast, heading order, dot size | 1 hour | A11y +16 |
| 5 | Route code-splitting + font trim | 1 hour | Perf +3–5, FCP −1s |

Projected after steps 1–5: **Performance ~90–95, Accessibility ~95+, Best
Practices 100, SEO 100**, LCP ~2.5 s, page weight ~1 MB.

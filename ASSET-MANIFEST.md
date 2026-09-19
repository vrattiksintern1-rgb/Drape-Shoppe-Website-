# Drape Shoppe — Asset Manifest

Every filename the code already references. Drop the files in at these exact
paths and names and the site works with **zero code changes**. Space for each
one is already reserved in CSS (`aspect-ratio`) and in markup (`width`/`height`),
so nothing shifts when they land.

Until a file exists, its box renders as flat empty space — no placeholder
graphic, no stock image, no broken-image icon.

---

## `/assets/img/` — logos and icons

| Filename | Source | Export | Used in |
|---|---|---|---|
| `DRAPE_SHOPPE_Final_Logo_03.svg` | **in place** — vector, extracted from the PDF | navy wordmark, cyan D, gold swirl; transparent | Header (after scroll), 404 page |
| `DRAPE_SHOPPE_Final_Logo_02.svg` | **in place** — vector, extracted from the PDF | white knockout + gold swirl; transparent | Header over the hero |
| `DRAPE_SHOPPE_Final_Logo_01.svg` | **in place** — vector, extracted from the PDF | navy-lockup colours (white wordmark, cyan D, gold swirl); transparent, sits on the navy footer | Footer |
| `favicon-32.png` | crop the "D" mark from `DRAPE_SHOPPE_Final_Logo.pdf` | 32×32 PNG | Browser tab |
| `apple-touch-icon.png` | same "D" mark | 180×180 PNG | iOS home screen |
| `icon-512.png` | same "D" mark | 512×512 PNG | Android / PWA |
| `og-image.jpg` | agency-built from the exterior shot + logo overlay | 1200×630 | Social share card |
| `exterior.jpg` | `DSC09331` re-export | any, 1200px wide | JSON-LD `image` only (path comes from the spec's own schema block) |


The three logo files are cropped to mark + wordmark only (no "Wrap Your Home in Elegance" line): at header size that line is under 6px tall, and the footer already sets it as live text beneath the logo.
---

## `/assets/img/` — photography

All portrait **4:5**, per spec §7.4.1. Filenames are exactly as listed in the
spec's shortlist (§7.2).

### Hero

| Filename | Export | Role |
|---|---|---|
| `DSC09342.JPG` | 1600×2000, under 300 KB | Hero video poster **and** gallery image 1 |

### Collection tiles — 800×1000, under 120 KB each

| Filename | Category |
|---|---|
| `DSC09343.JPG` | Curtains & Drapes |
| `DSC09338.JPG` | Blinds |
| `DSC09217.JPG` | Sofa & Upholstery Fabrics |
| `DSC09273.JPG` | Custom Furniture |
| `DSC00008.JPG` | Mattresses |
| `DSC09304.JPG` | Bedsheets & Bed Covers *(also gallery image 4)* |
| `DSC09347.JPG` | Comforters, Cushions & Throws |
| `DSC09313.JPG` | Home Décor Accessories |

Wallpapers, Wooden Flooring, Rugs & Wall Carpets and Towels & Bath Accessories
have **no image slot** — they ship as text-only cards with a gold-bordered icon
on `--cyan-soft`, per spec §7.4.2. When the shoot happens, replace each
`<span class="tile-media tile-media--icon">…</span>` with the standard
`<span class="tile-media"><img …></span>` block and drop the class
`tile--noimage` from the `<li>`.

### Gallery — 1200×1500, under 250 KB each

| Filename | Caption in page |
|---|---|
| `DSC09342.JPG` | The main display floor |
| `DSC09340.JPG` | Seating and upholstery |
| `DSC09240.JPG` | Furniture and lounge display |
| `DSC09304.JPG` | Bedroom display setting |
| `DSC09346.JPG` | Décor and accessories corner |
| `DSC09317.JPG` | Mirrors and styling pieces |

### Section images — 1200×1500

| Filename | Section |
|---|---|
| `DSC09262.JPG` | Custom Furniture (houndstooth armchair) |
| `DSC09218.JPG` | How It Works (swatch book being flipped) |
| `DSC09331.JPG` | Visit Us (façade with signage) |
| `DSC09240.JPG` | Our Story — fallback still if the Instagram reel embed fails |

---

## `/assets/video/`

| Filename | Export |
|---|---|
| `hero.mp4` | 10–15 s, MP4 H.264, 1280px wide, no audio, under 3 MB |

**Note:** the spec lists the hero video source as `IMG_8557–8559.MOV` — a range
of three source clips, not a deliverable filename. The cut-down single file must
be named `hero.mp4`. If you would rather keep a different name, change the one
`data-src` attribute on `#heroVideo` in `index.html`.

---

## If you export to WebP instead

Spec §7.3 asks for WebP tiles and gallery images. The code currently points at
the `.JPG` filenames exactly as the shortlist names them. To switch, rename your
exports to `.webp` and run a single find-and-replace across `index.html`:
`.JPG` → `.webp`. Nothing else changes.

---

## Alt text

Alt text is already written into the markup, taken from the content doc §13.
Four images are not in that table — `DSC09346`, `DSC09317`, `DSC09313` and
`DSC09262` — so their alt text follows the same pattern and includes
"Drape Shoppe" / "Surat". Adjust if the agency has preferred wording.

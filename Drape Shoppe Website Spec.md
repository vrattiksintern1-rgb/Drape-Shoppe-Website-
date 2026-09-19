# Drape Shoppe — Website Build Specification

**Client:** Drape Shoppe, Unit 1 Showroom, Bhatar Char Rasta, Surat
**Prepared by:** Two Rabbits Marketing LLP
**Domain:** drapeshoppe.co.in
**Version:** 1.0 — 18 September 2026

---

## 1. Project Brief

A single-page, information-first business website for the Bhatar (Unit 1) retail showroom. The site is a **footfall and WhatsApp lead engine**, not an e-commerce store. No cart, no checkout, no prices.

**Primary goals**
1. Convert Meta ad traffic into WhatsApp enquiries and showroom visits
2. Serve as the landing page destination for Meta campaigns (currently missing from the ad plan)
3. Build trust through the 35-year legacy story and showroom imagery
4. Rank locally for "curtains in Surat", "home furnishing Surat", "blinds Surat", "custom furniture Surat"

**Primary audience:** homeowners, newly-weds and renovators aged 25–55 in Surat, mainly Bhatar, Althan, Vesu and Piplod
**Secondary audience:** interior designers, architects, builders and hotels

**Non-goals:** online payments, product catalogue with SKUs, user accounts, a blog at launch

---

## 2. Business Facts (use verbatim)

| Field | Value |
|---|---|
| Business name | Drape Shoppe |
| Tagline (logo lockup) | Wrap Your Home in Elegance |
| Owner's sign-off line | Where you think, we create. |
| Owner | Hiten Vakawala, second generation |
| Established | 1990, Bhagatalav, Surat |
| Legacy | 35+ years in home furnishing |
| Showroom address | Opp. Kanchanjanga Apartment, Near Bhatar Char Rasta, Udhana–Magdalla Road, Surat, Gujarat 395017 |
| Hours | Daily, 10:00 AM – 8:30 PM |
| Phone / WhatsApp | +91 99746 97999 |
| Instagram | https://www.instagram.com/drape_shoppe_surat/ |
| Google Maps | https://maps.app.goo.gl/CnfpRd2FDtSZ8bag7 |

> **Spelling rule:** always "Drape Shoppe". Never "Drappe", "Shopee", "Shoppee". This appears inconsistently in older internal files.

---

## 3. Brand System

### 3.1 Colours

```css
:root {
  --navy:       #003775;  /* primary: wordmark, footer, buttons */
  --navy-deep:  #002B5C;  /* navy hover */
  --cyan:       #0092E0;  /* secondary: links, icons, accents */
  --cyan-soft:  #E6F4FD;  /* section tint backgrounds */
  --gold:       #F9D14A;  /* accent: dividers, icons, borders only */
  --gold-deep:  #D8AC28;  /* gold hover / gradient end */
  --ink:        #1A1A1A;  /* body text */
  --muted:      #6B7280;  /* captions, meta */
  --cream:      #FAF8F5;  /* warm alternate section background */
  --white:      #FFFFFF;
  --whatsapp:   #25D366;  /* WhatsApp CTA only */
}
```

Gold gradient for the spiral and decorative rules: `linear-gradient(135deg, #D8AC28, #F4E293, #F9D14A)`

**Accessibility:** gold on white is approximately 1.7:1 and **must not be used for text**. Buttons are navy or cyan with white text. Body text is `--ink` on white or `--cream`.

### 3.2 Typography

| Use | Font | Weights |
|---|---|---|
| Headings | Archivo (Google Fonts) | 600, 700 |
| Body | Inter (Google Fonts) | 400, 500 |
| Accent / tagline | Archivo, letter-spacing 0.08em, uppercase | 500 |

Type scale: H1 clamp(2rem, 5vw, 3.5rem) / H2 clamp(1.5rem, 3.5vw, 2.25rem) / H3 1.25rem / body 1rem, line-height 1.65

### 3.3 Logo files (supplied separately)

| File | Version | Usage |
|---|---|---|
| DRAPE_SHOPPE_Final_Logo_03.png | Navy wordmark, white background | Header, light sections |
| DRAPE_SHOPPE_Final_Logo_02.png | White knockout, transparent | Over hero image/video |
| DRAPE_SHOPPE_Final_Logo_01.png | Navy background lockup | Footer, social cards |
| DRAPE_SHOPPE_Final_Logo.pdf | Vector | Favicon export, print |

**Favicon:** crop the "D" mark alone from the PDF. Export 32×32, 180×180 (apple-touch) and 512×512. The full lockup is unreadable at small sizes.

---

## 4. Page Structure

Single page with anchor navigation. Order is fixed.

| # | Section | Anchor |
|---|---|---|
| 0 | Sticky header | — |
| 1 | Hero | `#home` |
| 2 | Offer strip (swappable) | — |
| 3 | Collections (12 categories) | `#collections` |
| 4 | Our Story — 35 years | `#story` |
| 5 | Inside the Showroom (gallery) | `#showroom` |
| 6 | Custom Furniture | `#custom` |
| 7 | How It Works (4 steps) | `#process` |
| 8 | For Designers & Businesses | `#trade` |
| 9 | Reviews | `#reviews` |
| 10 | Visit Us (map + contact) | `#visit` |
| 11 | Footer | — |
| — | Sticky WhatsApp button (mobile) | — |

---

## 5. Section-by-Section Content

### 0. Sticky Header
- Left: logo (Logo_03), links to `#home`
- Right (desktop): Collections · Our Story · Showroom · Trade · Visit Us, then a navy **Call** button and a green **WhatsApp** button
- Mobile: logo + hamburger; WhatsApp icon stays visible in the bar
- Transparent over the hero, turns solid white with a shadow after 80px of scroll

### 1. Hero

**H1 (confirm before build — 3 approved options):**
- **A.** Where you think, we create.
- **B.** Your dream home, made in fabric.
- **C.** From fabric to décor, everything your home needs.

> Default to **A** unless the client selects otherwise. If A is used, the sub-headline must carry the category words for SEO.

**Sub-headline:** Surat's home furnishing destination since 1990. Curtains, blinds, custom furniture, wallpapers, flooring and décor — all under one roof at Bhatar Char Rasta.

**Buttons:** `WhatsApp Us` (green) · `Call 99746 97999` (navy) · `Get Directions` (outline)

**Trust row below buttons:** 35+ Years · 2 Generations · Open Daily 10 AM – 8:30 PM · 4.4★ on Google

**Media:** background video loop (muted, autoplay, loop, playsinline, poster image) with a navy overlay at 45% opacity. See §7.

### 2. Offer Strip

A slim full-width navy bar directly under the hero. Built as a **single editable block** so the agency can swap it monthly.

Current text: `Festive Sale — Up to 50% off on Curtains, Sofa Fabrics, Mattresses & Blinds. Ends 30 Sep.` + inline `Enquire on WhatsApp` link.

Requirement: the strip must be removable by commenting out one block, with no layout breakage.

### 3. Collections

**Section heading:** Everything your home needs
**Intro:** From the first fabric swatch to the final cushion — curated across twelve categories.

12 tiles, 4 columns on desktop, 2 on tablet, 2 on mobile. Each tile: image, category name, one-line description, entire tile is a WhatsApp link with a category-specific prefill.

| # | Category | One-liner |
|---|---|---|
| 1 | Curtains & Drapes | Sheers, blackouts and custom-stitched drapes in hundreds of fabrics. |
| 2 | Blinds | Roman, roller, zebra and wooden blinds for every window. |
| 3 | Sofa & Upholstery Fabrics | Durable, beautiful fabrics for sofas, chairs and headboards. |
| 4 | Custom Furniture | Built to your size, your fabric, your space. |
| 5 | Mattresses | Multiple brands and comfort levels, tried in store. |
| 6 | Bedsheets & Bed Covers | Cottons, sateens and prints for every bed size. |
| 7 | Comforters, Cushions & Throws | The layers that make a room feel finished. |
| 8 | Wallpapers | Textures, patterns and murals for feature walls. |
| 9 | Wooden Flooring | Warm, durable flooring fitted to your rooms. |
| 10 | Rugs & Wall Carpets | Anchor a room or soften a wall. |
| 11 | Towels & Bath Accessories | Finishing touches for the bathroom. |
| 12 | Home Décor Accessories | Mirrors, runners and the details that tie it together. |

> Categories 8–11 have **no photography yet**. See §7.4 for the fallback.

### 4. Our Story

Two-column on desktop: text left, portrait image or embedded owner reel right.

**Heading:** Since 1990. Two generations. One belief.

**Body:**
> Drape Shoppe began in 1990, when our founder opened a furnishing store in Bhagatalav, Surat. Back then, furnishing meant curtain fabric and sofa fabric — and little else.
>
> Homes ask for more today. In 2012, Hiten Vakawala carried the legacy forward, and our Bhatar Char Rasta showroom brought fabric, furniture and décor together under one roof.
>
> Because a home isn't just a place to live. It's where you should find peace. That's what we've been building for our customers for 35 years.
>
> **Where you think, we create.**
>
> — Hiten Vakawala, Owner

**Media:** embed the owner's brand-story reel — https://www.instagram.com/reel/DbIPZ89kdLc/ — via the Instagram oEmbed blockquote, lazy-loaded. Fallback if the embed fails: a still of the showroom interior with a caption.

### 5. Inside the Showroom

**Heading:** Come see it in person
**Intro:** Three floors of fabric, furniture and décor — with someone to help you choose.

A 6-image gallery, masonry on desktop and a swipeable carousel on mobile. Lightbox on click. All images are portrait; the grid must be built for a 4:5 aspect ratio, not 16:9.

### 6. Custom Furniture

Split section on a `--cream` background.

**Heading:** Built to your size, in your fabric
**Body:** Sofas, chairs, headboards and dining seating — made to your dimensions and finished in any fabric from our collection. Bring a photo or a rough sketch; we'll take it from there.
**CTA:** `Send us your requirement on WhatsApp`

### 7. How It Works

4 numbered steps, horizontal on desktop and stacked on mobile. Gold numerals.

1. **Visit the showroom** — See and feel the fabrics in person. No appointment needed.
2. **Choose with an expert** — Our team helps you match fabric, colour and function to your room.
3. **Measurement** — *[CONFIRM: on-site measurement offered? Remove this step if not.]*
4. **Stitching, delivery & installation** — *[CONFIRM: which of these are in-house, and turnaround time.]*

> If steps 3 and 4 are not confirmed before launch, ship the section with 3 steps: Visit → Choose → Take it home.

### 8. For Designers & Businesses

Navy background, white text.

**Heading:** Working on a project?
**Body:** We supply interior designers, architects, builders and hotels with furnishing across full projects — with trade pricing, bulk availability and dedicated support.
**CTA:** `Enquire about trade pricing` (WhatsApp, trade prefill)

### 9. Reviews

3 review cards + a Google rating badge showing 4.4★ and the review count, plus a `Read all reviews on Google` link to the Maps listing.

> Reviews to be supplied by the agency before launch. Do not hardcode the star count — put the rating and count in one config object so it can be updated.

### 10. Visit Us

Two columns: details on the left, embedded Google Map (lazy-loaded iframe) on the right.

- Address block (as in §2)
- Hours: Open daily, 10:00 AM – 8:30 PM
- Phone: +91 99746 97999
- Buttons: `Call` · `WhatsApp` · `Get Directions`
- Parking line: *[CONFIRM]*

### 11. Footer

Navy background, Logo_01. Three columns: quick links, categories, contact. Instagram icon. Bottom line: `© 2026 Drape Shoppe, Surat. All rights reserved.` plus a small `Website by Two Rabbits Marketing LLP` credit.

---

## 6. WhatsApp CTA Map

Base: `https://wa.me/919974697999?text=`

| Location | Prefilled message (URL-encoded) |
|---|---|
| Header + sticky button | Hi Drape Shoppe, I'd like to know more about your collection. |
| Hero | Hi Drape Shoppe, I saw your website and would like to visit the showroom. |
| Offer strip | Hi, I saw the sale on your website. Is it still running? |
| Collection tile | Hi, I'm interested in **{Category Name}**. |
| Custom furniture | Hi, I'd like to enquire about custom furniture. |
| Trade section | Hi, I'm an interior designer / architect / builder and would like trade pricing. |
| Visit Us | Hi, I'd like to check showroom timings and availability. |

Distinct prefills let the store identify the lead source from the first message. Call links use `tel:+919974697999`.

---

## 7. Image & Video Shortlist

### 7.1 Drive source folders

**Root folders supplied by the client**
1. Strategy — https://drive.google.com/drive/folders/1oI3DkRndnQj8dTU6B6hSKGQTPi3zlNQY
2. Raw shoot footage — https://drive.google.com/drive/folders/152zl10TvrMHUCd9HbceqMT7Jc3f5T8qE
3. Final creatives — https://drive.google.com/drive/folders/1dJ7erI84iCnSUVXirf-l0uZtFxkPXKeJ

**Direct subfolder links used by this spec**

| Reference | Folder | Link |
|---|---|---|
| AUG-1 | Aug 18 shoot, set 1 | https://drive.google.com/drive/folders/1-wS_2lGb5WMTc2a2R-_3Z7Lbfoz4FP_c |
| AUG-2 | Aug 18 shoot, set 2 | https://drive.google.com/drive/folders/1Nufzt_cueXLM9BCCQfrNfdQmAX4FRgMK |
| AUG-3 | Aug 18 shoot, set 3 | https://drive.google.com/drive/folders/1MyL_pVI5Oyq6oJ8B6BUFxx_RqyG5WyGX |
| AUG-4 | Aug 18 shoot, set 4 | https://drive.google.com/drive/folders/1Cc0euVTBr4VUUWJrrrOX7VWTsscCBAkD |
| AUG-5 | Aug 18 shoot, set 5 | https://drive.google.com/drive/folders/19xHdOaHfvpcciAulmE1zO63fn9BVI2t- |
| AUG-6 | Aug 18 shoot, set 6 | https://drive.google.com/drive/folders/15URo3hoTA1Auw2582TfkKIHT-b1_ANJX |
| AUG-7 | Aug 18 shoot, set 7 | https://drive.google.com/drive/folders/1g3Rf9l7uOKZrmS8uVt4ZE5ardkYXq4Xz |
| AUG-8 | Aug 18 shoot, set 8 | https://drive.google.com/drive/folders/1uM2o96f4EPP1tZD4aP9iF6nT_Bsse5Qp |
| AUG-9 | Aug 18 shoot, set 9 | https://drive.google.com/drive/folders/1ZGF_I414CIDSBBQUOXby3tmnOYsma9DF |
| AUG-11 | Aug 18 shoot, set 11 | https://drive.google.com/drive/folders/1c8eAMxn34mtddjMubYJaVoeGDbGuFVpl |
| AUG-12 | Aug 18 shoot, set 12 (exterior) | https://drive.google.com/drive/folders/1jj7kIfLkHeqYfuCXXcJ47BI8VdjPgOOd |
| JUL-1 | Jul 3 shoot, set 1 (mattress) | https://drive.google.com/drive/folders/174ORXL4XVQ_ayUBF-hDanNkAisWeMUGl |
| JUL-2 | Jul 3 shoot, set 2 (bedding) | https://drive.google.com/drive/folders/1qd7p6489gK4invIc4dIhu_v34iElYJap |
| JUL-4 | Jul 3 shoot, set 4 | https://drive.google.com/drive/folders/1E8N3VVqSsFNxytbJe6A2mJMr-1J1IHYF |
| JUL-6 | Jul 3 shoot, set 6 | https://drive.google.com/drive/folders/1-uslIELopzJG073adpb2DgDe1nOh85F1 |
| VID | Aug 29 video, "Extra" | https://drive.google.com/drive/folders/1ru6ywvhH6UPnCCo3xCzQncU97JKxQGBe |
| POST-AUG | Aug final posts | https://drive.google.com/drive/folders/1qt1hujvv--N3VEP5qft4FlkLqQ5QO8GV |

### 7.2 Shortlist by section

| Section | File | Folder | Direct link | Subject |
|---|---|---|---|---|
| Hero poster | DSC09342.JPG | AUG-9 | https://drive.google.com/file/d/1oHWXncnAw-jBToiINRINcbIJiQIwOpTT/view | Showroom wide, sofa lounge, track lighting |
| Hero video | IMG_8557–8559.MOV | VID | — | Sheer curtain pans, swatch wall, blinds racks |
| Visit Us / exterior | DSC09331.JPG | AUG-12 | https://drive.google.com/file/d/1VTOK6Z7tzZkpD_x2ZGaRKcZPw0C0uPlP/view | Façade with signage (backups: 09332–09334) |
| Showroom 1 | DSC09342.JPG | AUG-9 | see above | Lounge and display wall |
| Showroom 2 | DSC09340.JPG | AUG-9 | — | Sofa seating area |
| Showroom 3 | DSC09240.JPG | AUG-9 | https://drive.google.com/file/d/1JbaPtuG_HcC2piS9Je5K0gOQ1UNiYg5y/view | Green daybed, wide interior |
| Showroom 4 | DSC09304.JPG | AUG-3 | https://drive.google.com/file/d/1rbYKPYVkC19GPjJDs9SY87JQDJJy8yuM/view | Four-poster bed display |
| Showroom 5 | DSC09346.JPG | AUG-7 | — | Arched niche display |
| Showroom 6 | DSC09317.JPG | AUG-9 | — | Mirror stand and styled corner |
| Curtains tile | DSC09343.JPG | AUG-7 | — | Curtain display rail (backup: DSC09297) |
| Blinds tile | DSC09338.JPG | AUG-4 | — | Blinds wall with signage (backup: DSC09335) |
| Sofa fabrics tile | DSC09217.JPG | AUG-6 | — | Swatch books (backup: DSC09218) |
| Custom furniture tile | DSC09273.JPG | AUG-11 | — | Walnut and boucle chair |
| Custom furniture 2 | DSC09262.JPG | AUG-11 | — | Houndstooth armchair |
| Mattress tile | DSC00008.JPG | JUL-1 | — | Mattress detail (backup: DSC00011) |
| Bedsheets tile | DSC09304.JPG | AUG-3 | see above | Styled bed (backup: DSC00045, JUL-2) |
| Cushions tile | DSC09347.JPG | AUG-2 | — | Rust knit cushions (backup: DSC09368) |
| Process / consultation | DSC09218.JPG | AUG-6 | — | Swatch book being flipped |
| Décor accessories | DSC09313.JPG | AUG-9 | — | Mirror and styled décor |

### 7.3 Delivery format

The developer should not pull 17–25 MB originals into the build.

| Asset | Export |
|---|---|
| Category tiles | 800×1000, WebP, quality 80, under 120 KB |
| Gallery images | 1200×1500, WebP, quality 82, under 250 KB |
| Hero poster | 1600×2000, WebP, quality 82, under 300 KB |
| Hero video | 10–15 s, MP4 H.264, 1280px wide, no audio, under 3 MB |
| Logos | PNG as supplied, plus SVG traced from the PDF |

All images get `loading="lazy"` except the hero, plus explicit `width`/`height` to prevent layout shift, and descriptive alt text including "Drape Shoppe Surat" where natural.

### 7.4 Known gaps

1. **All Aug 18 stills are portrait.** No landscape wide exists. The hero must therefore use video, or a split layout. Do not crop a portrait interior into a 16:9 band.
2. **No photography exists for wallpapers, wooden flooring, rugs & wall carpets, or towels & bath accessories.** Until a shoot happens, render these four tiles as **text-only cards** with a gold-bordered icon on `--cyan-soft`. Do not use stock photos.
3. **No staff or customer stills.** The consultation step uses swatch-book imagery instead.
4. **The exterior was shot under an overcast sky.** Usable; an evening re-shoot would improve it.
5. **No owner portrait.** The Story section relies on the reel embed.

---

## 8. Technical Requirements

**Stack:** static HTML5, CSS and vanilla JS. No framework, no build step. A single `index.html` with `/assets/css`, `/assets/js`, `/assets/img`, `/assets/video`.

**Performance targets:** Lighthouse mobile 90+ on Performance, Accessibility, Best Practices and SEO. LCP under 2.5 s on 4G. Total page weight under 2.5 MB including the hero video.

**Responsive breakpoints:** 360 / 768 / 1024 / 1440. Mobile-first. Over 80% of traffic will be mobile from Meta ads.

**Requirements**
- Self-host or preload Google Fonts with `font-display: swap`
- Mobile hero video: `preload="none"` with the poster shown; load on interaction if bandwidth is a concern
- Smooth anchor scroll with an offset for the sticky header
- No cookie banner needed unless analytics requires one for the client's compliance position
- Cross-browser: latest Chrome, Safari, Firefox, Edge, plus iOS Safari 15+ and Android Chrome

**Hosting:** static host (Netlify, Vercel, Cloudflare Pages or cPanel). SSL mandatory. `www` redirects to apex. Registrar access to be confirmed with the client.

---

## 9. SEO & Schema

**Title:** Drape Shoppe | Curtains, Furniture & Home Décor Showroom in Surat
**Meta description:** Surat's home furnishing destination since 1990. Curtains, blinds, custom furniture, wallpapers, flooring and bedding at our Bhatar Char Rasta showroom. Call or WhatsApp 99746 97999.
**OG image:** 1200×630 built from the exterior shot with the logo overlay, created by the agency.

**Requirements**
- One `<h1>` only, in the hero
- Section headings as `<h2>`, category names as `<h3>`
- `robots.txt` and `sitemap.xml`
- Canonical: `https://drapeshoppe.co.in/`
- `hreflang` not required; site is English only

**JSON-LD — `HomeGoodsStore`**

```json
{
  "@context": "https://schema.org",
  "@type": "HomeGoodsStore",
  "name": "Drape Shoppe",
  "image": "https://drapeshoppe.co.in/assets/img/exterior.jpg",
  "url": "https://drapeshoppe.co.in",
  "telephone": "+919974697999",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Opp. Kanchanjanga Apartment, Near Bhatar Char Rasta, Udhana-Magdalla Road",
    "addressLocality": "Surat",
    "addressRegion": "Gujarat",
    "postalCode": "395017",
    "addressCountry": "IN"
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "10:00",
    "closes": "20:30"
  }],
  "sameAs": ["https://www.instagram.com/drape_shoppe_surat/"],
  "foundingDate": "1990",
  "priceRange": "₹₹"
}
```

Add `geo` coordinates once pulled from the Maps listing.

---

## 10. Tracking

| Tool | Requirement |
|---|---|
| Meta Pixel | Fires on page load. Pixel ID from the agency. |
| Meta — Contact event | Fires on every WhatsApp and Call click, with the section name as a parameter |
| Meta — ViewContent | Fires on collection tile clicks, with the category name |
| GA4 | Page view plus click events on WhatsApp, Call and Directions |
| UTM | Must preserve incoming UTM parameters through to the WhatsApp link where technically possible |

Every CTA needs a `data-cta` attribute (for example `data-cta="hero-whatsapp"`) so events can be labelled without hunting through selectors.

---

## 11. Open Items Before Launch

| # | Item | Owner | Blocking? |
|---|---|---|---|
| 1 | Hero headline: option A, B or C | Client | Yes |
| 2 | Spelling of the owner's surname — "Vakawala" from an auto-transcript | Client | Yes |
| 3 | Is on-site measurement offered? | Client | Yes, §5.7 |
| 4 | Are stitching, delivery and installation in-house, and what is the turnaround? | Client | Yes, §5.7 |
| 5 | Mattress, wallpaper and flooring brands carried | Client | No |
| 6 | Parking availability | Client | No |
| 7 | Was the Bhatar showroom renovated or relaunched in 2026? The owner says it has run for 7 years, while internal files call it new. | Client | No |
| 8 | Domain registrar access for DNS | Client | Yes, at deploy |
| 9 | 3 review quotes plus the current Google rating and count | Agency | No |
| 10 | Photography for wallpapers, flooring, rugs and towels | Agency | No |
| 11 | Meta Pixel ID and GA4 measurement ID | Agency | Yes, at deploy |
| 12 | OG image 1200×630 | Agency | No |
| 13 | SVG logo traced from the PDF | Agency | No |

---

## 12. Post-Launch Actions (agency)

1. Add the website and phone number to the Unit 1 Google Business Profile — both are currently missing
2. Add the website link and a WhatsApp CTA to the Instagram bio
3. Fill the "WhatsApp / Landing Page" field in the Meta ad plan with drapeshoppe.co.in
4. Start post-purchase review collection via WhatsApp or an in-store QR code; the Unit 1 listing's newest text review is roughly two years old
5. Reply to the existing negative reviews about staff behaviour on both Google listings

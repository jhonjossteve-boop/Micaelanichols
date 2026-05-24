# Micaela Nichols — Portfolio Website

A modern, production-ready personal portfolio for Micaela Nichols, RN. Built with **Next.js 14 (App Router)**, plain CSS, and zero third-party UI libraries for maximum performance.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Then edit .env.local and add your Formspree ID

# 3. Run development server
npm run dev
# Visit http://localhost:3000
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.jsx       # Root layout, fonts, metadata
│   ├── page.jsx         # Home page — assembles all sections
│   └── globals.css      # All global styles and CSS variables
└── components/
    ├── Nav.jsx           # Sticky navbar with scroll detection
    ├── Hero.jsx          # Full-screen hero section
    ├── About.jsx         # Biography + career timeline
    ├── Education.jsx     # Columbia + credentials grid
    ├── Experience.jsx    # Professional timeline
    ├── Skills.jsx        # Animated skill bars + specialty tags
    ├── Testimonials.jsx  # Auto-rotating testimonial carousel
    ├── ResumeCTA.jsx     # Resume download call-to-action
    ├── Contact.jsx       # Contact form (Formspree)
    ├── Footer.jsx        # Footer with links
    ├── ScrollProgress.jsx # Top progress bar
    ├── FloatingContact.jsx # Floating email button
    └── FadeUp.jsx        # Reusable scroll-reveal component
```

---

## Formspree Setup (Contact Form)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy your Form ID (looks like `xabc1234`)
3. Add it to `.env.local`:
   ```
   NEXT_PUBLIC_FORMSPREE_ID=xabc1234
   ```
4. On Vercel, add this as an **Environment Variable** in your project settings

---

## Replacing the Photo Placeholder

In `src/components/Hero.jsx`, find the portrait block and replace the SVG placeholder with:

```jsx
import Image from "next/image";

// Replace the placeholder div with:
<Image
  src="/headshot.jpg"          // put your photo in /public/headshot.jpg
  alt="Micaela Nichols"
  width={340}
  height={420}
  style={{ borderRadius: 4, objectFit: "cover" }}
  priority
/>
```

Place your photo file in the `/public` folder.

---

## Deploying to Vercel

### Option A — GitHub (recommended)

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. In **Environment Variables**, add:
   - `NEXT_PUBLIC_FORMSPREE_ID` → your Formspree ID
5. Click **Deploy** — done!

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel
# Follow prompts; add env vars when asked
```

---

## Customisation Checklist

- [ ] Replace headshot placeholder in `Hero.jsx`
- [ ] Update email address in `Contact.jsx` and `Footer.jsx`
- [ ] Add your real Formspree ID to `.env.local` (and Vercel env vars)
- [ ] Update LinkedIn URL in `ResumeCTA.jsx` and `Footer.jsx`
- [ ] Link the "Download Resume" buttons to a real PDF (put in `/public`)
- [ ] Update license number in `Education.jsx`
- [ ] Adjust employer names in `Experience.jsx` if needed
- [ ] Replace testimonial names/quotes with real ones

---

## Design Tokens (CSS Variables)

All colours live in `globals.css` under `:root` — easy to retheme:

| Variable | Value | Usage |
|---|---|---|
| `--teal` | `#2a8c7a` | Primary accent |
| `--navy` | `#1c2b3a` | Headings, dark backgrounds |
| `--gold` | `#c9a96e` | Decorative accents, dividers |
| `--cream` | `#faf8f5` | Page background |
| `--slate` | `#4a6274` | Body text |

---

Built with ♡ for Micaela Nichols, RN · Columbia University · New Rochelle, NY

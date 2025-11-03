# Dr Peps - Implementation Checklist

## ✅ Core Requirements

### Tech Stack
- ✅ Next.js 14 with App Router
- ✅ TypeScript
- ✅ TailwindCSS (no UI kit)
- ✅ Zustand for state (lightweight, used in calculators)
- ✅ Node 18+ compatible
- ✅ npm package.json with all dependencies

### Pages & Routes
- ✅ `/` - Landing page with hero, search, category chips
- ✅ `/library` - Filterable peptide index
- ✅ `/p/[slug]` - Dynamic peptide detail pages
- ✅ `/tools` - Tools index
- ✅ `/tools/reconstitution` - Reconstitution calculator
- ✅ `/tools/dose` - Dose calculator
- ✅ `/tools/cycle-planner` - Cycle planner
- ✅ `/learn` - Learn index
- ✅ `/learn/subq-overview` - SubQ education
- ✅ `/about` - About page
- ✅ `/references` - References page

### Global UI Components
- ✅ DisclaimerBanner - Sticky, collapsible
- ✅ Header - Logo, nav, search
- ✅ Footer - Links, emergency guidance, disclosures
- ✅ MobileTabBar - Bottom nav (Home, Library, Tools, Learn)

### Data Model & Files
- ✅ TypeScript types defined in `/src/types/peptides.ts`
- ✅ 6 peptide JSON files created:
  - ✅ bpc-157.json
  - ✅ tb-500.json
  - ✅ cjc-1295-ipamorelin.json
  - ✅ semaglutide.json
  - ✅ tirzepatide.json
  - ✅ melanotan-2.json
- ✅ All JSONs follow schema with neutral, non-prescriptive content
- ✅ Placeholder references with notes

### Calculators
- ✅ Pure functions in `/src/lib/calc.ts`
- ✅ `concentrationMgPerMl()` - Calculates mg/mL
- ✅ `mlForDose()` - Calculates mL per dose
- ✅ `iuForMl_U100()` - Converts mL to IU
- ✅ `doseFromUnits_Mg()` - Converts IU to mg
- ✅ `dosesPerVial()` - Counts doses per vial
- ✅ Error handling for invalid inputs
- ✅ Reconstitution calculator with auto-fill from peptide pages
- ✅ Dose calculator with full calculations
- ✅ Cycle planner with printable output

### Compliance & Safety
- ✅ Global sticky disclaimer banner on all pages
- ✅ "Educational only, not medical advice" messaging
- ✅ Affiliate disclosure placeholder in footer
- ✅ Emergency guidance in footer
- ✅ Warnings on all calculator pages
- ✅ Non-prescriptive tone throughout
- ✅ "What people seek" instead of claims
- ✅ Evidence levels and risk levels clearly marked
- ✅ Who should avoid lists on peptide pages
- ✅ Storage guidance (not step-by-step instructions)

### Mobile-First UX
- ✅ Mobile-first layouts (single column → multi-column)
- ✅ Bottom tab bar on mobile (hidden on desktop)
- ✅ Tap targets ≥ 44×44px
- ✅ Base text 16px (prevents iOS zoom)
- ✅ Line height ≥ 1.5
- ✅ Responsive cards (1 col mobile → 2-3 col desktop)
- ✅ Stacked tables on mobile
- ✅ Sticky disclaimer banner

### Components Built
- ✅ DisclaimerBanner
- ✅ Badge, EvidenceBadge, RiskBadge
- ✅ Card, CardHeader, CardTitle, CardContent
- ✅ SearchInput with debounce
- ✅ MobileTabBar
- ✅ Header
- ✅ Footer

### Content Style
- ✅ Neutral, 2-3 sentence overviews
- ✅ "What people seek" bullets (non-claims)
- ✅ Evidence level descriptions
- ✅ Explicit risk unknowns
- ✅ Who should avoid lists
- ✅ Interactions notes ("review with clinician")

### SEO
- ✅ Dynamic titles + meta descriptions
- ✅ `/sitemap.xml` route
- ✅ `/robots.txt` route
- ✅ Open Graph metadata
- ✅ Twitter card metadata
- ✅ Canonical URLs (via Next.js metadata API)

### Testing
- ✅ Vitest config (`vitest.config.ts`)
- ✅ Unit tests (`src/lib/calc.test.ts`)
  - ✅ Edge cases (zero/negative)
  - ✅ Known cases (5mg/1mL, 0.25mg → 5 IU)
  - ✅ dosesPerVial(5,0.25) = 20
- ✅ Playwright config (`playwright.config.ts`)
- ✅ E2E smoke tests (`tests/smoke.spec.ts`)
  - ✅ Landing renders banner
  - ✅ Mobile nav visible on mobile
  - ✅ Peptide page shows badges
  - ✅ Calculator computes correctly
  - ✅ Search and filter work

### Accessibility
- ✅ Color contrast ≥ 4.5:1
- ✅ Focus states on all interactive elements
- ✅ Semantic landmarks (header, nav, main, footer)
- ✅ ARIA labels (search input, buttons, alerts)
- ✅ ARIA live regions (calculator results, disclaimer)
- ✅ Form labels + descriptions
- ✅ Error messages announce
- ✅ Keyboard navigation support

### Performance
- ✅ Next/Image for optimized images (ready to use)
- ✅ ISR for peptide pages (static generation)
- ✅ Minimal client-side JS
- ✅ No unnecessary client libs

### Configuration Files
- ✅ package.json
- ✅ tsconfig.json
- ✅ tailwind.config.js
- ✅ postcss.config.js
- ✅ next.config.js
- ✅ vitest.config.ts
- ✅ playwright.config.ts
- ✅ .eslintrc.json
- ✅ .prettierrc
- ✅ .gitignore
- ✅ .env.example

### Documentation
- ✅ README.md with:
  - ✅ Strong disclaimer
  - ✅ Quickstart instructions
  - ✅ File tree
  - ✅ How to add new peptide
  - ✅ How to run tests
  - ✅ Accessibility checklist
  - ✅ Performance tips
  - ✅ Affiliate disclosure policy
- ✅ QUICKSTART.md for rapid setup
- ✅ This CHECKLIST.md

## 🎯 Definition of Done

- ✅ Site loads on mobile with sticky disclaimer and bottom nav
- ✅ Library filters work; search finds "BPC"
- ✅ A peptide page shows evidence/risk badges, reconstitution presets, references
- ✅ Reconstitution & Dose calculators compute known values correctly
- ✅ SubQ overview uses conceptual guidance only (no injection tutorial)
- ✅ All pages pass basic accessibility checks
- ✅ SEO basics present (titles, meta, sitemap, robots)
- ✅ Tests configured and passing
- ✅ README present with disclaimers and instructions

## 🚀 Ready to Deploy

This project is production-ready and can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting platform

---

**Status**: ✅ All requirements completed!
**Last verified**: November 2, 2025

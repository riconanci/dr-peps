# Dr Peps - Educational Peptide Information

**⚠️ IMPORTANT DISCLAIMER:** Dr Peps is an educational resource only. This site does not provide medical advice, diagnose conditions, or prescribe treatments. Always consult a licensed healthcare provider before using any peptide or making health decisions.

## Project Purpose

Dr Peps provides evidence-based, neutral educational information about peptides to help individuals have informed conversations with their healthcare providers. Our goal is to present peptide information clearly and objectively—describing what peptides are, what people seek them for, and what the evidence shows—without making medical claims.

## Features

- **Peptide Library**: Comprehensive profiles with evidence levels, risk assessments, and references
- **Interactive Calculators**: Educational tools for reconstitution and dosing mathematics
- **Safety Information**: Side effects, contraindications, and interaction notes
- **Educational Resources**: Guides on administration, storage, and safety practices
- **Mobile-First Design**: Optimized for mobile devices with touch-friendly UI
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels and keyboard navigation

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State**: Zustand (lightweight)
- **Testing**: Vitest (unit) + Playwright (e2e)
- **Linting**: ESLint + Prettier

## Quick Start

### Prerequisites

- Node.js 18 or higher
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dr-peps

# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
dr-peps/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── layout.tsx          # Root layout with global components
│   │   ├── page.tsx            # Home page
│   │   ├── library/            # Peptide library
│   │   ├── p/[slug]/           # Individual peptide pages
│   │   ├── tools/              # Calculator tools
│   │   ├── learn/              # Educational resources
│   │   ├── about/              # About page
│   │   └── references/         # References page
│   ├── components/             # Reusable React components
│   │   ├── DisclaimerBanner.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileTabBar.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   └── SearchInput.tsx
│   ├── lib/                    # Utility functions
│   │   ├── calc.ts             # Calculator functions
│   │   ├── calc.test.ts        # Calculator tests
│   │   └── peptides.ts         # Peptide data loader
│   ├── types/                  # TypeScript type definitions
│   │   └── peptides.ts
│   └── data/                   # Peptide JSON data
│       └── peptides/
│           ├── bpc-157.json
│           ├── tb-500.json
│           ├── cjc-1295-ipamorelin.json
│           ├── semaglutide.json
│           ├── tirzepatide.json
│           └── melanotan-2.json
├── tests/                      # Playwright e2e tests
│   └── smoke.spec.ts
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vitest.config.ts
└── playwright.config.ts
```

## Adding a New Peptide

1. Create a new JSON file in `src/data/peptides/` following the schema:

```json
{
  "slug": "peptide-name",
  "name": "Peptide Name",
  "aliases": ["Alternative Name"],
  "category_tags": ["recovery", "gut"],
  "typical_route": ["subQ"],
  "overview": "Neutral 2-3 sentence overview...",
  "what_people_seek": ["Benefit 1", "Benefit 2"],
  "evidence_level": "Preliminary",
  "risk_level": "Moderate",
  "side_effects_common": ["Effect 1", "Effect 2"],
  "who_should_avoid": ["Group 1", "Group 2"],
  "interactions_notes": "Brief interaction notes...",
  "dosing_ranges_literature": "Descriptive dosing information...",
  "reconstitution": {
    "vial_total_mg": 5,
    "common_diluents_ml": [1, 2],
    "example_doses_mg": [0.25, 0.5, 1]
  },
  "storage_notes": "Storage guidance...",
  "references": [
    {
      "id": "ref1",
      "title": "Study Title",
      "source": "PubMed",
      "year": 2023,
      "url": "https://...",
      "note": "Plain-language summary"
    }
  ],
  "last_reviewed": "2025-11-02"
}
```

2. Import the new JSON file in `src/lib/peptides.ts`:

```typescript
import newPeptideData from '@/data/peptides/new-peptide.json';

const allPeptidesData = [
  // ... existing peptides
  newPeptideData,
] as Peptide[];
```

3. The new peptide will automatically appear in the library and be included in the sitemap.

## Running Tests

### Unit Tests (Vitest)

```bash
npm run test
# or
pnpm test
```

Tests calculator functions for:
- Correct mathematical calculations
- Error handling for invalid inputs
- Edge cases (zero, negative values)

### E2E Tests (Playwright)

```bash
npm run test:e2e
# or
pnpm test:e2e
```

Tests include:
- Landing page renders correctly
- Mobile navigation is visible on mobile viewports
- Peptide pages show evidence and risk badges
- Reconstitution calculator produces correct values
- Search and filtering work in library
- Navigation between pages functions correctly

## Build for Production

```bash
npm run build
npm run start
# or
pnpm build
pnpm start
```

## Code Quality

```bash
# Lint
npm run lint

# Type check
npm run type-check
```

## Accessibility Checklist

- ✅ Color contrast ≥ 4.5:1
- ✅ Focus states on interactive elements
- ✅ Semantic HTML landmarks
- ✅ ARIA labels for complex components
- ✅ Keyboard navigation support
- ✅ Touch targets ≥ 44×44px on mobile
- ✅ Base text 16px to avoid mobile zoom
- ✅ Line height ≥ 1.5 for readability
- ✅ Form fields have labels and descriptions
- ✅ Error messages announce to screen readers

## Performance Tips

- Images are optimized using Next/Image
- Non-critical JavaScript is deferred
- Tailwind classes are purged in production
- ISR (Incremental Static Regeneration) caches peptide pages
- Minimal client-side JavaScript

## Affiliate & Advertising Disclosure

Dr Peps may earn commissions from referrals to clinics, telemedicine services, or suppliers. These relationships do not influence editorial content. All peptide profiles and safety information are researched independently based on available evidence.

## Legal & Medical Disclaimers

**NOT MEDICAL ADVICE**: The content on Dr Peps is for educational purposes only. It does not constitute medical advice and should not be used for diagnosing or treating health conditions.

**CONSULT YOUR DOCTOR**: Always consult with a licensed healthcare provider before using any peptide or making decisions about your health.

**EMERGENCY**: If you are experiencing a medical emergency, call your local emergency number immediately.

**NO WARRANTY**: Content is provided "as is" without warranties. We make no claims regarding accuracy, completeness, or suitability for any particular purpose.

## Contributing

To suggest corrections or improvements to educational content:
1. Review our content guidelines (maintain neutral, non-prescriptive tone)
2. Ensure all claims are backed by reputable sources
3. Submit clear, factual information without medical advice

## License

[Specify your license here]

## Contact

For questions, corrections, or feedback:
- Email: info@drpeps.com

**Note**: We cannot provide medical advice or answer specific health questions. Please consult your healthcare provider.

---

**Last Updated**: November 2, 2025

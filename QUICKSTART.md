# Dr Peps - Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies

```bash
cd dr-peps
npm install
```

Or if you prefer pnpm:
```bash
pnpm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser!

### 3. Explore the Site

- **Home Page** (`/`): Hero, category chips, and feature overview
- **Library** (`/library`): Browse and filter 6 peptides
- **Individual Peptide** (e.g., `/p/bpc-157`): Full profile with evidence, risks, references
- **Tools** (`/tools`): Access calculators
  - Reconstitution Calculator (`/tools/reconstitution`)
  - Dose Calculator (`/tools/dose`)
  - Cycle Planner (`/tools/cycle-planner`)
- **Learn** (`/learn`): Educational resources
  - SubQ Overview (`/learn/subq-overview`)
- **About** (`/about`): Mission and disclaimers
- **References** (`/references`): All cited sources

## 📱 Mobile Testing

The site is mobile-first. Test on different viewports:

```bash
# Open dev tools in your browser
# Toggle device toolbar
# Try iPhone 13 (390x844) or similar
```

Bottom navigation appears on mobile (<768px).

## 🧪 Run Tests

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

## 🏗️ Build for Production

```bash
npm run build
npm run start
```

## 📝 Add a New Peptide

1. Create `/src/data/peptides/your-peptide.json`
2. Follow the schema in existing JSON files
3. Import in `/src/lib/peptides.ts`
4. It will auto-appear in library and sitemap!

## 🎨 Key Features Implemented

✅ All 6 peptide JSON files with realistic data  
✅ Mobile-first responsive design  
✅ Sticky disclaimer banner  
✅ Bottom tab navigation (mobile)  
✅ Search and filter in library  
✅ Working calculators with error handling  
✅ Print-friendly cycle planner  
✅ Full accessibility (ARIA, focus states, contrast)  
✅ SEO (metadata, sitemap, robots.txt)  
✅ Unit tests (Vitest) passing  
✅ E2E tests (Playwright) configured  

## ⚠️ Important Reminders

This is an **educational tool only**. The site includes:
- Global disclaimer banner
- Warnings on calculator pages
- Clear "not medical advice" messaging throughout
- Affiliate disclosure placeholders

## 📚 Documentation

See README.md for:
- Complete file structure
- How to add peptides
- Testing instructions
- Accessibility checklist
- Performance tips

## 🐛 Troubleshooting

**Port already in use?**
```bash
npm run dev -- -p 3001
```

**Module not found errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Type errors?**
```bash
npm run type-check
```

---

Happy coding! 🎉

Remember: This project is about education, not prescription. All medical decisions require licensed healthcare provider guidance.

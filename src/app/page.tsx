import Link from 'next/link';
import { getAllPeptides, getCategoryCounts } from '@/lib/peptides';

export default function HomePage() {
  const peptides = getAllPeptides();
  const categoryCounts = getCategoryCounts();
  
  const featuredCategories = [
    { name: 'Recovery', slug: 'recovery', icon: '🏃', color: 'text-blue-400' },
    { name: 'Gut Health', slug: 'gut', icon: '🫁', color: 'text-green-400' },
    { name: 'Joints & Tendons', slug: 'tendons', icon: '🦴', color: 'text-orange-400' },
    { name: 'Weight Management', slug: 'weight', icon: '⚖️', color: 'text-purple-400' },
    { name: 'Skin & Hair', slug: 'skin & hair', icon: '✨', color: 'text-yellow-400' },
    { name: 'Metabolic', slug: 'metabolic', icon: '🔥', color: 'text-red-400' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-8">
        <h1 className="text-5xl sm:text-6xl font-bold text-slate-100">
          Welcome to <span className="text-primary-400">Dr Peps</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Evidence-based peptide education. Explore our library of <span className="text-primary-400 font-semibold">{peptides.length} peptides</span>, use our calculators, and learn about safe practices.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/library" className="btn-primary">
            Browse Library →
          </Link>
          <Link href="/tools" className="btn-secondary">
            Use Calculators
          </Link>
        </div>
      </section>

      {/* Category Chips */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-100 text-center">
          Browse by Goal
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/library?category=${category.slug}`}
              className="card card-hover p-6 text-center group"
            >
              <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <div className={`text-sm font-semibold ${category.color} mb-1`}>
                {category.name}
              </div>
              {categoryCounts[category.slug] && (
                <div className="text-xs text-slate-400">
                  {categoryCounts[category.slug]} peptides
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="grid md:grid-cols-3 gap-6">
        <Link href="/library" className="group">
          <div className="card card-hover p-8 h-full">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-slate-100 mb-3">
              Peptide Library
            </h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Explore our comprehensive database of peptide profiles with evidence levels, safety information, and references.
            </p>
            <span className="text-primary-400 font-medium group-hover:text-primary-300 transition-colors">
              Explore Library →
            </span>
          </div>
        </Link>

        <Link href="/tools" className="group">
          <div className="card card-hover p-8 h-full">
            <div className="text-5xl mb-4">🧮</div>
            <h3 className="text-xl font-semibold text-slate-100 mb-3">
              Calculators & Tools
            </h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Use our reconstitution and dosing calculators to understand peptide preparation math.
            </p>
            <span className="text-primary-400 font-medium group-hover:text-primary-300 transition-colors">
              Use Tools →
            </span>
          </div>
        </Link>

        <Link href="/learn/subq-overview" className="group">
          <div className="card card-hover p-8 h-full">
            <div className="text-5xl mb-4">📖</div>
            <h3 className="text-xl font-semibold text-slate-100 mb-3">
              Learn the Basics
            </h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Understand subcutaneous administration, storage best practices, and safety fundamentals.
            </p>
            <span className="text-primary-400 font-medium group-hover:text-primary-300 transition-colors">
              Start Learning →
            </span>
          </div>
        </Link>
      </section>

      {/* Disclaimer Reminder */}
      <section className="card p-8 text-center border-2 border-yellow-600/50 bg-yellow-600/10">
        <div className="text-4xl mb-4">⚠️</div>
        <p className="text-slate-100 font-medium text-lg">
          Remember: This is an educational resource only. Always consult with a licensed healthcare provider before using any peptide.
        </p>
      </section>
    </div>
  );
}

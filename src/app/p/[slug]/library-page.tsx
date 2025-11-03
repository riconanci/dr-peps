'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAllPeptides } from '@/lib/peptides';
import SearchInput from '@/components/SearchInput';
import { EvidenceBadge, RiskBadge } from '@/components/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';

// Icon mapping for benefits
const benefitIcons: Record<string, { icon: string; label: string }> = {
  recovery: { icon: '🏃', label: 'Recovery' },
  gut: { icon: '🫁', label: 'Gut Health' },
  joints: { icon: '🦴', label: 'Joints' },
  tendons: { icon: '💪', label: 'Tendons' },
  weight: { icon: '⚖️', label: 'Weight' },
  metabolic: { icon: '🔥', label: 'Metabolic' },
  'skin & hair': { icon: '✨', label: 'Skin & Hair' },
  skin: { icon: '✨', label: 'Skin & Hair' }, // Alias
  cognitive: { icon: '🧠', label: 'Cognitive' },
  sleep: { icon: '😴', label: 'Sleep' },
  libido: { icon: '❤️', label: 'Libido' },
  growth: { icon: '📈', label: 'Growth' },
};

export default function LibraryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const allPeptides = getAllPeptides();
  
  // Initialize state from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>(() => {
    const benefitsParam = searchParams.get('benefits');
    return benefitsParam ? benefitsParam.split(',') : [];
  });
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>(() => {
    const routesParam = searchParams.get('routes');
    return routesParam ? routesParam.split(',') : [];
  });
  const [filtersOpen, setFiltersOpen] = useState(true);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedBenefits.length > 0) params.set('benefits', selectedBenefits.join(','));
    if (selectedRoutes.length > 0) params.set('routes', selectedRoutes.join(','));
    
    const newUrl = params.toString() ? `?${params.toString()}` : '/library';
    router.replace(newUrl, { scroll: false });
  }, [searchQuery, selectedBenefits, selectedRoutes, router]);

  // Get unique benefits and normalize "skin" to "skin & hair"
  const benefits = Array.from(
    new Set(
      allPeptides
        .flatMap((p) => p.category_tags)
        .map((tag) => (tag === 'skin' ? 'skin & hair' : tag))
    )
  ).sort();

  const filteredPeptides = useMemo(() => {
    return allPeptides.filter((peptide) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = peptide.name.toLowerCase().includes(query);
        const matchesAlias = peptide.aliases.some((alias) => alias.toLowerCase().includes(query));
        const matchesTag = peptide.category_tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesName && !matchesAlias && !matchesTag) return false;
      }

      // Benefits filter (normalize skin to skin & hair)
      if (selectedBenefits.length > 0) {
        const normalizedTags = peptide.category_tags.map((tag) =>
          tag === 'skin' ? 'skin & hair' : tag
        );
        if (!selectedBenefits.some((benefit) => normalizedTags.includes(benefit))) {
          return false;
        }
      }

      // Routes filter
      if (selectedRoutes.length > 0) {
        if (!selectedRoutes.some((route) => peptide.typical_route.includes(route))) {
          return false;
        }
      }

      return true;
    });
  }, [allPeptides, searchQuery, selectedBenefits, selectedRoutes]);

  const toggleBenefit = (benefit: string) => {
    setSelectedBenefits((prev) =>
      prev.includes(benefit) ? prev.filter((b) => b !== benefit) : [...prev, benefit]
    );
  };

  const toggleRoute = (route: string) => {
    setSelectedRoutes((prev) =>
      prev.includes(route) ? prev.filter((r) => r !== route) : [...prev, route]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedBenefits([]);
    setSelectedRoutes([]);
  };

  const hasActiveFilters = selectedBenefits.length > 0 || selectedRoutes.length > 0 || searchQuery;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-100">Peptide Library</h1>
        <p className="text-slate-300 leading-relaxed">
          Browse {allPeptides.length} peptide profiles with evidence levels, safety information, and references.
        </p>
      </div>

      {/* Search */}
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search by name or benefit..."
      />

      {/* Filters Container */}
      <div className="card border-2 border-primary-500/30">
        <div className="border-b border-slate-700">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="w-full flex items-center justify-between p-4 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-t-lg"
            aria-expanded={filtersOpen}
          >
            <div className="flex items-center gap-3">
              <span className="text-base font-semibold text-slate-100 uppercase tracking-wider">
                Filters
              </span>
              {hasActiveFilters && (
                <span className="px-2 py-1 text-xs font-medium bg-primary-600 text-white rounded-full">
                  {(selectedBenefits.length + selectedRoutes.length) + (searchQuery ? 1 : 0)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {hasActiveFilters && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFilters();
                  }}
                  className="text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors"
                >
                  Clear all
                </button>
              )}
              <svg
                className={`h-5 w-5 text-slate-400 transition-transform ${
                  filtersOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
        </div>

        {filtersOpen && (
          <div className="p-4 space-y-6">
            {/* Benefits Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider">
                Benefits
              </h3>
              <div className="flex flex-wrap gap-2">
                {benefits.map((benefit) => (
                  <button
                    key={benefit}
                    onClick={() => toggleBenefit(benefit)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      selectedBenefits.includes(benefit)
                        ? 'bg-primary-600 text-white'
                        : 'bg-dark-700 text-slate-300 hover:bg-dark-600'
                    }`}
                    aria-pressed={selectedBenefits.includes(benefit)}
                  >
                    {benefitIcons[benefit]?.icon || '📌'} {benefit}
                  </button>
                ))}
              </div>
            </div>

            {/* Administration Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider">
                Administration
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => toggleRoute('subQ')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    selectedRoutes.includes('subQ')
                      ? 'bg-primary-600 text-white'
                      : 'bg-dark-700 text-slate-300 hover:bg-dark-600'
                  }`}
                  aria-pressed={selectedRoutes.includes('subQ')}
                >
                  💉 SubQ
                </button>
                <button
                  onClick={() => toggleRoute('oral')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    selectedRoutes.includes('oral')
                      ? 'bg-primary-600 text-white'
                      : 'bg-dark-700 text-slate-300 hover:bg-dark-600'
                  }`}
                  aria-pressed={selectedRoutes.includes('oral')}
                >
                  💊 Oral
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="space-y-4">
        <p className="text-sm text-slate-400">
          Showing {filteredPeptides.length} of {allPeptides.length} peptides
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPeptides.map((peptide) => {
            // Normalize tags for display
            const normalizedTags = peptide.category_tags.map((tag) =>
              tag === 'skin' ? 'skin & hair' : tag
            );
            return (
              <Link key={peptide.slug} href={`/p/${peptide.slug}`}>
                <Card hover className="h-full">
                  <CardHeader>
                    <CardTitle>{peptide.name}</CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <EvidenceBadge level={peptide.evidence_level} />
                      <RiskBadge level={peptide.risk_level} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-300 mb-3 line-clamp-2">{peptide.overview}</p>
                    <div className="flex flex-wrap gap-2">
                      {normalizedTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-2xl"
                          title={benefitIcons[tag]?.label || tag}
                        >
                          {benefitIcons[tag]?.icon || '📌'}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {filteredPeptides.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No peptides found matching your criteria.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-primary-400 hover:text-primary-300 font-medium transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

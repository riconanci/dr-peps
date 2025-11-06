'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAllPeptides } from '@/lib/peptides';
import SearchInput, { SearchSuggestion } from '@/components/SearchInput';
import { EvidenceBadge, RiskBadge } from '@/components/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { normalizeSearchString } from '@/lib/normalize-search';

// Icon mapping for benefits
const benefitIcons: Record<string, { icon: string; label: string }> = {
  recovery: { icon: '🏃', label: 'Recovery' },
  gut: { icon: '🦠', label: 'Gut Health' },
  'joints & tendons': { icon: '🦴', label: 'Joints & Tendons' },
  joints: { icon: '🦴', label: 'Joints' },
  tendons: { icon: '💪🏼', label: 'Tendons' },
  weight: { icon: '⚖️', label: 'Weight' },
  metabolic: { icon: '🔥', label: 'Metabolic' },
  'skin & hair': { icon: '✨', label: 'Skin & Hair' },
  skin: { icon: '✨', label: 'Skin & Hair' },
  cognitive: { icon: '🧠', label: 'Cognitive' },
  sleep: { icon: '💤', label: 'Sleep' },
  libido: { icon: '❤️', label: 'Libido' },
  growth: { icon: '📈', label: 'Growth' },
};

// Route icon mapping
const routeIcons: Record<string, string> = {
  subQ: '💉',
  oral: '💊',
  nasal: '👃🏼',
  topical: '🧴',
  IM: '💉',
};

export default function LibraryContent() {
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

  // Get unique routes
  const routes = Array.from(
    new Set(allPeptides.flatMap((p) => p.typical_route))
  ).sort();

  // Filter peptides
  const filteredPeptides = useMemo(() => {
    let results = allPeptides;

    // Search filter
    if (searchQuery.trim()) {
      const normalizedQuery = normalizeSearchString(searchQuery);
      results = results.filter((peptide) => {
        const matchesName = normalizeSearchString(peptide.name).includes(normalizedQuery);
        const matchesAlias = peptide.aliases.some((alias) =>
          normalizeSearchString(alias).includes(normalizedQuery)
        );
        const matchesTag = peptide.category_tags.some((tag) =>
          normalizeSearchString(tag).includes(normalizedQuery)
        );
        return matchesName || matchesAlias || matchesTag;
      });
    }

    // Benefits filter (AND logic - must have ALL selected benefits)
    if (selectedBenefits.length > 0) {
      results = results.filter((peptide) => {
        const normalizedTags = peptide.category_tags.map((tag) =>
          tag === 'skin' ? 'skin & hair' : tag
        );
        return selectedBenefits.every((benefit) => normalizedTags.includes(benefit));
      });
    }

    // Routes filter (OR logic - must have ANY selected route)
    if (selectedRoutes.length > 0) {
      results = results.filter((peptide) =>
        selectedRoutes.some((route) => peptide.typical_route.includes(route))
      );
    }

    return results;
  }, [allPeptides, searchQuery, selectedBenefits, selectedRoutes]);

  // Generate search suggestions
  const searchSuggestions: SearchSuggestion[] = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const normalizedQuery = normalizeSearchString(searchQuery);
    const suggestions: SearchSuggestion[] = [];
    const seen = new Set<string>();

    allPeptides.forEach((peptide) => {
      // Name matches
      if (normalizeSearchString(peptide.name).includes(normalizedQuery)) {
        if (!seen.has(peptide.slug)) {
          suggestions.push({
            name: peptide.name,
            slug: peptide.slug,
            aliases: peptide.aliases,
          });
          seen.add(peptide.slug);
        }
      }
      // Alias matches
      else {
        peptide.aliases.forEach((alias) => {
          if (normalizeSearchString(alias).includes(normalizedQuery)) {
            if (!seen.has(peptide.slug)) {
              suggestions.push({
                name: peptide.name,
                slug: peptide.slug,
                aliases: peptide.aliases,
              });
              seen.add(peptide.slug);
            }
          }
        });
      }
    });

    return suggestions.slice(0, 8);
  }, [searchQuery, allPeptides]);

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

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-slate-100">Peptide Library</h1>
        <p className="text-slate-300 text-lg">
          Browse our comprehensive database of {allPeptides.length} peptide profiles with
          evidence levels, safety information, and references.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          suggestions={searchSuggestions}
          onSelectSuggestion={(suggestion) => {
            router.push(`/p/${suggestion.slug}`);
          }}
          placeholder="Search peptides by name, alias, or benefit..."
        />
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center gap-2 text-slate-300 hover:text-slate-100 font-medium"
        >
          <span>{filtersOpen ? '▼' : '▶'}</span>
          <span>Filters</span>
          {(selectedBenefits.length > 0 || selectedRoutes.length > 0 || searchQuery) && (
            <span className="px-2 py-0.5 bg-primary-500/20 text-primary-300 rounded-full text-sm">
              {filteredPeptides.length}
            </span>
          )}
        </button>

        {filtersOpen && (
          <div className="space-y-6 card p-6">
            {/* Benefits Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
                Filter by Benefits (shows peptides with ALL selected)
              </h3>
              <div className="flex flex-wrap gap-2">
                {benefits.map((benefit) => (
                  <button
                    key={benefit}
                    onClick={() => toggleBenefit(benefit)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedBenefits.includes(benefit)
                        ? 'bg-primary-600 text-white ring-2 ring-primary-400'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {benefitIcons[benefit]?.icon || '📌'} {benefit}
                  </button>
                ))}
              </div>
            </div>

            {/* Routes Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
                Filter by Administration (shows peptides with ANY selected)
              </h3>
              <div className="flex flex-wrap gap-2">
                {routes.map((route) => (
                  <button
                    key={route}
                    onClick={() => toggleRoute(route)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedRoutes.includes(route)
                        ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {route === 'subQ' && '💉 SubQ'}
                    {route === 'oral' && '💊 Oral'}
                    {route === 'nasal' && '👃🏼 Nasal'}
                    {route === 'topical' && '🧴 Topical'}
                    {route === 'IM' && '💉 IM'}
                    {!['subQ', 'oral', 'nasal', 'topical', 'IM'].includes(route) && route}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-slate-400">
            Showing {filteredPeptides.length} of {allPeptides.length} peptides
          </p>
          {(selectedBenefits.length > 0 || selectedRoutes.length > 0 || searchQuery) && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-400 hover:text-primary-300 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Peptide Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPeptides.map((peptide) => {
            // Normalize "skin" to "skin & hair" for display
            const normalizedTags = peptide.category_tags.map((tag) =>
              tag === 'skin' ? 'skin & hair' : tag
            );
            
            // Build the link with current filter params
            const currentParams = new URLSearchParams();
            if (searchQuery) currentParams.set('search', searchQuery);
            if (selectedBenefits.length > 0) currentParams.set('benefits', selectedBenefits.join(','));
            if (selectedRoutes.length > 0) currentParams.set('routes', selectedRoutes.join(','));
            const returnUrl = currentParams.toString() ? `?${currentParams.toString()}` : '';
            
            return (
              <Link 
                key={peptide.slug} 
                href={`/p/${peptide.slug}${returnUrl ? `?return=${encodeURIComponent(returnUrl)}` : ''}`}
                className="block h-full"
              >
                <Card className="h-full card-hover">
                  <CardHeader>
                    <CardTitle>{peptide.name}</CardTitle>
                    {peptide.aliases.length > 0 && (
                      <p className="text-sm text-slate-400 mt-1">
                        {peptide.aliases[0]}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Routes */}
                    <div className="flex flex-wrap gap-1.5">
                      {peptide.typical_route.map((route) => (
                        <span
                          key={route}
                          className="px-2 py-1 bg-blue-600/20 border border-blue-500/30 text-blue-300 rounded text-xs font-medium"
                        >
                          {routeIcons[route] || '💉'} {route}
                        </span>
                      ))}
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                      {peptide.overview}
                    </p>
                    
                    {/* Benefit Tags */}
                    <div className="flex flex-wrap gap-2">
                      {normalizedTags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-xs"
                        >
                          {benefitIcons[tag]?.icon || '📌'} {tag}
                        </span>
                      ))}
                      {normalizedTags.length > 3 && (
                        <span className="px-2 py-1 bg-slate-700/50 text-slate-400 rounded text-xs">
                          +{normalizedTags.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    {/* Evidence & Risk Badges */}
                    <div className="flex gap-2">
                      <EvidenceBadge level={peptide.evidence_level} size="sm" />
                      <RiskBadge level={peptide.risk_level} size="sm" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {filteredPeptides.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No peptides match your filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-primary-400 hover:text-primary-300 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

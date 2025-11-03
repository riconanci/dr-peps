'use client';

import { useState, useMemo } from 'react';
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
  const allPeptides = getAllPeptides();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [benefitsOpen, setBenefitsOpen] = useState(true);

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

      return true;
    });
  }, [allPeptides, searchQuery, selectedBenefits]);

  const toggleBenefit = (benefit: string) => {
    setSelectedBenefits((prev) =>
      prev.includes(benefit) ? prev.filter((b) => b !== benefit) : [...prev, benefit]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedBenefits([]);
  };

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

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-100">Filters</h2>
          {selectedBenefits.length > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Benefits Filter - Collapsible */}
        <div className="card">
          <button
            onClick={() => setBenefitsOpen(!benefitsOpen)}
            className="w-full flex items-center justify-between p-4 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
            aria-expanded={benefitsOpen}
          >
            <span className="text-sm font-semibold text-slate-100 uppercase tracking-wider">
              Benefits
            </span>
            <svg
              className={`h-5 w-5 text-slate-400 transition-transform ${
                benefitsOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {benefitsOpen && (
            <div className="px-4 pb-4">
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
          )}
        </div>
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

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPeptideBySlug, getAllPeptides } from '@/lib/peptides';
import { EvidenceBadge, RiskBadge } from '@/components/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import type { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: {
    return?: string;
  };
}

export async function generateStaticParams() {
  const peptides = getAllPeptides();
  return peptides.map((peptide) => ({
    slug: peptide.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const peptide = getPeptideBySlug(params.slug);
  
  if (!peptide) {
    return {
      title: 'Peptide Not Found',
    };
  }

  return {
    title: `${peptide.name} - Dr Peps`,
    description: peptide.overview,
  };
}

export default function PeptidePage({ params, searchParams }: PageProps) {
  const peptide = getPeptideBySlug(params.slug);

  if (!peptide) {
    notFound();
  }

  // Build back link with preserved filters
  const backToLibraryUrl = searchParams?.return 
    ? `/library${searchParams.return}`
    : '/library';

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Link
          href={backToLibraryUrl}
          className="inline-flex items-center text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors"
        >
          ← Back to Library
        </Link>
        
        {/* Peptide Name - Large at top */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100">{peptide.name}</h1>
          {peptide.aliases.length > 0 && (
            <p className="text-base text-slate-400">
              Also known as: {peptide.aliases.join(', ')}
            </p>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-3">
          <EvidenceBadge level={peptide.evidence_level} />
          <RiskBadge level={peptide.risk_level} />
        </div>

        {/* Administration Routes with better flow */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
            Administration:
          </span>
          {peptide.typical_route.map((route) => (
            <span
              key={route}
              className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 text-blue-300 rounded-full text-sm font-medium"
            >
              {route === 'subQ' && '💉 SubQ'}
              {route === 'oral' && '💊 Oral'}
              {route === 'nasal' && '👃 Nasal'}
              {route === 'topical' && '🧴 Topical'}
              {route === 'IM' && '💉 IM'}
              {!['subQ', 'oral', 'nasal', 'topical', 'IM'].includes(route) && route}
            </span>
          ))}
        </div>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white leading-relaxed">{peptide.overview}</p>
        </CardContent>
      </Card>

      {/* Benefits (formerly "What People Seek") - Light Green */}
      <Card className="bg-green-900/20 border-green-700/30">
        <CardHeader>
          <CardTitle className="text-green-300">Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {peptide.what_people_seek.map((item, idx) => (
              <li key={idx} className="flex items-start text-white">
                <span className="text-green-400 mr-2">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Potential Side Effects - Light Yellow */}
      <Card className="bg-yellow-900/20 border-yellow-700/30">
        <CardHeader>
          <CardTitle className="text-yellow-300">Potential Side Effects</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {peptide.side_effects_common.map((effect, idx) => (
              <li key={idx} className="flex items-start text-white">
                <span className="text-yellow-400 mr-2">•</span>
                <span>{effect}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Who Should Avoid - Light Red */}
      <Card className="bg-red-900/20 border-red-700/30">
        <CardHeader>
          <CardTitle className="text-red-300">Who Should Avoid</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {peptide.who_should_avoid.map((item, idx) => (
              <li key={idx} className="flex items-start text-white">
                <span className="text-red-400 mr-2">⚠</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Interactions */}
      <Card>
        <CardHeader>
          <CardTitle>Interactions & Precautions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white leading-relaxed">{peptide.interactions_notes}</p>
        </CardContent>
      </Card>

      {/* Dosing Info */}
      <Card>
        <CardHeader>
          <CardTitle>Dosing Information from Literature</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white leading-relaxed mb-4">{peptide.dosing_ranges_literature}</p>
          <p className="text-sm text-slate-400 italic">
            This is descriptive information only. Always consult a licensed healthcare provider for dosing guidance.
          </p>
        </CardContent>
      </Card>

      {/* Reconstitution Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Reconstitution Reference</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-slate-400 mb-2">Typical vial size:</p>
            <p className="text-white font-medium">{peptide.reconstitution.vial_total_mg} mg</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-2">Common diluent volumes:</p>
            <p className="text-white font-medium">
              {peptide.reconstitution.common_diluents_ml.join(' mL, ')} mL
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-2">Example doses:</p>
            <p className="text-white font-medium">
              {peptide.reconstitution.example_doses_mg.join(' mg, ')} mg
            </p>
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mt-4">
            <p className="text-slate-300 leading-relaxed mb-3">
              Use the Dose Calculator to plan your reconstitution and determine the exact volume and units for your desired dose.
            </p>
            <Link
              href="/tools/dose"
              className="inline-block px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-medium transition-colors"
            >
              Go to Dose Calculator →
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Storage */}
      <Card>
        <CardHeader>
          <CardTitle>Storage</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white leading-relaxed">{peptide.storage_notes}</p>
        </CardContent>
      </Card>

      {/* Last Reviewed */}
      <div className="text-center text-sm text-slate-400">
        Last reviewed: {new Date(peptide.last_reviewed).toLocaleDateString()}
      </div>
    </div>
  );
}

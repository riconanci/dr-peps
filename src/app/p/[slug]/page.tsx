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

export default function PeptidePage({ params }: PageProps) {
  const peptide = getPeptideBySlug(params.slug);

  if (!peptide) {
    notFound();
  }

  const reconUrl = `/tools/reconstitution?vial_mg=${peptide.reconstitution.vial_total_mg}&diluent_ml=${peptide.reconstitution.common_diluents_ml[0]}`;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Link
          href="/library"
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

        {/* Badges and Routes */}
        <div className="flex flex-wrap items-center gap-3">
          <EvidenceBadge level={peptide.evidence_level} />
          <RiskBadge level={peptide.risk_level} />
          
          {/* Administration Routes - flowing pills */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Route:</span>
            <div className="flex flex-wrap gap-2">
              {peptide.typical_route.map((route) => (
                <span
                  key={route}
                  className="inline-flex px-3 py-1 text-sm font-medium bg-slate-700 text-slate-200 rounded-full"
                >
                  {route}
                </span>
              ))}
            </div>
          </div>
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

      {/* Benefits - Light Green */}
      <Card className="bg-green-900/20 border-green-700/30">
        <CardHeader>
          <CardTitle className="text-green-300">Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {peptide.what_people_seek.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-400 mr-2 mt-0.5">✓</span>
                <span className="text-white leading-relaxed">{item}</span>
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
            {peptide.side_effects_common.map((effect, index) => (
              <li key={index} className="flex items-start">
                <span className="text-yellow-400 mr-2 mt-0.5">•</span>
                <span className="text-white leading-relaxed">{effect}</span>
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
            {peptide.who_should_avoid.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-400 mr-2 mt-0.5">⚠</span>
                <span className="text-white leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Interactions */}
      <Card>
        <CardHeader>
          <CardTitle>Drug & Supplement Interactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white leading-relaxed">{peptide.interactions_notes}</p>
        </CardContent>
      </Card>

      {/* Dosing Information */}
      <Card>
        <CardHeader>
          <CardTitle>Dosing Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4">
            <p className="text-sm text-yellow-200 leading-relaxed">
              <strong>Important:</strong> The information below is descriptive only and based on literature review. 
              Always consult a licensed healthcare provider for dosing guidance specific to your situation.
            </p>
          </div>
          <p className="text-white leading-relaxed">{peptide.dosing_ranges_literature}</p>
        </CardContent>
      </Card>

      {/* Reconstitution */}
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
            <div className="flex flex-wrap gap-2">
              {peptide.reconstitution.common_diluents_ml.map((ml) => (
                <span key={ml} className="px-3 py-1 bg-slate-700 text-white rounded-lg text-sm font-medium">
                  {ml} mL
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-2">Example dose ranges:</p>
            <div className="flex flex-wrap gap-2">
              {peptide.reconstitution.example_doses_mg.map((dose) => (
                <span key={dose} className="px-3 py-1 bg-slate-700 text-white rounded-lg text-sm font-medium">
                  {dose} mg
                </span>
              ))}
            </div>
          </div>
          <Link
            href={reconUrl}
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-800"
          >
            Open in Reconstitution Calculator →
          </Link>
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
      <p className="text-sm text-slate-500 text-center">
        Last reviewed: {new Date(peptide.last_reviewed).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </p>
    </div>
  );
}

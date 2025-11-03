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
          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Back to Library
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{peptide.name}</h1>
          {peptide.aliases.length > 0 && (
            <p className="text-gray-600">Also known as: {peptide.aliases.join(', ')}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <EvidenceBadge level={peptide.evidence_level} />
          <RiskBadge level={peptide.risk_level} />
          {peptide.typical_route.map((route) => (
            <span
              key={route}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
            >
              {route}
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
          <p className="text-gray-700 leading-relaxed">{peptide.overview}</p>
        </CardContent>
      </Card>

      {/* What People Seek */}
      <Card>
        <CardHeader>
          <CardTitle>What People Seek</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {peptide.what_people_seek.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Side Effects */}
        <Card>
          <CardHeader>
            <CardTitle>Common Side Effects</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {peptide.side_effects_common.map((effect, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-warning-600 mr-2">•</span>
                  <span className="text-gray-700">{effect}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Who Should Avoid */}
        <Card>
          <CardHeader>
            <CardTitle className="text-danger-700">Who Should Avoid</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {peptide.who_should_avoid.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-danger-600 mr-2">⚠</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Interactions */}
      <Card>
        <CardHeader>
          <CardTitle>Interactions & Precautions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{peptide.interactions_notes}</p>
        </CardContent>
      </Card>

      {/* Dosing */}
      <Card>
        <CardHeader>
          <CardTitle>Dosing Information from Literature</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
            <p className="text-sm text-warning-900">
              <strong>Note:</strong> This information is for educational purposes only. Dosing must be determined by a qualified healthcare provider based on individual needs and health status.
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed">{peptide.dosing_ranges_literature}</p>
        </CardContent>
      </Card>

      {/* Reconstitution */}
      <Card>
        <CardHeader>
          <CardTitle>Reconstitution Preset</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Vial Size</p>
              <p className="text-lg font-semibold text-gray-900">
                {peptide.reconstitution.vial_total_mg} mg
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Common Diluent Volumes</p>
              <p className="text-lg font-semibold text-gray-900">
                {peptide.reconstitution.common_diluents_ml.join(', ')} mL
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Example Doses</p>
              <p className="text-lg font-semibold text-gray-900">
                {peptide.reconstitution.example_doses_mg.join(', ')} mg
              </p>
            </div>
          </div>
          <Link
            href={reconUrl}
            className="inline-block px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          >
            Open in Reconstitution Calculator →
          </Link>
        </CardContent>
      </Card>

      {/* Storage */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{peptide.storage_notes}</p>
        </CardContent>
      </Card>

      {/* References */}
      {peptide.references.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>References</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {peptide.references.map((ref) => (
                <li key={ref.id} className="border-l-2 border-primary-300 pl-4">
                  <p className="font-medium text-gray-900">{ref.title}</p>
                  <p className="text-sm text-gray-600">
                    {ref.source}
                    {ref.year && ` • ${ref.year}`}
                  </p>
                  {ref.note && (
                    <p className="text-sm text-gray-600 mt-1 italic">{ref.note}</p>
                  )}
                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      View source →
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Last Reviewed */}
      <div className="text-center text-sm text-gray-500">
        Last reviewed: {new Date(peptide.last_reviewed).toLocaleDateString()}
      </div>
    </div>
  );
}

import { getAllPeptides } from '@/lib/peptides';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';

export default function ReferencesPage() {
  const peptides = getAllPeptides();
  
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">References & Sources</h1>
        <p className="text-gray-600 leading-relaxed">
          All references cited in our peptide profiles and educational content.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Our Sources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Dr Peps aims to base our educational content on peer-reviewed research, clinical guidelines, and reputable medical sources. When formal clinical evidence is limited, we clearly indicate this and describe what is known from preclinical or anecdotal sources.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We prioritize original sources such as:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Peer-reviewed journal articles indexed in PubMed</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Clinical practice guidelines from medical societies</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>FDA and regulatory agency documents</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Systematic reviews and meta-analyses</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* References by Peptide */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">References by Peptide</h2>
        
        {peptides.map((peptide) => (
          <Card key={peptide.slug}>
            <CardHeader>
              <CardTitle>{peptide.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {peptide.references.length > 0 ? (
                <ul className="space-y-4">
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
              ) : (
                <p className="text-gray-500 italic">No references available</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* General References */}
      <Card>
        <CardHeader>
          <CardTitle>General Educational Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <div>
                <p className="font-medium">FDA MedWatch: The FDA Safety Information and Adverse Event Reporting Program</p>
                <a
                  href="https://www.fda.gov/safety/medwatch-fda-safety-information-and-adverse-event-reporting-program"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  fda.gov/medwatch
                </a>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <div>
                <p className="font-medium">PubMed: National Library of Medicine Database</p>
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  pubmed.ncbi.nlm.nih.gov
                </a>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <div>
                <p className="font-medium">Safe Needle Disposal: FDA Guidelines</p>
                <a
                  href="https://www.fda.gov/medical-devices/sharps-disposal-containers/safely-using-sharps-needles-and-syringes-home-work-and-travel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  fda.gov/sharps-disposal
                </a>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Last Updated */}
      <div className="text-center text-sm text-gray-500">
        References compiled as of {new Date().toLocaleDateString()}
      </div>
    </div>
  );
}

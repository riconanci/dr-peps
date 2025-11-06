import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';

export const metadata = {
  title: 'Storage Practices | Dr Peps',
  description: 'Learn proper storage practices for peptides and safe sharps disposal guidelines.',
};

export default function StoragePracticesPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <Link
          href="/learn"
          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Back to Learn
        </Link>
        <h1 className="text-3xl font-bold text-slate-100">Storage Practices</h1>
        <p className="text-slate-300 leading-relaxed">
          Guidelines for properly storing peptides and safely disposing of injection materials.
        </p>
      </div>

      {/* Important Note */}
      <div className="bg-primary-50 border-2 border-primary-300 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <svg
            className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-3a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-primary-900 mb-2">
              Follow Supplier and Provider Instructions
            </h3>
            <p className="text-primary-900 leading-relaxed">
              Storage requirements vary by peptide and supplier. Always follow the specific instructions provided with your medication and consult your healthcare provider if you have questions.
            </p>
          </div>
        </div>
      </div>

      {/* Storage Basics */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Basics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            Proper storage is essential for peptide effectiveness and safety:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Lyophilized (powder):</strong> Often stored at room temperature or refrigerated. Some peptides require freezer storage (-20°C or colder)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Reconstituted (mixed):</strong> Typically requires refrigeration (2-8°C). Use within the timeframe specified by your supplier (often 2-4 weeks)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Light sensitivity:</strong> Some peptides should be protected from direct light. Store in original packaging or wrapped in foil if advised</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Expiration dates:</strong> Always follow manufacturer guidance and discard expired products</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Avoid freezing reconstituted peptides:</strong> Unless specifically instructed, freezing can damage the molecular structure</span>
            </li>
          </ul>
          <p className="text-slate-300 leading-relaxed">
            Storage requirements vary significantly by peptide. Always follow supplier instructions and consult your healthcare provider.
          </p>
        </CardContent>
      </Card>

      {/* Temperature Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Temperature Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <h4 className="text-slate-100 font-semibold mb-2">❄️ Freezer Storage</h4>
              <p className="text-sm text-slate-300 mb-2">-20°C (-4°F) or colder</p>
              <p className="text-sm text-slate-400">Some lyophilized peptides for long-term storage</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <h4 className="text-slate-100 font-semibold mb-2">🧊 Refrigerator</h4>
              <p className="text-sm text-slate-300 mb-2">2-8°C (36-46°F)</p>
              <p className="text-sm text-slate-400">Most reconstituted peptides and some lyophilized</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <h4 className="text-slate-100 font-semibold mb-2">🏠 Room Temperature</h4>
              <p className="text-sm text-slate-300 mb-2">20-25°C (68-77°F)</p>
              <p className="text-sm text-slate-400">Some stable lyophilized peptides only</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <h4 className="text-slate-100 font-semibold mb-2">🚫 Never Expose To</h4>
              <p className="text-sm text-slate-300 mb-2">Direct sunlight or heat</p>
              <p className="text-sm text-slate-400">Can rapidly degrade peptides</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Travel and Transport */}
      <Card>
        <CardHeader>
          <CardTitle>Travel and Transport</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            If you need to travel with peptides that require refrigeration:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Insulated containers:</strong> Use a small cooler or insulated medication bag with ice packs</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">TSA guidelines:</strong> Medications are allowed in carry-on bags. Keep prescription labels visible</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Hotel refrigerators:</strong> Store medications away from the freezer compartment to avoid accidental freezing</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Check regulations:</strong> Some countries have restrictions on bringing peptides across borders</span>
            </li>
          </ul>
          <p className="text-slate-300 leading-relaxed">
            Consult your healthcare provider before traveling with peptides, especially for international travel.
          </p>
        </CardContent>
      </Card>

      {/* Sharps Disposal */}
      <Card>
        <CardHeader>
          <CardTitle>Sharps Disposal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            Safe disposal of needles and syringes is critical for public health and safety:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Sharps container:</strong> Use an FDA-approved container (available at pharmacies). Rigid plastic containers specifically designed for needles</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Never recap:</strong> Don't recap needles after use—this is a common cause of needle-stick injuries</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Never trash:</strong> Don't throw needles in regular garbage or recycling bins. This endangers sanitation workers</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Fill level:</strong> Don't overfill sharps containers. Seal and dispose when 3/4 full</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Disposal programs:</strong> Many pharmacies, hospitals, and communities offer sharps disposal services</span>
            </li>
          </ul>
          <p className="text-slate-300 leading-relaxed">
            Check with your local pharmacy or health department for sharps disposal options in your area.
          </p>
        </CardContent>
      </Card>

      {/* DIY Sharps Container (Emergency) */}
      <Card>
        <CardHeader>
          <CardTitle>Temporary Sharps Container</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            If you don't have immediate access to an FDA-approved sharps container, you can temporarily use a sturdy plastic container with these characteristics:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Rigid plastic (like a laundry detergent bottle)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Puncture-resistant</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Has a screw-on or tight-fitting lid</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Label clearly as "SHARPS - DO NOT RECYCLE"</span>
            </li>
          </ul>
          <p className="text-slate-300 leading-relaxed">
            <strong className="text-slate-100">Important:</strong> This is a temporary solution only. Purchase an FDA-approved sharps container as soon as possible.
          </p>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-slate-300 leading-relaxed">
            For more information on safe disposal:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">FDA Sharps Disposal Guidelines:</strong> Official guidance on safe needle disposal</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">SafeNeedleDisposal.org:</strong> Find disposal locations near you</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Local health department:</strong> Often provides free or low-cost sharps containers</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-slate-300 leading-relaxed">
            Storage and disposal are just one part of safe peptide use:
          </p>
          <ul className="space-y-2">
            <li>
              <Link
                href="/learn/subq-overview"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                → Learn about Subcutaneous Administration
              </Link>
            </li>
            <li>
              <Link
                href="/tools/reconstitution"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                → Use the Reconstitution Calculator
              </Link>
            </li>
            <li>
              <Link
                href="/library"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                → Browse the Peptide Library
              </Link>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Final Reminder */}
      <div className="bg-warning-500/10 border border-warning-500/30 rounded-lg p-6">
        <p className="text-slate-200 leading-relaxed">
          <strong className="text-warning-500">Remember:</strong> This information is educational only. Always follow the specific storage and disposal instructions provided by your supplier and healthcare provider. When in doubt, ask your pharmacist or provider for guidance.
        </p>
      </div>
    </div>
  );
}

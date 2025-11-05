import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';

export default function SubQOverviewPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <Link
          href="/learn"
          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Back to Learn
        </Link>
        <h1 className="text-3xl font-bold text-slate-100">Subcutaneous Administration Overview</h1>
        <p className="text-slate-300 leading-relaxed">
          Understanding what subcutaneous means and why professional training is essential.
        </p>
      </div>

      {/* Critical Warning */}
      <div className="bg-danger-50 border-2 border-danger-300 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <svg
            className="h-6 w-6 text-danger-600 flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-danger-900 mb-2">
              Get Professional Training First
            </h3>
            <p className="text-danger-900 leading-relaxed">
              This page provides conceptual education only. Never attempt subcutaneous injections without proper hands-on training from a licensed healthcare provider. Improper technique can lead to infection, injury, or medication errors.
            </p>
          </div>
        </div>
      </div>

      {/* What is SubQ */}
      <Card>
        <CardHeader>
          <CardTitle>What is Subcutaneous Administration?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            Subcutaneous (abbreviated "subQ" or "SC") means "under the skin." A subcutaneous injection delivers medication into the fatty tissue layer between the skin and muscle. This route is commonly used for many types of medications, including peptides, insulin, and certain vaccines.
          </p>
          <p className="text-slate-300 leading-relaxed">
            The subcutaneous layer has a good blood supply, which allows for steady, gradual absorption of medications into the bloodstream. This makes it ideal for peptides and other compounds that benefit from sustained release.
          </p>
        </CardContent>
      </Card>

      {/* Common Sites */}
      <Card>
        <CardHeader>
          <CardTitle>Common Injection Sites</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            Healthcare providers typically recommend these areas for subcutaneous injections:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Abdomen:</strong> At least 2 inches away from the belly button</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Thighs:</strong> Front and outer portions of the upper leg</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Upper arms:</strong> Back of the upper arm (often requires assistance)</span>
            </li>
          </ul>
          <p className="text-slate-300 leading-relaxed">
            Your healthcare provider will show you which sites are best for your situation and teach you how to rotate injection sites to prevent tissue irritation.
          </p>
        </CardContent>
      </Card>

      {/* Sterile Technique */}
      <Card>
        <CardHeader>
          <CardTitle>Sterile Technique Principles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            Proper sterile technique is critical to prevent infections. Key concepts include:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Hand hygiene:</strong> Thorough hand washing before handling supplies</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Alcohol swabs:</strong> Cleaning the injection site and vial tops</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Single-use needles:</strong> Never reusing needles or syringes</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Clean workspace:</strong> Using a clean, dry surface for preparation</span>
            </li>
          </ul>
          <p className="text-slate-300 leading-relaxed">
            Your healthcare provider will demonstrate the full sterile technique process during training.
          </p>
        </CardContent>
      </Card>

      {/* Storage */}
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
              <span><strong className="text-slate-100">Lyophilized (powder):</strong> Often stored at room temperature or refrigerated</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Reconstituted (mixed):</strong> Typically requires refrigeration</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Light sensitivity:</strong> Some peptides should be protected from direct light</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Expiration dates:</strong> Always follow manufacturer guidance</span>
            </li>
          </ul>
          <p className="text-slate-300 leading-relaxed">
            Storage requirements vary by peptide. Always follow supplier instructions and consult your healthcare provider.
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
              <span><strong className="text-slate-100">Sharps container:</strong> Use an FDA-approved container (available at pharmacies)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Never recap:</strong> Don't recap needles after use</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Never trash:</strong> Don't throw needles in regular garbage</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Disposal programs:</strong> Many pharmacies and communities offer sharps disposal services</span>
            </li>
          </ul>
          <p className="text-slate-300 leading-relaxed">
            Check with your local pharmacy or health department for sharps disposal options in your area.
          </p>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-slate-300 leading-relaxed">
            This overview provides conceptual knowledge only. Before beginning any subcutaneous administration:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start">
              <span className="text-primary-400 mr-2">1.</span>
              <span>Consult with a licensed healthcare provider</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-400 mr-2">2.</span>
              <span>Receive hands-on training in person</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-400 mr-2">3.</span>
              <span>Discuss your specific medication, dosing, and schedule</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-400 mr-2">4.</span>
              <span>Obtain proper supplies and storage equipment</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-400 mr-2">5.</span>
              <span>Know who to contact for questions or concerns</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Final Warning */}
      <div className="card p-6 text-center border-2 border-yellow-600/50 bg-yellow-600/10">
        <div className="text-4xl mb-4">⚠️</div>
        <p className="text-slate-100 font-medium text-lg">
          Remember: This information is educational only. Professional training is required before self-administering any injectable medication.
        </p>
      </div>
    </div>
  );
}

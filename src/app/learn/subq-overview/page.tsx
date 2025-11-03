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
        <h1 className="text-3xl font-bold text-gray-900">Subcutaneous Administration Overview</h1>
        <p className="text-gray-600 leading-relaxed">
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
          <p className="text-gray-700 leading-relaxed">
            Subcutaneous (abbreviated "subQ" or "SC") means "under the skin." A subcutaneous injection delivers medication into the fatty tissue layer between the skin and muscle. This route is commonly used for many types of medications, including peptides, insulin, and certain vaccines.
          </p>
          <p className="text-gray-700 leading-relaxed">
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
          <p className="text-gray-700 leading-relaxed">
            Healthcare providers typically recommend these areas for subcutaneous injections:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong>Abdomen:</strong> At least 2 inches away from the belly button</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong>Thighs:</strong> Front and outer portions of the upper leg</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong>Upper arms:</strong> Back of the upper arm (often requires assistance)</span>
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
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
          <p className="text-gray-700 leading-relaxed">
            Proper sterile technique is critical to prevent infections. Your clinician will train you on:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Thorough handwashing before handling any supplies</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Proper cleaning of injection sites with alcohol swabs</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Keeping vial tops and needles sterile</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Using single-use needles and syringes only</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Avoiding touching the needle tip to any non-sterile surface</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Storage Basics */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Basics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Proper storage preserves medication quality and safety:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong>Lyophilized (powder) peptides:</strong> Typically stable at room temperature for short periods, or refrigerated for longer storage. Check supplier guidance.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong>Reconstituted peptides:</strong> Usually require refrigeration (2-8°C) and have limited shelf life after mixing. Follow manufacturer instructions.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong>Protect from light:</strong> Many peptides are sensitive to light and should be stored in amber vials or wrapped containers.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong>Avoid contamination:</strong> Always use a new, sterile needle when drawing from a vial.</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Sharps Disposal */}
      <Card>
        <CardHeader>
          <CardTitle>Sharps Disposal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-warning-50 border border-warning-300 rounded-lg p-4">
            <p className="text-sm text-warning-900 font-medium">
              ⚠️ Never throw needles or syringes in household trash
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Used needles and syringes must be disposed of in an FDA-approved sharps container. These containers are designed to prevent needle-stick injuries and are available at pharmacies, medical supply stores, or through mail-order programs.
          </p>
          <p className="text-gray-700 leading-relaxed">
            When your sharps container is about three-quarters full, follow local regulations for disposal. Many communities offer sharps disposal drop-off sites or mail-back programs.
          </p>
        </CardContent>
      </Card>

      {/* Get Training */}
      <Card className="bg-primary-50 border-2 border-primary-300">
        <CardHeader>
          <CardTitle>Next Steps: Get Hands-On Training</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-900 leading-relaxed font-medium">
            Reading about injection technique is not sufficient. You must receive hands-on training from a qualified healthcare provider who can:
          </p>
          <ul className="space-y-2 text-gray-900">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Demonstrate proper technique in person</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Watch you perform your first injections under supervision</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Answer questions specific to your situation</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Provide supplies and written instructions</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Be available for follow-up questions or concerns</span>
            </li>
          </ul>
          <p className="text-gray-900 leading-relaxed">
            Ask your prescribing clinician about scheduling an injection training session before you begin any peptide therapy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

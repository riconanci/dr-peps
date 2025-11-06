import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';

export const metadata = {
  title: 'Subcutaneous Administration Overview | Dr Peps',
  description: 'Learn about subcutaneous injections: what they are, common sites, and why clinical training is essential.',
};

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
            Areas with adequate subcutaneous fat are preferred for subQ injections. Common sites include:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Abdomen:</strong> Most common site. At least 2 inches away from the navel</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Outer thigh:</strong> Front and outer area of the upper leg</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Upper arm:</strong> Back or side of the upper arm (often requires assistance)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Lower back:</strong> Love handle area (often requires assistance)</span>
            </li>
          </ul>
          <p className="text-slate-300 leading-relaxed">
            <strong className="text-slate-100">Site rotation:</strong> It's important to rotate injection sites to prevent tissue damage, scarring, or lipohypertrophy (fatty lumps). Your healthcare provider will teach you a rotation schedule.
          </p>
        </CardContent>
      </Card>

      {/* Why SubQ for Peptides */}
      <Card>
        <CardHeader>
          <CardTitle>Why Subcutaneous for Peptides?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            Peptides are often administered subcutaneously because:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Better bioavailability:</strong> Many peptides are broken down by digestive enzymes if taken orally</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Controlled absorption:</strong> SubQ allows for steady, sustained release into the bloodstream</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Self-administration:</strong> Easier to perform at home compared to intramuscular or intravenous routes</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Reduced discomfort:</strong> Typically less painful than intramuscular injections</span>
            </li>
          </ul>
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
              <span><strong className="text-slate-100">Alcohol swabs:</strong> Cleaning the injection site and vial tops before each use</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Single-use needles:</strong> Never reusing needles or syringes</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Clean workspace:</strong> Using a clean, dry surface for preparation</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Proper disposal:</strong> Immediately placing used needles in a sharps container</span>
            </li>
          </ul>
          <p className="text-slate-300 leading-relaxed">
            Your healthcare provider will demonstrate the full sterile technique process during training.
          </p>
        </CardContent>
      </Card>

      {/* Equipment Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Common Equipment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            Typical supplies for subcutaneous peptide administration:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Insulin syringes:</strong> Common sizes are 0.3mL, 0.5mL, or 1mL with short needles (typically 28-31 gauge, 5-8mm length)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Alcohol swabs:</strong> For cleaning injection sites and vial tops</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Bacteriostatic water:</strong> Common diluent for reconstituting lyophilized peptides</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Sharps container:</strong> FDA-approved container for safe needle disposal</span>
            </li>
          </ul>
          <p className="text-slate-300 leading-relaxed">
            Your healthcare provider or pharmacy will specify exactly which supplies you need for your specific medication.
          </p>
        </CardContent>
      </Card>

      {/* Injection Angle */}
      <Card>
        <CardHeader>
          <CardTitle>Injection Angle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            Subcutaneous injections are typically administered at specific angles based on needle length and body composition:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">45-degree angle:</strong> Often used for longer needles or in individuals with less subcutaneous fat</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">90-degree angle:</strong> Commonly used with short insulin needles in areas with adequate subcutaneous fat</span>
            </li>
          </ul>
          <p className="text-slate-300 leading-relaxed">
            Your healthcare provider will assess your individual anatomy and demonstrate the correct angle for your situation.
          </p>
        </CardContent>
      </Card>

      {/* When to Seek Help */}
      <Card>
        <CardHeader>
          <CardTitle>When to Contact Your Provider</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            Contact your healthcare provider if you experience:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start">
              <span className="text-danger-600 mr-2">!</span>
              <span>Signs of infection: redness, warmth, swelling, or pus at injection site</span>
            </li>
            <li className="flex items-start">
              <span className="text-danger-600 mr-2">!</span>
              <span>Persistent pain or bruising that worsens</span>
            </li>
            <li className="flex items-start">
              <span className="text-danger-600 mr-2">!</span>
              <span>Lumps or hard areas that don't resolve</span>
            </li>
            <li className="flex items-start">
              <span className="text-danger-600 mr-2">!</span>
              <span>Fever or other systemic symptoms after injection</span>
            </li>
            <li className="flex items-start">
              <span className="text-danger-600 mr-2">!</span>
              <span>Unexpected reactions or side effects</span>
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
            This overview provides conceptual knowledge only. Before administering any subcutaneous injections:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">→</span>
              <span><strong className="text-slate-100">Receive hands-on training:</strong> Schedule a demonstration with your healthcare provider or nurse</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">→</span>
              <span><strong className="text-slate-100">Ask questions:</strong> Clarify any doubts about technique, storage, or side effects</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">→</span>
              <span><strong className="text-slate-100">Follow your prescription:</strong> Use only the dose, frequency, and technique prescribed for you</span>
            </li>
          </ul>
          <p className="text-slate-300 leading-relaxed mt-4">
            <strong className="text-slate-100">Additional resources:</strong>
          </p>
          <ul className="space-y-2">
            <li>
              <Link
                href="/learn/storage-practices"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                → Learn about Storage Practices and Sharps Disposal
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
      <div className="bg-danger-50 border border-danger-300 rounded-lg p-6">
        <p className="text-danger-900 leading-relaxed">
          <strong>Final Reminder:</strong> This page is for educational understanding only. Practical training from a qualified healthcare professional is absolutely required before performing any injections. No online resource can replace hands-on clinical instruction.
        </p>
      </div>
    </div>
  );
}

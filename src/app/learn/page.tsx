import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';

export default function LearnPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-100">Learn the Basics</h1>
        <p className="text-slate-300 leading-relaxed">
          Educational resources to help you understand peptide administration, storage, and safety fundamentals.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/learn/subq-overview">
          <Card hover className="h-full">
            <CardHeader>
              <div className="text-4xl mb-2">💉</div>
              <CardTitle>Subcutaneous Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 leading-relaxed">
                Learn about subcutaneous administration: what it means, where it&apos;s done, and why proper training from a clinician is essential.
              </p>
            </CardContent>
          </Card>
        </Link>

        <div className="opacity-60 cursor-not-allowed">
          <Card className="h-full">
            <CardHeader>
              <div className="text-4xl mb-2">🧊</div>
              <CardTitle>Storage Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 leading-relaxed">
                Coming soon: Guidelines for properly storing lyophilized and reconstituted peptides.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Important Safety Reminders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-slate-300 leading-relaxed">
            These educational resources are designed to supplement, not replace, guidance from your healthcare provider. Always consult a licensed clinician for:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start">
              <span className="text-primary-400 mr-2">•</span>
              <span>Determining if peptides are appropriate for your situation</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-400 mr-2">•</span>
              <span>Proper administration technique and hands-on training</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-400 mr-2">•</span>
              <span>Dosing guidance tailored to your needs</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-400 mr-2">•</span>
              <span>Monitoring for side effects or interactions</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

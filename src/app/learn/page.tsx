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

        <Link href="/learn/storage-practices">
          <Card hover className="h-full">
            <CardHeader>
              <div className="text-4xl mb-2">🧊</div>
              <CardTitle>Storage Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 leading-relaxed">
                Guidelines for properly storing lyophilized and reconstituted peptides, plus safe sharps disposal practices.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Important Safety Reminders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-slate-300 leading-relaxed">
            These educational resources are designed to supplement, not replace, guidance from your healthcare provider.
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Always consult with a licensed healthcare professional before using any peptide</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Receive proper hands-on training for any injection technique</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Follow your specific prescription and instructions from your provider</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

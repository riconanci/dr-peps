import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-100">About Dr Peps</h1>
        <p className="text-xl text-slate-300 leading-relaxed">
          An evidence-based educational resource for peptide information
        </p>
      </div>

      {/* Mission */}
      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            Dr Peps provides evidence-based, neutral educational information about peptides to help individuals have informed conversations with their healthcare providers.
          </p>
          <p className="text-slate-300 leading-relaxed">
            We believe that education should be accessible, transparent, and grounded in available scientific literature. Our goal is to present peptide information in a clear, balanced way—describing what peptides are, what people seek them for, and what the evidence shows—without making medical claims or prescribing treatments.
          </p>
        </CardContent>
      </Card>

      {/* What We Provide */}
      <Card>
        <CardHeader>
          <CardTitle>What We Provide</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Peptide Profiles:</strong> Neutral overviews with evidence levels, risk assessments, and scientific references</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Calculators:</strong> Mathematical tools to understand reconstitution and dosing (for educational purposes only)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Safety Information:</strong> Who should avoid certain peptides, common side effects, and interaction notes</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">Educational Resources:</strong> Conceptual guides about administration routes, storage, and safety practices</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong className="text-slate-100">References:</strong> Links to scientific literature and plain-language summaries</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* What We Don't Do */}
      <Card>
        <CardHeader>
          <CardTitle>What We Don&apos;t Do</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start">
              <span className="text-danger-500 mr-2">×</span>
              <span><strong className="text-slate-100">Prescribe or recommend:</strong> We never tell you what to take or suggest specific treatments</span>
            </li>
            <li className="flex items-start">
              <span className="text-danger-500 mr-2">×</span>
              <span><strong className="text-slate-100">Diagnose conditions:</strong> We don&apos;t assess symptoms or provide medical diagnoses</span>
            </li>
            <li className="flex items-start">
              <span className="text-danger-500 mr-2">×</span>
              <span><strong className="text-slate-100">Replace healthcare providers:</strong> Our resources supplement, never replace, professional medical advice</span>
            </li>
            <li className="flex items-start">
              <span className="text-danger-500 mr-2">×</span>
              <span><strong className="text-slate-100">Sell products:</strong> We are an educational resource, not a vendor or marketplace</span>
            </li>
            <li className="flex items-start">
              <span className="text-danger-500 mr-2">×</span>
              <span><strong className="text-slate-100">Offer medical advice:</strong> All content is for educational purposes only</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Our Approach */}
      <Card>
        <CardHeader>
          <CardTitle>Our Approach</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            We take a careful, evidence-based approach to peptide education:
          </p>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start">
              <span className="text-primary-400 mr-2">→</span>
              <span><strong className="text-slate-100">Neutral language:</strong> We describe rather than prescribe, using phrases like "what people seek" instead of making claims</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-400 mr-2">→</span>
              <span><strong className="text-slate-100">Evidence transparency:</strong> Clear labels for evidence quality (Strong, Moderate, Preliminary, Anecdotal)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-400 mr-2">→</span>
              <span><strong className="text-slate-100">Risk disclosure:</strong> Honest assessment of unknowns and potential concerns</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-400 mr-2">→</span>
              <span><strong className="text-slate-100">Scientific references:</strong> Citations to published literature with plain-language summaries</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-400 mr-2">→</span>
              <span><strong className="text-slate-100">Regular reviews:</strong> Content is reviewed and updated as new information becomes available</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Important Disclaimers */}
      <Card>
        <CardHeader>
          <CardTitle>Important Disclaimers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-warning-500/10 border border-warning-500/30 rounded-lg">
            <p className="text-slate-200 leading-relaxed">
              <strong className="text-warning-500">Not Medical Advice:</strong> Dr Peps is an educational resource only. Nothing on this site constitutes medical advice, diagnosis, or treatment. Always consult with a licensed healthcare provider before making any decisions about peptides or other medications.
            </p>
          </div>
          <div className="p-4 bg-warning-500/10 border border-warning-500/30 rounded-lg">
            <p className="text-slate-200 leading-relaxed">
              <strong className="text-warning-500">Accuracy:</strong> While we strive for accuracy, peptide research is evolving. Information may become outdated. Last review dates are provided on peptide pages.
            </p>
          </div>
          <div className="p-4 bg-warning-500/10 border border-warning-500/30 rounded-lg">
            <p className="text-slate-200 leading-relaxed">
              <strong className="text-warning-500">Affiliate Disclosure:</strong> We may earn commissions from referrals to clinicians or vendors. This never affects editorial content, which remains neutral and evidence-based.
            </p>
          </div>
          <div className="p-4 bg-danger-500/10 border border-danger-500/30 rounded-lg">
            <p className="text-slate-200 leading-relaxed">
              <strong className="text-danger-500">Emergency:</strong> If you&apos;re experiencing a medical emergency, call your local emergency number immediately. Dr Peps is not for emergency situations.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Contact & Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            We welcome feedback on our content, corrections to inaccuracies, and suggestions for new peptide profiles.
          </p>
          <p className="text-slate-300 leading-relaxed">
            <strong className="text-slate-100">Note:</strong> We cannot provide personalized medical advice or answer questions about your specific health situation. Please consult a licensed healthcare provider for individual guidance.
          </p>
        </CardContent>
      </Card>

      {/* Final Reminder */}
      <div className="card p-6 text-center border-2 border-primary-600/50 bg-primary-600/10">
        <div className="text-4xl mb-4">📚</div>
        <p className="text-slate-100 font-medium text-lg mb-2">
          Education empowers informed conversations
        </p>
        <p className="text-slate-300">
          Use this knowledge to have better discussions with your healthcare provider—not to self-diagnose or self-treat.
        </p>
      </div>
    </div>
  );
}

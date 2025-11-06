import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';

export const metadata = {
  title: 'About Dr Peps | Educational Peptide Resource',
  description: 'Learn about Dr Peps mission to provide neutral, evidence-based peptide education. Not medical advice.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
          About Dr Peps
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Evidence-based peptide education to support informed conversations with healthcare providers
        </p>
      </div>

      {/* Mission */}
      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            Dr Peps exists to bridge the information gap in peptide therapy. We provide clear, neutral, evidence-based information about peptides commonly discussed in wellness and medical contexts.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Our goal is simple: help people have better informed conversations with their healthcare providers. We believe education empowers patients and supports collaborative decision-making with licensed clinicians.
          </p>
        </CardContent>
      </Card>

      {/* What We Do */}
      <Card>
        <CardHeader>
          <CardTitle>What We Provide</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start">
              <span className="text-primary-400 mr-2">→</span>
              <span><strong className="text-slate-100">Peptide profiles:</strong> Neutral overviews of commonly discussed peptides, including evidence quality, risks, and what people seek them for</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-400 mr-2">→</span>
              <span><strong className="text-slate-100">Educational calculators:</strong> Math tools for understanding reconstitution, dosing, and cycle planning (not prescriptive)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-400 mr-2">→</span>
              <span><strong className="text-slate-100">Learning resources:</strong> Conceptual guides on administration routes, storage, and safety considerations</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-400 mr-2">→</span>
              <span><strong className="text-slate-100">References:</strong> Citations to published literature so you can explore further</span>
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
              <span className="text-red-400 mr-2">✗</span>
              <span>We don&apos;t provide medical advice, diagnoses, or treatment recommendations</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-2">✗</span>
              <span>We don&apos;t prescribe peptides or tell you what to take</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-2">✗</span>
              <span>We don&apos;t make health claims or promises about outcomes</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-2">✗</span>
              <span>We don&apos;t provide step-by-step injection tutorials (that requires clinical training)</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-2">✗</span>
              <span>We don&apos;t answer personal health questions or provide individualized guidance</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Editorial Standards */}
      <Card>
        <CardHeader>
          <CardTitle>Editorial Standards</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300 leading-relaxed mb-4">
            Every piece of content on Dr Peps follows strict editorial guidelines:
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

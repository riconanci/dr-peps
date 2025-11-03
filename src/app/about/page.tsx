import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">About Dr Peps</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          An evidence-based educational resource for peptide information
        </p>
      </div>

      {/* Mission */}
      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Dr Peps provides evidence-based, neutral educational information about peptides to help individuals have informed conversations with their healthcare providers.
          </p>
          <p className="text-gray-700 leading-relaxed">
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
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong>Peptide Profiles:</strong> Neutral overviews with evidence levels, risk assessments, and scientific references</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong>Calculators:</strong> Mathematical tools to understand reconstitution and dosing (for educational purposes only)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong>Safety Information:</strong> Who should avoid certain peptides, common side effects, and interaction notes</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong>Educational Resources:</strong> Basic information about administration routes, storage, and safety practices</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* What We Don't Do */}
      <Card>
        <CardHeader>
          <CardTitle className="text-danger-700">What We Don&apos;t Provide</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-danger-600 mr-2">⚠</span>
              <span><strong>Medical Advice:</strong> We do not diagnose, treat, or prescribe</span>
            </li>
            <li className="flex items-start">
              <span className="text-danger-600 mr-2">⚠</span>
              <span><strong>Treatment Recommendations:</strong> All decisions must be made with your healthcare provider</span>
            </li>
            <li className="flex items-start">
              <span className="text-danger-600 mr-2">⚠</span>
              <span><strong>Direct Sales:</strong> We do not sell, supply, or prescribe peptides</span>
            </li>
            <li className="flex items-start">
              <span className="text-danger-600 mr-2">⚠</span>
              <span><strong>Substitutes for Professional Care:</strong> Our content supplements, never replaces, clinical guidance</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-warning-50 border-2 border-warning-300">
        <CardHeader>
          <CardTitle>Important Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-900 leading-relaxed">
            <strong>Dr Peps is an educational resource only.</strong> The information provided on this site is not medical advice and should not be used for diagnosing or treating health conditions.
          </p>
          <p className="text-gray-900 leading-relaxed">
            Always consult with a licensed healthcare provider before using any peptide or making decisions about your health. If you are experiencing a medical emergency, call your local emergency number immediately.
          </p>
          <p className="text-gray-900 leading-relaxed">
            The content on Dr Peps is provided "as is" without warranties of any kind. We make no claims regarding the accuracy, completeness, or suitability of this information for any particular purpose.
          </p>
        </CardContent>
      </Card>

      {/* Affiliate Disclosure */}
      <Card>
        <CardHeader>
          <CardTitle>Affiliate & Referral Disclosure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Dr Peps may earn commissions from referrals to clinics, telemedicine services, or suppliers. These potential financial relationships do not influence our editorial content.
          </p>
          <p className="text-gray-700 leading-relaxed">
            All peptide profiles, safety information, and educational materials are researched and written independently. We present information based on available evidence, regardless of any referral arrangements.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you choose to use a service we link to, we may receive compensation at no extra cost to you. This helps support the maintenance and development of our educational resources.
          </p>
        </CardContent>
      </Card>

      {/* Contact Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            For questions, corrections, or feedback about our educational content, please contact us at:
          </p>
          <p className="text-primary-600 font-medium mt-2">
            info@drpeps.com
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Note: We cannot provide medical advice or answer specific health questions. Please consult your healthcare provider for personal medical guidance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

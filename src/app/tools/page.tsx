import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';

export default function ToolsPage() {
  const tools = [
    {
      title: 'Reconstitution Calculator',
      href: '/tools/reconstitution',
      description: 'Calculate concentration, volume per dose, and IU conversions for peptide reconstitution.',
      icon: '🧪',
    },
    {
      title: 'Dose Calculator',
      href: '/tools/dose',
      description: 'Determine mL per dose, IU per dose, and number of doses per vial.',
      icon: '💉',
    },
    {
      title: 'Cycle Planner',
      href: '/tools/cycle-planner',
      description: 'Generate a non-prescriptive schedule for peptide administration.',
      icon: '📅',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Calculators & Tools</h1>
        <p className="text-gray-600 leading-relaxed">
          Educational tools to help you understand peptide preparation and dosing mathematics.
        </p>
      </div>

      {/* Important Notice */}
      <div className="bg-danger-50 border border-danger-300 rounded-lg p-6">
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
              Educational Mathematics Only
            </h3>
            <p className="text-danger-900 leading-relaxed">
              These calculators perform illustrative math only. They do not provide medical advice or prescribe dosing. Always discuss specific dosing, preparation methods, and usage with a licensed healthcare provider.
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href}>
            <Card hover className="h-full">
              <CardHeader>
                <div className="text-4xl mb-2">{tool.icon}</div>
                <CardTitle>{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{tool.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Additional Info */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use These Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Our calculators help you understand the mathematics behind peptide preparation. Enter the values for your specific scenario to see calculated results.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Remember that these are educational tools only. Your healthcare provider should guide all actual preparation and administration decisions.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Double-check all calculations with your clinician</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Follow sterile technique guidelines provided by your healthcare team</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Store reconstituted peptides according to manufacturer instructions</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

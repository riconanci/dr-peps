import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-800 border-t border-dark-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-4">
              About Dr Peps
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Educational peptide information resource. Not medical advice. Always consult a licensed healthcare provider.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/library" className="text-sm text-slate-400 hover:text-primary-400 transition-colors">
                  Peptide Library
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-sm text-slate-400 hover:text-primary-400 transition-colors">
                  Calculators
                </Link>
              </li>
              <li>
                <Link href="/learn/subq-overview" className="text-sm text-slate-400 hover:text-primary-400 transition-colors">
                  SubQ Overview
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-slate-400 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/references" className="text-sm text-slate-400 hover:text-primary-400 transition-colors">
                  References
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency & Disclosures */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-4">
              Important
            </h3>
            <div className="space-y-3">
              <div className="text-sm text-slate-400 leading-relaxed">
                <strong className="text-red-400">Emergency:</strong> Call your local emergency number immediately
              </div>
              <div className="text-sm text-slate-400 leading-relaxed">
                <strong className="text-primary-400">Disclosure:</strong> We may earn from referrals. This does not affect editorial content.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-dark-700">
          <p className="text-sm text-center text-slate-500">
            © {currentYear} Dr Peps. Educational purposes only. Not medical advice.
          </p>
        </div>
      </div>
      
      {/* Bottom padding for mobile nav */}
      <div className="md:hidden h-16" aria-hidden="true" />
    </footer>
  );
}

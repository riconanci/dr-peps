'use client';

import { useState } from 'react';

interface DisclaimerBannerProps {
  severity?: 'warning' | 'danger';
  text?: string;
}

export default function DisclaimerBanner({
  severity = 'danger',
  text = "Educational resource only. Not medical advice. Consult a licensed clinician before using any peptide. If you're experiencing an emergency, call your local emergency number.",
}: DisclaimerBannerProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  const bgColor = severity === 'danger' 
    ? 'bg-red-600/20 border-red-600/30' 
    : 'bg-yellow-600/20 border-yellow-600/30';

  return (
    <div
      className={`sticky top-0 z-50 border-b ${bgColor} transition-all duration-200 ${
        isMinimized ? 'py-2' : 'py-4'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 flex-shrink-0 text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className={`text-sm font-semibold leading-relaxed text-slate-100 ${isMinimized ? 'line-clamp-1' : ''}`}>
                {text}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="flex-shrink-0 rounded-lg p-1 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            aria-label={isMinimized ? 'Expand disclaimer' : 'Minimize disclaimer'}
            aria-expanded={!isMinimized}
          >
            <svg
              className={`h-5 w-5 text-slate-300 transition-transform ${isMinimized ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

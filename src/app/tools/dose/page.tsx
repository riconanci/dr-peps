'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { calculateFullDose, formatNumber } from '@/lib/calc';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';

export default function DoseCalculatorPage() {
  const [vialTotalMg, setVialTotalMg] = useState('5');
  const [diluentMl, setDiluentMl] = useState('1');
  const [desiredDoseMg, setDesiredDoseMg] = useState('0.25');
  const [result, setResult] = useState<ReturnType<typeof calculateFullDose> | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    calculate();
  }, [vialTotalMg, diluentMl, desiredDoseMg]);

  const calculate = () => {
    setError('');
    
    try {
      const vial = parseFloat(vialTotalMg);
      const diluent = parseFloat(diluentMl);
      const dose = parseFloat(desiredDoseMg);

      if (isNaN(vial) || isNaN(diluent) || isNaN(dose)) {
        setResult(null);
        return;
      }

      const calculated = calculateFullDose(vial, diluent, dose);
      setResult(calculated);
    } catch (err) {
      setError((err as Error).message);
      setResult(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <Link
          href="/tools"
          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Back to Tools
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Dose Calculator</h1>
        <p className="text-gray-600 leading-relaxed">
          Calculate volume per dose, IU equivalents, and total doses per vial.
        </p>
      </div>

      {/* Warning */}
      <div className="bg-warning-50 border border-warning-300 rounded-lg p-4">
        <p className="text-sm text-warning-900 font-medium">
          ⚠️ Educational calculations only — verify all dosing with your clinician
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input */}
        <Card>
          <CardHeader>
            <CardTitle>Input Values</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="vialTotal" className="block text-sm font-medium text-gray-700 mb-1">
                Vial Total (mg)
              </label>
              <input
                id="vialTotal"
                type="number"
                step="0.1"
                value={vialTotalMg}
                onChange={(e) => setVialTotalMg(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-[16px] focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label htmlFor="diluentMl" className="block text-sm font-medium text-gray-700 mb-1">
                Diluent Volume (mL)
              </label>
              <input
                id="diluentMl"
                type="number"
                step="0.1"
                value={diluentMl}
                onChange={(e) => setDiluentMl(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-[16px] focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label htmlFor="desiredDose" className="block text-sm font-medium text-gray-700 mb-1">
                Desired Dose (mg)
              </label>
              <input
                id="desiredDose"
                type="number"
                step="0.01"
                value={desiredDoseMg}
                onChange={(e) => setDesiredDoseMg(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-[16px] focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {error && (
              <div className="bg-danger-50 border border-danger-300 rounded-lg p-3" role="alert">
                <p className="text-sm text-danger-900">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Calculated Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result ? (
              <>
                <div className="bg-primary-50 rounded-lg p-4">
                  <p className="text-sm text-primary-800 font-medium mb-1">Concentration</p>
                  <p className="text-2xl font-bold text-primary-900">
                    {formatNumber(result.concentration_mg_per_ml)} mg/mL
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">mL Per Dose</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {formatNumber(result.ml_per_dose, 3)} mL
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">IU Per Dose</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {formatNumber(result.iu_per_dose)} IU
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 font-medium mb-1">Total Doses Per Vial</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {result.doses_per_vial} doses
                  </p>
                </div>
              </>
            ) : (
              <p className="text-gray-500 italic">Enter values to see results</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

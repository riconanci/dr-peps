'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  concentrationMgPerMl,
  mlForDose,
  iuForMl_U100,
  formatNumber,
} from '@/lib/calc';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Suspense } from 'react';

function ReconstitutionCalculatorContent() {
  const searchParams = useSearchParams();
  
  const [vialTotalMg, setVialTotalMg] = useState('5');
  const [diluentMl, setDiluentMl] = useState('1');
  const [desiredDoseMg, setDesiredDoseMg] = useState('0.25');
  const [calculatedValues, setCalculatedValues] = useState<{
    concentration: number;
    mlPerDose?: number;
    iuPerDose?: number;
  } | null>(null);
  const [error, setError] = useState<string>('');

  // Load from URL params
  useEffect(() => {
    const vial = searchParams.get('vial_mg');
    const diluent = searchParams.get('diluent_ml');
    const dose = searchParams.get('dose_mg');
    
    if (vial) setVialTotalMg(vial);
    if (diluent) setDiluentMl(diluent);
    if (dose) setDesiredDoseMg(dose);
  }, [searchParams]);

  useEffect(() => {
    calculate();
  }, [vialTotalMg, diluentMl, desiredDoseMg]);

  const calculate = () => {
    setError('');
    
    try {
      const vial = parseFloat(vialTotalMg);
      const diluent = parseFloat(diluentMl);
      const dose = desiredDoseMg ? parseFloat(desiredDoseMg) : null;

      if (isNaN(vial) || isNaN(diluent)) {
        setCalculatedValues(null);
        return;
      }

      const concentration = concentrationMgPerMl(vial, diluent);
      let mlPerDose: number | undefined;
      let iuPerDose: number | undefined;

      if (dose !== null && !isNaN(dose) && dose > 0) {
        mlPerDose = mlForDose(dose, concentration);
        iuPerDose = iuForMl_U100(mlPerDose);
      }

      setCalculatedValues({
        concentration,
        mlPerDose,
        iuPerDose,
      });
    } catch (err) {
      setError((err as Error).message);
      setCalculatedValues(null);
    }
  };

  const commonDoses = [0.1, 0.25, 0.5, 1.0];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* All your existing JSX stays exactly the same */}
      <div className="space-y-4">
        <Link
          href="/tools"
          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Back to Tools
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Reconstitution Calculator</h1>
        <p className="text-gray-600 leading-relaxed">
          Calculate concentration and volume-to-dose conversions for peptide reconstitution.
        </p>
      </div>

      {/* Warning */}
      <div className="bg-warning-50 border border-warning-300 rounded-lg p-4">
        <p className="text-sm text-warning-900 font-medium">
          ⚠️ Illustrative math only — discuss dosing and preparation with your clinician
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
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
                aria-describedby="vialTotal-help"
              />
              <p id="vialTotal-help" className="mt-1 text-xs text-gray-500">
                Total peptide amount in the vial
              </p>
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
                aria-describedby="diluentMl-help"
              />
              <p id="diluentMl-help" className="mt-1 text-xs text-gray-500">
                Volume of bacteriostatic water added
              </p>
            </div>

            <div>
              <label htmlFor="desiredDose" className="block text-sm font-medium text-gray-700 mb-1">
                Desired Dose (mg) <span className="text-gray-500">(optional)</span>
              </label>
              <input
                id="desiredDose"
                type="number"
                step="0.01"
                value={desiredDoseMg}
                onChange={(e) => setDesiredDoseMg(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-[16px] focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-describedby="desiredDose-help"
              />
              <p id="desiredDose-help" className="mt-1 text-xs text-gray-500">
                Target dose per injection (leave blank for concentration only)
              </p>
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
          <CardContent className="space-y-6">
            {calculatedValues ? (
              <>
                <div className="bg-primary-50 rounded-lg p-4">
                  <p className="text-sm text-primary-800 font-medium mb-1">Concentration</p>
                  <p className="text-3xl font-bold text-primary-900">
                    {formatNumber(calculatedValues.concentration)} mg/mL
                  </p>
                </div>

                {calculatedValues.mlPerDose !== undefined && (
                  <>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 font-medium mb-1">Volume Per Dose</p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {formatNumber(calculatedValues.mlPerDose, 3)} mL
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium mb-1">
                          IU Per Dose (U-100 syringe)
                        </p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {formatNumber(calculatedValues.iuPerDose!)} IU
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <p className="text-gray-500 italic">Enter values to see results</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Common Doses Table */}
      {calculatedValues && (
        <Card>
          <CardHeader>
            <CardTitle>Common Dose Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-sm font-semibold text-gray-900">Dose (mg)</th>
                    <th className="pb-3 text-sm font-semibold text-gray-900">Volume (mL)</th>
                    <th className="pb-3 text-sm font-semibold text-gray-900">IU (U-100)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {commonDoses.map((dose) => {
                    const ml = mlForDose(dose, calculatedValues.concentration);
                    const iu = iuForMl_U100(ml);
                    return (
                      <tr key={dose}>
                        <td className="py-3 text-gray-900">{dose} mg</td>
                        <td className="py-3 text-gray-700">{formatNumber(ml, 3)} mL</td>
                        <td className="py-3 text-gray-700">{formatNumber(iu)} IU</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-500 italic">
              Values shown are mathematical calculations only. Verify all dosing with your healthcare provider.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function ReconstitutionCalculatorPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8 text-center">Loading calculator...</div>}>
      <ReconstitutionCalculatorContent />
    </Suspense>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { calculateFullDose, formatNumber } from '@/lib/calc';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';

type DoseUnit = 'mg' | 'mcg';

export default function DoseCalculatorPage() {
  // Input state
  const [vialTotalMg, setVialTotalMg] = useState('5');
  const [diluentMl, setDiluentMl] = useState('1');
  const [desiredDose, setDesiredDose] = useState('0.25');
  const [doseUnit, setDoseUnit] = useState<DoseUnit>('mg');
  
  const [result, setResult] = useState<ReturnType<typeof calculateFullDose> | null>(null);
  const [error, setError] = useState('');

  // Convert dose to mg for calculations
  const getDoseInMg = (): string => {
    if (doseUnit === 'mcg') {
      const mcg = parseFloat(desiredDose);
      if (!isNaN(mcg)) {
        return (mcg / 1000).toString();
      }
    }
    return desiredDose;
  };

  // Calculate whenever inputs change
  useEffect(() => {
    calculate();
  }, [vialTotalMg, diluentMl, desiredDose, doseUnit]);

  const calculate = () => {
    setError('');
    
    try {
      const vial = parseFloat(vialTotalMg);
      const diluent = parseFloat(diluentMl);
      const doseInMg = parseFloat(getDoseInMg());

      if (isNaN(vial) || isNaN(diluent) || isNaN(doseInMg)) {
        setResult(null);
        return;
      }

      const calculated = calculateFullDose(vial, diluent, doseInMg);
      setResult(calculated);
    } catch (err) {
      setError((err as Error).message);
      setResult(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 space-y-6 md:space-y-8 pb-24 md:pb-8">
      <div className="space-y-3 md:space-y-4">
        <Link
          href="/tools"
          className="inline-flex items-center text-base md:text-sm text-primary-400 hover:text-primary-300 font-medium"
        >
          ← Back to Tools
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Dose Calculator</h1>
        <p className="text-base md:text-lg text-slate-300 leading-relaxed">
          Calculate volume per dose, IU equivalents, and total doses per vial.
        </p>
      </div>

      {/* Warning */}
      <div className="bg-yellow-900/20 border-2 border-yellow-700/50 rounded-lg p-4 md:p-5">
        <p className="text-sm md:text-base text-yellow-200 font-semibold flex items-start gap-2">
          <span className="text-xl flex-shrink-0">⚠️</span>
          <span>Educational calculations only — verify all dosing with your clinician</span>
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">Input Values</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 md:space-y-6">
            {/* Vial Total */}
            <div className="space-y-2">
              <label htmlFor="vialTotal" className="block text-base md:text-lg font-semibold text-white mb-2">
                Vial Total (mg)
              </label>
              <input
                id="vialTotal"
                type="number"
                step="0.1"
                min="0"
                value={vialTotalMg}
                onChange={(e) => setVialTotalMg(e.target.value)}
                placeholder="Enter vial total in mg"
                className="block w-full rounded-lg border-2 border-dark-600 bg-dark-700 px-4 py-3 text-base md:text-lg text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
            </div>

            {/* Diluent Volume */}
            <div className="space-y-2">
              <label htmlFor="diluentMl" className="block text-base md:text-lg font-semibold text-white mb-2">
                Diluent Volume (mL)
              </label>
              <input
                id="diluentMl"
                type="number"
                step="0.1"
                min="0"
                value={diluentMl}
                onChange={(e) => setDiluentMl(e.target.value)}
                placeholder="Enter diluent volume in mL"
                className="block w-full rounded-lg border-2 border-dark-600 bg-dark-700 px-4 py-3 text-base md:text-lg text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
            </div>

            {/* Desired Dose with Unit Toggle */}
            <div className="space-y-2">
              <label htmlFor="desiredDose" className="block text-base md:text-lg font-semibold text-white mb-2">
                Desired Dose
              </label>
              
              {/* Unit Toggle */}
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => {
                    if (doseUnit === 'mcg') {
                      // Convert current value from mcg to mg
                      const mcg = parseFloat(desiredDose);
                      if (!isNaN(mcg)) {
                        setDesiredDose((mcg / 1000).toString());
                      }
                      setDoseUnit('mg');
                    }
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold text-base transition-colors ${
                    doseUnit === 'mg'
                      ? 'bg-primary-600 text-white border-2 border-primary-500'
                      : 'bg-dark-700 text-slate-300 hover:bg-dark-600 border-2 border-dark-600'
                  }`}
                >
                  mg
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (doseUnit === 'mg') {
                      // Convert current value from mg to mcg
                      const mg = parseFloat(desiredDose);
                      if (!isNaN(mg)) {
                        setDesiredDose((mg * 1000).toString());
                      }
                      setDoseUnit('mcg');
                    }
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold text-base transition-colors ${
                    doseUnit === 'mcg'
                      ? 'bg-primary-600 text-white border-2 border-primary-500'
                      : 'bg-dark-700 text-slate-300 hover:bg-dark-600 border-2 border-dark-600'
                  }`}
                >
                  mcg (µg)
                </button>
              </div>

              <div className="relative">
                <input
                  id="desiredDose"
                  type="number"
                  step={doseUnit === 'mg' ? '0.01' : '1'}
                  min="0"
                  value={desiredDose}
                  onChange={(e) => setDesiredDose(e.target.value)}
                  placeholder={`Enter dose in ${doseUnit}`}
                  className="block w-full rounded-lg border-2 border-dark-600 bg-dark-700 px-4 py-3 pr-16 text-base md:text-lg text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  {doseUnit}
                </span>
              </div>
              {doseUnit === 'mcg' && desiredDose && !isNaN(parseFloat(desiredDose)) && (
                <div className="text-sm text-slate-400 italic">
                  = {formatNumber(parseFloat(desiredDose) / 1000, 3)} mg
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-900/20 border-2 border-red-700/50 rounded-lg p-3 md:p-4" role="alert">
                <p className="text-sm md:text-base text-red-300 font-medium">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">Calculated Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-5">
            {result ? (
              <>
                {/* Concentration - Prominent */}
                <div className="bg-primary-600/20 border-2 border-primary-500/40 rounded-lg p-4 md:p-5">
                  <p className="text-sm md:text-base text-primary-300 font-semibold mb-2">Concentration</p>
                  <p className="text-3xl md:text-4xl font-bold text-white">
                    {formatNumber(result.concentration_mg_per_ml, 2)} <span className="text-2xl md:text-3xl">mg/mL</span>
                  </p>
                </div>

                {/* Units (IU) Per Dose - Prominent */}
                <div className="bg-green-600/20 border-2 border-green-500/40 rounded-lg p-4 md:p-5">
                  <p className="text-sm md:text-base text-green-300 font-semibold mb-2">Units (IU) Per Dose</p>
                  <p className="text-3xl md:text-4xl font-bold text-white">
                    {formatNumber(result.iu_per_dose, 2)} <span className="text-2xl md:text-3xl">IU</span>
                  </p>
                  <p className="text-xs md:text-sm text-green-200/80 mt-2 italic">
                    For U-100 insulin syringes
                  </p>
                </div>

                {/* Secondary Results */}
                <div className="grid grid-cols-1 gap-4 pt-2">
                  <div className="bg-dark-700 border border-dark-600 rounded-lg p-4">
                    <p className="text-sm md:text-base text-slate-300 font-semibold mb-1">mL Per Dose</p>
                    <p className="text-2xl md:text-3xl font-bold text-white">
                      {formatNumber(result.ml_per_dose, 3)} <span className="text-lg md:text-xl">mL</span>
                    </p>
                  </div>
                  <div className="bg-dark-700 border border-dark-600 rounded-lg p-4">
                    <p className="text-sm md:text-base text-slate-300 font-semibold mb-1">Total Doses Per Vial</p>
                    <p className="text-2xl md:text-3xl font-bold text-white">
                      {result.doses_per_vial} <span className="text-lg md:text-xl">doses</span>
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 md:py-12">
                <p className="text-base md:text-lg text-slate-400 italic">Enter values to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

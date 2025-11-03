/**
 * Peptide dosage calculator utilities
 * Educational purposes only - not medical advice
 */

export function concentrationMgPerMl(vial_total_mg: number, diluent_ml: number): number {
  if (diluent_ml <= 0) {
    throw new Error("Diluent volume must be greater than 0");
  }
  if (vial_total_mg < 0) {
    throw new Error("Vial total must be non-negative");
  }
  return vial_total_mg / diluent_ml;
}

export function mlForDose(desired_dose_mg: number, concentration_mg_per_ml: number): number {
  if (concentration_mg_per_ml <= 0) {
    throw new Error("Concentration must be greater than 0");
  }
  if (desired_dose_mg < 0) {
    throw new Error("Desired dose must be non-negative");
  }
  return desired_dose_mg / concentration_mg_per_ml;
}

export function iuForMl_U100(ml: number): number {
  if (ml < 0) {
    throw new Error("Volume must be non-negative");
  }
  return ml * 100; // U-100 insulin syringes
}

export function doseFromUnits_Mg(units: number, concentration_mg_per_ml: number): number {
  if (concentration_mg_per_ml <= 0) {
    throw new Error("Concentration must be greater than 0");
  }
  if (units < 0) {
    throw new Error("Units must be non-negative");
  }
  return (units / 100) * concentration_mg_per_ml;
}

export function dosesPerVial(vial_total_mg: number, desired_dose_mg: number): number {
  if (desired_dose_mg <= 0) return 0;
  if (vial_total_mg < 0) return 0;
  return Math.floor(vial_total_mg / desired_dose_mg);
}

export interface DoseCalculation {
  concentration_mg_per_ml: number;
  ml_per_dose: number;
  iu_per_dose: number;
  doses_per_vial: number;
}

export function calculateFullDose(
  vial_total_mg: number,
  diluent_ml: number,
  desired_dose_mg: number
): DoseCalculation {
  const concentration = concentrationMgPerMl(vial_total_mg, diluent_ml);
  const ml = mlForDose(desired_dose_mg, concentration);
  const iu = iuForMl_U100(ml);
  const doses = dosesPerVial(vial_total_mg, desired_dose_mg);

  return {
    concentration_mg_per_ml: concentration,
    ml_per_dose: ml,
    iu_per_dose: iu,
    doses_per_vial: doses,
  };
}

export function formatNumber(num: number, decimals: number = 2): string {
  return num.toFixed(decimals);
}

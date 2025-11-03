import { describe, it, expect } from 'vitest';
import {
  concentrationMgPerMl,
  mlForDose,
  iuForMl_U100,
  doseFromUnits_Mg,
  dosesPerVial,
  calculateFullDose,
} from './calc';

describe('concentrationMgPerMl', () => {
  it('calculates correct concentration', () => {
    expect(concentrationMgPerMl(5, 1)).toBe(5);
    expect(concentrationMgPerMl(5, 2)).toBe(2.5);
    expect(concentrationMgPerMl(10, 2)).toBe(5);
  });

  it('throws error for zero or negative diluent', () => {
    expect(() => concentrationMgPerMl(5, 0)).toThrow("Diluent volume must be greater than 0");
    expect(() => concentrationMgPerMl(5, -1)).toThrow("Diluent volume must be greater than 0");
  });

  it('throws error for negative vial total', () => {
    expect(() => concentrationMgPerMl(-5, 1)).toThrow("Vial total must be non-negative");
  });
});

describe('mlForDose', () => {
  it('calculates correct ml for dose', () => {
    expect(mlForDose(0.25, 5)).toBe(0.05);
    expect(mlForDose(0.5, 5)).toBe(0.1);
    expect(mlForDose(1, 5)).toBe(0.2);
  });

  it('throws error for zero or negative concentration', () => {
    expect(() => mlForDose(0.25, 0)).toThrow("Concentration must be greater than 0");
    expect(() => mlForDose(0.25, -1)).toThrow("Concentration must be greater than 0");
  });

  it('throws error for negative dose', () => {
    expect(() => mlForDose(-0.25, 5)).toThrow("Desired dose must be non-negative");
  });
});

describe('iuForMl_U100', () => {
  it('converts ml to IU for U-100 syringes', () => {
    expect(iuForMl_U100(0.05)).toBe(5);
    expect(iuForMl_U100(0.1)).toBe(10);
    expect(iuForMl_U100(0.2)).toBe(20);
    expect(iuForMl_U100(1)).toBe(100);
  });

  it('throws error for negative ml', () => {
    expect(() => iuForMl_U100(-0.1)).toThrow("Volume must be non-negative");
  });
});

describe('doseFromUnits_Mg', () => {
  it('converts IU to mg based on concentration', () => {
    expect(doseFromUnits_Mg(5, 5)).toBe(0.25);
    expect(doseFromUnits_Mg(10, 5)).toBe(0.5);
    expect(doseFromUnits_Mg(20, 5)).toBe(1);
  });

  it('throws error for zero or negative concentration', () => {
    expect(() => doseFromUnits_Mg(5, 0)).toThrow("Concentration must be greater than 0");
    expect(() => doseFromUnits_Mg(5, -1)).toThrow("Concentration must be greater than 0");
  });

  it('throws error for negative units', () => {
    expect(() => doseFromUnits_Mg(-5, 5)).toThrow("Units must be non-negative");
  });
});

describe('dosesPerVial', () => {
  it('calculates number of doses per vial', () => {
    expect(dosesPerVial(5, 0.25)).toBe(20);
    expect(dosesPerVial(5, 0.5)).toBe(10);
    expect(dosesPerVial(5, 1)).toBe(5);
    expect(dosesPerVial(10, 0.5)).toBe(20);
  });

  it('returns 0 for zero or negative dose', () => {
    expect(dosesPerVial(5, 0)).toBe(0);
    expect(dosesPerVial(5, -0.25)).toBe(0);
  });

  it('returns 0 for negative vial total', () => {
    expect(dosesPerVial(-5, 0.25)).toBe(0);
  });

  it('floors partial doses', () => {
    expect(dosesPerVial(5, 0.3)).toBe(16); // 5/0.3 = 16.666...
  });
});

describe('calculateFullDose', () => {
  it('performs full calculation correctly', () => {
    const result = calculateFullDose(5, 1, 0.25);
    expect(result.concentration_mg_per_ml).toBe(5);
    expect(result.ml_per_dose).toBe(0.05);
    expect(result.iu_per_dose).toBe(5);
    expect(result.doses_per_vial).toBe(20);
  });

  it('handles different vial sizes', () => {
    const result = calculateFullDose(10, 2, 0.5);
    expect(result.concentration_mg_per_ml).toBe(5);
    expect(result.ml_per_dose).toBe(0.1);
    expect(result.iu_per_dose).toBe(10);
    expect(result.doses_per_vial).toBe(20);
  });
});

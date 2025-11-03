export type EvidenceLevel = "Strong" | "Moderate" | "Preliminary" | "Anecdotal";
export type RiskLevel = "Low" | "Moderate" | "High" | "Unknown";

export type Reference = {
  id: string;
  title: string;
  source: "PubMed" | "Review" | "Guideline" | "Other";
  year?: number;
  url?: string;
  note?: string;
};

export type ReconstitutionPreset = {
  vial_total_mg: number;
  common_diluents_ml: number[];
  example_doses_mg: number[];
};

export type Peptide = {
  slug: string;
  name: string;
  aliases: string[];
  category_tags: string[];
  typical_route: string[];
  overview: string;
  what_people_seek: string[];
  evidence_level: EvidenceLevel;
  risk_level: RiskLevel;
  side_effects_common: string[];
  who_should_avoid: string[];
  interactions_notes: string;
  dosing_ranges_literature: string;
  reconstitution: ReconstitutionPreset;
  storage_notes: string;
  references: Reference[];
  last_reviewed: string;
};

export type CategoryTag = 
  | "recovery" 
  | "gut" 
  | "joints" 
  | "tendons"
  | "metabolic"
  | "weight"
  | "growth"
  | "skin"
  | "cognitive"
  | "sleep"
  | "libido";

export type RouteTag = "subQ" | "oral" | "nasal" | "topical" | "IM";

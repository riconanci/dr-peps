import { Peptide } from '@/types/peptides';
import bpc157Data from '@/data/peptides/bpc-157.json';
import tb500Data from '@/data/peptides/tb-500.json';
import cjcIpaData from '@/data/peptides/cjc-1295-ipamorelin.json';
import semaglutideData from '@/data/peptides/semaglutide.json';
import tirzepatideData from '@/data/peptides/tirzepatide.json';
import melanotan2Data from '@/data/peptides/melanotan-2.json';

const allPeptidesData = [
  bpc157Data,
  tb500Data,
  cjcIpaData,
  semaglutideData,
  tirzepatideData,
  melanotan2Data,
] as Peptide[];

export function getAllPeptides(): Peptide[] {
  return allPeptidesData;
}

export function getPeptideBySlug(slug: string): Peptide | undefined {
  return allPeptidesData.find((p) => p.slug === slug);
}

export function searchPeptides(query: string): Peptide[] {
  if (!query.trim()) return allPeptidesData;
  
  const lowerQuery = query.toLowerCase();
  return allPeptidesData.filter((peptide) => {
    return (
      peptide.name.toLowerCase().includes(lowerQuery) ||
      peptide.aliases.some((alias) => alias.toLowerCase().includes(lowerQuery)) ||
      peptide.category_tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  });
}

export interface PeptideFilters {
  categories?: string[];
  routes?: string[];
  evidenceLevels?: string[];
  riskLevels?: string[];
}

export function filterPeptides(filters: PeptideFilters): Peptide[] {
  return allPeptidesData.filter((peptide) => {
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.some((cat) => peptide.category_tags.includes(cat))) {
        return false;
      }
    }
    
    if (filters.routes && filters.routes.length > 0) {
      if (!filters.routes.some((route) => peptide.typical_route.includes(route))) {
        return false;
      }
    }
    
    if (filters.evidenceLevels && filters.evidenceLevels.length > 0) {
      if (!filters.evidenceLevels.includes(peptide.evidence_level)) {
        return false;
      }
    }
    
    if (filters.riskLevels && filters.riskLevels.length > 0) {
      if (!filters.riskLevels.includes(peptide.risk_level)) {
        return false;
      }
    }
    
    return true;
  });
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  allPeptidesData.forEach((peptide) => {
    peptide.category_tags.forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return counts;
}

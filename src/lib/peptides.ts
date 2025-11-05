import { Peptide } from '@/types/peptides';

// Original 6 peptides
import bpc157Data from '@/data/peptides/bpc-157.json';
import tb500Data from '@/data/peptides/tb-500.json';
import cjcIpaData from '@/data/peptides/cjc-1295-ipamorelin.json';
import semaglutideData from '@/data/peptides/semaglutide.json';
import tirzepatideData from '@/data/peptides/tirzepatide.json';
import melanotan2Data from '@/data/peptides/melanotan-2.json';

// First batch of new peptides (9)
import tesamorelinData from '@/data/peptides/tesamorelin.json';
import ghrp6Data from '@/data/peptides/ghrp-6.json';
import motscData from '@/data/peptides/mots-c.json';
import cjcDacData from '@/data/peptides/cjc-1295-dac.json';
import pt141Data from '@/data/peptides/pt-141.json';
import igf1lr3Data from '@/data/peptides/igf-1-lr3.json';
import ipamorelinData from '@/data/peptides/ipamorelin.json';
import epitalonData from '@/data/peptides/epitalon.json';
import aod9604Data from '@/data/peptides/aod-9604.json';

// Second batch of new peptides (15)
import kpvData from '@/data/peptides/kpv.json';
import thymosinAlpha1Data from '@/data/peptides/thymosin-alpha-1.json';
import ll37Data from '@/data/peptides/ll-37.json';
import follistatin344Data from '@/data/peptides/follistatin-344.json';
import ghkCuData from '@/data/peptides/ghk-cu.json';
import fiveAmino1mqData from '@/data/peptides/amino-1mq.json';
import hghFragment176191Data from '@/data/peptides/hgh-fragment-176-191.json';
import ghrp2Data from '@/data/peptides/ghrp-2.json';
import hexarelinData from '@/data/peptides/hexarelin.json';
import selankData from '@/data/peptides/selank.json';
import semaxData from '@/data/peptides/semax.json';
import dsipData from '@/data/peptides/dsip.json';
import oxytocinData from '@/data/peptides/oxytocin.json';
import kisspeptin10Data from '@/data/peptides/kisspeptin-10.json';
import tesofensineData from '@/data/peptides/tesofensine.json';

// Combo peptide + NAD+
import bpcTbComboData from '@/data/peptides/bpc-157-tb-500-combo.json';
import nadPlusData from '@/data/peptides/nad-plus.json';

const allPeptidesData = [
  // Original 6 peptides
  bpc157Data,
  tb500Data,
  cjcIpaData,
  semaglutideData,
  tirzepatideData,
  melanotan2Data,
  
  // First batch (9)
  tesamorelinData,
  ghrp6Data,
  motscData,
  cjcDacData,
  pt141Data,
  igf1lr3Data,
  ipamorelinData,
  epitalonData,
  aod9604Data,
  
  // Second batch (15)
  kpvData,
  thymosinAlpha1Data,
  ll37Data,
  follistatin344Data,
  ghkCuData,
  fiveAmino1mqData,
  hghFragment176191Data,
  ghrp2Data,
  hexarelinData,
  selankData,
  semaxData,
  dsipData,
  oxytocinData,
  kisspeptin10Data,
  tesofensineData,
  
  // Combo + NAD+ (2)
  bpcTbComboData,
  nadPlusData,
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

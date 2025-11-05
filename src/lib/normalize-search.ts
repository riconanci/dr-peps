/**
 * Normalizes a search string for flexible peptide matching.
 * 
 * Handles:
 * - Spaces and hyphens (treats as equivalent)
 * - Characters 1, i, I, l, L (all normalized to "1")
 * 
 * Examples:
 * - "BPC 157" and "BPC-157" both normalize to "bpc 157"
 * - "IGF-1" and "IGF-I" both normalize to "igf 1"
 * - "LL-37" and "11-37" both normalize to "11 37"
 */
export function normalizeSearchString(input: string): string {
  return input
    .toLowerCase()
    // Replace hyphens with spaces
    .replace(/-/g, ' ')
    // Normalize i, I, l, L to 1
    .replace(/[iIlL]/g, '1')
    // Collapse multiple spaces to single space
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks if a search query matches a target string using normalized comparison.
 */
export function matchesSearch(searchQuery: string, targetString: string): boolean {
  const normalizedQuery = normalizeSearchString(searchQuery);
  const normalizedTarget = normalizeSearchString(targetString);
  return normalizedTarget.includes(normalizedQuery);
}

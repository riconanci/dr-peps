import { test, expect } from '@playwright/test';

test.describe('Dr Peps Smoke Tests', () => {
  test('landing page renders with disclaimer banner', async ({ page }) => {
    await page.goto('/');
    
    // Check for disclaimer banner
    await expect(page.getByRole('alert')).toContainText('Educational resource only');
    
    // Check for main heading
    await expect(page.getByRole('heading', { name: 'Welcome to Dr Peps' })).toBeVisible();
    
    // Check for CTA buttons
    await expect(page.getByRole('link', { name: 'Browse Library' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Use Calculators' })).toBeVisible();
  });

  test('mobile bottom nav is visible on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    await page.goto('/');
    
    // Check for mobile nav
    const nav = page.getByRole('navigation', { name: 'Mobile navigation' });
    await expect(nav).toBeVisible();
    
    // Check for all 4 tabs
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Library' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Tools' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Learn' })).toBeVisible();
  });

  test('navigate to peptide page shows evidence and risk badges', async ({ page }) => {
    await page.goto('/library');
    
    // Click on first peptide card
    await page.getByRole('link').first().click();
    
    // Should navigate to peptide detail page
    await expect(page).toHaveURL(/\/p\/.+/);
    
    // Check for badges
    await expect(page.locator('text=/Evidence:/')).toBeVisible();
    await expect(page.locator('text=/Risk:/')).toBeVisible();
    
    // Check for key sections
    await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'What People Seek' })).toBeVisible();
  });

  test('reconstitution calculator computes correct values', async ({ page }) => {
    await page.goto('/tools/reconstitution');
    
    // Input values: 5mg vial, 1mL diluent, 0.25mg dose
    await page.fill('#vialTotal', '5');
    await page.fill('#diluentMl', '1');
    await page.fill('#desiredDose', '0.25');
    
    // Check calculated concentration (5mg / 1mL = 5mg/mL)
    await expect(page.locator('text=/5\\.00 mg\\/mL/')).toBeVisible();
    
    // Check volume per dose (0.25mg / 5mg/mL = 0.05mL)
    await expect(page.locator('text=/0\\.050 mL/')).toBeVisible();
    
    // Check IU per dose (0.05mL * 100 = 5 IU)
    await expect(page.locator('text=/5\\.00 IU/')).toBeVisible();
  });

  test('library search and filter work', async ({ page }) => {
    await page.goto('/library');
    
    // Check initial peptide count
    const initialCount = await page.locator('text=/Showing \\d+ of \\d+ peptides/').textContent();
    expect(initialCount).toContain('6'); // We have 6 peptides
    
    // Search for "BPC"
    await page.fill('input[aria-label="Search peptides"]', 'BPC');
    
    // Should filter results
    await page.waitForTimeout(400); // Wait for debounce
    const searchResults = await page.locator('text=/Showing \\d+ of \\d+ peptides/').textContent();
    expect(searchResults).toContain('1'); // Should show 1 result
    
    // Check BPC-157 card is visible
    await expect(page.getByText('BPC-157')).toBeVisible();
  });

  test('accessibility - disclaimer has appropriate ARIA attributes', async ({ page }) => {
    await page.goto('/');
    
    const banner = page.getByRole('alert');
    await expect(banner).toHaveAttribute('aria-live', 'polite');
  });

  test('navigation between pages works', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to Library
    await page.getByRole('link', { name: 'Library', exact: true }).first().click();
    await expect(page).toHaveURL('/library');
    
    // Navigate to Tools
    await page.getByRole('link', { name: 'Tools' }).first().click();
    await expect(page).toHaveURL('/tools');
    
    // Navigate to Learn
    await page.getByRole('link', { name: 'Learn' }).first().click();
    await expect(page).toHaveURL('/learn');
    
    // Navigate back to Home
    await page.getByRole('link', { name: 'Home' }).first().click();
    await expect(page).toHaveURL('/');
  });
});

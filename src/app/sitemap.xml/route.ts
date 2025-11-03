import { getAllPeptides } from '@/lib/peptides';

export async function GET() {
  const peptides = getAllPeptides();
  const baseUrl = 'https://drpeps.com';

  const staticRoutes = [
    '',
    '/library',
    '/tools',
    '/tools/reconstitution',
    '/tools/dose',
    '/tools/cycle-planner',
    '/learn',
    '/learn/subq-overview',
    '/about',
    '/references',
  ];

  const peptideRoutes = peptides.map((p) => `/p/${p.slug}`);

  const allRoutes = [...staticRoutes, ...peptideRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>monthly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

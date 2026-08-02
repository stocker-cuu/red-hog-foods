import type { MetadataRoute } from 'next';
import { SALSAS, SITE_URL } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  const paginasDeSalsas = SALSAS.filter((s) => s.heatLevel > 0).map((salsa) => ({
    url: `${SITE_URL}/salsas/${salsa.id}`,
    lastModified: ahora,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: ahora,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...paginasDeSalsas,
  ];
}

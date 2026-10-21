import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const text = z.object({ th: z.string(), en: z.string() });

const products = defineCollection({
  loader: file('src/content/products.json'),
  schema: z.object({
    category: z.enum(['box', 'tag', 'calendar']),
    kind: z.string(), // short Latin kicker shown on the card, e.g. "Box"
    order: z.number(),
    name: text,
    summary: text,
    /** Path under /public to a .glb. Cards with a model get the 360° badge and open the viewer. */
    model: z.string().optional(),
    poster: z.string().optional(),
    specs: z.object({
      size: z.string(),
      material: text,
      finish: text,
      moq: z.string(),
      lead: text,
    }),
  }),
});

export const collections = { products };

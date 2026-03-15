import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    vertical: z.string(),
    source_url: z.string().url(),
    source_name: z.string(),
    published_date: z.coerce.date(),
    status: z.enum(['draft', 'review', 'approved', 'published']),
    quality_tier: z.enum(['brief', 'standard', 'deep']).default('standard'),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
  }),
});

export const collections = { articles };

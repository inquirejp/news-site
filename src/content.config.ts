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

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
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
    event_name: z.string(),
    event_date: z.coerce.date(),
    event_date_end: z.coerce.date().optional(),
    venue_name: z.string(),
    venue_type: z.enum(['online', 'offline', 'hybrid']),
    organizer: z.string(),
    registration_url: z.string().url(),
    fee: z.string().optional(),
  }),
});

const curations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/curations' }),
  schema: z.object({
    title: z.string(),
    vertical: z.string(),
    source_url: z.string().url(),
    source_name: z.string(),
    published_date: z.coerce.date(),
    status: z.enum(['draft', 'review', 'approved', 'published']),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    editorial_comment: z.string(),
    feed_source: z.string().optional(),
  }),
});

export const collections = { articles, events, curations };

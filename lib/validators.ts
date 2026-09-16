import { z } from 'zod';

export const adminUserCreateSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(254),
  password: z.string().min(8, 'Mínimo 8 caracteres').max(200),
});

export const adminUserUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  email: z.string().email().max(254).optional(),
  password: z.string().min(8, 'Mínimo 8 caracteres').max(200).optional(),
});

export const statSchema = z.object({
  icon: z.string().min(1),
  value: z.coerce.number().int(),
  prefix: z.string().default(''),
  suffix: z.string().default(''),
  label: z.string().min(1),
  order: z.coerce.number().int().default(0),
});

export const activitySchema = z.object({
  image: z.string().min(1),
  category: z.string().min(1),
  categoryColor: z.string().default('blue'),
  title: z.string().min(1),
  date: z.coerce.date(),
  description: z.string().min(1),
  order: z.coerce.number().int().default(0),
});

export const programSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Solo minúsculas, números y guiones'),
  icon: z.string().min(1),
  image: z.string().min(1),
  title: z.string().min(1),
  shortDesc: z.string().min(1),
  fullDesc: z.string().min(1),
  beneficiaries: z.string().min(1),
  category: z.string().min(1),
  order: z.coerce.number().int().default(0),
});

export const teamMemberSchema = z.object({
  initials: z.string().min(1).max(3),
  name: z.string().min(1),
  role: z.string().min(1),
  color: z.string().default('blue'),
  photo: z.string().optional().nullable(),
  order: z.coerce.number().int().default(0),
});

export const allySchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  icon: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  order: z.coerce.number().int().default(0),
});

export const galleryImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  category: z.string().min(1),
  order: z.coerce.number().int().default(0),
});

export const evidenceSchema = z.object({
  title: z.string().min(1),
  date: z.coerce.date(),
  programId: z.preprocess((val) => (val === '' ? null : val), z.string().nullable().optional()),
  description: z.string().min(1),
  type: z.string().min(1),
  fileUrl: z.string().optional().nullable(),
  order: z.coerce.number().int().default(0),
});

export const testimonialSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  text: z.string().min(1),
  order: z.coerce.number().int().default(0),
});

export const transparencyDocumentSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  date: z.coerce.date(),
  year: z.coerce.number().int(),
  fileUrl: z.string().optional().nullable(),
  order: z.coerce.number().int().default(0),
});

export const missionValueSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  text: z.string().min(1),
  order: z.coerce.number().int().default(0),
});

export const historyStatSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  order: z.coerce.number().int().default(0),
});

export const siteSettingsSchema = z.object({
  address: z.string().default(''),
  phone: z.string().default(''),
  whatsappNumber: z.string().default(''),
  email: z.string().default(''),
  hoursWeekdays: z.string().default(''),
  facebookUrl: z.string().default(''),
  instagramUrl: z.string().default(''),
  twitterUrl: z.string().default(''),
  youtubeUrl: z.string().default(''),
});

export const emailRecipientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export const emailTemplateSchema = z.object({
  subject: z.string().min(1),
  body: z.string().min(1),
});

export const aboutContentSchema = z.object({
  historyParagraph1: z.string().default(''),
  historyParagraph2: z.string().default(''),
  heroImage: z.string().default(''),
  historyImage: z.string().default(''),
});

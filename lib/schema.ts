import { z } from 'zod';

export const nameSchema = z.string().min(3).max(50);
export const imageURLSchema = z.string().url();
export const ageSchema = z.string().regex(/^(1[89]|[2-9][0-9]|1[01][0-9]|120)$/);
export const phoneNumberSchema = z.string().regex(/^\d{10}$/);

import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string({ error: 'username jest wymagany' }).trim().min(3, 'Min. 3 znaki').max(32, 'Max. 32 znaki')
    .regex(/^[a-zA-Z0-9_]+$/, 'Tylko litery, cyfry i _'),
  displayName: z.string().trim().min(1).max(50).optional(),
});

export const createServerSchema = z.object({
  name: z.string({ error: 'name jest wymagane' }).trim().min(2, 'Min. 2 znaki').max(50, 'Max. 50 znaków'),
  ownerId: z.string({ error: 'ownerId jest wymagany' }).min(1),
});

export const updateServerSchema = z.object({
  name: z.string().trim().min(2).max(50),
});

export const createChannelSchema = z.object({
  name: z.string().trim().min(1).max(32)
    .regex(/^[a-z0-9-]+$/, 'Tylko małe litery, cyfry i -'),
  type: z.enum(['text', 'voice']).default('text'),
});

export const updateChannelSchema = z.object({
  name: z.string().trim().min(1).max(32).regex(/^[a-z0-9-]+$/).optional(),
}).refine((d) => Object.keys(d).length > 0, 'Podaj co najmniej jedno pole');

export const createMessageSchema = z.object({
  authorId: z.string({ error: 'authorId jest wymagany' }).min(1),
  content: z.string({ error: 'content jest wymagany' }).trim().min(1, 'Wiadomość nie może być pusta').max(2000),
});

export const updateMessageSchema = z.object({
  content: z.string().trim().min(1).max(2000),
});

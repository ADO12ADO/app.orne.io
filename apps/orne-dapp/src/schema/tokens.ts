import { z } from 'zod';

export const TalisTokensSchema = z.object({
	ids: z.array(z.string()),
});

export const TalisNftInfoSchema = z.object({
	token_uri: z.string(),
});

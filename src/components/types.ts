import {z} from 'zod';

export const EditProfileFormFields = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email().optional(),
});

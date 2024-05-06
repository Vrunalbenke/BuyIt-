import {CountryCodeList} from 'react-native-country-picker-modal';
import {z} from 'zod';

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

const validCountries = CountryCodeList.map(country => country);

export const loginSchema = z.object({
  country_cca2: z.enum(validCountries as [string, ...string[]]),
  country_code: z.string(),
  phone_number: z.string().length(10),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      passwordRegex,
      'Password must contain at least one uppercase letter, one digit, and one special character',
    ),
  device_id: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  email: z.string().email(),
});

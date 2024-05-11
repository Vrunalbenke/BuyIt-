import {CountryCodeList} from 'react-native-country-picker-modal';
import {z} from 'zod';

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

const validCountries = CountryCodeList.map(country => country);

export const loginSchema = z.object({
  country_cca2: z.enum(validCountries as [string, ...string[]]),
  country_code: z.string(),
  phone_number: z
    .string()
    .length(10, 'Phone number should be exactly 10 digits'),
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
  fcm_token: z.string(),
});

export const SignUpSchema = z
  .object({
    country_cca2: z.enum(validCountries as [string, ...string[]]),
    country_code: z.string(),
    phone_number: z
      .string()
      .length(10, 'Phone number should be exactly 10 digits'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        passwordRegex,
        'Password must contain at least one uppercase letter, one digit, and one special character',
      ),
    confirmPassword: z.string(),
    device_id: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    email: z.string().email().optional(),
    fcm_token: z.string(),
    name: z.string().regex(/^[a-zA-Z]+$/, {
      message: 'Name should contain only letters.',
    }),
    AllowSms: z.boolean(),
    PrivacyPolicy: z.boolean(),
    TermsAndCondition: z.boolean(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Password and Confirm Password don't match",
    path: ['confirmPassword'],
  });

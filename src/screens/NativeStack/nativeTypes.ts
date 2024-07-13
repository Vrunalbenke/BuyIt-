import {CountryCodeList} from 'react-native-country-picker-modal';
import {z} from 'zod';

const validCountries = CountryCodeList.map(country => country);

export const AddBusinessSchema = z
  .object({
    country_cca2: z.enum(validCountries as [string, ...string[]]),
    country_code: z.string(),
    phone_number: z
      .string()
      .length(10, 'Phone number should be exactly 10 digits')
      .optional(),
    name: z.string(),
    business_type: z.string(),
    is_service: z.boolean(),
    email: z.string().email().optional(),
    description: z.string().optional(),
    radius_served: z.string().optional(),
    website: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    office_location: z
      .object({
        latitude: z.number(),
        longitude: z.number(),
      })
      .optional(),
    share_email: z.string(),
    share_phone: z.string(),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    useLocation: z.string(),
    url: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.is_service) {
      if (!data.radius_served) {
        ctx.addIssue({
          code: 'custom',
          path: ['radius_served'],
          message: 'radius_served is required',
        });
      }
      if (!data.office_location) {
        ctx.addIssue({
          code: 'custom',
          path: ['office_location'],
          message: 'office_location is required',
        });
      }

      if (!data.phone_number) {
        ctx.addIssue({
          code: 'custom',
          path: ['phone_number'],
          message: 'Phone Number is required',
        });
      }

      if (data.share_email === 'False' && data.share_phone === 'False') {
        ctx.addIssue({
          code: 'custom',
          path: ['share_email'],
          message: 'Either Phone Number or Email should be share for Services',
        });
        ctx.addIssue({
          code: 'custom',
          path: ['share_phone'],
          message: 'Either Phone Number or Email should be share for Services',
        });
      }
    }
  });

export type businessTypesObject = {
  [x: string]: any;
  id: number;
  business_icon: string;
  is_home: boolean;
  is_service: boolean;
  name: string;
};

export const AddItemSchema = z
  .object({
    business_id: z.string(),
    name: z.string(),
    description: z.string(),
    isUnit: z.boolean(),
    unit: z.string().optional(),
    price: z.string().regex(/^[-+]?\d+(\.\d{1,2})?$/, 'Enter a valid price'),
    quantity: z
      .string()
      .regex(/^[-+]?\d+(\.\d{1,2})?$/, 'Enter a valid quantity')
      .optional(),
    url: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isUnit) {
      if (!data.unit) {
        ctx.addIssue({
          code: 'custom',
          path: ['unit'],
          message: 'Units are required',
        });
      }
    }
  });

import {CountryCodeList} from 'react-native-country-picker-modal';
import {z} from 'zod';

const validCountries = CountryCodeList.map(country => country);

export const AddBusinessSchema = z
  .object({
    country_cca2: z.enum(validCountries as [string, ...string[]]),
    country_code: z.string(),
    phone_number: z
      .string()
      .length(10, 'Phone number should be exactly 10 digits'),
    name: z.string(),
    business_type: z.string(),
    is_service: z.boolean(),
    email: z.string().optional(),
    description: z.string().optional(),
    radius_served: z.string(),
    website: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    office_location: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    share_email: z.string(),
    share_phone: z.string(),
    latitude: z.number(),
    longitude: z.number(),
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

      if (data.share_email === 'False' && data.share_phone === 'False') {
        ctx.addIssue({
          code: 'custom',
          path: ['share_email'],
          message:
            'Either share_email or share_phone must be true when is_service is true',
        });
        ctx.addIssue({
          code: 'custom',
          path: ['share_phone'],
          message:
            'Either share_email or share_phone must be true when is_service is true',
        });
      }
    }
  });

export type businessTypesObject = {
  [x: string]: any;
  business_icon: string;
  is_home: boolean;
  is_service: boolean;
  name: string;
};
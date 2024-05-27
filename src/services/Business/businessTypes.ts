export type BusinessTypesResponse = {
  [key: string]: {
    business_icon: string;
    is_home: boolean;
    is_service: boolean;
  };
};

export type CreateBusinessRequest = {
  name: string;
  business_type: string;
  country_code: string;
  phone_number?: string;
  email?: string;
  description?: string;
  share_email: string;
  share_phone: string;
  useLocation: string;
  facebook?: string;
  instagram?: string;
  office_location?: {
    latitude: number;
    longitude: number;
  };
  radius_served?: string;
  website?: string;
  latitude: string;
  longitude: string;
};

export type CreateBusinessResponse = {
  alias: string;
  business_type: string;
  country_code: string;
  created_at: string;
  description: string;
  email: string;
  id: string;
  in_home: boolean;
  is_service: boolean;
  isopen: string;
  latitude: number;
  longitude: number;
  name: string;
  opened_at: string | null;
  phone_number: string;
  prevloc: string | null;
  share_email: string;
  share_phone: string;
  subscription_status: string;
  subscription_type: string;
  updated_at: string | null;
};

export type GetDefaultItemsRequest = {
  business_type: string;
  business_id: string;
};

export type GetDefaultItemsResponse = {
  [key: string]: string;
};

export type GetUnitsRequest = {
  business_type: string;
  business_id: string;
};

export type AddItemRequest = {
  business_id: string;
  name: string;
  description: string;
  price: string;
  unit: string;
  quantity?: string;
};

export type AddItemResponse = {
  data: {
    business_id: number;
    business_type: string;
    description: string;
    id: number;
    name: string;
    price: number;
    quantity: number;
    unit?: string;
  };
  message: string;
};

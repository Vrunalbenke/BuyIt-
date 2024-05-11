export type LoginRequest = {
  country_cca2: string;
  country_code: string;
  phone_number: string;
  password: string;
  device_id: string;
  latitude: number;
  longitude: number;
  email: string;
};

export type LoginResponse = {
  accessToken: {
    expires: number;
    token: string;
  };
  refreshToken: {
    expires: number;
    token: string;
  };
};

export type ValidateNumberRequest = {
  name: string;
  country_code: string;
  phone_number: string;
  is_existing_user: string;
};

export type ValidateNumberResponse = {
  data?: {
    message: string;
  };
  Msg: string;
  OTP: number;
};

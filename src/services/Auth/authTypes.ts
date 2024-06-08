export type LoginRequest = {
  country_cca2: string;
  country_code: string;
  phone_number: string;
  password: string;
  device_id: string;
  latitude: number;
  longitude: number;
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
  name: string | undefined;
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

export type ValidateOTPRequest = {
  country_code: string;
  phone_number: string;
  OTP: number;
};

export type ValidateOTPResponse = {
  message: string;
};

export type CreateUserRequest = {
  country_code: string;
  device_id: string;
  email: string | undefined;
  fcm_token: string;
  name: string;
  password: string;
  phone_number: string;
};

export type CreateUserResponse = {
  accessToken: {
    expires: number;
    token: string;
  };
  refreshToken: {
    expires: number;
    token: string;
  };
};

export type ResetPasswordRequest = {
  country_code: string;
  phone_number: string;
  new_password: string;
  confirm_password: string;
};

export type ResetPasswordResponse = {
  message?: string;
  error?: string;
};

export type GetUserResponse = {
  country_code: string;
  email: string | null;
  name: string;
  phone_number: string;
};

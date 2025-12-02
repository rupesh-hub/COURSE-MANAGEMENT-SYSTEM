import {FormControl} from '@angular/forms';

export interface AuthenticationRequest {
  username: string;
  password: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type RegistrationFormModel = {
  firstname: FormControl<string | null>;
  lastname: FormControl<string | null>;
  username: FormControl<string | null>;
  email: FormControl<string | null>;
  bio: FormControl<string | null>;
  phone: FormControl<string | null>;
  profile: FormControl<File | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
};

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  bio: string;
  isActive: boolean;
  role: RoleResponse;
  createdOn: string;
  createdBy: string;
  modifiedOn: string;
  modifiedBy: string;
  profile: ImageResponse;
}

export interface ImageResponse {
  id: number;
  path: string;
  name: string;
  type: string;
  size: string;
}

export interface RoleResponse {
  id: number;
  name: string;
  description: string;
  createdOn: string;
  createdBy: string;
  modifiedOn: string;
  modifiedBy: string;
}


export interface GlobalResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
  errors: Array<string>;
}

export interface AuthenticationRequest {
  username: string
  password: string
}

export interface AuthenticationResponse {
  token: string
  refresh_token: string
  name: string
  username: string
  email: string
  roles: string[]
  initiate_at: string
  expire_at: string
}

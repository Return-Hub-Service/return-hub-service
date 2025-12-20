export interface RegisterStep1Data {
  email: string;
  password: string;
}

export interface RegisterStep2Data {
  verificationCode: string;
}

export interface RegisterStep3Data {
  fullName: string;
  phoneNumber: string;
}

export interface RegisterFormData
  extends RegisterStep1Data,
    RegisterStep2Data,
    RegisterStep3Data {}

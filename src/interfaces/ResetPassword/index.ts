export interface ResetPasswordStep1Data {
  email: string;
}

export interface ResetPasswordStep2Data {
  verificationCode: string;
}

export interface ResetPasswordStep3Data {
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordFormData
  extends ResetPasswordStep1Data,
    ResetPasswordStep2Data,
    ResetPasswordStep3Data {}

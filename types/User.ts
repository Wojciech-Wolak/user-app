export type UserRegisterFields = {
    nickname: string;
    firstname: string; 
    lastname: string; 
    password: string; 
    confirmPassword: string; 
    email: string;
    birthdate: string;
    'custom:city': string
}

export type UserVerificationFields = {
    username: string;
    code: string;
}

export type UserForgotPasswordEmailFields = {
    email: string;
}

export type UserForgotPasswordCodeFields = {
    code: string;
}

export type UserNewPasswordFields = {
    password: string;
    confirmPassword: string;    
}
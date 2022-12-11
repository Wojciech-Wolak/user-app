export type UserRegisterFields = {
    nickname: string;
    firstname: string; 
    lastname: string; 
    password: string; 
    confirmPassword: string; 
    email: string;
    birthdate: string;
}

export type UserVerificationFields = {
    code: string
}

export type UserForgotPasswordEmailFields = {
    email: string;
}

export type UserForgotPasswordCodeFields = {
    email: string;
}

export type UserNewPasswordFields = {
    password: string;
    confirmPassword: string;    
}
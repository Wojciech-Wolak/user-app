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

export type UserForgotPasswordFields = {
    email: string;
    password: string;
    confirmPassword: string;    
}
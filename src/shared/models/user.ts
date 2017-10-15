import { RoleModel } from './'

export interface UserModel {
    id: number
    email: string
    role: RoleModel
}

export interface UserRegisterModel {
    email: string
    password: string
    confirmPassword: string
}

export interface UserLoginModel {
    email: string
    password: string
}

import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/auth/',
    withCredentials: true,
    headers: {
        'API-KEY': 'fe3cd028-48b8-4f24-aace-482e17e6fa4c'
    }
})

//API
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>(`login`, data)
    },
    logout() {
        return instance.delete<ResponseType<{ userId?: number }>>('login')
    },
    me() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>('me')
    }
}


//types
export type FieldErrorType = { field: string, error: string };
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<FieldErrorType>
    data: D
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
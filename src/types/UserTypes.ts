export interface UserRes {
    id: number
    name: string
    email: string
    token?: string
}
export interface UserReq {
    username: string
    password: string
    email: string
}
export interface LoginUser {
    email: string
    password: string
}

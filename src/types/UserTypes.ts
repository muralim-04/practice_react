export interface UserRes {
    id: number
    userName: string
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

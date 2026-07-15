export interface UserRes {
    id: number
    name: string
    email: string
}
export interface UserReq {
    name: string
    password: string
    email: string
}
export interface Response<T> {
    data: T
    success: string
    message: string
}
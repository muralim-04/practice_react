export interface UserRes {
    id: number
    userName: string
    avatarUrl?: string
    isAdmin?: boolean
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

export interface UserProfile {
    userName: string
    bio: string
    avatarUrl: string
    email: string
}
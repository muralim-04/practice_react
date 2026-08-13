    export interface PostReq {
        title: string
        content: string
        image: File | null
    }
    export interface PostRes {
        id: number
        title: string
        content: string
        imageUrl: string | null
        createdAt: string
        userName: string
    }
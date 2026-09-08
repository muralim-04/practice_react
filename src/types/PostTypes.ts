    export interface PostReq {
        content: string
        image: File | null
    }

    export interface PostRes {
        id: number
        userId: number
        content: string
        imageUrl: string | null
        createdAt: string
        username: string
    }

    export interface PaginationResult<T> {
        items: T[]
        pageNumber: number
        pageSize: number
        totalCount: number
        totalPages: number
        hasPreviousPage: boolean
        hasNextPage: boolean
    }
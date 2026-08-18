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

    export interface PaginationResult<T> {
        items: T[]
        pageNumber: number
        pageSize: number
        totalCount: number
        totalPages: number
        hasPreviousPage: boolean
        hasNextPage: boolean
    }
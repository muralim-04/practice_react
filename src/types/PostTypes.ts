    export interface PostReq {
        content: string
        image: File | null
    }

    export interface PostRes {
        id: number
        userId: number
        username: string
        userProfileImageUrl: string
        content: string
        imageUrl: string | null
        likeCount: number
        isLikedByCurrentUser: false
        commentCount: number
        createdAt: string
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

    export interface LikePostRes {
        postId: number
        isLiked: boolean
        likeCount: number
    }
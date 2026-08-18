import { useSuspenseQuery } from "@tanstack/react-query";
import { postsServices } from "../../services/postsService";
import type { PaginationResult, PostRes } from "../../types/PostTypes";
import { useSearchParams } from "react-router-dom";
import PostCard from "../../components/PostCard";


export default function HomePage () {
   const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = Number(searchParams.get('pageNumber')) || 1;
  const pageSize = 6;

  const { data: posts } = useSuspenseQuery<PaginationResult<PostRes>>({
    queryKey: ['posts', pageNumber, pageSize],
    queryFn: () => postsServices.getAllPosts(pageNumber, pageSize),
  });

  const setPage = (newPage: number) => {
    searchParams.set('pageNumber', String(newPage));
    setSearchParams(searchParams);
  };

    return (
        <div className="feed-container">
            {/* The new Grid Container */}
            <div className="posts-grid">
            {posts.items.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-controls">
            <button 
                onClick={() => setPage(pageNumber - 1)} 
                disabled={!posts.hasPreviousPage}
            >
                Previous
            </button>

            <span>Page {posts.pageNumber} of {posts.totalPages}</span>

            <button 
                onClick={() => setPage(pageNumber + 1)} 
                disabled={!posts.hasNextPage}
            >
                Next
            </button>
            </div>
        </div>
    )
}
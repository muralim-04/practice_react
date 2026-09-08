import { useSuspenseQuery } from "@tanstack/react-query";
import { postServices } from "../../services/postService";
import type { PaginationResult, PostRes } from "../../types/PostTypes";
import { useSearchParams } from "react-router-dom";
import PostCard from "../../components/PostCard";
import CreatePost from "../../components/CreatePost";


export default function HomePage () {
   const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = Number(searchParams.get('pageNumber')) || 1;
  const pageSize = 5;

  const { data: posts } = useSuspenseQuery<PaginationResult<PostRes>>({
    queryKey: ['posts', pageNumber, pageSize],
    queryFn: () => postServices.getAllPosts(pageNumber, pageSize),
  });

  const setPage = (newPage: number) => {
    searchParams.set('pageNumber', String(newPage));
    setSearchParams(searchParams);
  };

    return (
        <div className="feed-container">
            <div className="posts-feed">
                <CreatePost />
                {posts.items.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

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
    );
}
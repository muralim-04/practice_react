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
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
            <div className="min-h-screen w-full border-x border-[#2f3336]">
                <CreatePost />
                {posts.items.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            <div className="flex w-full max-w-3xl items-center justify-center gap-4 border-x border-b border-[#2f3336] p-5 text-[#e7e9ea]">
            <button 
                onClick={() => setPage(pageNumber - 1)} 
                disabled={!posts.hasPreviousPage}
                className="rounded-full border-0 bg-[#eff3f4] px-4 py-2 font-bold text-[#0f1419] disabled:cursor-not-allowed disabled:opacity-50"
            >
                Previous
            </button>

            <span>Page {posts.pageNumber} of {posts.totalPages}</span>

            <button 
                onClick={() => setPage(pageNumber + 1)} 
                disabled={!posts.hasNextPage}
                className="rounded-full border-0 bg-[#eff3f4] px-4 py-2 font-bold text-[#0f1419] disabled:cursor-not-allowed disabled:opacity-50"
            >
                Next
            </button>
            </div>
        </div>
    );
}
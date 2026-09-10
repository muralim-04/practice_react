import { postServices } from "../services/postService";
import { useUserStore } from "../stores/userStore";
import type { PaginationResult, PostRes } from "../types/PostTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PostCardProps {
  post: PostRes;
}

export default function PostCard({ post }: PostCardProps) {
  const queryClient = useQueryClient();

  const user = useUserStore((state) => state.user);

  const formattedDate = new Date(post.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  const deletePostMutation = useMutation({
    mutationFn: (id: number) => postServices.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("Failed to delete post:", error);
    },
  });

  const baseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

  const fullPostImageUrl = post.imageUrl
    ? `${baseUrl}/${post.imageUrl.replace(/^\//, "")}`
    : undefined;

  const fullAvatarUrl = post.userProfileImageUrl
    ? `${baseUrl}/${post.userProfileImageUrl.replace(/^\//, "")}`
    : undefined;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePostMutation.mutate(post.id);
    }
  };

  const handleLike = async () => {
    const data = await postServices.likePost(post.id);
    queryClient.setQueriesData({ queryKey: ["posts"] }, (old: PaginationResult<PostRes>) => {
      if (!old) return old;
      return {
        ...old,
        items: old.items.map((p: PostRes) =>
          p.id === data.postId
            ? { ...p, isLikedByCurrentUser: data.isLiked, likeCount: data.likeCount }
            : p
        ),
      };
    });
  }

  return (
    <div className="w-full cursor-pointer border-b-2 border-[#131111] p-4 transition-colors hover:bg-white/[0.03]">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {fullAvatarUrl ? (
            <img
              src={fullAvatarUrl}
              alt={post.username}
              className="h-11 w-11 shrink-0 rounded-full border border-[#2f3336] object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#2f3336] bg-[#2e303a] text-sm font-semibold text-[#e7e9ea]">
              {post.username?.charAt(0).toUpperCase()}
            </div>
          )}

          <span className="text-[0.9rem] text-[#71767b]">
            @{post.username} · {formattedDate}
          </span>
        </div>

        {(user?.id === post.userId || user?.isAdmin) && (
          <button
            onClick={handleDelete}
            disabled={deletePostMutation.isPending}
            className="rounded-full border-0 bg-[#fa5822] px-3 py-1 text-sm text-[#111010] transition-colors hover:bg-[#ff4000] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deletePostMutation.isPending ? "deleting..." : "delete"}
          </button>
        )}
      </div>

      <p className="mb-3 whitespace-pre-wrap text-[0.95rem] leading-6 text-[#e7e9ea]">{post.content}</p>

      {fullPostImageUrl && (
        <img
          src={fullPostImageUrl}
          alt={post.content}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="mt-2 block max-h-[500px] w-full rounded-2xl border border-[#2f3336] object-cover"
        />
      )}

      <div className="mt-3 flex items-center gap-8 pt-2">
        <button
          onClick={handleLike}
          type="button"
          className={`flex items-center gap-1.5 rounded-full border-0 bg-transparent px-2 py-1.5 text-[0.85rem] text-[#71767b] transition-colors hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0] ${post.isLikedByCurrentUser ? "text-[#f91880] hover:bg-[#f91880]/10" : ""}`}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>{post.likeCount}</span>
        </button>

        <button type="button" className="flex items-center gap-1.5 rounded-full border-0 bg-transparent px-2 py-1.5 text-[0.85rem] text-[#71767b] transition-colors hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0]">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
          </svg>
          <span>{post.commentCount}</span>
        </button>
      </div>
    </div>
  );
}
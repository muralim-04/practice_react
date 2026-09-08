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
    <div className="post-card">
      <div className="post-card-header">
        <div className="post-author-info">
          {fullAvatarUrl ? (
            <img
              src={fullAvatarUrl}
              alt={post.username}
              className="post-avatar"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="post-avatar-placeholder">
              {post.username?.charAt(0).toUpperCase()}
            </div>
          )}

          <span className="post-card-meta">
            @{post.username} · {formattedDate}
          </span>
        </div>

        {(user?.id === post.userId || user?.isAdmin) && (
          <button
            onClick={handleDelete}
            disabled={deletePostMutation.isPending}
            className="btn-delete"
          >
            {deletePostMutation.isPending ? "deleting..." : "delete"}
          </button>
        )}
      </div>

      <p className="post-card-content">{post.content}</p>

      {fullPostImageUrl && (
        <img
          src={fullPostImageUrl}
          alt={post.content}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="post-card-image"
        />
      )}

      <div className="post-card-footer">
        <button
          onClick={handleLike}
          type="button"
          className={`post-action-btn ${post.isLikedByCurrentUser ? "liked" : ""}`}
        >
          <svg className="action-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>{post.likeCount}</span>
        </button>

        <button type="button" className="post-action-btn">
          <svg className="action-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
          </svg>
          <span>{post.commentCount}</span>
        </button>
      </div>
    </div>
  );
}
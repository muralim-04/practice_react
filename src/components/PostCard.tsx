import { postsServices } from "../services/postsService";
import { useUserStore } from "../stores/userStore";
import type { PostRes } from "../types/PostTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PostCardProps {
  post: PostRes;
}

export default function PostCard({ post }: PostCardProps) {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const formattedDate = new Date(post.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

  const deletePostMutation = useMutation({
      mutationFn: (id: number) => postsServices.deletePost(id),
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['posts'] });
      },
      onError: (error) => {
          console.error('Failed to delete post:', error);
      }
  });

  const fullImageUrl = post.imageUrl
    ? `${import.meta.env.VITE_API_URL}/${post.imageUrl.replace(/^\//, '')}`
    : undefined;

  return (
    <div className="post-card">
      <div className="post-card-header">
        <span className="post-card-meta">
          @{post.username} · {formattedDate}
        </span>
        <div>
          {(user?.id === post.userId || user?.isAdmin) && (
            <button 
              onClick={() => deletePostMutation.mutate(post.id)}
              disabled={deletePostMutation.isPending} 
              className="btn-delete"
            >
              {deletePostMutation.isPending ? 'deleting...' : 'delete'}
            </button>
          )}
        </div>
      </div>
      
      <p className="post-card-content">{post.content}</p>

      {post.imageUrl && (
        <img 
          src={fullImageUrl} 
          alt={post.content} 
          onError={(e) => {
              e.currentTarget.style.display = 'none';
          }}
          className="post-card-image" 
        />
      )}
    </div>
  );
}
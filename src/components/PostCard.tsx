import type { PostRes } from "../types/PostTypes";

interface PostCardProps {
  post: PostRes;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

  const fullImageUrl = post.imageUrl
    ? `${import.meta.env.VITE_API_URL}/${post.imageUrl.replace(/^\//, '')}`
    : undefined;

  return (
    <div className="post-card">
      <div className="post-card-header">
        <h2 className="post-card-title">{post.title}</h2>
        <span className="post-card-meta">
          @{post.userName} · {formattedDate}
        </span>
      </div>
      
      <p className="post-card-content">{post.content}</p>

      {post.imageUrl && (
        <img 
          src={fullImageUrl} 
          alt={post.title} 
          onError={(e) => {
              e.currentTarget.style.display = 'none';
          }}
          className="post-card-image" 
        />
      )}
    </div>
  );
}
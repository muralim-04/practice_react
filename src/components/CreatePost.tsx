import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PostReq } from "../types/PostTypes";
import { postsServices } from "../services/postsService";

export default function CreatePost() {
    const queryClient = useQueryClient();
    
    const [postForm, setPostForm] = useState<PostReq>({
        title: '',
        content: '',
        image: null
    });

    const createPostMutation = useMutation({
        mutationFn: (formData: FormData) => postsServices.createPost(formData),
        onSuccess: () => {
            setPostForm({ title: '', content: '', image: null });
            
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
        onError: (error) => {
            console.error('Failed to create post:', error);
        }
    });

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPostForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPostForm(prev => ({ ...prev, image: e.target.files![0] }));
        }
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!postForm.title || !postForm.content) return; 

        const formData = new FormData();

        formData.append('Title', postForm.title);
        formData.append('Content', postForm.content);

        if (postForm.image) {
            formData.append('Image', postForm.image); 
        }

        createPostMutation.mutate(formData);
    };

    return (
        <div className="create-post-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={postForm.title}
                    onChange={handleTextChange}
                    placeholder="Post Title"
                    className="create-post-title"
                    autoComplete="off"
                />

                <textarea
                    name="content"
                    value={postForm.content}
                    onChange={handleTextChange}
                    placeholder="What's happening?"
                    className="create-post-textarea"
                    rows={3}
                />

                <div className="create-post-actions">
                    <div className="action-icons">
                        <label className="image-upload-label" title="Attach Image">
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                            />
                            <svg viewBox="0 0 24 24" aria-hidden="true" width="20" fill="currentColor">
                                <g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></g>
                            </svg>
                        </label>
                        
                        {postForm.image && <span className="file-name">{postForm.image.name}</span>}
                    </div>

                    <button 
                        type="submit" 
                        className="btn-post"
                        disabled={createPostMutation.isPending || !postForm.title || !postForm.content}
                    >
                        {createPostMutation.isPending ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </form>
        </div>
    );
}
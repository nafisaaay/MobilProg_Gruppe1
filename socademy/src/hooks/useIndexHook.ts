import { useEffect, useState } from "react";
import { Post } from "../utils/PostSchema";
import { ApiPost, BASE_URL } from "../api/posts";

export function useIndexHook(){
    const [allMyPosts, setAllMyPosts] = useState<ApiPost[]>([]);

    function handleRegisteredPost(postId: number, postTitle: string, postText: string){
        const newPost = {
            id: postId,
            title: postTitle,
            text: postText,
        };
        setAllMyPosts((prevPosts) => [...prevPosts, newPost]);
    }

    useEffect(()=>{
        const fetchPostFromApi = async () => {
            try{
                const response = await fetch(`${BASE_URL}/posts`);
                if(!response.ok){
                    throw new Error("failed to fetch posts");
                }
                const data: ApiPost[] = await response.json();
                setAllMyPosts(data);
            }
            catch(error){
                console.error("error while fetching posts",error)
            }

        }
        fetchPostFromApi();
    }, []);
    return{
        posts: allMyPosts,
        add: handleRegisteredPost,
    };
}

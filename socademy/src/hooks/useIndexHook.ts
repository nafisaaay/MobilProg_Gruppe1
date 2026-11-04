import { useEffect, useState } from "react";
import { Post } from "../utils/PostSchema";
import { ApiPost, URL } from "../api/posts";

export function useIndexHook() {
  const [allMyPosts, setAllMyPosts] = useState<ApiPost[]>([]);

  /* BLIR FEIL da det ble gjort endringer på ApiPostSchema.
  function handleRegisteredPost(
    postId: number,
    postTitle: string,
    postText: string,
  ) {
    const newPost = {
      id: postId,
      title: postTitle,
      text: postText,
    };
    setAllMyPosts((prevPosts) => [...prevPosts, newPost]);
  } */

  /* Riktig versjon: 
  Tar imot ferdig innlegg (slik serveren sender det tilbake) siden userid, username og createdat + updatedat bestemmes av server.
   */
  function handleRegisteredPost(newPost: ApiPost) {
    setAllMyPosts((prevPosts) => [...prevPosts, newPost]);
  }

  useEffect(() => {
    const fetchPostFromApi = async () => {
      try {
        const response = await fetch(`${URL}/posts`);
        if (!response.ok) {
          throw new Error("failed to fetch posts");
        }
        const data: ApiPost[] = await response.json();
        setAllMyPosts(data);
      } catch (error) {
        console.error("error while fetching posts", error);
      }
    };
    fetchPostFromApi();
  }, []);
  return {
    posts: allMyPosts,
    add: handleRegisteredPost,
  };
}

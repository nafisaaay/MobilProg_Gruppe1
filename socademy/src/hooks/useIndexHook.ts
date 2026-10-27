import { useState } from "react";
import { Post } from "../utils/PostSchema";

export function useIndexHook(){
    const [allMyPosts, setAllMyPosts] = useState<Post[]>();
}
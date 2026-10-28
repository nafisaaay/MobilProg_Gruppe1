import {z} from "zod";

export const BASE_URL = "https://socademy.socademy-hiof.workers.dev/api/v3";

export const ApiPostScehma = z.object({
    id: z.number(),
    title: z.string(), 
    text: z.string()
});

export type ApiPost = z.infer<typeof ApiPostScehma>;

export async function getAllPosts(): Promise<ApiPost[]> {
    const response = await fetch(`${BASE_URL}/posts`);

    if(!response.ok){
        throw new Error(`Could not get all posts(${response.status})`);
    }
    const json = await response.json();
    return z.object({data: z.array(ApiPostScehma)}).parse(json).data;
}

export async function createPost(input:{
    title: string;
    text: string;
}) : Promise<ApiPost>{
     const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers:{"content-type": "application/json"},
        body: JSON.stringify(input),
     });
     const json = await response.json();
     if(!response.ok){
        throw new Error(
            json.error?.fieldErrors?.title?.[0] ?? 
            json.error?.message ??
            `could not save post(${response.status})`
        )
     };
     return z.object({data: ApiPostScehma}).parse(json).data;
}

export async function updatePost(id: number, input: {title?:string; text?: string}) : Promise<ApiPost>{
     const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "PATCH", 
        headers:{"content-type": "application/json"},
        body: JSON.stringify(input),
     });
    const json = await response.json();

    if(!response.ok){
        throw new Error(
            json.error?.message ?? `could not update (${response.status})`
        )
    }

    return z.object({data: ApiPostScehma}).parse(json).data;
}
export async function getPost(id: number) : Promise<ApiPost> {
     const response = await fetch(`${BASE_URL}/posts/${id}`,);
    if(!response.ok){
        throw new Error(`Could not get post(${response.status})`);
    }
    const json = await response.json();
    return z.object({data: ApiPostScehma}).parse(json).data;
}

export async function removePost(id: number) : Promise<void> {
     const response = await fetch(`${BASE_URL}/posts/${id}`,{
        method: "DELETE",
     }
     );
    if(response.ok) return; 
    const json = await response.json();
    throw new Error(json.error?.message ?? `Could not delete post(${response.status})`)

}
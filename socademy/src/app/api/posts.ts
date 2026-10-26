import {z} from "zod";

const BASE_URL = "http://localhost:5173/api/v1";

export const ApiTaskScehma = z.object({
    id: z.number(),
    title: z.string(), 
    text: z.string()
});

export type ApiTask = z.infer<typeof ApiTaskScehma>;

export async function getAllPosts(): Promise<ApiTask[]> {
    const response = await fetch(`${BASE_URL}/posts`);

    if(!response.ok){
        throw new Error(`Could not get all posts(${response.status})`);
    }
    const json = await response.json();
    return z.object({data: z.array(ApiTaskScehma)}).parse(json).data;
}

export async function createPost(input:{
    title: string;
    text: string;
}) : Promise<ApiTask>{
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
     return z.object({data: ApiTaskScehma}).parse(json).data;
}

export async function updatePost(id: number, input: {title?:string; text?: string}) : Promise<ApiTask>{
     const response = await fetch(`${BASE_URL}/posts`, {
        method: "PATCH", 
        headers:{"content-type": "application/json"},
        body: JSON.stringify(input),
     });
    const json = await response.json();

    if(!response.ok){
        throw new Error(
            json.error?.message
        )
    }

    return z.object({data: ApiTaskScehma}).parse(json).data;
}
export async function getPost(params:type) {
     const response = await fetch(`${BASE_URL}/posts`);
}

export async function removePost(params:type) {
     const response = await fetch(`${BASE_URL}/posts`);
}
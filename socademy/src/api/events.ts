import { z } from "zod";
import { authClient } from "../lib/auth-client";
import { SERVER_URL } from "../constants/meta";

export const EVENTS_URL = `${SERVER_URL}/api/v1/events`;

// Slik ser et event ut når det kommer fra API-et.
// Datoene kommer som tekst (JSON), ikke Date.
export const ApiEventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  location: z.string().nullable(),
  category: z.enum(["social", "study", "sports", "other"]),
  isOutdoor: z.boolean(),
  startsAt: z.string(),
  endsAt: z.string().nullable(),
  createdBy: z.string(),
  createdAt: z.string(),
});

export type ApiEvent = z.infer<typeof ApiEventSchema>;

// Samme som i posts.ts: sender med sesjonen, så serveren vet hvem som er logget inn
async function authHeaders() {
  return {
    "content-type": "application/json",
    Cookie: await authClient.getCookie(),
  };
}

export async function getAllEvents(): Promise<ApiEvent[]> {
  const response = await fetch(EVENTS_URL, {
    headers: await authHeaders(),
    credentials: "omit",
  });

  if (!response.ok) {
    throw new Error(`Could not get events (${response.status})`);
  }
  const json = await response.json();
  return z.object({ data: z.array(ApiEventSchema) }).parse(json).data;
}

export async function createEvent(input: {
  title: string;
  description: string;
  location: string;
  startsAt: string;
  category: string;
  isOutdoor: boolean;
}): Promise<ApiEvent> {
  const response = await fetch(EVENTS_URL, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify(input),
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      json.error?.message ?? `Could not save event (${response.status})`,
    );
  }
  return z.object({ data: ApiEventSchema }).parse(json).data;
}

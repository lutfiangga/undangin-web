import type { APIRoute } from "astro";

const AIRTABLE_BASE_ID = import.meta.env.AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = import.meta.env.AIRTABLE_API_KEY;

export const GET: APIRoute = async () => {
  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Themes?maxRecords=100&sort[0][field]=title`,
    {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    }
  );

  if (!res.ok) {
    return new Response(
      JSON.stringify({
        error: `Failed to fetch Airtable data: ${res.statusText}`,
      }),
      { status: res.status }
    );
  }

  const json = await res.json();

  return new Response(JSON.stringify(json.records), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

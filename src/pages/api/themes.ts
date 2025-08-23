import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  console.log("API KEY (server):", process.env.AIRTABLE_API_KEY);
  console.log("BASE ID (server):", process.env.AIRTABLE_BASE_ID);
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    return new Response(
      JSON.stringify({
        error: "Env not found",
        api: AIRTABLE_API_KEY,
        base: AIRTABLE_BASE_ID,
      }),
      { status: 500 }
    );
  }
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
        error: `Failed to fetch Airtable data: ${res.statusText} api:${AIRTABLE_API_KEY} base: ${AIRTABLE_BASE_ID}`,
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

export async function onRequest(context: any) {
  const { env } = context;

  const AIRTABLE_BASE_ID = env.AIRTABLE_BASE_ID;
  const AIRTABLE_API_KEY = env.AIRTABLE_API_KEY;

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    return new Response(
      JSON.stringify({ error: "Environment variables not found" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Themes?maxRecords=100&sort[0][field]=title`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch Airtable data: ${res.statusText}`);
    }

    const json = await res.json();

    return new Response(JSON.stringify(json.records), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

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
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Pricing?maxRecords=100&sort[0][field]=price`,
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

  const data = json.records.map((rec: any) => {
    const f = rec.fields;

    let benefits: string[] = [];
    if (f.benefit) {
      benefits = f.benefit
        .split(",")
        .map((b: string) => b.replace(/'/g, "").trim())
        .filter(Boolean);
    }

    return {
      id: rec.id,
      category: f.title,
      description: f.description || "",
      price: f.price,
      afterDiscount: f.afterDiscount,
      benefit: benefits,
      bgColor: f.bgColor || "#000",
      textColor: f.textColor || "#fff",
    };
  });

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

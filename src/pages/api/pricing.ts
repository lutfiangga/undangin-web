import type { APIRoute } from "astro";

const AIRTABLE_BASE_ID = import.meta.env.AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = import.meta.env.AIRTABLE_API_KEY;

export const GET: APIRoute = async () => {
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

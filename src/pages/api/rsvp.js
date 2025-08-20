export const prerender = false; // Tambahkan ini untuk endpoint dinamis

export async function POST({ request }) {
  console.log("=== API POST START ===");

  try {
    const contentType = request.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Content-Type must be application/json",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const rawBody = await request.text();
    console.log("Raw body:", rawBody);

    if (!rawBody || rawBody.trim() === "") {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Request body is empty",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    let body;
    try {
      body = JSON.parse(rawBody);
      console.log("Parsed request body:", body);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid JSON in request body",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validasi data
    if (!body.nama || !body.kehadiran) {
      console.log("Missing required fields:", {
        nama: body.nama,
        kehadiran: body.kehadiran,
      });
      return new Response(
        JSON.stringify({
          success: false,
          error: "Nama dan kehadiran harus diisi",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Format data yang konsisten dengan Google Apps Script
    const dataToSend = {
      nama: body.nama.trim(),
      kehadiran: body.kehadiran.toLowerCase() === "ya" ? "ya" : "tidak",
      ucapan_doa: body.ucapan_doa ? body.ucapan_doa.trim() : "",
    };

    console.log("Data to send to Google Apps Script:", dataToSend);

    const googleScriptUrl =
      "https://script.google.com/macros/s/AKfycbz0OqKnEATDyKe043-9qfeCeoVXZxFxaQNGuR_XNf9h4s3z1NYvpE4J8f__Q7nkOaLM7Q/exec";

    console.log("Sending to Google Apps Script...");
    const res = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    console.log("Google Apps Script response status:", res.status);

    if (!res.ok) {
      console.error(
        "Google Apps Script HTTP error:",
        res.status,
        res.statusText
      );
      throw new Error(`Google Apps Script error! status: ${res.status}`);
    }

    const responseText = await res.text();
    console.log("Google Apps Script raw response:", responseText);

    let result;
    try {
      result = JSON.parse(responseText);
      console.log("Google Apps Script parsed response:", result);
    } catch (jsonError) {
      console.error("Response JSON Parse Error:", jsonError);

      // Jika dapat response 200 tapi bukan JSON, anggap sukses
      if (res.status === 200) {
        result = {
          success: true,
          message: "Data berhasil dikirim",
          raw_response: responseText,
        };
      } else {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Invalid response from Google Apps Script",
            raw: responseText,
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // Pastikan response sukses
    if (result.success === false) {
      return new Response(
        JSON.stringify({
          success: false,
          error: result.error || "Unknown error from Google Apps Script",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("=== API POST SUCCESS ===");
    return new Response(
      JSON.stringify({
        success: true,
        message: "Data berhasil dikirim",
        data: dataToSend,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("API POST Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbz0OqKnEATDyKe043-9qfeCeoVXZxFxaQNGuR_XNf9h4s3z1NYvpE4J8f__Q7nkOaLM7Q/exec"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();

    let data;
    try {
      data = JSON.parse(result);
    } catch (parseError) {
      console.error("Failed to parse response:", parseError);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid JSON response from Google Apps Script",
          data: [],
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Handle different response formats
    const finalData = Array.isArray(data) ? data : data.data || [];

    return new Response(
      JSON.stringify({
        success: true,
        data: finalData,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("GET Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        data: [],
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

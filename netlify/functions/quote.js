// Netlify Function: POST /.netlify/functions/quote
// Writes quote form submissions to the Notion "Quote Leads" database.
//
// Required env vars (set in Netlify dashboard → Site settings → Environment variables):
//   NOTION_API_KEY  — Internal integration token from https://www.notion.so/my-integrations
//   NOTION_DB_ID    — 1a639be455ad4af7a3b0308cd1067727

const NOTION_VERSION = "2022-06-28";

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_DB_ID = process.env.NOTION_DB_ID;

  if (!NOTION_API_KEY || !NOTION_DB_ID) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Server configuration error" }) };
  }

  let form;
  try {
    form = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  // Build Notion page properties
  const properties = {
    Name: { title: [{ text: { content: String(form.name || "").slice(0, 200) } }] },
    Status: { select: { name: "New" } },
    "Submitted At": { date: { start: new Date().toISOString() } },
  };

  if (form.email) {
    properties.Email = { email: String(form.email).slice(0, 200) };
  }
  if (form.phone) {
    properties.Phone = { phone_number: String(form.phone).slice(0, 50) };
  }
  if (form.service) {
    properties.Service = { select: { name: String(form.service).slice(0, 100) } };
  }
  if (form.guests) {
    const n = parseInt(form.guests, 10);
    if (Number.isFinite(n) && n > 0) {
      properties.Guests = { number: n };
    }
  }
  if (form.eventDate) {
    properties["Event Date"] = { date: { start: String(form.eventDate).slice(0, 10) } };
  }
  if (form.location) {
    properties.Location = { rich_text: [{ text: { content: String(form.location).slice(0, 500) } }] };
  }
  if (form.details) {
    properties.Details = { rich_text: [{ text: { content: String(form.details).slice(0, 2000) } }] };
  }

  try {
    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DB_ID },
        properties,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return { statusCode: 502, headers, body: JSON.stringify({ error: "Failed to save quote" }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 502, headers, body: JSON.stringify({ error: "Failed to save quote" }) };
  }
};

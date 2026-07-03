// Netlify Function: POST /.netlify/functions/quote
// Writes quote form submissions to the canonical Act Two Catering Notion Leads DB.
//
// Required env vars:
//   NOTION_API_KEY       Internal Notion integration token.
//   NOTION_LEADS_DB_ID   Canonical Leads DB ID: ea13edba7d3e4b8a9247afa92628737d

const NOTION_VERSION = "2022-06-28";
const MAX_GUESTS = 10000;

const ALLOWED_ORIGINS = [
  "https://acttwocatering.com",
  "https://www.acttwocatering.com",
  "https://acttwocatering.netlify.app",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
  "http://localhost:8888",
  "http://127.0.0.1:8888",
];

function json(statusCode, body, origin = "") {
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": allowOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
      Vary: "Origin",
    },
    body: body ? JSON.stringify(body) : "",
  };
}

function clean(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePayload(payload) {
  const errors = [];
  const name = clean(payload.name, 300);
  const email = clean(payload.email, 300);
  const phone = clean(payload.phone, 80);
  const guests = clean(payload.guests, 20);
  const details = clean(payload.details, 6000);

  if (name.length < 2 || name.length > 200) errors.push("name");
  if (!email && !phone) errors.push("email_or_phone");
  if (email && !isValidEmail(email)) errors.push("email");
  if (guests) {
    const count = Number.parseInt(guests, 10);
    if (!Number.isFinite(count) || count < 1 || count > MAX_GUESTS) errors.push("guests");
  }
  if (details.length > 5000) errors.push("details_too_long");

  return errors;
}

function buildProperties(payload) {
  const properties = {
    "Lead Name": { title: [{ text: { content: clean(payload.name, 200) } }] },
    Source: { select: { name: "Website Form" } },
    Status: { status: { name: "New Lead" } },
  };

  const phone = clean(payload.phone, 50);
  const email = clean(payload.email, 200);
  const eventType = clean(payload.eventType, 100);
  const guests = clean(payload.guests, 20);
  const eventDate = clean(payload.eventDate, 10);
  const location = clean(payload.location, 1000);
  const details = clean(payload.details, 5000);

  if (phone) properties.Phone = { phone_number: phone };
  if (email) properties.Email = { email };
  if (eventType) properties["Event Type"] = { select: { name: eventType } };
  if (guests) properties["Guest Count"] = { number: Number.parseInt(guests, 10) };
  if (eventDate) properties["Event Date"] = { date: { start: eventDate } };
  if (location) properties["Venue / Location"] = { rich_text: [{ text: { content: location } }] };
  if (details) properties.Notes = { rich_text: [{ text: { content: details } }] };

  return properties;
}

exports.handler = async (event) => {
  const origin = (event.headers && (event.headers.origin || event.headers.Origin)) || "";

  if (event.httpMethod === "OPTIONS") {
    return json(204, null, origin);
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "method_not_allowed" }, origin);
  }

  const notionApiKey = process.env.NOTION_API_KEY;
  const notionDbId = process.env.NOTION_LEADS_DB_ID;
  if (!notionApiKey || !notionDbId) {
    return json(500, { error: "server_configuration_error" }, origin);
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "invalid_json" }, origin);
  }

  if (payload.website) {
    return json(200, { ok: true }, origin);
  }

  const errors = validatePayload(payload);
  if (errors.length) {
    return json(400, { error: "validation_failed", fields: errors }, origin);
  }

  try {
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionApiKey}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: notionDbId },
        properties: buildProperties(payload),
      }),
    });

    if (!response.ok) {
      console.error("notion_create_failed", { status: response.status });
      return json(502, { error: "downstream_failure" }, origin);
    }

    return json(200, { ok: true }, origin);
  } catch (error) {
    console.error("notion_create_failed", { message: error instanceof Error ? error.message : String(error) });
    return json(502, { error: "downstream_failure" }, origin);
  }
};

exports._private = {
  buildProperties,
  validatePayload,
};

const test = require("node:test");
const assert = require("node:assert/strict");

const { handler, _private } = require("../netlify/functions/quote.js");

const ORIGINAL_ENV = { ...process.env };
const ORIGINAL_FETCH = global.fetch;

function resetEnv() {
  process.env = { ...ORIGINAL_ENV };
  process.env.NOTION_API_KEY = "test-token";
  process.env.NOTION_LEADS_DB_ID = "ea13edba7d3e4b8a9247afa92628737d";
}

function event(body, overrides = {}) {
  return {
    httpMethod: "POST",
    headers: { origin: "http://localhost:8888" },
    body: JSON.stringify(body),
    ...overrides,
  };
}

test.afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
  global.fetch = ORIGINAL_FETCH;
});

test("function creates a Notion page for a valid payload", async () => {
  resetEnv();
  const calls = [];
  global.fetch = async (url, options) => {
    calls.push({ url, options });
    return { ok: true, status: 200 };
  };

  const response = await handler(event({
    name: "Test User",
    email: "test@example.com",
    phone: "856-555-1212",
    eventType: "Intimate Dinners",
    guests: "12",
    eventDate: "2026-08-15",
    location: "Cherry Hill, NJ",
    details: "Local smoke test",
  }));

  assert.equal(response.statusCode, 200);
  assert.deepEqual(JSON.parse(response.body), { ok: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.notion.com/v1/pages");

  const body = JSON.parse(calls[0].options.body);
  assert.equal(body.parent.database_id, "ea13edba7d3e4b8a9247afa92628737d");
  assert.equal(body.properties["Lead Name"].title[0].text.content, "Test User");
  assert.equal(body.properties.Source.select.name, "Website Form");
  assert.equal(body.properties.Status.status.name, "New Lead");
  assert.equal(body.properties["Event Type"].select.name, "Intimate Dinners");
  assert.equal(body.properties["Guest Count"].number, 12);
  assert.equal(body.properties["Venue / Location"].rich_text[0].text.content, "Cherry Hill, NJ");
  assert.equal(body.properties.Notes.rich_text[0].text.content, "Local smoke test");
});

test("function rejects payloads missing both email and phone", async () => {
  resetEnv();
  global.fetch = async () => {
    throw new Error("fetch should not be called");
  };

  const response = await handler(event({ name: "No Contact" }));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(JSON.parse(response.body), {
    error: "validation_failed",
    fields: ["email_or_phone"],
  });
});

test("honeypot returns ok without calling Notion", async () => {
  resetEnv();
  let called = false;
  global.fetch = async () => {
    called = true;
    return { ok: true, status: 200 };
  };

  const response = await handler(event({
    name: "Bot",
    email: "bot@example.com",
    website: "https://spam.example",
  }));

  assert.equal(response.statusCode, 200);
  assert.deepEqual(JSON.parse(response.body), { ok: true });
  assert.equal(called, false);
});

test("invalid JSON returns invalid_json", async () => {
  resetEnv();
  global.fetch = async () => {
    throw new Error("fetch should not be called");
  };

  const response = await handler({
    httpMethod: "POST",
    headers: { origin: "http://localhost:8888" },
    body: "{bad",
  });

  assert.equal(response.statusCode, 400);
  assert.deepEqual(JSON.parse(response.body), { error: "invalid_json" });
});

test("OPTIONS preflight returns 204", async () => {
  const response = await handler({
    httpMethod: "OPTIONS",
    headers: { origin: "http://localhost:8888" },
    body: "",
  });

  assert.equal(response.statusCode, 204);
  assert.equal(response.body, "");
  assert.equal(response.headers["Access-Control-Allow-Methods"], "POST, OPTIONS");
});

test("property builder uses canonical Notion schema names", () => {
  const properties = _private.buildProperties({
    name: "Schema Test",
    email: "schema@example.com",
    phone: "856-555-9999",
    eventType: "Milestone Events",
    guests: "80",
    eventDate: "2026-09-01",
    location: "Collingswood, NJ",
    details: "Birthday dinner",
  });

  assert.ok(properties["Lead Name"]);
  assert.ok(properties["Guest Count"]);
  assert.ok(properties["Venue / Location"]);
  assert.ok(properties.Notes);
  assert.equal(properties.Name, undefined);
  assert.equal(properties.Guests, undefined);
  assert.equal(properties.Location, undefined);
  assert.equal(properties.Details, undefined);
});

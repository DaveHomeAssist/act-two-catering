import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// DATA LAYER — Act Two Catering
// ═══════════════════════════════════════════════════════════════

const BIZ = {
  name: "Act Two Catering",
  phone: "856-296-5306",
  phoneTel: "tel:+18562965306",
  email: "hello@acttwocatering.com",
  serviceArea: "South Jersey",
  tagline: "A premium catering experience tailored for smaller gatherings, bringing restaurant-quality cuisine and exceptional service to clients throughout South Jersey.",
};

const SERVICE_CATEGORIES = [
  {
    id: "intimate",
    title: "Intimate Dinners",
    summary: "8–24 guests. Plated multi-course or family-style. We bring the cooking to your home or a private venue.",
    detail: "We bring everything: ingredients, equipment, and on-site cooking and plating. Menus are tuned to the room — your dinner shouldn't taste like everyone else's.",
  },
  {
    id: "milestone",
    title: "Milestone Events",
    summary: "Anniversary, birthday, engagement, retirement, graduation. 20–80 guests. Buffet, family-style, or stations.",
    detail: "Special occasions deserve food worth remembering. We design every menu around the host, the guest list, and the room — and handle setup through cleanup so the host gets to be a guest.",
  },
  {
    id: "corporate",
    title: "Corporate Gatherings",
    summary: "Office events, client dinners, holiday parties, team retreats. Polished, on-time, professional.",
    detail: "Catering that reflects your team and your brand. Custom menus, scalable from a board lunch to a company-wide celebration, with reliable service and clean handoffs.",
  },
];

const CUISINES = [
  { name: "American comfort", count: 25, examples: "Smoked brisket · pulled pork · biscuit pot pie · cornbread · Swedish meatballs" },
  { name: "Spanish",           count: 7,  examples: "Fabada Asturiana · garlic chicken · tapas beef kebabs · chilindrón · sangria" },
  { name: "Italian",           count: 6,  examples: "Risotto alla Milanese · lemon-chive risotto · Tuscan chicken skillet · rustic crusty bread" },
  { name: "Middle Eastern",    count: 6,  examples: "Joojeh kabob · pastilla · Zahav lamb shoulder · taktouka · Moroccan lemon cake" },
  { name: "French",            count: 3,  examples: "Chef John's quick cassoulet · tarragon chicken cutlets · Béarnaise sauce" },
  { name: "Mediterranean",     count: 3,  examples: "Lebanese stuffed grape leaves · salmorejo · cross-cuisine herb-driven cooking" },
];

// Source of truth: act-two-catering/data/sample-menus.json (curated 2026-04-27 from Notion DB e7d1db52)
const SAMPLE_MENUS = [
  {
    slug: "elegant-dinner-party",
    title: "Elegant Dinner Party",
    subtitle: "A four-course progression for intimate, refined evenings",
    intro: "Designed for dinner parties of 8 to 24 guests in your home or a private venue. We bring everything: ingredients, equipment, and on-site cooking and plating. The menu below is a starting point — every course is tailored to your tastes, dietary needs, and the occasion.",
    dishCount: 13,
    courses: [
      { course: "Hors d'oeuvres", items: [
        "Spanish-style beef tapas kebabs with smoked paprika",
        "Lebanese stuffed grape leaves with herbs and olive oil",
        "Salmorejo: chilled Andalusian tomato soup, served in tasting glasses",
      ] },
      { course: "First course", items: [
        "Risotto alla Milanese with saffron and aged Parmigiano",
        "or Lemon and chive risotto for a brighter, springtime variation",
      ] },
      { course: "Main", items: [
        "Chef John's quick cassoulet: French white beans, sausage, and confit",
        "or The Zahav lamb shoulder for a slow-roasted Middle Eastern centerpiece",
        "or Tarragon chicken cutlets for a lighter French-style entrée",
      ], sides: [
        "Roasted Brussels sprouts with butternut squash, maple, and walnuts",
        "Potatoes au gratin",
      ] },
      { course: "Dessert", items: [
        "Cherry almond linzer cookies",
        "Classic lemon meringue pie",
        "or Moroccan lemon cake for a Mediterranean finish",
      ] },
    ],
    notes: "Wine pairing notes available on request. Service style: plated multi-course, family-style, or buffet — your call.",
  },
  {
    slug: "mediterranean-grill",
    title: "Mediterranean Grill",
    subtitle: "Bright, herb-driven cooking pulled from across the Mediterranean basin",
    intro: "Best for warm-weather gatherings of 15 to 60 guests. The cooking happens largely on grill and plancha with vibrant fresh sides. Adaptable for outdoor or indoor service.",
    dishCount: 11,
    courses: [
      { course: "To start", items: [
        "Salmorejo: chilled tomato soup with sherry vinegar and good olive oil",
        "Taktouka: Moroccan roasted pepper and tomato salad",
        "Lebanese stuffed grape leaves",
      ] },
      { course: "From the grill", items: [
        "Joojeh kabob: Persian saffron-yogurt chicken on skewers",
        "Spanish tapas-style beef kebabs",
        "Balsamic-glazed salmon",
        "or Pastilla: Moroccan skillet chicken pie for a richer option",
      ] },
      { course: "Sides", items: [
        "Lemon-Caper sole as a lighter fish course",
        "Rustic Italian crusty bread, warm",
        "Honey-lime vinaigrette over a simple market green",
      ] },
      { course: "Dessert", items: [
        "Moroccan lemon cake",
        "Turkish coffee brownies",
      ] },
    ],
    notes: "Strong vegetarian capacity: most apps and sides scale up easily without protein. Vegan adaptations available.",
  },
  {
    slug: "big-game",
    title: "Big Game Souper Party",
    subtitle: "Cold-weather comfort for casual, crowd-pleasing gatherings",
    intro: "Built for game-day, milestone birthdays, and any event where the goal is comfort food done right. Serves 20 to 80, mostly buffet-style or self-serve stations. Focus on slow-cooked proteins, hearty sides, and food that holds up over a long event.",
    dishCount: 15,
    courses: [
      { course: "Soups & starters", items: [
        "Creamy chicken noodle soup, served in mugs",
        "Asturian fabada: Spanish white-bean and sausage stew",
        "Stifado: long-braised Greek beef stew with cinnamon and red wine",
      ] },
      { course: "Mains", items: [
        "Emeril's Texas-style smoked brisket, sliced to order",
        "Slow-cooker Texas pulled pork on potato rolls",
        "Tuscan-style spareribs with balsamic glaze",
        "Swedish meatballs with cream sauce",
      ] },
      { course: "On the side", items: [
        "Soft dinner rolls and Rustic Italian crusty bread",
        "Roasted Brussels sprouts with butternut squash",
        "Potatoes au gratin",
        "Biscuit vegetable pot pie casserole",
      ] },
      { course: "Sweet finish", items: [
        "Sweet potato cheesecake",
        "Strawberry shortcake cake",
        "Chocolate raspberry cake",
      ] },
    ],
    notes: "Designed to hold heat well across a 3–4 hour event. Chafing-dish service available. Perfect for game days, casual milestone birthdays, and corporate watch parties.",
  },
];

const TESTIMONIALS = [
  "Delicious Food! Beautifully Presented! Chef Tom was a pleasure to work with!",
  "Act Two was a great alternative to take-out trays!",
  "Act Two made planning our Anniversary party a breeze, and the food was amazing",
];

const CHEF_BIO = [
  "I've been in a kitchen since I was five years old, watching and learning from my mother, a talented chef who sparked my love for cooking. I've spent my life mastering the art of great food—exploring global flavors, refining techniques, and developing a deep respect for high-quality ingredients.",
  "What sets me apart isn't just skill, but philosophy: exceptional food starts with exceptional ingredients. I source the best, make everything from scratch, and focus on delivering an elevated dining experience for smaller gatherings.",
  "At Act Two, my goal is simple—to bring restaurant-quality catering to those moments that matter, with a personal touch that makes all the difference.",
];

const FAQS = [
  { q: "How far in advance should I book?",
    a: "The earlier the better, especially for weekend dates. We can sometimes accommodate shorter timelines depending on the event size — reach out and we'll let you know what's possible." },
  { q: "Do you accommodate dietary restrictions?",
    a: "Yes. We routinely cook around gluten-free, dairy-free, vegetarian, vegan, and nut-free needs. Let us know during the consultation and we'll design the menu around it without sacrificing the experience." },
  { q: "What's your service area?",
    a: "South Jersey and the greater Philadelphia area. For events outside that radius, we can usually accommodate with a small travel adjustment — just ask." },
  { q: "What's included in your service?",
    a: "All food preparation and cooking, on-site service, setup, and cleanup. China and linen rentals are available at additional cost. We'll walk through every line item before you commit." },
  { q: "How does pricing work?",
    a: "Every menu is custom, so every quote is custom. Tell us about your event and we'll send a detailed proposal within 24 hours — no fixed per-guest tier you have to wedge your event into." },
];

// ═══════════════════════════════════════════════════════════════
// CSS — kept inline; mirrors app.js
// ═══════════════════════════════════════════════════════════════
const CSS = `/* see app.js for full CSS — kept identical for parity */`;

// ═══════════════════════════════════════════════════════════════
// HOOKS / UTILS
// ═══════════════════════════════════════════════════════════════
function useHash() {
  const [hash, setHash] = useState(typeof window !== "undefined" ? (window.location.hash || "#/") : "#/");
  useEffect(() => {
    const handler = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return hash;
}
function navigate(path) {
  window.location.hash = path;
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function routeHref(path) { return `#${path === "/" ? "/" : path}`; }
function parseRoute(hash) {
  const path = hash.replace("#", "") || "/";
  const parts = path.split("/").filter(Boolean);
  return { path, parts };
}
function getMenu(slug) { return SAMPLE_MENUS.find((m) => m.slug === slug); }

// ═══════════════════════════════════════════════════════════════
// PRIMITIVES
// ═══════════════════════════════════════════════════════════════
function HashLink({ to, className, children, onClick, ...props }) {
  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={routeHref(to)} className={className} onClick={handleClick} {...props}>{children}</a>;
}

function HeroSection({ badge, title, subtitle, primaryCta, primaryRoute = "/contact", secondaryCta }) {
  return (
    <section className="hero">
      <div className="hero-inner">
        {badge && <div className="hero-badge">{badge}</div>}
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        {subtitle && <p>{subtitle}</p>}
        <div className="hero-ctas">
          {primaryCta && <button className="btn-primary" onClick={() => navigate(primaryRoute)}>{primaryCta}</button>}
          {secondaryCta && <a href={BIZ.phoneTel} className="btn-secondary">{secondaryCta}</a>}
        </div>
      </div>
    </section>
  );
}

function InlineCTA({
  title = "We'd love to work with you!",
  text = "Tell us about your event and we'll be in touch shortly.",
  cta = "Contact Us",
  route = "/contact",
}) {
  return (
    <div className="inline-cta">
      <h3>{title}</h3>
      <p>{text}</p>
      <button className="btn-primary" onClick={() => navigate(route)} style={{ position: "relative" }}>{cta}</button>
    </div>
  );
}

function FAQAccordion({ faqs }) {
  const [openId, setOpenId] = useState(null);
  return (
    <div>
      {faqs.map((f, i) => (
        <div key={i} className="faq-item">
          <button
            className="faq-q"
            onClick={() => setOpenId(openId === i ? null : i)}
            aria-expanded={openId === i}
          >
            {f.q}
            <span className={`faq-arrow ${openId === i ? "open" : ""}`}>▾</span>
          </button>
          {openId === i && <div className="faq-a">{f.a}</div>}
        </div>
      ))}
    </div>
  );
}

function QuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    eventType: "", guests: "", eventDate: "", location: "",
    name: "", phone: "", email: "", details: "",
  });
  const totalSteps = 3;
  const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = () => {
    const lines = [
      `Event type: ${form.eventType || "—"}`,
      `Guests: ${form.guests || "—"}`,
      `Date: ${form.eventDate || "—"}`,
      `Location: ${form.location || "—"}`,
      `Name: ${form.name || "—"}`,
      `Phone: ${form.phone || "—"}`,
      `Email: ${form.email || "—"}`,
      ``,
      `Details:`,
      form.details || "(none)",
    ].join("\n");
    const subject = encodeURIComponent("Catering inquiry from acttwocatering.com");
    const body = encodeURIComponent(lines);
    window.location.href = `mailto:${BIZ.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="quote-form-container">
        <div className="form-success">
          <div style={{ fontSize: 48 }}>✉️</div>
          <h3>Inquiry sent</h3>
          <p>Your email client should be opening now. If it didn't, call or email us directly.</p>
          <p style={{ marginTop: 12 }}>
            <a href={BIZ.phoneTel} style={{ color: "var(--wine)", fontWeight: 600 }}>{BIZ.phone}</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="quote-form-container">
      <div className="form-progress">
        <div className="form-progress-fill" style={{ width: `${(step / totalSteps) * 100}%` }} />
      </div>
      <div className="form-step-header">
        <div className="form-step-label">Step {step} of {totalSteps}</div>
        <div className="form-step-title">
          {step === 1 ? "Your event" : step === 2 ? "Your contact details" : "A few more details"}
        </div>
      </div>
      <div className="form-body">
        {step === 1 && (
          <>
            <div className="form-field">
              <label className="form-label" htmlFor="qf-type">Event type</label>
              <select id="qf-type" className="form-select" value={form.eventType} onChange={(e) => set("eventType", e.target.value)}>
                <option value="">Select an event type…</option>
                {SERVICE_CATEGORIES.map((c) => <option key={c.id} value={c.title}>{c.title}</option>)}
                <option value="Other">Other / not sure yet</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label className="form-label" htmlFor="qf-guests">Estimated guest count</label>
                <input id="qf-guests" className="form-input" type="number" inputMode="numeric"
                  placeholder="e.g. 24" value={form.guests} onChange={(e) => set("guests", e.target.value)} />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="qf-date">Event date</label>
                <input id="qf-date" className="form-input" type="date"
                  value={form.eventDate} onChange={(e) => set("eventDate", e.target.value)} />
              </div>
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="qf-location">Event location / city</label>
              <input id="qf-location" className="form-input" placeholder="e.g. Cherry Hill, NJ"
                value={form.location} onChange={(e) => set("location", e.target.value)} />
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="form-field">
              <label className="form-label" htmlFor="qf-name">Full name *</label>
              <input id="qf-name" className="form-input"
                value={form.name} onChange={(e) => set("name", e.target.value)} required />
            </div>
            <div className="form-row">
              <div className="form-field">
                <label className="form-label" htmlFor="qf-phone">Phone *</label>
                <input id="qf-phone" className="form-input" type="tel" inputMode="tel"
                  value={form.phone} onChange={(e) => set("phone", e.target.value)} required />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="qf-email">Email *</label>
                <input id="qf-email" className="form-input" type="email" inputMode="email"
                  value={form.email} onChange={(e) => set("email", e.target.value)} required />
              </div>
            </div>
          </>
        )}
        {step === 3 && (
          <div className="form-field">
            <label className="form-label" htmlFor="qf-details">Tell us about your event</label>
            <textarea id="qf-details" className="form-textarea" style={{ minHeight: 120 }}
              placeholder="What's the occasion? Any dietary needs? Vision for the food? The more you share, the better we can plan…"
              value={form.details} onChange={(e) => set("details", e.target.value)} />
          </div>
        )}
        <div className="form-actions">
          {step > 1 && <button className="form-btn-back" onClick={() => setStep((s) => s - 1)}>← Back</button>}
          {step < totalSteps
            ? <button className="form-btn-next" onClick={() => setStep((s) => s + 1)}>Continue →</button>
            : <button className="form-btn-next" onClick={handleSubmit}>Send inquiry</button>}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════════════
function HomePage() {
  return (
    <>
      <HeroSection
        badge="Premium catering · South Jersey"
        title="Restaurant-quality catering, <em>designed for smaller gatherings</em>"
        subtitle={BIZ.tagline}
        primaryCta="Contact Us"
        secondaryCta={`Call ${BIZ.phone}`}
      />

      <section className="section">
        <div className="section-inner">
          <div className="intro-block">
            <div className="section-label" style={{ textAlign: "center" }}>An elevated catering experience</div>
            <h2 className="section-title" style={{ textAlign: "center", marginBottom: 28 }}>
              Designed for smaller gatherings
            </h2>
            <p>You don’t have to settle for ordinary takeout trays when hosting a special event.</p>
            <p>At Act Two, we bring restaurant-quality catering to smaller occasions, delivering thoughtfully prepared dining experiences without the complexity or cost of large-scale catering.</p>
            <p>Because we focus on intimate gatherings, we can provide personalized service, handcrafted menus, and exceptional ingredients—sourced fresh, prepared from scratch, and never frozen or pre-made. The result? A premium catering experience that feels indulgent yet remains surprisingly within reach.</p>
            <p><em>Let’s make your next gathering something truly special.</em></p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-heading">
            <div>
              <div className="section-label">What we do</div>
              <h2 className="section-title">Catering for the way you actually want to host</h2>
            </div>
            <p className="section-subtitle section-heading-copy">
              Whether it’s a dinner party, milestone celebration, or corporate event, we create a personalized, restaurant-quality experience without the hassle of traditional catering.
            </p>
          </div>
          <div className="cat-grid">
            {SERVICE_CATEGORIES.map((c, i) => (
              <div key={c.id} className="card cat-card">
                <div className="cat-card-num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{c.title}</h3>
                <p className="cat-summary">{c.summary}</p>
                <p className="cat-detail">{c.detail}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-32">
            <button className="link-btn" onClick={() => navigate("/what-we-do")}>More about what we do →</button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="intro-block">
            <div className="section-label" style={{ textAlign: "center" }}>Why we’re different</div>
            <h2 className="section-title" style={{ textAlign: "center", marginBottom: 22 }}>
              We don’t scale up—we scale down with intention
            </h2>
            <p>By focusing on smaller gatherings, we deliver elevated food, handcrafted from scratch, using premium ingredients. It’s the kind of catering you didn’t think was possible for events this size.</p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-heading">
            <div>
              <div className="section-label">Sample menus</div>
              <h2 className="section-title">A starting point for every conversation</h2>
            </div>
            <p className="section-subtitle section-heading-copy">
              Three curated menus to give you a sense of how we cook. Every event gets a custom menu built around your tastes, dietary needs, and budget.
            </p>
          </div>
          <div className="menu-grid">
            {SAMPLE_MENUS.map((m) => (
              <HashLink key={m.slug} to={`/sample-menus/${m.slug}`}
                className="card menu-card-link"
                aria-label={`View sample menu: ${m.title}`}>
                <div className="menu-card-body">
                  <div className="menu-card-kicker">Sample menu</div>
                  <h3>{m.title}</h3>
                  <p>{m.subtitle}</p>
                  <div className="menu-card-footer">
                    <span>View menu →</span>
                    <span className="menu-card-count">{m.dishCount} dishes</span>
                  </div>
                </div>
              </HashLink>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-label" style={{ textAlign: "center" }}>What people say</div>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: 36 }}>From recent events</h2>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial">
                <div className="testimonial-text">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div className="intro-block">
            <h2 className="section-title" style={{ textAlign: "center" }}>We’d love to work with you!</h2>
            <div className="text-center mt-24">
              <button className="btn-primary" onClick={() => navigate("/contact")}>Contact Us</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function WhatWeDoPage() {
  return (
    <>
      <HeroSection
        badge="What we do"
        title="Catering for <em>the room you’re hosting</em>"
        subtitle="Three formats by event size and tone. Every menu is custom — the categories below describe how we work, not a fixed package."
        primaryCta="Start a conversation"
        secondaryCta={`Call ${BIZ.phone}`}
      />

      <section className="section">
        <div className="section-inner">
          <div className="section-label">Formats</div>
          <h2 className="section-title">Three ways we cater</h2>
          <div className="cat-grid mt-32">
            {SERVICE_CATEGORIES.map((c, i) => (
              <div key={c.id} className="card cat-card">
                <div className="cat-card-num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{c.title}</h3>
                <p className="cat-summary">{c.summary}</p>
                <p className="cat-detail">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-label">Cuisines we cook</div>
          <h2 className="section-title">Range, backed by a working recipe library</h2>
          <p className="section-subtitle mb-32" style={{ marginTop: 12 }}>
            Each cuisine below is something we actively cook — not a marketing claim. The numbers reflect how many recipes from that tradition we have ready to go.
          </p>
          <div className="card" style={{ padding: "12px 28px", marginTop: 24 }}>
            {CUISINES.map((c, i) => (
              <div key={i} className="cuisine-row">
                <div className="cuisine-name">{c.name}</div>
                <div className="cuisine-count">{c.count}+ recipes</div>
                <div className="cuisine-examples">{c.examples}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner" style={{ maxWidth: 760 }}>
          <div className="section-label">Frequently asked</div>
          <h2 className="section-title">Common questions</h2>
          <div className="mt-32">
            <FAQAccordion faqs={FAQS} />
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <InlineCTA
          title="Ready to start the conversation?"
          text="Tell us about your event and we’ll send a custom proposal within 24 hours."
        />
      </div>
    </>
  );
}

function SampleMenusPage() {
  return (
    <>
      <HeroSection
        badge="Sample menus"
        title="Three menus, <em>endless variations</em>"
        subtitle="Every event is different. The sample menus below show how we build a course progression — yours will be tuned to your guests, dietary needs, and the occasion."
      />
      <section className="section">
        <div className="section-inner">
          <div className="menu-grid">
            {SAMPLE_MENUS.map((m) => (
              <HashLink key={m.slug} to={`/sample-menus/${m.slug}`}
                className="card menu-card-link"
                aria-label={`View sample menu: ${m.title}`}>
                <div className="menu-card-body">
                  <div className="menu-card-kicker">Sample menu</div>
                  <h3>{m.title}</h3>
                  <p>{m.subtitle}</p>
                  <div className="menu-card-footer">
                    <span>View menu →</span>
                    <span className="menu-card-count">{m.dishCount} dishes</span>
                  </div>
                </div>
              </HashLink>
            ))}
          </div>
          <InlineCTA
            title="Want a menu built around your event?"
            text="Tell us a bit about it and we’ll send a custom menu and quote within 24 hours."
          />
        </div>
      </section>
    </>
  );
}

function SampleMenuDetailPage({ slug }) {
  const menu = getMenu(slug);
  if (!menu) {
    return (
      <section className="section">
        <div className="section-inner">
          <p>Menu not found. <HashLink to="/sample-menus">View all sample menus</HashLink></p>
        </div>
      </section>
    );
  }
  return (
    <section className="section">
      <div className="section-inner menu-detail">
        <div className="breadcrumb">
          <HashLink to="/">Home</HashLink> / <HashLink to="/sample-menus">Sample menus</HashLink> / {menu.title}
        </div>
        <div className="menu-detail-header">
          <h1>{menu.title}</h1>
          <div className="subtitle">{menu.subtitle}</div>
          <p className="menu-detail-intro">{menu.intro}</p>
        </div>
        <div className="menu-rule" />
        {menu.courses.map((course, i) => (
          <div key={i} className="menu-course">
            <div className="menu-course-label">{course.course}</div>
            <ul className="menu-course-list">
              {course.items.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
            {course.sides && (
              <div className="menu-course-sides">
                <div className="menu-course-sides-label">served with</div>
                <ul>
                  {course.sides.map((s, k) => <li key={k}>{s}</li>)}
                </ul>
              </div>
            )}
          </div>
        ))}
        {menu.notes && (
          <div className="menu-notes">
            <strong>A note: </strong>{menu.notes}
          </div>
        )}
        <div className="menu-policy">
          <strong>This is a starting point.</strong>
          <span>Every event gets a custom menu built around your tastes, dietary needs, and budget.</span>
        </div>
        <div className="text-center mt-32">
          <button className="btn-primary" onClick={() => navigate("/contact")}>Build my menu →</button>
        </div>
      </div>
    </section>
  );
}

function TheChefPage() {
  return (
    <>
      <HeroSection
        badge="My second act"
        title="The chef <em>behind the food</em>"
      />
      <section className="section">
        <div className="section-inner">
          <div className="chef-bio">
            {CHEF_BIO.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 48px" }}>
        <InlineCTA />
      </div>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <HeroSection
        badge="Contact"
        title="Let us help you <em>celebrate</em>"
        subtitle="Fill out some info and we’ll be in touch shortly. We can’t wait to hear from you!"
      />
      <section className="section">
        <div className="section-inner">
          <div className="grid-2">
            <QuoteForm />
            <div className="contact-info">
              <div className="section-label">Get in touch</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--charcoal)", marginBottom: 20 }}>
                Contact information
              </h3>
              <span className="label">Phone</span>
              <a href={BIZ.phoneTel}>{BIZ.phone}</a>
              <span className="label">Service area</span>
              South Jersey and the greater Philadelphia area
              <div className="contact-expectation">
                <strong>What to expect</strong>
                <p>Every event is different, so every quote is custom. Send us the details above and we’ll come back within 24 hours with a menu and pricing tailored to your gathering.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHROME
// ═══════════════════════════════════════════════════════════════
function Header({ currentPath }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const links = [
    { label: "What We Do",   path: "/what-we-do" },
    { label: "Sample Menus", path: "/sample-menus" },
    { label: "The Chef",     path: "/the-chef" },
    { label: "Contact",      path: "/contact" },
  ];
  return (
    <header className="site-header">
      <div className="header-utility">
        <div className="header-utility-inner">
          <span>Premium catering for smaller gatherings</span>
          <span>South Jersey & Philadelphia</span>
          <span><strong>Custom menus</strong> for every event</span>
        </div>
      </div>
      <div className="header-main">
        <HashLink to="/" className="header-logo" onClick={closeMenu}>
          <img src="assets/icons/svg/A2C_icon_animated.svg" alt="" className="brand-mark" aria-hidden="true" />
          <span className="logo-act">Act</span> <span className="logo-two">Two</span>
        </HashLink>
        <nav className={`header-nav ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
          {links.map((l) => (
            <HashLink key={l.path} to={l.path}
              className={currentPath.startsWith(l.path) ? "active" : ""}
              onClick={closeMenu}>{l.label}</HashLink>
          ))}
          <HashLink to="/contact" className="mobile-quote-btn" onClick={closeMenu}
            style={{ display: menuOpen ? "block" : "none" }}>Contact Us</HashLink>
        </nav>
        <div className="header-actions">
          <a href={BIZ.phoneTel} className="header-phone header-phone-desktop">{BIZ.phone}</a>
          <HashLink to="/contact" className="header-quote-link header-phone-desktop">Contact Us</HashLink>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen} aria-label="Toggle navigation menu">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3><span>Act</span> Two Catering</h3>
          <p>Premium catering for smaller gatherings. Restaurant-quality cuisine and exceptional service throughout South Jersey and the greater Philadelphia area.</p>
        </div>
        <div className="footer-col">
          <h4>Site</h4>
          <HashLink to="/what-we-do">What We Do</HashLink>
          <HashLink to="/sample-menus">Sample Menus</HashLink>
          <HashLink to="/the-chef">The Chef</HashLink>
          <HashLink to="/contact">Contact</HashLink>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a href={BIZ.phoneTel}>{BIZ.phone}</a>
          <HashLink to="/contact">Send an inquiry</HashLink>
          <div style={{ marginTop: 12, fontSize: 12, opacity: 0.6 }}>
            South Jersey & greater Philadelphia
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Act Two Catering. All rights reserved.
      </div>
    </footer>
  );
}

function MobileCallBar() {
  return (
    <div className="mobile-call-bar">
      <div className="mobile-call-bar-inner">
        <a href={BIZ.phoneTel} className="mcb-call">📞 Call</a>
        <button className="mcb-quote" onClick={() => navigate("/contact")}>Contact Us</button>
      </div>
    </div>
  );
}

function Router({ hash }) {
  const { parts } = parseRoute(hash.replace("#", ""));
  const p0 = parts[0] || "";
  const p1 = parts[1] || "";
  if (!p0) return <HomePage />;
  if (p0 === "what-we-do") return <WhatWeDoPage />;
  if (p0 === "sample-menus" && !p1) return <SampleMenusPage />;
  if (p0 === "sample-menus" && p1) return <SampleMenuDetailPage slug={p1} />;
  if (p0 === "the-chef") return <TheChefPage />;
  if (p0 === "contact") return <ContactPage />;
  return <HomePage />;
}

export default function ActTwoCateringApp() {
  const hash = useHash();
  const currentPath = hash.replace("#", "") || "/";

  useEffect(() => {
    const fallbackHeader = document.querySelector(".fallback-header");
    const fallbackShell = document.querySelector("main.fallback-shell");
    const rootElement = document.getElementById("root");

    document.body.classList.add("app-ready");

    fallbackHeader?.style.setProperty("display", "none");
    fallbackShell?.style.setProperty("max-width", "none");
    fallbackShell?.style.setProperty("margin", "0");
    fallbackShell?.style.setProperty("padding", "0");
    rootElement?.style.setProperty("max-width", "none");
    rootElement?.style.setProperty("margin", "0");
    rootElement?.style.setProperty("padding", "0");

    return () => {
      document.body.classList.remove("app-ready");
      fallbackHeader?.style.removeProperty("display");
      fallbackShell?.style.removeProperty("max-width");
      fallbackShell?.style.removeProperty("margin");
      fallbackShell?.style.removeProperty("padding");
      rootElement?.style.removeProperty("max-width");
      rootElement?.style.removeProperty("margin");
      rootElement?.style.removeProperty("padding");
    };
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <a id="skip-link" href="#main-content">Skip to main content</a>
      <Header currentPath={currentPath} />
      <main id="main-content">
        <Router hash={hash} />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}

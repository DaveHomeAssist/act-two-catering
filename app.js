(() => {
  const { useState, useEffect, useRef } = React;

  // ───────────────────────────────────────────────
  // BUSINESS INFO
  // ───────────────────────────────────────────────
  const BIZ = {
    name: "Act Two Catering",
    phone: "856-296-5306",
    phoneTel: "tel:+18562965306",
    email: "hello@acttwocatering.com",
    serviceArea: "South Jersey",
    tagline: "A premium catering experience tailored for smaller gatherings, bringing restaurant-quality cuisine and exceptional service to clients throughout South Jersey."
  };

  // ───────────────────────────────────────────────
  // SERVICE CATEGORIES — defined by event size + tone, not made-up specialties
  // ───────────────────────────────────────────────
  const SERVICE_CATEGORIES = [
    {
      id: "intimate",
      title: "Intimate Dinners",
      summary: "8–24 guests. Plated multi-course or family-style. We bring the cooking to your home or a private venue.",
      detail: "We bring everything: ingredients, equipment, and on-site cooking and plating. Menus are tuned to the room — your dinner shouldn't taste like everyone else's."
    },
    {
      id: "milestone",
      title: "Milestone Events",
      summary: "Anniversary, birthday, engagement, retirement, graduation. 20–80 guests. Buffet, family-style, or stations.",
      detail: "Special occasions deserve food worth remembering. We design every menu around the host, the guest list, and the room — and handle setup through cleanup so the host gets to be a guest."
    },
    {
      id: "corporate",
      title: "Corporate Gatherings",
      summary: "Office events, client dinners, holiday parties, team retreats. Polished, on-time, professional.",
      detail: "Catering that reflects your team and your brand. Custom menus, scalable from a board lunch to a company-wide celebration, with reliable service and clean handoffs."
    }
  ];

  // ───────────────────────────────────────────────
  // CUISINES WE PRODUCE — backed by recipe count from Tom's working DB
  // ───────────────────────────────────────────────
  const CUISINES = [
    { name: "American comfort", count: 25, examples: "Smoked brisket · pulled pork · biscuit pot pie · cornbread · Swedish meatballs" },
    { name: "Spanish",           count: 7,  examples: "Fabada Asturiana · garlic chicken · tapas beef kebabs · chilindrón · sangria" },
    { name: "Italian",           count: 6,  examples: "Risotto alla Milanese · lemon-chive risotto · Tuscan chicken skillet · rustic crusty bread" },
    { name: "Middle Eastern",    count: 6,  examples: "Joojeh kabob · pastilla · Zahav lamb shoulder · taktouka · Moroccan lemon cake" },
    { name: "French",            count: 3,  examples: "Chef John's quick cassoulet · tarragon chicken cutlets · Béarnaise sauce" },
    { name: "Mediterranean",     count: 3,  examples: "Lebanese stuffed grape leaves · salmorejo · cross-cuisine herb-driven cooking" }
  ];

  // ───────────────────────────────────────────────
  // SAMPLE MENUS — hand-curated from Tom's Notion DB | Recipes (collection e7d1db52)
  // Source of truth: act-two-catering/data/sample-menus.json (2026-04-27 snapshot)
  // ───────────────────────────────────────────────
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
          "Salmorejo: chilled Andalusian tomato soup, served in tasting glasses"
        ] },
        { course: "First course", items: [
          "Risotto alla Milanese with saffron and aged Parmigiano",
          "or Lemon and chive risotto for a brighter, springtime variation"
        ] },
        { course: "Main", items: [
          "Chef John's quick cassoulet: French white beans, sausage, and confit",
          "or The Zahav lamb shoulder for a slow-roasted Middle Eastern centerpiece",
          "or Tarragon chicken cutlets for a lighter French-style entrée"
        ], sides: [
          "Roasted Brussels sprouts with butternut squash, maple, and walnuts",
          "Potatoes au gratin"
        ] },
        { course: "Dessert", items: [
          "Cherry almond linzer cookies",
          "Classic lemon meringue pie",
          "or Moroccan lemon cake for a Mediterranean finish"
        ] }
      ],
      notes: "Wine pairing notes available on request. Service style: plated multi-course, family-style, or buffet — your call."
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
          "Lebanese stuffed grape leaves"
        ] },
        { course: "From the grill", items: [
          "Joojeh kabob: Persian saffron-yogurt chicken on skewers",
          "Spanish tapas-style beef kebabs",
          "Balsamic-glazed salmon",
          "or Pastilla: Moroccan skillet chicken pie for a richer option"
        ] },
        { course: "Sides", items: [
          "Lemon-Caper sole as a lighter fish course",
          "Rustic Italian crusty bread, warm",
          "Honey-lime vinaigrette over a simple market green"
        ] },
        { course: "Dessert", items: [
          "Moroccan lemon cake",
          "Turkish coffee brownies"
        ] }
      ],
      notes: "Strong vegetarian capacity: most apps and sides scale up easily without protein. Vegan adaptations available."
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
          "Stifado: long-braised Greek beef stew with cinnamon and red wine"
        ] },
        { course: "Mains", items: [
          "Emeril's Texas-style smoked brisket, sliced to order",
          "Slow-cooker Texas pulled pork on potato rolls",
          "Tuscan-style spareribs with balsamic glaze",
          "Swedish meatballs with cream sauce"
        ] },
        { course: "On the side", items: [
          "Soft dinner rolls and Rustic Italian crusty bread",
          "Roasted Brussels sprouts with butternut squash",
          "Potatoes au gratin",
          "Biscuit vegetable pot pie casserole"
        ] },
        { course: "Sweet finish", items: [
          "Sweet potato cheesecake",
          "Strawberry shortcake cake",
          "Chocolate raspberry cake"
        ] }
      ],
      notes: "Designed to hold heat well across a 3–4 hour event. Chafing-dish service available. Perfect for game days, casual milestone birthdays, and corporate watch parties."
    }
  ];

  // ───────────────────────────────────────────────
  // TESTIMONIALS — verbatim from live Squarespace site, unattributed
  // ───────────────────────────────────────────────
  const TESTIMONIALS = [
    "Delicious Food! Beautifully Presented! Chef Tom was a pleasure to work with!",
    "Act Two was a great alternative to take-out trays!",
    "Act Two made planning our Anniversary party a breeze, and the food was amazing"
  ];

  // ───────────────────────────────────────────────
  // CHEF BIO — verbatim from /my-second-act on Squarespace, first-person
  // ───────────────────────────────────────────────
  const CHEF_BIO = [
    "I've been in a kitchen since I was five years old, watching and learning from my mother, a talented chef who sparked my love for cooking. I've spent my life mastering the art of great food—exploring global flavors, refining techniques, and developing a deep respect for high-quality ingredients.",
    "What sets me apart isn't just skill, but philosophy: exceptional food starts with exceptional ingredients. I source the best, make everything from scratch, and focus on delivering an elevated dining experience for smaller gatherings.",
    "At Act Two, my goal is simple—to bring restaurant-quality catering to those moments that matter, with a personal touch that makes all the difference."
  ];

  // ───────────────────────────────────────────────
  // GENERIC FAQs — honest catering-industry baseline
  // ───────────────────────────────────────────────
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
      a: "Every menu is custom, so every quote is custom. Tell us about your event and we'll send a detailed proposal within 24 hours — no fixed per-guest tier you have to wedge your event into." }
  ];

  // ───────────────────────────────────────────────
  // CSS (preserved from prior build, with appended rules for new components)
  // ───────────────────────────────────────────────
  const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

:root {
  --wine: #8B3A44;
  --wine-light: #A04D58;
  --wine-deep: #6E2D35;
  --wine-glow: rgba(139,58,68,0.10);
  --wine-pale: #F5ECED;
  --gold: #B8892F;
  --gold-light: #C99B3D;
  --gold-pale: #F2E8D0;
  --gold-glow: rgba(184,137,47,0.10);
  --cream: #FEFCF9;
  --cream-dark: #F0EBE1;
  --parchment: #F8F5EF;
  --warm-white: #FFFFFF;
  --charcoal: #2A2A2A;
  --charcoal-light: #3D3D3D;
  --slate: #6B6B6B;
  --mist: #C5C1B8;
  --sage: #6A7F5C;
  --sage-light: #E8EDE4;
  --blush: #FAF0EF;
  --linen: #F7F3ED;
  --error: #C0392B;
  --success: #4A7C59;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --shadow-sm: 0 1px 4px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 20px rgba(0,0,0,0.06);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.08);
  --shadow-xl: 0 16px 48px rgba(0,0,0,0.10);
  --radius: 8px;
  --radius-lg: 14px;
  --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }

body {
  font-family: var(--font-body);
  color: var(--charcoal);
  background:
    radial-gradient(circle at 0% 0%, rgba(184,137,47,0.12), transparent 28%),
    radial-gradient(circle at 100% 0%, rgba(139,58,68,0.08), transparent 24%),
    linear-gradient(180deg, #fffdf9 0%, #f7f1e8 100%);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}

a { color: inherit; }
button, input, select, textarea { font: inherit; }
main { position: relative; }

a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 3px solid rgba(139,58,68,0.28);
  outline-offset: 3px;
}

@keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.anim { animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
.anim-d1 { animation-delay: 0.08s; }
.anim-d2 { animation-delay: 0.16s; }
.anim-d3 { animation-delay: 0.24s; }
.anim-d4 { animation-delay: 0.32s; }
.anim-d5 { animation-delay: 0.40s; }
.anim-fade { animation: fadeIn 0.8s ease both; }
.anim-scale { animation: scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }

#skip-link {
  position: absolute; left: -9999px; top: auto; width: 1px; height: 1px; overflow: hidden;
  z-index: 9999; background: var(--wine); color: white; padding: 12px 24px; font-size: 14px;
  text-decoration: none; border-radius: 0 0 var(--radius) 0;
}
#skip-link:focus { position: fixed; left: 0; top: 0; width: auto; height: auto; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  html { scroll-behavior: auto; }
}

/* ── HEADER ── */
.site-header {
  position: sticky; top: 0; z-index: 100;
  background: rgba(255,252,249,0.92); backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(42,42,42,0.08);
  box-shadow: 0 10px 30px rgba(42,42,42,0.04);
}
.header-utility {
  background: rgba(139,58,68,0.06); color: var(--wine-deep); font-size: 11.5px; padding: 8px 24px;
  letter-spacing: 0.04em; font-weight: 400;
}
.header-utility-inner {
  max-width: 1200px; margin: 0 auto; display: flex; justify-content: center;
  gap: 10px 28px; flex-wrap: wrap;
}
.header-utility span {
  opacity: 0.82; position: relative; display: inline-flex; align-items: center;
}
.header-utility span:not(:first-child)::before {
  content: ''; width: 1px; height: 11px; background: rgba(139,58,68,0.18);
  position: absolute; left: -14px; top: 50%; transform: translateY(-50%);
}
.header-utility strong { color: var(--wine); font-weight: 600; }
@media (max-width: 640px) { .header-utility span:not(:first-child)::before { display: none; } }
.header-main {
  max-width: 1200px; margin: 0 auto; padding: 0 24px;
  display: flex; align-items: center; justify-content: space-between; gap: 24px; height: 76px;
}
.header-logo {
  font-family: var(--font-display); font-size: 22px; font-weight: 700;
  color: var(--charcoal); text-decoration: none; letter-spacing: -0.01em;
  cursor: pointer; white-space: nowrap; display: flex; align-items: center; gap: 10px;
}
.header-logo .brand-mark { width: 40px; height: 40px; flex-shrink: 0; display: block; }
@media (max-width: 768px) { .header-logo .brand-mark { width: 32px; height: 32px; } }
.header-logo .logo-act { color: var(--wine); font-style: italic; }
.header-logo .logo-two { color: var(--charcoal); }
.header-nav { display: flex; gap: 4px; align-items: center; flex: 1; justify-content: center; }
.header-nav a, .header-nav button {
  color: var(--slate); text-decoration: none; font-size: 11.5px; font-weight: 600;
  padding: 10px 12px; border-radius: 999px; transition: var(--transition);
  cursor: pointer; background: none; border: none; font-family: var(--font-body);
  white-space: nowrap; text-transform: uppercase; letter-spacing: 0.08em;
}
.header-nav a:hover, .header-nav button:hover { color: var(--charcoal); background: rgba(42,42,42,0.04); }
.header-nav a.active { color: var(--wine-deep); background: var(--wine-pale); }
.header-actions { display: flex; align-items: center; gap: 10px; }
.header-phone {
  display: flex; align-items: center; gap: 6px; color: var(--wine);
  text-decoration: none; font-weight: 600; font-size: 14px; padding: 8px 16px;
  background: rgba(139,58,68,0.08); border-radius: 999px; transition: var(--transition);
  white-space: nowrap; border: 1px solid rgba(139,58,68,0.12);
}
.header-phone:hover { background: var(--wine-glow); }
.header-quote-link {
  display: inline-flex; align-items: center; justify-content: center;
  text-decoration: none; font-size: 12px; font-weight: 700; letter-spacing: 0.08em;
  text-transform: uppercase; padding: 10px 16px; border-radius: 999px;
  background: var(--charcoal); color: white; border: 1px solid rgba(42,42,42,0.15);
  transition: var(--transition);
}
.header-quote-link:hover { background: var(--wine-deep); transform: translateY(-1px); }

.mobile-menu-btn {
  display: none; background: none; border: none; color: var(--charcoal); cursor: pointer;
  padding: 8px; font-size: 24px; line-height: 1;
}

@media (max-width: 960px) {
  .header-nav { display: none; }
  .header-phone-desktop { display: none; }
  .mobile-menu-btn { display: block; }
  .header-nav.open {
    display: flex; flex-direction: column; position: absolute;
    top: 100%; left: 0; right: 0; background: rgba(255,253,250,0.98);
    padding: 16px 24px 24px; gap: 4px; border-bottom: 2px solid var(--cream-dark);
    box-shadow: var(--shadow-lg);
  }
  .header-nav.open a, .header-nav.open button { padding: 12px 16px; font-size: 15px; text-align: left; width: 100%; color: var(--charcoal); }
  .header-nav.open .mobile-quote-btn {
    background: var(--wine); color: white; border-radius: var(--radius);
    font-weight: 600; margin-top: 8px; text-align: center;
  }
}

/* ── MOBILE CTA BAR ── */
.mobile-call-bar {
  display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 200;
  background: var(--charcoal); padding: 10px 16px;
  border-top: 2px solid var(--wine);
}
.mobile-call-bar-inner { display: flex; gap: 10px; max-width: 500px; margin: 0 auto; }
.mcb-call, .mcb-quote {
  flex: 1; padding: 14px 16px; border-radius: var(--radius); font-weight: 600;
  font-size: 14px; cursor: pointer; text-align: center; text-decoration: none;
  font-family: var(--font-body); border: none; display: flex; align-items: center;
  justify-content: center; gap: 6px; transition: var(--transition);
}
.mcb-call { background: var(--wine); color: white; }
.mcb-call:hover { background: var(--wine-light); }
.mcb-quote { background: rgba(255,255,255,0.08); color: white; border: 1px solid rgba(255,255,255,0.15); }
.mcb-quote:hover { background: rgba(255,255,255,0.12); }
@media (max-width: 768px) { .mobile-call-bar { display: block; } main { padding-bottom: 80px; } }

/* ── FOOTER ── */
.site-footer {
  background: var(--charcoal); color: rgba(255,255,255,0.6); padding: 64px 24px 32px;
  font-size: 14px;
}
.footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; }
.footer-brand h3 { font-family: var(--font-display); font-size: 24px; color: white; margin-bottom: 12px; font-weight: 700; }
.footer-brand h3 span { color: var(--gold-light); font-style: italic; }
.footer-brand p { line-height: 1.7; margin-bottom: 16px; }
.footer-col h4 { color: var(--gold); font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px; font-weight: 600; }
.footer-col a { display: block; color: rgba(255,255,255,0.5); text-decoration: none; padding: 4px 0; transition: var(--transition); cursor: pointer; }
.footer-col a:hover { color: white; }
.footer-bottom { max-width: 1200px; margin: 40px auto 0; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center; font-size: 12px; opacity: 0.4; }
@media (max-width: 768px) { .footer-inner { grid-template-columns: 1fr; gap: 32px; } }

/* ── HERO ── */
.hero {
  background: var(--linen);
  padding: 88px 24px 76px; text-align: center; position: relative; overflow: hidden;
  border-bottom: 1px solid var(--cream-dark);
}
.hero::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, var(--wine-glow) 0%, transparent 70%);
  pointer-events: none;
}
.hero::after {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 80% 90%, var(--gold-glow) 0%, transparent 50%);
  pointer-events: none;
}
.hero-inner { max-width: 820px; margin: 0 auto; position: relative; z-index: 1; }
.hero-badge {
  display: inline-block; background: var(--wine-pale); color: var(--wine);
  padding: 7px 18px; border-radius: 24px; font-size: 11.5px; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 28px;
  border: 1px solid rgba(139,58,68,0.15);
}
.hero h1 {
  font-family: var(--font-display); font-size: clamp(38px, 5.5vw, 60px); font-weight: 700;
  color: var(--charcoal); line-height: 1.12; margin-bottom: 22px; letter-spacing: -0.015em;
}
.hero h1 em { font-style: italic; color: var(--wine); }
.hero p {
  color: var(--slate); font-size: 17px; line-height: 1.75; margin-bottom: 38px;
  max-width: 600px; margin-left: auto; margin-right: auto;
}
.hero-ctas { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 24px; }
.btn-primary {
  background: var(--wine); color: white; border: none; padding: 15px 34px;
  border-radius: var(--radius); font-weight: 600; font-size: 15px; cursor: pointer;
  transition: var(--transition); font-family: var(--font-body); text-decoration: none;
  display: inline-flex; align-items: center; gap: 8px;
}
.btn-primary:hover { background: var(--wine-light); transform: translateY(-2px); box-shadow: var(--shadow-lg); }
.btn-secondary {
  background: white; color: var(--charcoal); border: 1px solid var(--cream-dark);
  padding: 15px 34px; border-radius: var(--radius); font-weight: 500; font-size: 15px;
  cursor: pointer; transition: var(--transition); font-family: var(--font-body); text-decoration: none;
  display: inline-flex; align-items: center; gap: 8px;
}
.btn-secondary:hover { background: var(--parchment); border-color: var(--mist); }
.hero-tertiary { color: var(--slate); font-size: 13px; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; background: none; border: none; font-family: var(--font-body); }
.hero-tertiary:hover { color: var(--wine); }

/* ── SECTIONS ── */
.section { padding: 80px 24px; }
.section-inner { max-width: 1200px; margin: 0 auto; }
.section-alt { background: var(--parchment); }
.section-dark { background: var(--charcoal); color: var(--cream); }
.section-wine { background: var(--blush); }
.section-label {
  font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600;
  color: var(--wine); margin-bottom: 12px;
}
.section-dark .section-label { color: var(--gold-pale); }
.section-wine .section-label { color: var(--wine); }
.section-title {
  font-family: var(--font-display); font-size: clamp(28px, 4vw, 44px); font-weight: 700;
  color: var(--charcoal); line-height: 1.15; margin-bottom: 16px;
}
.section-dark .section-title { color: var(--cream); }
.section-subtitle { color: var(--slate); font-size: 16px; line-height: 1.7; max-width: 600px; }
.section-heading {
  display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  gap: 28px; align-items: end; margin-bottom: 32px;
}
.section-heading .section-title { margin-bottom: 0; }
.section-heading-copy { max-width: 460px; justify-self: end; }
@media (max-width: 860px) {
  .section-heading { grid-template-columns: 1fr; gap: 12px; }
  .section-heading-copy { justify-self: start; max-width: 600px; }
}

/* ── CARDS ── */
.card {
  background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,251,246,0.98) 100%);
  border-radius: var(--radius-lg); overflow: hidden;
  box-shadow: var(--shadow-sm); transition: var(--transition); border: 1px solid rgba(42,42,42,0.06);
}
.card:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); border-color: rgba(139,58,68,0.14); }
.card-body { padding: 28px; }
.card-icon { font-size: 28px; margin-bottom: 14px; }
.card-title { font-family: var(--font-display); font-size: 22px; font-weight: 600; color: var(--charcoal); margin-bottom: 8px; }
.card-text { color: var(--slate); font-size: 14px; line-height: 1.65; }

/* ── FAQ ── */
.faq-item { border-bottom: 1px solid var(--cream-dark); }
.faq-q {
  width: 100%; text-align: left; padding: 20px 0; background: none; border: none;
  font-family: var(--font-body); font-size: 15px; font-weight: 500; color: var(--charcoal);
  cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px;
}
.faq-q:hover { color: var(--wine); }
.faq-arrow { font-size: 18px; transition: var(--transition); color: var(--mist); flex-shrink: 0; }
.faq-arrow.open { transform: rotate(180deg); color: var(--wine); }
.faq-a { padding: 0 0 20px; font-size: 14px; line-height: 1.7; color: var(--slate); max-width: 700px; }

/* ── QUOTE FORM ── */
.quote-form-container {
  background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);
  overflow: hidden; max-width: 560px; margin: 0 auto; border: 1px solid var(--cream-dark);
}
.form-progress { display: flex; height: 4px; background: var(--cream-dark); }
.form-progress-fill { background: var(--wine); transition: width 0.4s ease; }
.form-step-header { padding: 28px 32px 0; }
.form-step-label { font-size: 11px; color: var(--wine); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
.form-step-title { font-family: var(--font-display); font-size: 24px; color: var(--charcoal); font-weight: 700; }
.form-body { padding: 24px 32px 32px; }
.form-field { margin-bottom: 18px; }
.form-label { display: block; font-size: 13px; font-weight: 500; color: var(--charcoal); margin-bottom: 6px; }
.form-input, .form-select, .form-textarea {
  width: 100%; padding: 12px 14px; border: 1.5px solid var(--cream-dark); border-radius: var(--radius);
  font-family: var(--font-body); font-size: 14px; color: var(--charcoal); transition: var(--transition);
  background: white; outline: none;
}
.form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--wine); box-shadow: 0 0 0 3px var(--wine-glow); }
.form-textarea { resize: vertical; min-height: 80px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media (max-width: 480px) { .form-row { grid-template-columns: 1fr; } }
.form-actions { display: flex; gap: 12px; justify-content: space-between; margin-top: 8px; }
.form-btn-back {
  padding: 12px 24px; border-radius: var(--radius); font-weight: 500; font-size: 14px;
  cursor: pointer; font-family: var(--font-body); background: none; border: 1px solid var(--mist);
  color: var(--slate); transition: var(--transition);
}
.form-btn-back:hover { border-color: var(--charcoal); color: var(--charcoal); }
.form-btn-next {
  padding: 12px 28px; border-radius: var(--radius); font-weight: 600; font-size: 14px;
  cursor: pointer; font-family: var(--font-body); background: var(--wine); border: none;
  color: white; transition: var(--transition); margin-left: auto;
}
.form-btn-next:hover { background: var(--wine-light); }
.form-success { text-align: center; padding: 48px 32px; }
.form-success h3 { font-family: var(--font-display); font-size: 28px; color: var(--charcoal); margin: 16px 0 12px; }
.form-success p { color: var(--slate); font-size: 14px; }

/* ── INLINE CTA ── */
.inline-cta {
  background: linear-gradient(160deg, var(--charcoal) 0%, var(--charcoal-light) 100%);
  border-radius: var(--radius-lg); padding: 52px 44px; text-align: center; margin: 48px 0;
  position: relative; overflow: hidden;
}
.inline-cta::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 30% 50%, rgba(139,58,68,0.15), transparent 60%);
  pointer-events: none;
}
.inline-cta::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--wine), var(--gold), var(--wine));
}
.inline-cta h3 { font-family: var(--font-display); font-size: 30px; color: white; margin-bottom: 12px; position: relative; }
.inline-cta p { color: rgba(255,255,255,0.6); margin-bottom: 28px; font-size: 15px; position: relative; }

/* ── BREADCRUMB ── */
.breadcrumb { font-size: 13px; color: var(--slate); margin-bottom: 8px; }
.breadcrumb a { color: var(--wine); text-decoration: none; cursor: pointer; }
.breadcrumb a:hover { text-decoration: underline; }

/* ── SECTION DIVIDER ── */
.section-divider {
  height: 1px; max-width: 120px; margin: 0 auto;
  background: linear-gradient(90deg, transparent, var(--wine-pale), var(--gold-pale), var(--wine-pale), transparent);
}

/* ── MISC ── */
.text-center { text-align: center; }
.mt-24 { margin-top: 24px; }
.mt-32 { margin-top: 32px; }
.mt-48 { margin-top: 48px; }
.mb-24 { margin-bottom: 24px; }
.mb-32 { margin-bottom: 32px; }
.mb-48 { margin-bottom: 48px; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start; }
@media (max-width: 768px) { .grid-2 { grid-template-columns: 1fr; } }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
@media (max-width: 768px) { .grid-3 { grid-template-columns: 1fr; } }
.link-btn { background: none; border: none; color: var(--wine); font-weight: 600; cursor: pointer; font-family: var(--font-body); font-size: 14px; text-decoration: underline; text-underline-offset: 3px; padding: 0; }
.link-btn:hover { color: var(--wine-light); }

/* ── CATEGORY GRID (What We Do) ── */
.cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.cat-card { padding: 32px 28px; }
.cat-card-num {
  font-family: var(--font-display); font-size: 12px; font-weight: 700;
  letter-spacing: 0.18em; color: var(--wine); margin-bottom: 14px;
}
.cat-card h3 { font-family: var(--font-display); font-size: 22px; font-weight: 600; color: var(--charcoal); margin-bottom: 10px; }
.cat-card .cat-summary { font-size: 14px; color: var(--charcoal); line-height: 1.65; margin-bottom: 12px; font-weight: 500; }
.cat-card .cat-detail  { font-size: 13.5px; color: var(--slate); line-height: 1.7; }

/* ── CUISINE TABLE ── */
.cuisine-row {
  display: grid; grid-template-columns: minmax(180px, 1fr) 90px minmax(0, 2fr);
  gap: 18px; align-items: baseline; padding: 16px 0;
  border-bottom: 1px solid var(--cream-dark);
}
.cuisine-row:last-child { border-bottom: none; }
.cuisine-name { font-family: var(--font-display); font-size: 18px; color: var(--charcoal); font-weight: 600; }
.cuisine-count { color: var(--wine); font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
.cuisine-examples { color: var(--slate); font-size: 13.5px; line-height: 1.65; }
@media (max-width: 700px) {
  .cuisine-row { grid-template-columns: 1fr; gap: 4px; padding: 14px 0; }
  .cuisine-count { font-size: 12px; }
}

/* ── SAMPLE MENU CARDS (index) ── */
.menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.menu-card-link { display: block; cursor: pointer; text-decoration: none; color: inherit; }
.menu-card-body { padding: 28px; display: flex; flex-direction: column; height: 100%; }
.menu-card-kicker {
  font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.14em;
  color: var(--wine); font-weight: 700; margin-bottom: 14px;
}
.menu-card-link h3 { font-family: var(--font-display); font-size: 24px; color: var(--charcoal); margin-bottom: 10px; }
.menu-card-link p { font-size: 13.5px; color: var(--slate); line-height: 1.65; flex: 1; }
.menu-card-footer {
  margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--cream-dark);
  display: flex; justify-content: space-between; align-items: center;
  color: var(--wine); font-size: 13px; font-weight: 700;
}
.menu-card-count { color: var(--slate); font-weight: 500; font-size: 12px; }

/* ── SAMPLE MENU DETAIL (styled text menu) ── */
.menu-detail { max-width: 760px; margin: 0 auto; }
.menu-detail-header { text-align: center; padding: 48px 0 32px; }
.menu-detail-header h1 { font-family: var(--font-display); font-size: clamp(32px, 5vw, 48px); color: var(--charcoal); margin-bottom: 12px; }
.menu-detail-header h1 em { color: var(--wine); font-style: italic; }
.menu-detail-header .subtitle { font-family: var(--font-display); font-style: italic; color: var(--slate); font-size: 17px; margin-bottom: 24px; }
.menu-detail-intro { color: var(--slate); font-size: 15px; line-height: 1.8; max-width: 620px; margin: 0 auto; }

.menu-rule {
  height: 1px; max-width: 80px; margin: 32px auto;
  background: linear-gradient(90deg, transparent, var(--wine-pale), var(--gold), var(--wine-pale), transparent);
}

.menu-course { margin-bottom: 36px; text-align: center; }
.menu-course-label {
  font-family: var(--font-display); font-size: 12px; font-weight: 700;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--wine); margin-bottom: 14px;
}
.menu-course-list { list-style: none; padding: 0; margin: 0 0 8px; }
.menu-course-list li {
  font-family: var(--font-display); font-size: 17px; color: var(--charcoal);
  line-height: 1.6; padding: 4px 0; max-width: 580px; margin: 0 auto;
}
.menu-course-sides { margin-top: 14px; padding-top: 14px; border-top: 1px dashed var(--cream-dark); }
.menu-course-sides-label {
  font-family: var(--font-display); font-style: italic; font-size: 12px;
  color: var(--slate); letter-spacing: 0.06em; margin-bottom: 6px;
}
.menu-course-sides ul { list-style: none; padding: 0; }
.menu-course-sides li { font-size: 14px; color: var(--slate); padding: 2px 0; }

.menu-notes {
  margin-top: 24px; padding: 18px 22px;
  background: var(--parchment); border-radius: var(--radius);
  font-size: 13px; line-height: 1.7; color: var(--slate);
  border: 1px solid var(--cream-dark);
}
.menu-notes strong { color: var(--charcoal); }

.menu-policy {
  margin-top: 36px; padding: 28px;
  background: var(--blush); border-radius: var(--radius-lg);
  text-align: center; border: 1px solid rgba(139,58,68,0.08);
}
.menu-policy strong { font-family: var(--font-display); font-style: italic; font-size: 18px; color: var(--wine-deep); display: block; margin-bottom: 6px; }
.menu-policy span { color: var(--charcoal); font-size: 14px; line-height: 1.7; }

/* ── HOME: WHY-DIFFERENT + TESTIMONIALS ── */
.intro-block { max-width: 760px; margin: 0 auto; text-align: center; }
.intro-block p { font-size: 16px; color: var(--charcoal); line-height: 1.85; margin-bottom: 20px; }
.intro-block p:last-child { margin-bottom: 0; }

.testimonial-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
@media (max-width: 860px) { .testimonial-grid { grid-template-columns: 1fr; } }
.testimonial {
  background: white; border-radius: var(--radius-lg); padding: 28px 26px;
  border: 1px solid var(--cream-dark); position: relative;
  font-family: var(--font-display); font-style: italic; font-size: 17px;
  color: var(--charcoal); line-height: 1.55;
  box-shadow: var(--shadow-sm);
}
.testimonial::before {
  content: '“'; font-size: 56px; line-height: 1; color: var(--wine);
  position: absolute; top: 8px; left: 14px; opacity: 0.35; font-family: var(--font-display);
}
.testimonial-text { padding-top: 14px; }

/* ── CHEF BIO PAGE ── */
.chef-bio { max-width: 720px; margin: 0 auto; }
.chef-bio p { font-size: 16px; color: var(--charcoal); line-height: 1.85; margin-bottom: 22px; }
.chef-bio p:first-of-type::first-letter {
  font-family: var(--font-display); font-size: 56px; font-weight: 700;
  color: var(--wine); float: left; line-height: 0.9; padding: 8px 12px 0 0;
}

/* ── CONTACT ── */
.contact-info { font-size: 15px; line-height: 1.85; color: var(--charcoal); }
.contact-info a { color: var(--wine); text-decoration: none; font-weight: 600; }
.contact-info a:hover { text-decoration: underline; }
.contact-info .label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--slate); font-weight: 600; margin-top: 18px; margin-bottom: 4px; }
.contact-info .label:first-child { margin-top: 0; }
.contact-expectation {
  margin-top: 28px; padding: 22px 24px;
  background: var(--parchment); border-radius: var(--radius);
  border: 1px solid var(--cream-dark);
}
.contact-expectation strong { font-family: var(--font-display); font-size: 16px; color: var(--charcoal); display: block; margin-bottom: 6px; }
.contact-expectation p { font-size: 13.5px; color: var(--slate); line-height: 1.7; }
`;

  // ───────────────────────────────────────────────
  // ROUTING + UTILITY HOOKS
  // ───────────────────────────────────────────────
  function useHash() {
    const [hash, setHash] = useState(window.location.hash || "#/");
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

  // ───────────────────────────────────────────────
  // SHARED UI PRIMITIVES
  // ───────────────────────────────────────────────
  function HashLink({ to, className, children, onClick, ...props }) {
    const handleClick = (e) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      e.preventDefault();
      navigate(to);
    };
    return React.createElement("a", { href: routeHref(to), className, onClick: handleClick, ...props }, children);
  }

  function HeroSection({ badge, title, subtitle, primaryCta, primaryRoute = "/contact", secondaryCta }) {
    return React.createElement("section", { className: "hero" },
      React.createElement("div", { className: "hero-inner" },
        badge ? React.createElement("div", { className: "hero-badge" }, badge) : null,
        React.createElement("h1", { dangerouslySetInnerHTML: { __html: title } }),
        subtitle ? React.createElement("p", null, subtitle) : null,
        React.createElement("div", { className: "hero-ctas" },
          primaryCta ? React.createElement("button", { className: "btn-primary", onClick: () => navigate(primaryRoute) }, primaryCta) : null,
          secondaryCta ? React.createElement("a", { href: BIZ.phoneTel, className: "btn-secondary" }, secondaryCta) : null
        )
      )
    );
  }

  function InlineCTA({
    title = "We'd love to work with you!",
    text = "Tell us about your event and we'll be in touch shortly.",
    cta = "Contact Us",
    route = "/contact"
  }) {
    return React.createElement("div", { className: "inline-cta" },
      React.createElement("h3", null, title),
      React.createElement("p", null, text),
      React.createElement("button", { className: "btn-primary", onClick: () => navigate(route), style: { position: "relative" } }, cta)
    );
  }

  function FAQAccordion({ faqs }) {
    const [openId, setOpenId] = useState(null);
    return React.createElement("div", null,
      faqs.map((f, i) => React.createElement("div", { key: i, className: "faq-item" },
        React.createElement("button", {
          className: "faq-q",
          onClick: () => setOpenId(openId === i ? null : i),
          "aria-expanded": openId === i
        }, f.q, React.createElement("span", { className: `faq-arrow ${openId === i ? "open" : ""}` }, "▾")),
        openId === i ? React.createElement("div", { className: "faq-a" }, f.a) : null
      ))
    );
  }

  // ───────────────────────────────────────────────
  // QUOTE FORM — multi-step, mailto fallback (Phase 2 will wire backend)
  // ───────────────────────────────────────────────
  function QuoteForm() {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
      eventType: "", guests: "", eventDate: "", location: "",
      name: "", phone: "", email: "", details: ""
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
        form.details || "(none)"
      ].join("\n");
      const subject = encodeURIComponent("Catering inquiry from acttwocatering.com");
      const body = encodeURIComponent(lines);
      window.location.href = `mailto:${BIZ.email}?subject=${subject}&body=${body}`;
      setSubmitted(true);
    };

    if (submitted) {
      return React.createElement("div", { className: "quote-form-container" },
        React.createElement("div", { className: "form-success" },
          React.createElement("div", { style: { fontSize: 48 } }, "✉️"),
          React.createElement("h3", null, "Inquiry sent"),
          React.createElement("p", null, "Your email client should be opening now. If it didn't, call or email us directly."),
          React.createElement("p", { style: { marginTop: 12 } },
            React.createElement("a", { href: BIZ.phoneTel, style: { color: "var(--wine)", fontWeight: 600 } }, BIZ.phone)
          )
        )
      );
    }

    return React.createElement("div", { className: "quote-form-container" },
      React.createElement("div", { className: "form-progress" },
        React.createElement("div", { className: "form-progress-fill", style: { width: `${(step / totalSteps) * 100}%` } })
      ),
      React.createElement("div", { className: "form-step-header" },
        React.createElement("div", { className: "form-step-label" }, "Step ", step, " of ", totalSteps),
        React.createElement("div", { className: "form-step-title" },
          step === 1 ? "Your event" : step === 2 ? "Your contact details" : "A few more details"
        )
      ),
      React.createElement("div", { className: "form-body" },
        step === 1 && React.createElement(React.Fragment, null,
          React.createElement("div", { className: "form-field" },
            React.createElement("label", { className: "form-label", htmlFor: "qf-type" }, "Event type"),
            React.createElement("select", {
              id: "qf-type", className: "form-select",
              value: form.eventType, onChange: (e) => set("eventType", e.target.value)
            },
              React.createElement("option", { value: "" }, "Select an event type…"),
              SERVICE_CATEGORIES.map((c) => React.createElement("option", { key: c.id, value: c.title }, c.title)),
              React.createElement("option", { value: "Other" }, "Other / not sure yet")
            )
          ),
          React.createElement("div", { className: "form-row" },
            React.createElement("div", { className: "form-field" },
              React.createElement("label", { className: "form-label", htmlFor: "qf-guests" }, "Estimated guest count"),
              React.createElement("input", {
                id: "qf-guests", className: "form-input", type: "number", inputMode: "numeric",
                placeholder: "e.g. 24", value: form.guests, onChange: (e) => set("guests", e.target.value)
              })
            ),
            React.createElement("div", { className: "form-field" },
              React.createElement("label", { className: "form-label", htmlFor: "qf-date" }, "Event date"),
              React.createElement("input", {
                id: "qf-date", className: "form-input", type: "date",
                value: form.eventDate, onChange: (e) => set("eventDate", e.target.value)
              })
            )
          ),
          React.createElement("div", { className: "form-field" },
            React.createElement("label", { className: "form-label", htmlFor: "qf-location" }, "Event location / city"),
            React.createElement("input", {
              id: "qf-location", className: "form-input",
              placeholder: "e.g. Cherry Hill, NJ",
              value: form.location, onChange: (e) => set("location", e.target.value)
            })
          )
        ),
        step === 2 && React.createElement(React.Fragment, null,
          React.createElement("div", { className: "form-field" },
            React.createElement("label", { className: "form-label", htmlFor: "qf-name" }, "Full name *"),
            React.createElement("input", {
              id: "qf-name", className: "form-input",
              value: form.name, onChange: (e) => set("name", e.target.value), required: true
            })
          ),
          React.createElement("div", { className: "form-row" },
            React.createElement("div", { className: "form-field" },
              React.createElement("label", { className: "form-label", htmlFor: "qf-phone" }, "Phone *"),
              React.createElement("input", {
                id: "qf-phone", className: "form-input", type: "tel", inputMode: "tel",
                value: form.phone, onChange: (e) => set("phone", e.target.value), required: true
              })
            ),
            React.createElement("div", { className: "form-field" },
              React.createElement("label", { className: "form-label", htmlFor: "qf-email" }, "Email *"),
              React.createElement("input", {
                id: "qf-email", className: "form-input", type: "email", inputMode: "email",
                value: form.email, onChange: (e) => set("email", e.target.value), required: true
              })
            )
          )
        ),
        step === 3 && React.createElement(React.Fragment, null,
          React.createElement("div", { className: "form-field" },
            React.createElement("label", { className: "form-label", htmlFor: "qf-details" }, "Tell us about your event"),
            React.createElement("textarea", {
              id: "qf-details", className: "form-textarea", style: { minHeight: 120 },
              placeholder: "What's the occasion? Any dietary needs? Vision for the food? The more you share, the better we can plan…",
              value: form.details, onChange: (e) => set("details", e.target.value)
            })
          )
        ),
        React.createElement("div", { className: "form-actions" },
          step > 1 ? React.createElement("button", { className: "form-btn-back", onClick: () => setStep((s) => s - 1) }, "← Back") : null,
          step < totalSteps
            ? React.createElement("button", { className: "form-btn-next", onClick: () => setStep((s) => s + 1) }, "Continue →")
            : React.createElement("button", { className: "form-btn-next", onClick: handleSubmit }, "Send inquiry")
        )
      )
    );
  }

  // ───────────────────────────────────────────────
  // PAGES
  // ───────────────────────────────────────────────
  function HomePage() {
    return React.createElement(React.Fragment, null,
      // Hero
      React.createElement(HeroSection, {
        badge: "Premium catering \xB7 South Jersey",
        title: "Restaurant-quality catering, <em>designed for smaller gatherings</em>",
        subtitle: BIZ.tagline,
        primaryCta: "Contact Us",
        secondaryCta: `Call ${BIZ.phone}`
      }),

      // Intro
      React.createElement("section", { className: "section" },
        React.createElement("div", { className: "section-inner" },
          React.createElement("div", { className: "intro-block" },
            React.createElement("div", { className: "section-label", style: { textAlign: "center" } }, "An elevated catering experience"),
            React.createElement("h2", { className: "section-title", style: { textAlign: "center", marginBottom: 28 } },
              "Designed for smaller gatherings"),
            React.createElement("p", null,
              "You don’t have to settle for ordinary takeout trays when hosting a special event."),
            React.createElement("p", null,
              "At Act Two, we bring restaurant-quality catering to smaller occasions, delivering thoughtfully prepared dining experiences without the complexity or cost of large-scale catering."),
            React.createElement("p", null,
              "Because we focus on intimate gatherings, we can provide personalized service, handcrafted menus, and exceptional ingredients—sourced fresh, prepared from scratch, and never frozen or pre-made. The result? A premium catering experience that feels indulgent yet remains surprisingly within reach."),
            React.createElement("p", null,
              React.createElement("em", null, "Let’s make your next gathering something truly special."))
          )
        )
      ),

      React.createElement("div", { className: "section-divider" }),

      // What we do teaser
      React.createElement("section", { className: "section section-alt" },
        React.createElement("div", { className: "section-inner" },
          React.createElement("div", { className: "section-heading" },
            React.createElement("div", null,
              React.createElement("div", { className: "section-label" }, "What we do"),
              React.createElement("h2", { className: "section-title" }, "Catering for the way you actually want to host")
            ),
            React.createElement("p", { className: "section-subtitle section-heading-copy" },
              "Whether it’s a dinner party, milestone celebration, or corporate event, we create a personalized, restaurant-quality experience without the hassle of traditional catering.")
          ),
          React.createElement("div", { className: "cat-grid" },
            SERVICE_CATEGORIES.map((c, i) => React.createElement("div", { key: c.id, className: "card cat-card" },
              React.createElement("div", { className: "cat-card-num" }, String(i + 1).padStart(2, "0")),
              React.createElement("h3", null, c.title),
              React.createElement("p", { className: "cat-summary" }, c.summary),
              React.createElement("p", { className: "cat-detail" }, c.detail)
            ))
          ),
          React.createElement("div", { className: "text-center mt-32" },
            React.createElement("button", { className: "link-btn", onClick: () => navigate("/what-we-do") }, "More about what we do →")
          )
        )
      ),

      // Why we're different
      React.createElement("section", { className: "section" },
        React.createElement("div", { className: "section-inner" },
          React.createElement("div", { className: "intro-block" },
            React.createElement("div", { className: "section-label", style: { textAlign: "center" } }, "Why we’re different"),
            React.createElement("h2", { className: "section-title", style: { textAlign: "center", marginBottom: 22 } },
              "We don’t scale up—we scale down with intention"),
            React.createElement("p", null,
              "By focusing on smaller gatherings, we deliver elevated food, handcrafted from scratch, using premium ingredients. It’s the kind of catering you didn’t think was possible for events this size.")
          )
        )
      ),

      // Sample menu preview
      React.createElement("section", { className: "section section-alt" },
        React.createElement("div", { className: "section-inner" },
          React.createElement("div", { className: "section-heading" },
            React.createElement("div", null,
              React.createElement("div", { className: "section-label" }, "Sample menus"),
              React.createElement("h2", { className: "section-title" }, "A starting point for every conversation")
            ),
            React.createElement("p", { className: "section-subtitle section-heading-copy" },
              "Three curated menus to give you a sense of how we cook. Every event gets a custom menu built around your tastes, dietary needs, and budget.")
          ),
          React.createElement("div", { className: "menu-grid" },
            SAMPLE_MENUS.map((m) => React.createElement(HashLink, {
              key: m.slug, to: `/sample-menus/${m.slug}`,
              className: "card menu-card-link",
              "aria-label": `View sample menu: ${m.title}`
            },
              React.createElement("div", { className: "menu-card-body" },
                React.createElement("div", { className: "menu-card-kicker" }, "Sample menu"),
                React.createElement("h3", null, m.title),
                React.createElement("p", null, m.subtitle),
                React.createElement("div", { className: "menu-card-footer" },
                  React.createElement("span", null, "View menu →"),
                  React.createElement("span", { className: "menu-card-count" }, m.dishCount, " dishes")
                )
              )
            ))
          )
        )
      ),

      // Testimonials
      React.createElement("section", { className: "section" },
        React.createElement("div", { className: "section-inner" },
          React.createElement("div", { className: "section-label", style: { textAlign: "center" } }, "What people say"),
          React.createElement("h2", { className: "section-title", style: { textAlign: "center", marginBottom: 36 } }, "From recent events"),
          React.createElement("div", { className: "testimonial-grid" },
            TESTIMONIALS.map((t, i) => React.createElement("div", { key: i, className: "testimonial" },
              React.createElement("div", { className: "testimonial-text" }, t)
            ))
          )
        )
      ),

      // Closing CTA
      React.createElement("section", { className: "section section-alt" },
        React.createElement("div", { className: "section-inner" },
          React.createElement("div", { className: "intro-block" },
            React.createElement("h2", { className: "section-title", style: { textAlign: "center" } }, "We’d love to work with you!"),
            React.createElement("div", { className: "text-center mt-24" },
              React.createElement("button", { className: "btn-primary", onClick: () => navigate("/contact") }, "Contact Us")
            )
          )
        )
      )
    );
  }

  function WhatWeDoPage() {
    return React.createElement(React.Fragment, null,
      React.createElement(HeroSection, {
        badge: "What we do",
        title: "Catering for <em>the room you’re hosting</em>",
        subtitle: "Three formats by event size and tone. Every menu is custom — the categories below describe how we work, not a fixed package.",
        primaryCta: "Start a conversation",
        secondaryCta: `Call ${BIZ.phone}`
      }),

      // Service categories
      React.createElement("section", { className: "section" },
        React.createElement("div", { className: "section-inner" },
          React.createElement("div", { className: "section-label" }, "Formats"),
          React.createElement("h2", { className: "section-title" }, "Three ways we cater"),
          React.createElement("div", { className: "cat-grid mt-32" },
            SERVICE_CATEGORIES.map((c, i) => React.createElement("div", { key: c.id, className: "card cat-card" },
              React.createElement("div", { className: "cat-card-num" }, String(i + 1).padStart(2, "0")),
              React.createElement("h3", null, c.title),
              React.createElement("p", { className: "cat-summary" }, c.summary),
              React.createElement("p", { className: "cat-detail" }, c.detail)
            ))
          )
        )
      ),

      // Cuisines
      React.createElement("section", { className: "section section-alt" },
        React.createElement("div", { className: "section-inner" },
          React.createElement("div", { className: "section-label" }, "Cuisines we cook"),
          React.createElement("h2", { className: "section-title" }, "Range, backed by a working recipe library"),
          React.createElement("p", { className: "section-subtitle mb-32", style: { marginTop: 12 } },
            "Each cuisine below is something we actively cook — not a marketing claim. The numbers reflect how many recipes from that tradition we have ready to go."),
          React.createElement("div", { className: "card", style: { padding: "12px 28px", marginTop: 24 } },
            CUISINES.map((c, i) => React.createElement("div", { key: i, className: "cuisine-row" },
              React.createElement("div", { className: "cuisine-name" }, c.name),
              React.createElement("div", { className: "cuisine-count" }, c.count, "+ recipes"),
              React.createElement("div", { className: "cuisine-examples" }, c.examples)
            ))
          )
        )
      ),

      // FAQs
      React.createElement("section", { className: "section" },
        React.createElement("div", { className: "section-inner", style: { maxWidth: 760 } },
          React.createElement("div", { className: "section-label" }, "Frequently asked"),
          React.createElement("h2", { className: "section-title" }, "Common questions"),
          React.createElement("div", { className: "mt-32" }, React.createElement(FAQAccordion, { faqs: FAQS }))
        )
      ),

      React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", padding: "0 24px" } },
        React.createElement(InlineCTA, { title: "Ready to start the conversation?", text: "Tell us about your event and we’ll send a custom proposal within 24 hours." })
      )
    );
  }

  function SampleMenusPage() {
    return React.createElement(React.Fragment, null,
      React.createElement(HeroSection, {
        badge: "Sample menus",
        title: "Three menus, <em>endless variations</em>",
        subtitle: "Every event is different. The sample menus below show how we build a course progression — yours will be tuned to your guests, dietary needs, and the occasion."
      }),
      React.createElement("section", { className: "section" },
        React.createElement("div", { className: "section-inner" },
          React.createElement("div", { className: "menu-grid" },
            SAMPLE_MENUS.map((m) => React.createElement(HashLink, {
              key: m.slug, to: `/sample-menus/${m.slug}`,
              className: "card menu-card-link",
              "aria-label": `View sample menu: ${m.title}`
            },
              React.createElement("div", { className: "menu-card-body" },
                React.createElement("div", { className: "menu-card-kicker" }, "Sample menu"),
                React.createElement("h3", null, m.title),
                React.createElement("p", null, m.subtitle),
                React.createElement("div", { className: "menu-card-footer" },
                  React.createElement("span", null, "View menu →"),
                  React.createElement("span", { className: "menu-card-count" }, m.dishCount, " dishes")
                )
              )
            ))
          ),
          React.createElement(InlineCTA, {
            title: "Want a menu built around your event?",
            text: "Tell us a bit about it and we’ll send a custom menu and quote within 24 hours."
          })
        )
      )
    );
  }

  function SampleMenuDetailPage({ slug }) {
    const menu = getMenu(slug);
    if (!menu) {
      return React.createElement("section", { className: "section" },
        React.createElement("div", { className: "section-inner" },
          React.createElement("p", null, "Menu not found. ",
            React.createElement(HashLink, { to: "/sample-menus" }, "View all sample menus")
          )
        )
      );
    }
    return React.createElement(React.Fragment, null,
      React.createElement("section", { className: "section" },
        React.createElement("div", { className: "section-inner menu-detail" },
          React.createElement("div", { className: "breadcrumb" },
            React.createElement(HashLink, { to: "/" }, "Home"), " / ",
            React.createElement(HashLink, { to: "/sample-menus" }, "Sample menus"), " / ", menu.title
          ),
          React.createElement("div", { className: "menu-detail-header" },
            React.createElement("h1", null, menu.title),
            React.createElement("div", { className: "subtitle" }, menu.subtitle),
            React.createElement("p", { className: "menu-detail-intro" }, menu.intro)
          ),
          React.createElement("div", { className: "menu-rule" }),
          menu.courses.map((course, i) => React.createElement("div", { key: i, className: "menu-course" },
            React.createElement("div", { className: "menu-course-label" }, course.course),
            React.createElement("ul", { className: "menu-course-list" },
              course.items.map((item, j) => React.createElement("li", { key: j }, item))
            ),
            course.sides ? React.createElement("div", { className: "menu-course-sides" },
              React.createElement("div", { className: "menu-course-sides-label" }, "served with"),
              React.createElement("ul", null,
                course.sides.map((s, k) => React.createElement("li", { key: k }, s))
              )
            ) : null
          )),
          menu.notes ? React.createElement("div", { className: "menu-notes" },
            React.createElement("strong", null, "A note: "), menu.notes
          ) : null,
          React.createElement("div", { className: "menu-policy" },
            React.createElement("strong", null, "This is a starting point."),
            React.createElement("span", null, "Every event gets a custom menu built around your tastes, dietary needs, and budget.")
          ),
          React.createElement("div", { className: "text-center mt-32" },
            React.createElement("button", { className: "btn-primary", onClick: () => navigate("/contact") }, "Build my menu →")
          )
        )
      )
    );
  }

  function TheChefPage() {
    return React.createElement(React.Fragment, null,
      React.createElement(HeroSection, {
        badge: "My second act",
        title: "The chef <em>behind the food</em>"
      }),
      React.createElement("section", { className: "section" },
        React.createElement("div", { className: "section-inner" },
          React.createElement("div", { className: "chef-bio" },
            CHEF_BIO.map((p, i) => React.createElement("p", { key: i }, p))
          )
        )
      ),
      React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", padding: "0 24px 48px" } },
        React.createElement(InlineCTA, null)
      )
    );
  }

  function ContactPage() {
    return React.createElement(React.Fragment, null,
      React.createElement(HeroSection, {
        badge: "Contact",
        title: "Let us help you <em>celebrate</em>",
        subtitle: "Fill out some info and we’ll be in touch shortly. We can’t wait to hear from you!"
      }),
      React.createElement("section", { className: "section" },
        React.createElement("div", { className: "section-inner" },
          React.createElement("div", { className: "grid-2" },
            React.createElement(QuoteForm, null),
            React.createElement("div", { className: "contact-info" },
              React.createElement("div", { className: "section-label" }, "Get in touch"),
              React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontSize: 24, color: "var(--charcoal)", marginBottom: 20 } }, "Contact information"),
              React.createElement("span", { className: "label" }, "Phone"),
              React.createElement("a", { href: BIZ.phoneTel }, BIZ.phone),
              React.createElement("span", { className: "label" }, "Service area"),
              "South Jersey and the greater Philadelphia area",
              React.createElement("div", { className: "contact-expectation" },
                React.createElement("strong", null, "What to expect"),
                React.createElement("p", null,
                  "Every event is different, so every quote is custom. Send us the details above and we’ll come back within 24 hours with a menu and pricing tailored to your gathering."
                )
              )
            )
          )
        )
      )
    );
  }

  // ───────────────────────────────────────────────
  // CHROME (Header / Footer / MobileCallBar)
  // ───────────────────────────────────────────────
  function Header({ currentPath }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const closeMenu = () => setMenuOpen(false);
    const links = [
      { label: "What We Do",   path: "/what-we-do" },
      { label: "Sample Menus", path: "/sample-menus" },
      { label: "The Chef",     path: "/the-chef" },
      { label: "Contact",      path: "/contact" }
    ];
    return React.createElement("header", { className: "site-header" },
      React.createElement("div", { className: "header-utility" },
        React.createElement("div", { className: "header-utility-inner" },
          React.createElement("span", null, "Premium catering for smaller gatherings"),
          React.createElement("span", null, "South Jersey & Philadelphia"),
          React.createElement("span", null, React.createElement("strong", null, "Custom menus"), " for every event")
        )
      ),
      React.createElement("div", { className: "header-main" },
        React.createElement(HashLink, { to: "/", className: "header-logo", onClick: closeMenu },
          React.createElement("img", {
            src: "assets/icons/svg/A2C_icon_animated.svg", alt: "",
            className: "brand-mark", "aria-hidden": "true"
          }),
          React.createElement("span", { className: "logo-act" }, "Act"), " ",
          React.createElement("span", { className: "logo-two" }, "Two")
        ),
        React.createElement("nav", { className: `header-nav ${menuOpen ? "open" : ""}`, "aria-label": "Main navigation" },
          links.map((l) => React.createElement(HashLink, {
            key: l.path, to: l.path,
            className: currentPath.startsWith(l.path) ? "active" : "",
            onClick: closeMenu
          }, l.label)),
          React.createElement(HashLink, {
            to: "/contact", className: "mobile-quote-btn", onClick: closeMenu,
            style: { display: menuOpen ? "block" : "none" }
          }, "Contact Us")
        ),
        React.createElement("div", { className: "header-actions" },
          React.createElement("a", { href: BIZ.phoneTel, className: "header-phone header-phone-desktop" }, BIZ.phone),
          React.createElement(HashLink, { to: "/contact", className: "header-quote-link header-phone-desktop" }, "Contact Us"),
          React.createElement("button", {
            className: "mobile-menu-btn", onClick: () => setMenuOpen(!menuOpen),
            "aria-expanded": menuOpen, "aria-label": "Toggle navigation menu"
          }, menuOpen ? "✕" : "☰")
        )
      )
    );
  }

  function Footer() {
    return React.createElement("footer", { className: "site-footer" },
      React.createElement("div", { className: "footer-inner" },
        React.createElement("div", { className: "footer-brand" },
          React.createElement("h3", null, React.createElement("span", null, "Act"), " Two Catering"),
          React.createElement("p", null,
            "Premium catering for smaller gatherings. Restaurant-quality cuisine and exceptional service throughout South Jersey and the greater Philadelphia area.")
        ),
        React.createElement("div", { className: "footer-col" },
          React.createElement("h4", null, "Site"),
          React.createElement(HashLink, { to: "/what-we-do" }, "What We Do"),
          React.createElement(HashLink, { to: "/sample-menus" }, "Sample Menus"),
          React.createElement(HashLink, { to: "/the-chef" }, "The Chef"),
          React.createElement(HashLink, { to: "/contact" }, "Contact")
        ),
        React.createElement("div", { className: "footer-col" },
          React.createElement("h4", null, "Contact"),
          React.createElement("a", { href: BIZ.phoneTel }, BIZ.phone),
          React.createElement(HashLink, { to: "/contact" }, "Send an inquiry"),
          React.createElement("div", { style: { marginTop: 12, fontSize: 12, opacity: 0.6 } },
            "South Jersey & greater Philadelphia"
          )
        )
      ),
      React.createElement("div", { className: "footer-bottom" },
        "\xA9 ", new Date().getFullYear(), " Act Two Catering. All rights reserved."
      )
    );
  }

  function MobileCallBar() {
    return React.createElement("div", { className: "mobile-call-bar" },
      React.createElement("div", { className: "mobile-call-bar-inner" },
        React.createElement("a", { href: BIZ.phoneTel, className: "mcb-call" }, "\u{1F4DE} Call"),
        React.createElement("button", { className: "mcb-quote", onClick: () => navigate("/contact") }, "Contact Us")
      )
    );
  }

  function Router({ hash }) {
    const { parts } = parseRoute(hash.replace("#", ""));
    const p0 = parts[0] || "";
    const p1 = parts[1] || "";
    if (!p0) return React.createElement(HomePage, null);
    if (p0 === "what-we-do") return React.createElement(WhatWeDoPage, null);
    if (p0 === "sample-menus" && !p1) return React.createElement(SampleMenusPage, null);
    if (p0 === "sample-menus" && p1) return React.createElement(SampleMenuDetailPage, { slug: p1 });
    if (p0 === "the-chef") return React.createElement(TheChefPage, null);
    if (p0 === "contact") return React.createElement(ContactPage, null);
    return React.createElement(HomePage, null);
  }

  window.__App = function ActTwoCateringApp() {
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
    return React.createElement(React.Fragment, null,
      React.createElement("style", null, CSS),
      React.createElement("a", { id: "skip-link", href: "#main-content" }, "Skip to main content"),
      React.createElement(Header, { currentPath }),
      React.createElement("main", { id: "main-content" },
        React.createElement(Router, { hash })
      ),
      React.createElement(Footer, null),
      React.createElement(MobileCallBar, null)
    );
  };
})();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(window.__App));

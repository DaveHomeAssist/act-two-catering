const {
  useState,
  useEffect,
  useRef
} = React;

// ═══════════════════════════════════════════════════════════════
// DATA LAYER — Act Two Catering
// ═══════════════════════════════════════════════════════════════

const BIZ = {
  name: "Act Two Catering",
  phone: "(267) 665-3324",
  phoneTel: "tel:+12676653324",
  email: "hello@acttwocatering.com",
  address: "Collingswood, NJ",
  city: "Collingswood",
  state: "NJ",
  zip: "08108",
  hours: {
    weekday: "Mon–Fri: 9AM–6PM",
    saturday: "Sat: By Appointment",
    sunday: "Sun: Event Days"
  },
  founded: 2025,
  tagline: "From family recipe to your table — premium comfort catering rooted in tradition.",
  owner: "Robertson"
};
const SERVICES = [{
  id: "weddings",
  slug: "weddings",
  title: "Wedding Catering",
  shortTitle: "Weddings",
  icon: "🥂",
  shortDesc: "Elevated comfort food that makes your reception unforgettable.",
  fullDesc: "Your wedding deserves food that sparks conversation. We craft bespoke menus anchored by our signature turkey croquettes, complemented by seasonal sides and passed appetizers that feel both celebratory and deeply personal.",
  process: ["Tasting Consultation", "Menu Design", "Day-Of Execution", "Seamless Service"],
  processDetails: ["Meet with us to sample dishes, discuss your vision, and explore flavor profiles", "We build a custom menu around your preferences, guest count, and venue", "Our team handles prep, presentation, and timing so you enjoy every moment", "Professional staff, elegant plating, and flawless coordination from first bite to last dance"],
  benefits: ["Custom menus built around your vision", "Signature croquettes as a showstopper appetizer", "Professional service staff included", "Tastings before you commit", "Dietary accommodations handled gracefully", "Coordination with your venue and planner"],
  faqs: [{
    q: "How far in advance should we book?",
    a: "We recommend 4–6 months for weddings to ensure availability, though we can sometimes accommodate shorter timelines."
  }, {
    q: "Can you handle dietary restrictions?",
    a: "Absolutely. We design menus that accommodate gluten-free, dairy-free, vegetarian, and other dietary needs without sacrificing flavor."
  }, {
    q: "Do you provide tastings?",
    a: "Yes — every wedding package includes a complimentary tasting session for up to 4 people so you can experience the food before your big day."
  }, {
    q: "What's included in your service?",
    a: "Full catering with prep, service staff, elegant disposables or china rental options, setup, and cleanup. We handle everything food-related."
  }],
  pricingModel: "person",
  minRate: 45,
  maxRate: 95,
  unit: "guest"
}, {
  id: "corporate",
  slug: "corporate",
  title: "Corporate Events",
  shortTitle: "Corporate",
  icon: "🏢",
  shortDesc: "Impress clients and energize teams with food worth remembering.",
  fullDesc: "From board meetings to company celebrations, we deliver polished catering that elevates your brand. Our menus blend comfort and sophistication — think passed croquettes at your product launch or a build-your-own bowl bar for your team retreat.",
  process: ["Needs Assessment", "Menu Proposal", "Logistics Planning", "Flawless Delivery"],
  processDetails: ["We learn about your event goals, audience, and budget", "Receive a tailored menu proposal with pricing and options", "We coordinate timing, setup, and any venue requirements", "On-time delivery with professional presentation every time"],
  benefits: ["Reliable, on-time delivery", "Scalable from 20 to 500+ guests", "Professional presentation that reflects your brand", "Recurring order options for regular meetings"],
  faqs: [{
    q: "Can you handle recurring weekly orders?",
    a: "Yes — we offer corporate accounts with recurring scheduling and simplified ordering for regular meetings or team lunches."
  }, {
    q: "What's your minimum order?",
    a: "We typically require a minimum of 20 guests for corporate events, though we can work with smaller groups for premium packages."
  }],
  pricingModel: "person",
  minRate: 25,
  maxRate: 65,
  unit: "guest"
}, {
  id: "private",
  slug: "private-events",
  title: "Private Events",
  shortTitle: "Private Events",
  icon: "🍽️",
  shortDesc: "Dinner parties, milestones, and gatherings made effortless.",
  fullDesc: "Birthday celebrations, anniversary dinners, graduation parties, family reunions — whatever the occasion, we bring the food and the experience. You focus on your guests; we handle everything from prep to cleanup.",
  process: ["Event Consultation", "Menu Customization", "Preparation & Setup", "Service & Cleanup"],
  processDetails: ["Tell us about your event — the vibe, the guest list, the occasion", "We craft a menu that fits your style, from casual buffet to plated dinner", "Our team arrives early to set up and ensure everything is perfect", "Professional service throughout, with full cleanup when we're done"],
  benefits: ["Fully customizable menus", "Intimate dinner parties to large celebrations", "Setup and cleanup included", "Flexible service styles — buffet, plated, or family-style"],
  faqs: [{
    q: "What's the minimum guest count?",
    a: "We can cater intimate gatherings of 10+ guests. Smaller dinner parties are available as a premium package."
  }, {
    q: "Do you bring your own equipment?",
    a: "Yes — we bring everything needed including chafing dishes, serving ware, and utensils. China and linen rentals available."
  }],
  pricingModel: "person",
  minRate: 30,
  maxRate: 75,
  unit: "guest"
}, {
  id: "holiday",
  slug: "holiday-parties",
  title: "Holiday Parties",
  shortTitle: "Holiday",
  icon: "🎄",
  shortDesc: "Seasonal menus that bring warmth and joy to every holiday gathering.",
  fullDesc: "Thanksgiving, Christmas, New Year's, Fourth of July — our holiday menus celebrate the season with comfort food done right. Our turkey croquettes are a natural holiday centerpiece, and we build festive menus around them.",
  process: ["Season Planning", "Festive Menu Design", "Holiday Prep", "Celebration Service"],
  processDetails: ["Book early — holiday dates fill fast. We plan months ahead.", "Seasonal menus with holiday-specific dishes and our signature items", "We handle the heavy lifting so your holiday stays stress-free", "Warm, attentive service that makes your gathering feel special"],
  benefits: ["Seasonal specialty menus", "Turkey croquettes as the perfect holiday appetizer", "Take the stress out of holiday hosting", "Early booking discounts available"],
  faqs: [{
    q: "How early should I book for holidays?",
    a: "We recommend booking 2–3 months ahead for major holidays. Thanksgiving and Christmas dates fill quickly."
  }, {
    q: "Can you do Thanksgiving dinner catering?",
    a: "Yes — it's one of our most popular offerings. Full Thanksgiving spreads with our signature twist on classic dishes."
  }],
  pricingModel: "person",
  minRate: 35,
  maxRate: 80,
  unit: "guest"
}, {
  id: "popups",
  slug: "pop-ups",
  title: "Pop-Up Events",
  shortTitle: "Pop-Ups",
  icon: "🔥",
  shortDesc: "Street food energy meets premium quality — find us at markets and festivals.",
  fullDesc: "Our pop-up events are where people discover Act Two for the first time. We show up at farmers markets, food festivals, and community events with fresh-made croquettes and rotating specials. It's our test kitchen meets the street.",
  process: ["Event Selection", "Menu Curation", "On-Site Prep", "Live Service"],
  processDetails: ["We choose events that align with our brand and audience", "Focused menu — signature croquettes plus 2–3 rotating items", "Fresh preparation on-site for maximum flavor and presentation", "Fast, friendly service with that food-truck energy"],
  benefits: ["Try before you book us for your event", "Fresh-made on site", "Rotating seasonal specials", "Follow us on social for upcoming dates"],
  faqs: [{
    q: "Where can I find your pop-ups?",
    a: "We announce locations on our social media. We frequent local farmers markets, food festivals, and community events throughout the Philadelphia and South Jersey area."
  }, {
    q: "Can I hire you for a pop-up at my event?",
    a: "Absolutely — private pop-up bookings are available for festivals, block parties, and community events."
  }],
  pricingModel: "item",
  minRate: 4,
  maxRate: 12,
  unit: "item"
}, {
  id: "packaging",
  slug: "retail-packaging",
  title: "Retail & Wholesale",
  shortTitle: "Retail",
  icon: "📦",
  shortDesc: "Frozen croquettes for shops, restaurants, and your freezer — coming soon.",
  fullDesc: "The next chapter of Act Two: our signature turkey croquettes packaged for retail. We're developing frozen retail-ready products for specialty food shops, restaurant distribution, and direct-to-consumer sales. Get on the waitlist.",
  process: ["Recipe Refinement", "Production Scaling", "Packaging Design", "Distribution Launch"],
  processDetails: ["Perfecting the recipe for consistency at scale", "Partnering with certified production facilities", "Designing packaging that tells our story on the shelf", "Rolling out to specialty shops and direct sales"],
  benefits: ["Our signature recipe, ready when you are", "Premium ingredients, no compromises", "Perfect for restaurants and specialty shops", "Direct-to-consumer shipping planned"],
  faqs: [{
    q: "When will retail products be available?",
    a: "We're currently in development. Join our waitlist to be first to know when we launch."
  }, {
    q: "Can restaurants order wholesale?",
    a: "We're building our wholesale program now. Contact us to discuss partnership opportunities."
  }],
  pricingModel: "unit",
  minRate: 8,
  maxRate: 16,
  unit: "box"
}];

// ── IMAGE CONFIGURATION ──
// To replace placeholders: drop your photos in /images/ and update the paths below.
// Recommended sizes: menu items 600x400, hero images 1920x800, about photos 800x600
const IMAGES = {
  // Hero background images (one per page — dark, moody food/event photography works best)
  hero: {
    home: "images/hero-home.jpg",
    // Signature croquettes plated beautifully
    menu: "images/hero-menu.jpg",
    // Overhead spread of dishes
    services: "images/hero-services.jpg",
    // Elegant event table setting
    events: "images/hero-events.jpg",
    // Candid shot from a catered event
    reviews: "images/hero-reviews.jpg",
    // Happy guests at a table
    pricing: "images/hero-pricing.jpg",
    // Close-up of plated food
    about: "images/hero-about.jpg",
    // Family/team in kitchen or at event
    contact: "images/hero-contact.jpg",
    // Warm, inviting table setup
    areas: "images/hero-areas.jpg" // Philadelphia/SJ skyline or venue exterior
  },
  // About page photos
  about: {
    family: "images/about-family.jpg",
    // Family photo or candid cooking shot
    kitchen: "images/about-kitchen.jpg",
    // Kitchen prep / behind the scenes
    team: "images/about-team.jpg" // Team at an event
  },
  // Placeholder fallback (generated gradient when image fails to load)
  placeholder: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect fill='%23F0EBE1' width='600' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Georgia' font-size='18' fill='%23B8B4AC'%3EPhoto Coming Soon%3C/text%3E%3C/svg%3E"
};
const MENU_ITEMS = [{
  id: "croquettes-classic",
  category: "signature",
  name: "Classic Turkey Croquettes",
  desc: "Our flagship — crispy golden exterior, creamy seasoned turkey filling. The dish that started it all.",
  tags: ["Signature", "GF Option"],
  featured: true,
  icon: "🥇",
  img: "images/menu-croquettes-classic.jpg"
}, {
  id: "croquettes-herb",
  category: "signature",
  name: "Garden Herb Croquettes",
  desc: "Fresh rosemary, thyme, and sage folded into our turkey base. A nod to Sunday dinner.",
  tags: ["Signature", "Seasonal"],
  featured: true,
  icon: "🌿",
  img: "images/menu-croquettes-herb.jpg"
}, {
  id: "croquettes-spicy",
  category: "signature",
  name: "Smoky Chipotle Croquettes",
  desc: "Slow-smoked chipotle and roasted pepper give these a warm, lingering kick.",
  tags: ["Signature", "Spicy"],
  featured: true,
  icon: "🌶️",
  img: "images/menu-croquettes-spicy.jpg"
}, {
  id: "croquettes-truffle",
  category: "signature",
  name: "Black Truffle Croquettes",
  desc: "Elevated with black truffle and aged parmesan — our premium offering for special occasions.",
  tags: ["Premium", "Signature"],
  featured: true,
  icon: "🖤",
  img: "images/menu-croquettes-truffle.jpg"
}, {
  id: "mac-cheese",
  category: "sides",
  name: "Three-Cheese Baked Mac",
  desc: "Sharp cheddar, gruyère, and fontina with a golden breadcrumb crust.",
  tags: ["Comfort Classic", "Vegetarian"],
  featured: false,
  icon: "🧀",
  img: "images/menu-mac-cheese.jpg"
}, {
  id: "collard-greens",
  category: "sides",
  name: "Braised Collard Greens",
  desc: "Slow-cooked with smoked turkey and a touch of apple cider vinegar.",
  tags: ["Southern", "GF"],
  featured: false,
  icon: "🥬",
  img: "images/menu-collard-greens.jpg"
}, {
  id: "sweet-potato",
  category: "sides",
  name: "Whipped Sweet Potato",
  desc: "Brown butter, warm spices, and a maple pecan crumble.",
  tags: ["Seasonal", "GF"],
  featured: false,
  icon: "🍠",
  img: "images/menu-sweet-potato.jpg"
}, {
  id: "cornbread",
  category: "sides",
  name: "Honey Jalapeño Cornbread",
  desc: "Sweet heat in every bite — baked fresh and served warm.",
  tags: ["House Made"],
  featured: false,
  icon: "🌽",
  img: "images/menu-cornbread.jpg"
}, {
  id: "slaw",
  category: "sides",
  name: "Citrus Herb Slaw",
  desc: "Bright, crunchy, and refreshing — the perfect counterpoint to rich comfort food.",
  tags: ["Fresh", "Vegan", "GF"],
  featured: false,
  icon: "🥗",
  img: "images/menu-citrus-slaw.jpg"
}, {
  id: "dipping-trio",
  category: "extras",
  name: "Dipping Sauce Trio",
  desc: "House-made cranberry mostarda, garlic aioli, and honey mustard.",
  tags: ["House Made"],
  featured: false,
  icon: "🫙",
  img: "images/menu-dipping-trio.jpg"
}, {
  id: "dessert-bites",
  category: "extras",
  name: "Mini Dessert Bites",
  desc: "Rotating selection — pecan tarts, lemon bars, and chocolate truffles.",
  tags: ["Dessert", "Seasonal"],
  featured: false,
  icon: "🍫",
  img: "images/menu-dessert-bites.jpg"
}];
const EVENTS = [{
  id: 1,
  slug: "collingswood-wedding-reception",
  service: "weddings",
  neighborhood: "Collingswood",
  area: "camden",
  eventType: "Intimate Wedding Reception",
  scope: "Full dinner service for 85 guests",
  challenge: "Couple wanted comfort food elevated to wedding-level elegance without losing the homey feel. Venue had limited kitchen access.",
  solution: "Passed croquette appetizers during cocktail hour, followed by a family-style dinner with three sides and a carving station. All prep done off-site with seamless on-location finishing.",
  outcome: "Guests raved about the croquettes — several booked us for their own events afterward",
  guests: 85,
  items: ["Classic Croquettes", "Herb Croquettes", "Three-Cheese Mac", "Collard Greens"],
  rating: 5,
  featured: true,
  emoji: "💒",
  date: "2026-01"
}, {
  id: 2,
  slug: "philly-tech-launch",
  service: "corporate",
  neighborhood: "Center City",
  area: "philadelphia",
  eventType: "Tech Company Product Launch",
  scope: "Cocktail reception with passed apps for 200",
  challenge: "Client needed food that felt premium but approachable — not stuffy. Fast service for a standing reception with high energy.",
  solution: "Three varieties of croquettes passed on elegant boards, plus a dipping station and seasonal small bites. Branded napkins and presentation.",
  outcome: "The food became a talking point — attendees posted about the croquettes on social media",
  guests: 200,
  items: ["Classic Croquettes", "Chipotle Croquettes", "Truffle Croquettes", "Dipping Trio"],
  rating: 5,
  featured: true,
  emoji: "🚀",
  date: "2025-11"
}, {
  id: 3,
  slug: "haddonfield-holiday-party",
  service: "holiday",
  neighborhood: "Haddonfield",
  area: "camden",
  eventType: "Holiday Dinner Party",
  scope: "Plated dinner for 40 guests",
  challenge: "Host wanted a fully catered holiday dinner that felt homemade, not corporate. Menu needed to work for diverse dietary needs.",
  solution: "Plated four-course dinner anchored by herb croquettes, with GF and vegetarian options at every course. Warm, attentive family-style service.",
  outcome: "Host said it was the best holiday party they'd ever thrown — already rebooked for next year",
  guests: 40,
  items: ["Herb Croquettes", "Sweet Potato", "Braised Greens", "Mini Dessert Bites"],
  rating: 5,
  featured: true,
  emoji: "🎄",
  date: "2025-12"
}, {
  id: 4,
  slug: "cherry-hill-graduation",
  service: "private",
  neighborhood: "Cherry Hill",
  area: "camden",
  eventType: "Graduation Party",
  scope: "Buffet service for 120 guests",
  challenge: "Large family celebration with guests ranging from kids to grandparents. Needed crowd-pleasing food that could hold up on a buffet.",
  solution: "Buffet-style service with croquettes kept crispy in warming stations, alongside mac & cheese, collard greens, cornbread, and citrus slaw.",
  outcome: "Every dish was cleared — the croquettes ran out first and guests asked where to order more",
  guests: 120,
  items: ["Classic Croquettes", "Three-Cheese Mac", "Cornbread", "Citrus Slaw"],
  rating: 5,
  featured: true,
  emoji: "🎓",
  date: "2026-02"
}, {
  id: 5,
  slug: "collingswood-farmers-market",
  service: "popups",
  neighborhood: "Collingswood",
  area: "camden",
  eventType: "Farmers Market Pop-Up",
  scope: "Walk-up service, 300+ croquettes sold",
  challenge: "First public pop-up — needed to make a strong first impression and test demand in the local market.",
  solution: "Simple focused menu: classic and chipotle croquettes with dipping sauces. Fresh-fried on site for maximum crunch and aroma.",
  outcome: "Sold out in 3 hours. Built an email list of 150+ people on day one",
  guests: 300,
  items: ["Classic Croquettes", "Chipotle Croquettes", "Dipping Trio"],
  rating: 5,
  featured: false,
  emoji: "🏪",
  date: "2025-10"
}, {
  id: 6,
  slug: "voorhees-corporate-lunch",
  service: "corporate",
  neighborhood: "Voorhees",
  area: "camden",
  eventType: "Corporate Team Lunch",
  scope: "Drop-off catering for 50",
  challenge: "Weekly team lunch program — needed variety, reliability, and food that people actually get excited about.",
  solution: "Rotating menu of croquette varieties with different sides each week. Delivered hot, set up and ready to serve.",
  outcome: "Became a recurring weekly client — team morale around lunch measurably improved",
  guests: 50,
  items: ["Rotating Croquettes", "Weekly Sides", "Dipping Sauces"],
  rating: 5,
  featured: false,
  emoji: "🏢",
  date: "2026-01"
}];
const REVIEWS = [{
  id: 1,
  author: "Jessica & Mark T.",
  neighborhood: "Collingswood",
  rating: 5,
  service: "weddings",
  date: "2026-01",
  source: "Google",
  verified: true,
  featured: true,
  text: "The croquettes during cocktail hour were the talk of our wedding. Guests kept coming up to us asking who catered. The team was professional, warm, and made everything feel effortless."
}, {
  id: 2,
  author: "David L.",
  neighborhood: "Center City",
  rating: 5,
  service: "corporate",
  date: "2025-11",
  source: "Google",
  verified: true,
  featured: true,
  text: "We hired Act Two for our product launch and they absolutely delivered. The food was the highlight of the evening. Multiple attendees asked for their info. Already planning our next event with them."
}, {
  id: 3,
  author: "Patricia M.",
  neighborhood: "Haddonfield",
  rating: 5,
  service: "holiday",
  date: "2025-12",
  source: "Google",
  verified: true,
  featured: true,
  text: "I've hosted holiday parties for 20 years and this was the first time I actually enjoyed my own party. The food was incredible — comfort food that felt elevated without being pretentious. Already booked for next year."
}, {
  id: 4,
  author: "Angela W.",
  neighborhood: "Cherry Hill",
  rating: 5,
  service: "private",
  date: "2026-02",
  source: "Yelp",
  verified: true,
  featured: true,
  text: "My daughter's graduation party was perfect thanks to Act Two. 120 guests and not a single complaint — just compliments. The turkey croquettes were gone in 20 minutes flat."
}, {
  id: 5,
  author: "Mike R.",
  neighborhood: "Collingswood",
  rating: 5,
  service: "popups",
  date: "2025-10",
  source: "Google",
  verified: true,
  featured: false,
  text: "Stumbled onto their pop-up at the farmers market and immediately booked them for a dinner party. The croquettes are addictive — crispy outside, creamy inside, perfectly seasoned."
}, {
  id: 6,
  author: "Sarah K.",
  neighborhood: "Voorhees",
  rating: 5,
  service: "corporate",
  date: "2026-01",
  source: "Google",
  verified: true,
  featured: false,
  text: "We switched our office catering to Act Two and it's been a game changer. The rotating menu keeps things fresh, and the croquettes are everybody's favorite. Reliable, delicious, and the team is great to work with."
}, {
  id: 7,
  author: "Tom & Diane P.",
  neighborhood: "Moorestown",
  rating: 5,
  service: "private",
  date: "2025-09",
  source: "Yelp",
  verified: true,
  featured: false,
  text: "Hired them for our 30th anniversary dinner. The food was restaurant-quality but felt personal and warm. The truffle croquettes were absolutely phenomenal."
}, {
  id: 8,
  author: "Chris B.",
  neighborhood: "Mount Laurel",
  rating: 5,
  service: "weddings",
  date: "2025-11",
  source: "Google",
  verified: true,
  featured: false,
  text: "From the tasting to the wedding day, Act Two was professional and easy to work with. They nailed the vibe we wanted — elevated comfort food that felt like us."
}];
const SERVICE_AREAS = [{
  slug: "camden",
  name: "Camden County",
  fullName: "Camden County, NJ",
  desc: "Our home base. Collingswood, Cherry Hill, Haddonfield, Voorhees — we know every venue and every neighborhood.",
  neighborhoods: ["Collingswood", "Cherry Hill", "Haddonfield", "Voorhees", "Merchantville", "Audubon", "Oaklyn"],
  topServices: ["weddings", "private", "holiday"],
  featured: true
}, {
  slug: "burlington",
  name: "Burlington County",
  fullName: "Burlington County, NJ",
  desc: "Mount Laurel, Moorestown, Medford and beyond. Beautiful venues and wonderful communities.",
  neighborhoods: ["Mount Laurel", "Moorestown", "Medford", "Marlton", "Cinnaminson"],
  topServices: ["weddings", "corporate", "private"],
  featured: true
}, {
  slug: "gloucester",
  name: "Gloucester County",
  fullName: "Gloucester County, NJ",
  desc: "Washington Township, Woodbury, Pitman and surrounding communities across Gloucester County.",
  neighborhoods: ["Washington Township", "Woodbury", "Pitman", "Deptford", "Glassboro"],
  topServices: ["private", "holiday", "popups"],
  featured: false
}, {
  slug: "philadelphia",
  name: "Philadelphia",
  fullName: "Philadelphia, PA",
  desc: "Crossing the bridge to serve Philly. Center City, South Philly, Fishtown and beyond.",
  neighborhoods: ["Center City", "South Philadelphia", "Fishtown", "Old City", "Northern Liberties", "Rittenhouse Square"],
  topServices: ["corporate", "popups", "weddings"],
  featured: true
}, {
  slug: "delaware",
  name: "Delaware County",
  fullName: "Delaware County, PA",
  desc: "Media, Swarthmore, Ridley Park and surrounding communities in Delco.",
  neighborhoods: ["Media", "Swarthmore", "Ridley Park", "Springfield", "Upper Darby"],
  topServices: ["private", "corporate"],
  featured: false
}, {
  slug: "montgomery",
  name: "Montgomery County",
  fullName: "Montgomery County, PA",
  desc: "The Main Line and beyond — Ardmore, Bryn Mawr, King of Prussia.",
  neighborhoods: ["Ardmore", "Bryn Mawr", "King of Prussia", "Conshohocken", "Norristown"],
  topServices: ["weddings", "corporate"],
  featured: false
}];
const TRUST_BADGES = [{
  id: 1,
  label: "Family Recipe",
  icon: "👨‍🍳",
  detail: "Rooted in tradition"
}, {
  id: 2,
  label: "Premium Ingredients",
  icon: "✦",
  detail: "No compromises"
}, {
  id: 3,
  label: "Licensed & Insured",
  icon: "🛡️",
  detail: "Fully certified"
}, {
  id: 4,
  label: "Free Tastings",
  icon: "🍽️",
  detail: "Try before you book"
}];

// ═══════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════

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
  background: var(--cream);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

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
  background: rgba(255,255,255,0.95); backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--cream-dark);
}
.header-utility {
  background: var(--wine-pale); color: var(--wine-deep); font-size: 11.5px; padding: 6px 0;
  text-align: center; letter-spacing: 0.04em; font-weight: 400;
}
.header-utility span { opacity: 0.85; }
.header-utility strong { color: var(--wine); font-weight: 600; }
.header-main {
  max-width: 1200px; margin: 0 auto; padding: 0 24px;
  display: flex; align-items: center; justify-content: space-between; height: 68px;
}
.header-logo {
  font-family: var(--font-display); font-size: 22px; font-weight: 700;
  color: var(--charcoal); text-decoration: none; letter-spacing: -0.01em;
  cursor: pointer; white-space: nowrap; display: flex; align-items: baseline; gap: 6px;
}
.header-logo .logo-act { color: var(--wine); font-style: italic; }
.header-logo .logo-two { color: var(--charcoal); }
.header-nav { display: flex; gap: 2px; align-items: center; }
.header-nav a, .header-nav button {
  color: var(--slate); text-decoration: none; font-size: 13px; font-weight: 400;
  padding: 8px 14px; border-radius: 6px; transition: var(--transition);
  cursor: pointer; background: none; border: none; font-family: var(--font-body);
  white-space: nowrap;
}
.header-nav a:hover, .header-nav button:hover { color: var(--charcoal); background: var(--parchment); }
.header-nav a.active { color: var(--wine); font-weight: 500; }
.header-phone {
  display: flex; align-items: center; gap: 6px; color: var(--wine);
  text-decoration: none; font-weight: 600; font-size: 14px; padding: 8px 16px;
  background: var(--wine-pale); border-radius: var(--radius); transition: var(--transition);
  white-space: nowrap;
}
.header-phone:hover { background: var(--wine-glow); }
.header-cta-btn {
  background: var(--wine); color: white; border: none; padding: 9px 20px;
  border-radius: var(--radius); font-weight: 600; font-size: 13px; cursor: pointer;
  transition: var(--transition); font-family: var(--font-body); white-space: nowrap;
}
.header-cta-btn:hover { background: var(--wine-light); transform: translateY(-1px); }

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
    top: 100%; left: 0; right: 0; background: white;
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
  background: white; padding: 10px 16px;
  border-top: 1px solid var(--cream-dark); box-shadow: 0 -4px 20px rgba(0,0,0,0.08);
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
.mcb-quote { background: var(--parchment); color: var(--charcoal); border: 1px solid var(--cream-dark); }
.mcb-quote:hover { background: var(--cream-dark); }
@media (max-width: 768px) { .mobile-call-bar { display: block; } main { padding-bottom: 80px; } }

/* ── FOOTER ── */
.site-footer {
  background: var(--parchment); color: var(--slate); padding: 64px 24px 32px;
  font-size: 14px; border-top: 1px solid var(--cream-dark);
}
.footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
.footer-brand h3 { font-family: var(--font-display); font-size: 24px; color: var(--charcoal); margin-bottom: 12px; font-weight: 700; }
.footer-brand h3 span { color: var(--wine); font-style: italic; }
.footer-brand p { line-height: 1.7; margin-bottom: 16px; }
.footer-col h4 { color: var(--wine); font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px; font-weight: 600; }
.footer-col a { display: block; color: var(--slate); text-decoration: none; padding: 4px 0; transition: var(--transition); cursor: pointer; }
.footer-col a:hover { color: var(--charcoal); }
.footer-bottom { max-width: 1200px; margin: 40px auto 0; padding-top: 24px; border-top: 1px solid var(--cream-dark); text-align: center; font-size: 12px; opacity: 0.5; }
@media (max-width: 768px) { .footer-inner { grid-template-columns: 1fr; gap: 32px; } }

/* ── HERO ── */
.hero {
  background: var(--linen);
  padding: 88px 24px 76px; text-align: center; position: relative; overflow: hidden;
  border-bottom: 1px solid var(--cream-dark);
}
.hero.has-bg-image {
  padding: 120px 24px 100px;
  background: var(--espresso);
}
.hero-bg-image {
  position: absolute; inset: 0; z-index: 0;
}
.hero-bg-image img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  opacity: 0.35; transition: opacity 0.6s ease;
}
.hero-bg-image::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(30,22,16,0.4) 0%, rgba(30,22,16,0.7) 60%, rgba(30,22,16,0.9) 100%);
  pointer-events: none;
}
.hero.has-bg-image .hero-badge {
  background: rgba(200,151,62,0.15); color: var(--gold);
  border-color: rgba(200,151,62,0.25);
}
.hero.has-bg-image h1 { color: var(--cream); text-shadow: 0 2px 20px rgba(0,0,0,0.3); }
.hero.has-bg-image h1 em { color: var(--gold-light); }
.hero.has-bg-image p { color: rgba(251,248,243,0.8); }
.hero.has-bg-image .btn-secondary {
  background: rgba(255,255,255,0.1); color: var(--cream);
  border-color: rgba(255,255,255,0.2);
}
.hero.has-bg-image .btn-secondary:hover {
  background: rgba(255,255,255,0.18); border-color: rgba(255,255,255,0.35);
}
.hero.has-bg-image .hero-tertiary { color: rgba(251,248,243,0.5); }
.hero.has-bg-image .hero-tertiary:hover { color: var(--gold-light); }
.hero.has-bg-image .hero-reassurance { border-top-color: rgba(255,255,255,0.1); }
.hero.has-bg-image .hero-reassurance span { color: rgba(251,248,243,0.6); }
.hero.has-bg-image .hero-reassurance span::before { color: var(--gold); }
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
.hero-reassurance {
  display: flex; gap: 28px; justify-content: center; flex-wrap: wrap;
  margin-top: 32px; padding-top: 28px; border-top: 1px solid var(--cream-dark);
}
.hero-reassurance span {
  color: var(--slate); font-size: 13px; display: flex; align-items: center; gap: 6px; font-weight: 400;
}
.hero-reassurance span::before { content: '✓'; color: var(--sage); font-weight: 700; }

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

/* ── TRUST BAR ── */
.trust-bar {
  display: flex; justify-content: center; gap: 36px; flex-wrap: wrap; padding: 36px 24px;
  background: white; border-bottom: 1px solid var(--cream-dark);
}
.trust-badge { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 500; color: var(--charcoal); }
.trust-badge-icon { font-size: 22px; }
.trust-badge-text span { display: block; font-size: 11px; color: var(--slate); font-weight: 400; }

/* ── CARDS ── */
.card {
  background: white; border-radius: var(--radius-lg); overflow: hidden;
  box-shadow: var(--shadow-sm); transition: var(--transition); border: 1px solid rgba(0,0,0,0.05);
}
.card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
.card-body { padding: 28px; }
.card-icon { font-size: 28px; margin-bottom: 14px; }
.card-title { font-family: var(--font-display); font-size: 22px; font-weight: 600; color: var(--charcoal); margin-bottom: 8px; }
.card-text { color: var(--slate); font-size: 14px; line-height: 1.65; }

/* ── SERVICE GRID ── */
.service-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 20px; }
.service-card { cursor: pointer; }
.service-card .card-body { padding: 30px; }

/* ── MENU GRID ── */
.menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 18px; }
.menu-card { border-left: 3px solid var(--gold-pale); overflow: hidden; }
.menu-card.signature { border-left-color: var(--wine); }
.menu-card-img {
  width: 100%; height: 180px; object-fit: cover; display: block;
  background: var(--cream-dark); transition: transform 0.4s ease;
}
.menu-card:hover .menu-card-img { transform: scale(1.03); }
.menu-card-img-wrap { overflow: hidden; position: relative; }
.menu-card-img-wrap .menu-card-fallback {
  width: 100%; height: 180px; display: flex; align-items: center; justify-content: center;
  font-size: 48px; background: linear-gradient(135deg, var(--cream-dark) 0%, var(--parchment) 100%);
}
.menu-card.signature .menu-card-img-wrap .menu-card-fallback {
  background: linear-gradient(135deg, var(--wine-pale) 0%, var(--cream-dark) 100%);
}
.menu-card .card-body { padding: 22px 24px; }
.menu-card h4 { font-family: var(--font-display); font-size: 18px; color: var(--charcoal); margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
.menu-card p { font-size: 13px; color: var(--slate); line-height: 1.6; }
.menu-tags { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 10px; }
.menu-tag { font-size: 10px; padding: 3px 8px; border-radius: 4px; background: var(--wine-pale); color: var(--wine-deep); font-weight: 600; letter-spacing: 0.02em; }

/* ── ABOUT PAGE PHOTOS ── */
.about-photo-block {
  border-radius: var(--radius-lg); overflow: hidden; margin-bottom: 24px;
  box-shadow: var(--shadow-md); background: var(--cream-dark);
}
.about-photo-block img {
  width: 100%; height: 320px; object-fit: cover; display: block;
  transition: transform 0.4s ease;
}
.about-photo-block:hover img { transform: scale(1.02); }
.about-photo-fallback {
  width: 100%; height: 320px; display: flex; align-items: center; justify-content: center;
  flex-direction: column; gap: 12px;
  background: linear-gradient(135deg, var(--cream-dark) 0%, var(--parchment) 100%);
  font-size: 14px; color: var(--mist);
}
.about-photo-fallback span { font-size: 48px; }
.about-photos-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 32px 0; }
@media (max-width: 600px) { .about-photos-grid { grid-template-columns: 1fr; } }

/* ── EVENT CARDS ── */
.event-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
.event-card { cursor: pointer; }
.event-header {
  background: linear-gradient(135deg, var(--blush) 0%, var(--wine-pale) 100%);
  padding: 28px; color: var(--charcoal); display: flex; align-items: center; gap: 16px;
  border-bottom: 1px solid rgba(139,58,68,0.1);
}
.event-emoji { font-size: 44px; }
.event-header h3 { font-family: var(--font-display); font-size: 18px; font-weight: 600; margin-bottom: 4px; color: var(--wine-deep); }
.event-header p { font-size: 12px; color: var(--slate); }
.event-card .card-body p { font-size: 13px; color: var(--slate); }
.event-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; }
.event-tag { font-size: 11px; padding: 3px 8px; border-radius: 4px; background: var(--parchment); color: var(--wine-deep); font-weight: 500; }

/* ── REVIEW CARDS ── */
.review-card { padding: 28px; }
.review-stars { color: var(--gold); font-size: 16px; letter-spacing: 2px; margin-bottom: 14px; }
.review-text { font-size: 14px; line-height: 1.75; color: var(--charcoal); margin-bottom: 18px; font-style: italic; }
.review-meta { display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
.review-author { font-weight: 600; color: var(--charcoal); }
.review-detail { color: var(--slate); font-size: 12px; }
.review-source { font-size: 11px; padding: 3px 8px; border-radius: 4px; background: var(--parchment); color: var(--wine-deep); font-weight: 500; }

/* ── FILTER CHIPS ── */
.filter-bar { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
.filter-chip {
  padding: 7px 16px; border-radius: 20px; font-size: 13px; font-weight: 500;
  border: 1px solid var(--mist); background: white; color: var(--slate); cursor: pointer;
  transition: var(--transition); font-family: var(--font-body);
}
.filter-chip:hover { border-color: var(--wine); color: var(--wine); }
.filter-chip.active { background: var(--wine); color: white; border-color: var(--wine); }

/* ── PROCESS STEPS ── */
.process-steps { display: flex; flex-direction: column; gap: 0; }
.process-step { display: flex; gap: 20px; padding: 24px 0; border-bottom: 1px solid var(--cream-dark); }
.process-step:last-child { border-bottom: none; }
.step-num {
  width: 42px; height: 42px; border-radius: 50%; background: var(--wine-pale); color: var(--wine);
  display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 15px;
  flex-shrink: 0; font-family: var(--font-display); border: 2px solid var(--wine);
}
.step-content h4 { font-family: var(--font-display); font-size: 18px; color: var(--charcoal); margin-bottom: 4px; }
.step-content p { font-size: 14px; color: var(--slate); line-height: 1.65; }

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
  background: var(--blush);
  border-radius: var(--radius-lg); padding: 44px; text-align: center; margin: 40px 0;
  position: relative; overflow: hidden; border: 1px solid rgba(139,58,68,0.1);
}
.inline-cta::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 30% 50%, var(--wine-glow), transparent 60%);
  pointer-events: none;
}
.inline-cta h3 { font-family: var(--font-display); font-size: 30px; color: var(--charcoal); margin-bottom: 12px; position: relative; }
.inline-cta p { color: var(--slate); margin-bottom: 24px; font-size: 15px; position: relative; }

/* ── STATS ── */
.stats-strip { display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; padding: 24px 0; margin-bottom: 32px; }
.stat-item { text-align: center; }
.stat-num { font-family: var(--font-display); font-size: 38px; font-weight: 700; color: var(--wine); }
.stat-label { font-size: 12px; color: var(--slate); text-transform: uppercase; letter-spacing: 0.06em; }

/* ── BUDGET / PRICING ── */
.budget-calc { background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); padding: 32px; border: 1px solid var(--cream-dark); }
.budget-result {
  background: var(--parchment);
  border-radius: var(--radius); padding: 28px; color: var(--charcoal); margin-top: 24px; text-align: center;
  border: 1px solid var(--cream-dark);
}
.budget-range { font-family: var(--font-display); font-size: 38px; font-weight: 700; color: var(--wine); }
.budget-note { font-size: 12px; color: var(--slate); margin-top: 10px; }

/* ── PROJECT DETAIL ── */
.project-detail { max-width: 900px; margin: 0 auto; }
.project-facts { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; margin: 24px 0; }
.project-fact { padding: 16px; border-radius: var(--radius); background: var(--parchment); font-size: 13px; border: 1px solid var(--cream-dark); }
.project-fact strong { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--wine); margin-bottom: 4px; }
.project-narrative { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin: 32px 0; }
@media (max-width: 700px) { .project-narrative { grid-template-columns: 1fr; } }
.narrative-panel { padding: 24px; border-radius: var(--radius); background: white; box-shadow: var(--shadow-sm); border: 1px solid var(--cream-dark); }
.narrative-panel h4 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--wine); margin-bottom: 8px; font-weight: 600; }
.narrative-panel p { font-size: 14px; line-height: 1.65; color: var(--charcoal); }

/* ── BREADCRUMB ── */
.breadcrumb { font-size: 13px; color: var(--slate); margin-bottom: 8px; }
.breadcrumb a { color: var(--wine); text-decoration: none; cursor: pointer; }
.breadcrumb a:hover { text-decoration: underline; }

/* ── SIGNATURE BANNER ── */
.signature-banner {
  background: white; border: 1px solid var(--cream-dark); border-radius: var(--radius-lg);
  padding: 40px; display: flex; align-items: center; gap: 32px; margin: 40px 0;
}
.signature-banner-emoji { font-size: 56px; flex-shrink: 0; }
.signature-banner h3 { font-family: var(--font-display); font-size: 24px; color: var(--charcoal); margin-bottom: 8px; }
.signature-banner p { font-size: 14px; color: var(--slate); line-height: 1.7; }
@media (max-width: 600px) { .signature-banner { flex-direction: column; text-align: center; } }

/* ── MISC ── */
.page-padding { padding-top: 16px; }
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
.tag-row { display: flex; gap: 6px; flex-wrap: wrap; }
.tag { font-size: 11px; padding: 4px 10px; border-radius: 4px; background: var(--parchment); color: var(--wine-deep); font-weight: 500; border: 1px solid var(--cream-dark); }
.link-btn { background: none; border: none; color: var(--wine); font-weight: 600; cursor: pointer; font-family: var(--font-body); font-size: 14px; text-decoration: underline; text-underline-offset: 3px; padding: 0; }
.link-btn:hover { color: var(--wine-light); }

/* ── MOBILE RESPONSIVE FIXES ── */

/* Tablet / small laptop */
@media (max-width: 768px) {
  .section { padding: 56px 20px; }
  .hero { padding: 64px 20px 56px; }
  .hero.has-bg-image { padding: 80px 20px 72px; }
  .trust-bar { gap: 20px; padding: 28px 20px; }
  .stats-strip { gap: 28px; }
  .inline-cta { padding: 32px 24px; }
  .inline-cta h3 { font-size: 24px; }
  .signature-banner { padding: 28px; gap: 24px; }
  .signature-banner-emoji { font-size: 44px; }
  .budget-calc { padding: 24px; }
  .event-header { padding: 22px; gap: 12px; }
  .event-emoji { font-size: 36px; }
}

/* Phone */
@media (max-width: 480px) {
  .section { padding: 40px 16px; }
  .hero { padding: 48px 16px 40px; }
  .hero.has-bg-image { padding: 64px 16px 56px; }
  .hero p { font-size: 15px; margin-bottom: 28px; }
  .hero-reassurance { gap: 16px; margin-top: 24px; padding-top: 20px; }
  .hero-reassurance span { font-size: 12px; }

  .header-main { height: 56px; padding: 0 16px; }
  .header-utility { font-size: 10.5px; padding: 5px 0; }

  .trust-bar { gap: 14px; padding: 24px 16px; }
  .trust-badge { font-size: 12px; gap: 8px; }
  .trust-badge-icon { font-size: 18px; }

  .service-grid { gap: 14px; }
  .menu-grid { gap: 14px; }
  .event-grid { gap: 16px; }
  .card-body { padding: 22px; }
  .service-card .card-body { padding: 24px; }
  .menu-card .card-body { padding: 18px 20px; }

  .form-step-header { padding: 24px 20px 0; }
  .form-body { padding: 20px 20px 24px; }
  .form-step-title { font-size: 20px; }
  .form-success { padding: 36px 20px; }
  .form-success h3 { font-size: 24px; }
  .form-btn-back { padding: 14px 24px; }
  .form-btn-next { padding: 14px 28px; }

  .process-step { gap: 14px; padding: 20px 0; }
  .step-num { width: 36px; height: 36px; font-size: 13px; }
  .step-content h4 { font-size: 16px; }

  .inline-cta { padding: 28px 20px; }
  .inline-cta h3 { font-size: 22px; }
  .inline-cta p { font-size: 14px; }

  .stats-strip { gap: 20px; }
  .stat-num { font-size: 30px; }

  .filter-bar { gap: 6px; }
  .filter-chip { padding: 6px 14px; font-size: 12px; }

  .signature-banner { padding: 24px; gap: 20px; }
  .signature-banner-emoji { font-size: 40px; }
  .signature-banner h3 { font-size: 20px; }

  .budget-calc { padding: 20px; }
  .budget-range { font-size: 30px; }

  .project-facts { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }

  .site-footer { padding: 48px 16px 24px; }
  .footer-inner { gap: 24px; }
  .footer-brand h3 { font-size: 20px; }
}

/* Small phone */
@media (max-width: 360px) {
  .section { padding: 36px 14px; }
  .hero { padding: 40px 14px 36px; }
  .hero.has-bg-image { padding: 56px 14px 48px; }
  .header-main { padding: 0 12px; }
  .form-step-header { padding: 20px 16px 0; }
  .form-body { padding: 16px 16px 20px; }
  .form-step-title { font-size: 18px; }
  .inline-cta { padding: 24px 16px; }
  .signature-banner { padding: 20px; }
  .trust-bar { gap: 12px; padding: 20px 14px; }
  .event-header { padding: 18px; }
}
`;

// ═══════════════════════════════════════════════════════════════
// UTILITY HOOKS & HELPERS
// ═══════════════════════════════════════════════════════════════

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
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
function parseRoute(hash) {
  const path = hash.replace("#", "") || "/";
  const parts = path.split("/").filter(Boolean);
  return {
    path,
    parts
  };
}
function getService(slug) {
  return SERVICES.find(s => s.slug === slug);
}
function getEvent(slug) {
  return EVENTS.find(p => p.slug === slug);
}
function getArea(slug) {
  return SERVICE_AREAS.find(a => a.slug === slug);
}
function eventsForService(serviceId) {
  return EVENTS.filter(p => p.service === serviceId);
}
function eventsForArea(areaSlug) {
  return EVENTS.filter(p => p.area === areaSlug);
}
function reviewsForService(serviceId) {
  return REVIEWS.filter(r => r.service === serviceId);
}

// ═══════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════

function TrustBar() {
  return /*#__PURE__*/React.createElement("div", {
    className: "trust-bar"
  }, TRUST_BADGES.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.id,
    className: "trust-badge"
  }, /*#__PURE__*/React.createElement("span", {
    className: "trust-badge-icon"
  }, b.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, b.label), /*#__PURE__*/React.createElement("span", null, b.detail)))));
}
function ImgWithFallback({
  src,
  alt,
  className,
  fallback,
  style
}) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) return fallback || null;
  return /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt || "",
    className: className,
    style: style,
    onError: () => setFailed(true),
    loading: "lazy"
  });
}
function HeroSection({
  badge,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  tertiaryLabel,
  tertiaryRoute,
  showReassurance = true,
  heroImg
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const hasImg = heroImg && !imgFailed;
  return /*#__PURE__*/React.createElement("section", {
    className: `hero ${hasImg ? "has-bg-image" : ""}`
  }, hasImg && /*#__PURE__*/React.createElement("div", {
    className: "hero-bg-image"
  }, /*#__PURE__*/React.createElement("img", {
    src: heroImg,
    alt: "",
    onLoad: () => setImgLoaded(true),
    onError: () => setImgFailed(true),
    style: {
      opacity: imgLoaded ? 0.35 : 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "hero-inner"
  }, badge && /*#__PURE__*/React.createElement("div", {
    className: "hero-badge"
  }, badge), /*#__PURE__*/React.createElement("h1", {
    dangerouslySetInnerHTML: {
      __html: title
    }
  }), subtitle && /*#__PURE__*/React.createElement("p", null, subtitle), /*#__PURE__*/React.createElement("div", {
    className: "hero-ctas"
  }, primaryCta && /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => navigate("/contact")
  }, primaryCta), secondaryCta && /*#__PURE__*/React.createElement("a", {
    href: BIZ.phoneTel,
    className: "btn-secondary"
  }, secondaryCta)), tertiaryLabel && /*#__PURE__*/React.createElement("button", {
    className: "hero-tertiary",
    onClick: () => navigate(tertiaryRoute)
  }, tertiaryLabel), showReassurance && /*#__PURE__*/React.createElement("div", {
    className: "hero-reassurance"
  }, /*#__PURE__*/React.createElement("span", null, "Licensed & Insured"), /*#__PURE__*/React.createElement("span", null, "Free Tastings Available"), /*#__PURE__*/React.createElement("span", null, "Custom Menus for Every Event"))));
}
function InlineCTA({
  title = "Ready to Taste the Difference?",
  text = "Book a free tasting and let's plan your event.",
  cta = "Book a Tasting"
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "inline-cta"
  }, /*#__PURE__*/React.createElement("h3", null, title), /*#__PURE__*/React.createElement("p", null, text), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => navigate("/contact"),
    style: {
      position: "relative"
    }
  }, cta));
}
function FAQAccordion({
  faqs
}) {
  const [openId, setOpenId] = useState(null);
  return /*#__PURE__*/React.createElement("div", null, faqs.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "faq-item"
  }, /*#__PURE__*/React.createElement("button", {
    className: "faq-q",
    onClick: () => setOpenId(openId === i ? null : i),
    "aria-expanded": openId === i
  }, f.q, /*#__PURE__*/React.createElement("span", {
    className: `faq-arrow ${openId === i ? "open" : ""}`
  }, "\u25BE")), openId === i && /*#__PURE__*/React.createElement("div", {
    className: "faq-a"
  }, f.a))));
}
function ProcessSteps({
  steps,
  details
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "process-steps"
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "process-step"
  }, /*#__PURE__*/React.createElement("div", {
    className: "step-num"
  }, i + 1), /*#__PURE__*/React.createElement("div", {
    className: "step-content"
  }, /*#__PURE__*/React.createElement("h4", null, s), details && details[i] && /*#__PURE__*/React.createElement("p", null, details[i])))));
}
function FilterChips({
  options,
  active,
  onChange,
  allLabel = "All"
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "filter-bar",
    role: "group",
    "aria-label": "Filter options"
  }, /*#__PURE__*/React.createElement("button", {
    className: `filter-chip ${active === "all" ? "active" : ""}`,
    onClick: () => onChange("all")
  }, allLabel), options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    className: `filter-chip ${active === o.value ? "active" : ""}`,
    onClick: () => onChange(o.value)
  }, o.label)));
}
function ReviewCard({
  review
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card review-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-stars"
  }, "★".repeat(review.rating), "☆".repeat(5 - review.rating)), /*#__PURE__*/React.createElement("p", {
    className: "review-text"
  }, "\"", review.text, "\""), /*#__PURE__*/React.createElement("div", {
    className: "review-meta"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "review-author"
  }, review.author), /*#__PURE__*/React.createElement("span", {
    className: "review-detail"
  }, " \xB7 ", review.neighborhood, " \xB7 ", SERVICES.find(s => s.id === review.service)?.shortTitle)), /*#__PURE__*/React.createElement("span", {
    className: "review-source"
  }, review.source)));
}
function ServiceCard({
  service,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card service-card",
    onClick: onClick,
    role: "button",
    tabIndex: 0,
    "aria-label": `View ${service.title}`,
    onKeyDown: e => e.key === "Enter" && onClick()
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-icon"
  }, service.icon), /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, service.shortTitle), /*#__PURE__*/React.createElement("p", {
    className: "card-text"
  }, service.shortDesc), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      color: "var(--wine)",
      fontSize: 13,
      fontWeight: 600
    }
  }, "Learn more \u2192")));
}
function EventCard({
  event,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card event-card",
    onClick: onClick,
    role: "button",
    tabIndex: 0,
    "aria-label": `View event: ${event.neighborhood}`,
    onKeyDown: e => e.key === "Enter" && onClick()
  }, /*#__PURE__*/React.createElement("div", {
    className: "event-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "event-emoji"
  }, event.emoji), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, event.neighborhood), /*#__PURE__*/React.createElement("p", null, event.eventType))), /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("p", null, event.scope), /*#__PURE__*/React.createElement("div", {
    className: "event-tags"
  }, /*#__PURE__*/React.createElement("span", {
    className: "event-tag"
  }, event.guests, " guests"), event.items.slice(0, 2).map(m => /*#__PURE__*/React.createElement("span", {
    key: m,
    className: "event-tag"
  }, m)))));
}
function MenuItemCard({
  item
}) {
  const [imgFailed, setImgFailed] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: `card menu-card ${item.category === "signature" ? "signature" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "menu-card-img-wrap"
  }, item.img && !imgFailed ? /*#__PURE__*/React.createElement("img", {
    src: item.img,
    alt: item.name,
    className: "menu-card-img",
    onError: () => setImgFailed(true),
    loading: "lazy"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "menu-card-fallback"
  }, item.icon)), /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("h4", null, /*#__PURE__*/React.createElement("span", null, item.icon), " ", item.name), /*#__PURE__*/React.createElement("p", null, item.desc), /*#__PURE__*/React.createElement("div", {
    className: "menu-tags"
  }, item.tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    className: "menu-tag"
  }, t)))));
}

// ═══════════════════════════════════════════════════════════════
// QUOTE FORM
// ═══════════════════════════════════════════════════════════════

function QuoteForm({
  preselectedService
}) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [form, setForm] = useState({
    service: preselectedService || "",
    guests: "",
    eventDate: "",
    name: "",
    phone: "",
    email: "",
    location: "",
    details: ""
  });
  const totalSteps = 3;
  const set = (k, v) => {
    setForm(prev => ({ ...prev, [k]: v }));
    setFormErrors(prev => { const next = { ...prev }; delete next[k]; return next; });
  };
  const validateStep = (s) => {
    const errs = {};
    if (s === 1) {
      if (!form.service) errs.service = "Select an event type";
    }
    if (s === 2) {
      if (!form.name.trim()) errs.name = "Name is required";
      if (!form.phone.trim()) errs.phone = "Phone is required";
      if (!form.email.trim()) errs.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    }
    return errs;
  };
  const advanceStep = () => {
    const errs = validateStep(step);
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }
    setFormErrors({});
    setStep(s => s + 1);
  };
  const handleSubmit = () => {
    const step1 = validateStep(1);
    const step2 = validateStep(2);
    const allErrs = { ...step1, ...step2 };
    if (Object.keys(allErrs).length > 0) { setFormErrors(allErrs); return; }
    setSubmitting(true);
    setSubmitError("");
    fetch("/.netlify/functions/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    }).then(res => {
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    }).catch(() => {
      setSubmitError("Something went wrong. Please call us directly.");
      setSubmitting(false);
    });
  };
  if (submitted) return /*#__PURE__*/React.createElement("div", {
    className: "quote-form-container",
    role: "status",
    "aria-live": "polite"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-success"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 48
    }
  }, "\uD83C\uDF89"), /*#__PURE__*/React.createElement("h3", null, "Request Received!"), /*#__PURE__*/React.createElement("p", null, "We'll reach out within 24 hours to discuss your event."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12
    }
  }, "Or call us now: ", /*#__PURE__*/React.createElement("a", {
    href: BIZ.phoneTel,
    style: {
      color: "var(--wine)",
      fontWeight: 600
    }
  }, BIZ.phone))));
  return /*#__PURE__*/React.createElement("div", {
    className: "quote-form-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-progress-fill",
    style: {
      width: `${step / totalSteps * 100}%`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-step-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-step-label"
  }, "Step ", step, " of ", totalSteps), /*#__PURE__*/React.createElement("div", {
    className: "form-step-title"
  }, step === 1 ? "Your Event" : step === 2 ? "Contact Details" : "Event Details")), /*#__PURE__*/React.createElement("div", {
    className: "form-body"
  }, step === 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label",
    htmlFor: "qf-service"
  }, "Event Type"), /*#__PURE__*/React.createElement("select", {
    id: "qf-service",
    className: "form-select",
    value: form.service,
    onChange: e => set("service", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select an event type\u2026"), SERVICES.filter(s => s.id !== "packaging").map(s => /*#__PURE__*/React.createElement("option", {
    key: s.id,
    value: s.id
  }, s.title)))), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label",
    htmlFor: "qf-guests"
  }, "Estimated Guest Count"), /*#__PURE__*/React.createElement("input", {
    id: "qf-guests",
    className: "form-input",
    type: "number",
    inputMode: "numeric",
    placeholder: "e.g. 75",
    value: form.guests,
    onChange: e => set("guests", e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label",
    htmlFor: "qf-date"
  }, "Event Date"), /*#__PURE__*/React.createElement("input", {
    id: "qf-date",
    className: "form-input",
    type: "date",
    value: form.eventDate,
    onChange: e => set("eventDate", e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label",
    htmlFor: "qf-location"
  }, "Event Location / City"), /*#__PURE__*/React.createElement("input", {
    id: "qf-location",
    className: "form-input",
    placeholder: "e.g. Collingswood, NJ",
    value: form.location,
    onChange: e => set("location", e.target.value)
  }))), step === 2 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label",
    htmlFor: "qf-name"
  }, "Full Name *"), /*#__PURE__*/React.createElement("input", {
    id: "qf-name",
    className: "form-input",
    value: form.name,
    onChange: e => set("name", e.target.value),
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label",
    htmlFor: "qf-phone"
  }, "Phone *"), /*#__PURE__*/React.createElement("input", {
    id: "qf-phone",
    className: "form-input",
    type: "tel",
    inputMode: "tel",
    value: form.phone,
    onChange: e => set("phone", e.target.value),
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label",
    htmlFor: "qf-email"
  }, "Email *"), /*#__PURE__*/React.createElement("input", {
    id: "qf-email",
    className: "form-input",
    type: "email",
    inputMode: "email",
    value: form.email,
    onChange: e => set("email", e.target.value),
    required: true
  })))), step === 3 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label",
    htmlFor: "qf-details"
  }, "Tell us about your event"), /*#__PURE__*/React.createElement("textarea", {
    id: "qf-details",
    className: "form-textarea",
    style: {
      minHeight: 120
    },
    placeholder: "What's the occasion? Any dietary needs? Vision for the food? The more you share, the better we can plan\u2026",
    value: form.details,
    onChange: e => set("details", e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-actions"
  }, step > 1 && /*#__PURE__*/React.createElement("button", {
    className: "form-btn-back",
    onClick: () => setStep(s => s - 1),
    disabled: submitting
  }, "\u2190 Back"), step < totalSteps && /*#__PURE__*/React.createElement("button", {
    className: "form-btn-next",
    onClick: advanceStep
  }, "Continue \u2192"), step === totalSteps && /*#__PURE__*/React.createElement("button", {
    className: "form-btn-next",
    onClick: handleSubmit,
    disabled: submitting
  }, submitting ? "Sending\u2026" : "Submit Request"), submitError && /*#__PURE__*/React.createElement("div", {
    style: { color: "var(--error, #c44)", fontSize: 14, marginTop: 8, textAlign: "center" },
    role: "alert"
  }, submitError)), Object.keys(formErrors).length > 0 && /*#__PURE__*/React.createElement("div", {
    style: { padding: "8px 12px", background: "rgba(196,68,68,.08)", borderRadius: 8, marginTop: 8 },
    role: "alert"
  }, Object.values(formErrors).map((msg, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: { color: "var(--error, #c44)", fontSize: 13, lineHeight: 1.5 }
  }, "\u26A0 ", msg)))));
}

// ═══════════════════════════════════════════════════════════════
// BUDGET ESTIMATOR
// ═══════════════════════════════════════════════════════════════

function BudgetEstimator() {
  const [service, setService] = useState("weddings");
  const [guests, setGuests] = useState(75);
  const svc = SERVICES.find(s => s.id === service);
  let low = 0,
    high = 0;
  if (svc && svc.pricingModel === "person") {
    low = svc.minRate * guests;
    high = svc.maxRate * guests;
  } else if (svc && svc.pricingModel === "item") {
    low = svc.minRate * guests;
    high = svc.maxRate * guests;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "budget-calc"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Budget Estimator"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 28,
      color: "var(--charcoal)",
      marginBottom: 20
    }
  }, "Estimate Your Event"), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label",
    htmlFor: "be-service"
  }, "Event Type"), /*#__PURE__*/React.createElement("select", {
    id: "be-service",
    className: "form-select",
    value: service,
    onChange: e => setService(e.target.value)
  }, SERVICES.filter(s => s.id !== "packaging").map(s => /*#__PURE__*/React.createElement("option", {
    key: s.id,
    value: s.id
  }, s.title)))), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label",
    htmlFor: "be-guests"
  }, svc?.pricingModel === "item" ? "Estimated Items" : "Guest Count"), /*#__PURE__*/React.createElement("input", {
    id: "be-guests",
    className: "form-input",
    type: "number",
    inputMode: "numeric",
    value: guests,
    onChange: e => setGuests(Number(e.target.value) || 0)
  }))), low > 0 && /*#__PURE__*/React.createElement("div", {
    className: "budget-result"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.5,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      marginBottom: 8
    }
  }, "Estimated Range"), /*#__PURE__*/React.createElement("div", {
    className: "budget-range"
  }, "$", low.toLocaleString(), " \u2013 $", high.toLocaleString()), /*#__PURE__*/React.createElement("div", {
    className: "budget-note"
  }, "*Estimates vary by menu selection and service style. Final pricing follows a tasting consultation.")));
}

// ═══════════════════════════════════════════════════════════════
// PAGE COMPONENTS
// ═══════════════════════════════════════════════════════════════

function HomePage() {
  const featuredEvents = EVENTS.filter(p => p.featured).slice(0, 4);
  const featuredReviews = REVIEWS.filter(r => r.featured).slice(0, 3);
  const signatureItems = MENU_ITEMS.filter(m => m.category === "signature");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HeroSection, {
    badge: "Premium Comfort Catering \xB7 South Jersey & Philadelphia",
    title: `Where Family Recipes Become <em>Unforgettable Events</em>`,
    subtitle: "Act Two Catering turns our signature turkey croquettes and elevated comfort food into the centerpiece of your next celebration. From intimate dinners to grand receptions.",
    primaryCta: "Book a Tasting",
    secondaryCta: `Call ${BIZ.phone}`,
    tertiaryLabel: "See Our Menu \u2192",
    tertiaryRoute: "/menu",
    heroImg: IMAGES.hero.home
  }), /*#__PURE__*/React.createElement(TrustBar, null), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "signature-banner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "signature-banner-emoji"
  }, "\uD83E\uDD47"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Our Signature: Premium Turkey Croquettes"), /*#__PURE__*/React.createElement("p", null, "Crispy golden exterior, creamy seasoned turkey filling \u2014 the dish that started it all. Born from a family recipe and refined for events of every size. Four varieties available, each one crafted to be the appetizer your guests can't stop talking about."), /*#__PURE__*/React.createElement("button", {
    className: "link-btn",
    onClick: () => navigate("/menu"),
    style: {
      marginTop: 8
    }
  }, "Explore the full menu \u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Signature Lineup"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Four Ways to Fall in Love"), /*#__PURE__*/React.createElement("p", {
    className: "section-subtitle mb-32"
  }, "Every variety starts with the same family recipe. Each one takes it somewhere new."), /*#__PURE__*/React.createElement("div", {
    className: "menu-grid"
  }, signatureItems.map(item => /*#__PURE__*/React.createElement(MenuItemCard, {
    key: item.id,
    item: item
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "section section-alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "What We Do"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Catering for Every Occasion"), /*#__PURE__*/React.createElement("p", {
    className: "section-subtitle mb-32"
  }, "From wedding receptions to pop-up markets, we bring the same care and craft to every event."), /*#__PURE__*/React.createElement("div", {
    className: "service-grid"
  }, SERVICES.map(s => /*#__PURE__*/React.createElement(ServiceCard, {
    key: s.id,
    service: s,
    onClick: () => navigate(`/services/${s.slug}`)
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Recent Events"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Stories from the Table"), /*#__PURE__*/React.createElement("p", {
    className: "section-subtitle mb-32"
  }, "Every event is different. Here's how we made each one special."), /*#__PURE__*/React.createElement("div", {
    className: "event-grid"
  }, featuredEvents.map(e => /*#__PURE__*/React.createElement(EventCard, {
    key: e.id,
    event: e,
    onClick: () => navigate(`/events/${e.slug}`)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "text-center mt-32"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => navigate("/events")
  }, "View All Events \u2192")))), /*#__PURE__*/React.createElement("section", {
    className: "section section-alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "What People Say"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Reviews from Our Guests"), /*#__PURE__*/React.createElement("p", {
    className: "section-subtitle mb-32"
  }, "Real feedback from real celebrations."), /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, featuredReviews.map(r => /*#__PURE__*/React.createElement(ReviewCard, {
    key: r.id,
    review: r
  }))), /*#__PURE__*/React.createElement("div", {
    className: "text-center mt-32"
  }, /*#__PURE__*/React.createElement("button", {
    className: "link-btn",
    onClick: () => navigate("/reviews")
  }, "Read All Reviews \u2192")))), /*#__PURE__*/React.createElement("section", {
    className: "section section-wine"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Our Story"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Why ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: "italic",
      color: "var(--wine)"
    }
  }, "Act Two"), "?"), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 680,
      margin: "0 auto 32px",
      lineHeight: 1.85,
      color: "var(--slate)",
      fontSize: 15
    }
  }, "Every great dish has an origin story. Ours began as a family recipe \u2014 turkey croquettes made for Sunday dinners and holiday tables. Act One was perfecting the recipe at home. Act Two is sharing it with the world. We're building a food business the right way: starting with catering, proving the product with real people, and growing from there."), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => navigate("/about")
  }, "Our Full Story \u2192"))), /*#__PURE__*/React.createElement(InlineCTA, null));
}
function MenuPage() {
  const [filter, setFilter] = useState("all");
  const catOpts = [{
    value: "signature",
    label: "Signature Croquettes"
  }, {
    value: "sides",
    label: "Sides"
  }, {
    value: "extras",
    label: "Extras"
  }];
  let filtered = MENU_ITEMS;
  if (filter !== "all") filtered = filtered.filter(m => m.category === filter);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HeroSection, {
    badge: "Our Menu",
    title: "Comfort Food, <em>Elevated</em>",
    subtitle: "Every dish is made from scratch with premium ingredients. Our signature turkey croquettes anchor every menu.",
    primaryCta: "Book a Tasting",
    secondaryCta: `Call ${BIZ.phone}`,
    heroImg: IMAGES.hero.menu
  }), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement(FilterChips, {
    options: catOpts,
    active: filter,
    onChange: setFilter
  }), /*#__PURE__*/React.createElement("div", {
    className: "menu-grid"
  }, filtered.map(item => /*#__PURE__*/React.createElement(MenuItemCard, {
    key: item.id,
    item: item
  }))), /*#__PURE__*/React.createElement("div", {
    className: "signature-banner mt-48"
  }, /*#__PURE__*/React.createElement("span", {
    className: "signature-banner-emoji"
  }, "\uD83D\uDC68\u200D\uD83C\uDF73"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Custom Menus Available"), /*#__PURE__*/React.createElement("p", null, "Our menu is a starting point. For weddings, corporate events, and private parties, we build custom menus tailored to your event, dietary needs, and vision. Every tasting is an opportunity to explore."))), /*#__PURE__*/React.createElement(InlineCTA, {
    title: "Want to Try Before You Book?",
    text: "Schedule a complimentary tasting to experience the food firsthand.",
    cta: "Schedule Tasting"
  }))));
}
function ServicesHub() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HeroSection, {
    badge: "Our Services",
    title: "Catering for <em>Every Occasion</em>",
    subtitle: "From intimate dinner parties to 500-guest receptions, we scale our craft to fit your event.",
    primaryCta: "Book a Tasting",
    secondaryCta: `Call ${BIZ.phone}`,
    heroImg: IMAGES.hero.services
  }), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "service-grid"
  }, SERVICES.map(s => /*#__PURE__*/React.createElement(ServiceCard, {
    key: s.id,
    service: s,
    onClick: () => navigate(`/services/${s.slug}`)
  }))))));
}
function ServiceDetailPage({
  slug
}) {
  const svc = getService(slug);
  if (!svc) return /*#__PURE__*/React.createElement("div", {
    className: "section section-inner"
  }, /*#__PURE__*/React.createElement("p", null, "Service not found."));
  const events = eventsForService(svc.id).slice(0, 3);
  const reviews = reviewsForService(svc.id).slice(0, 2);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HeroSection, {
    badge: svc.shortTitle,
    title: svc.title,
    subtitle: svc.fullDesc,
    primaryCta: "Request a Quote",
    secondaryCta: `Call ${BIZ.phone}`,
    tertiaryLabel: "See Pricing \u2192",
    tertiaryRoute: "/pricing",
    heroImg: IMAGES.hero.services
  }), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "breadcrumb"
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/")
  }, "Home"), " / ", /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/services")
  }, "Services"), " / ", svc.shortTitle), /*#__PURE__*/React.createElement("div", {
    className: "grid-2 mt-32"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Our Process"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 28,
      color: "var(--charcoal)",
      marginBottom: 20
    }
  }, "How It Works"), /*#__PURE__*/React.createElement(ProcessSteps, {
    steps: svc.process,
    details: svc.processDetails
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Why Choose Us"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 28,
      color: "var(--charcoal)",
      marginBottom: 20
    }
  }, "What You Get"), svc.benefits.map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 14,
      fontSize: 14,
      color: "var(--charcoal)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wine)",
      fontWeight: 700,
      flexShrink: 0
    }
  }, "\u2726"), " ", b)))), events.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-48"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Past ", svc.shortTitle, " Events"), /*#__PURE__*/React.createElement("div", {
    className: "event-grid"
  }, events.map(e => /*#__PURE__*/React.createElement(EventCard, {
    key: e.id,
    event: e,
    onClick: () => navigate(`/events/${e.slug}`)
  })))), /*#__PURE__*/React.createElement(InlineCTA, {
    title: `Planning a ${svc.shortTitle} Event?`
  }), svc.faqs.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-32"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "FAQ"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 28,
      color: "var(--charcoal)",
      marginBottom: 20
    }
  }, "Common Questions"), /*#__PURE__*/React.createElement(FAQAccordion, {
    faqs: svc.faqs
  })), reviews.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-48"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Client Reviews"), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, reviews.map(r => /*#__PURE__*/React.createElement(ReviewCard, {
    key: r.id,
    review: r
  })))))));
}
function EventsPage() {
  const [filter, setFilter] = useState("all");
  const serviceOpts = [...new Set(EVENTS.map(p => p.service))].map(s => ({
    value: s,
    label: SERVICES.find(sv => sv.id === s)?.shortTitle || s
  }));
  let filtered = EVENTS;
  if (filter !== "all") filtered = filtered.filter(p => p.service === filter);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HeroSection, {
    badge: "Past Events",
    title: "Stories from <em>the Table</em>",
    subtitle: "Every event tells a story. Here are some of ours.",
    primaryCta: "Book Your Event",
    secondaryCta: `Call ${BIZ.phone}`,
    heroImg: IMAGES.hero.events
  }), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement(FilterChips, {
    options: serviceOpts,
    active: filter,
    onChange: setFilter
  }), /*#__PURE__*/React.createElement("div", {
    className: "event-grid"
  }, filtered.map(e => /*#__PURE__*/React.createElement(EventCard, {
    key: e.id,
    event: e,
    onClick: () => navigate(`/events/${e.slug}`)
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement(InlineCTA, null)));
}
function EventDetailPage({
  slug
}) {
  const event = getEvent(slug);
  if (!event) return /*#__PURE__*/React.createElement("div", {
    className: "section section-inner"
  }, /*#__PURE__*/React.createElement("p", null, "Event not found."));
  const svc = SERVICES.find(s => s.id === event.service);
  const related = EVENTS.filter(e => e.id !== event.id).slice(0, 3);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HeroSection, {
    badge: `Case Study · ${svc?.shortTitle}`,
    title: `${event.neighborhood} — <em>${event.eventType}</em>`,
    subtitle: event.scope,
    primaryCta: "Plan a Similar Event",
    secondaryCta: `Call ${BIZ.phone}`,
    showReassurance: false,
    heroImg: IMAGES.hero.events
  }), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner project-detail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "breadcrumb"
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/")
  }, "Home"), " / ", /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/events")
  }, "Events"), " / ", event.neighborhood), /*#__PURE__*/React.createElement("div", {
    className: "event-header",
    style: {
      borderRadius: "var(--radius-lg)",
      marginTop: 24,
      justifyContent: "center",
      background: "linear-gradient(135deg, var(--blush) 0%, var(--wine-pale) 100%)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 72
    }
  }, event.emoji)), /*#__PURE__*/React.createElement("div", {
    className: "project-facts"
  }, /*#__PURE__*/React.createElement("div", {
    className: "project-fact"
  }, /*#__PURE__*/React.createElement("strong", null, "Location"), event.neighborhood), /*#__PURE__*/React.createElement("div", {
    className: "project-fact"
  }, /*#__PURE__*/React.createElement("strong", null, "Event Type"), event.eventType), /*#__PURE__*/React.createElement("div", {
    className: "project-fact"
  }, /*#__PURE__*/React.createElement("strong", null, "Service"), svc?.shortTitle), /*#__PURE__*/React.createElement("div", {
    className: "project-fact"
  }, /*#__PURE__*/React.createElement("strong", null, "Guests"), event.guests), /*#__PURE__*/React.createElement("div", {
    className: "project-fact"
  }, /*#__PURE__*/React.createElement("strong", null, "Menu Highlights"), event.items.join(", "))), /*#__PURE__*/React.createElement("div", {
    className: "project-narrative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "narrative-panel"
  }, /*#__PURE__*/React.createElement("h4", null, "Challenge"), /*#__PURE__*/React.createElement("p", null, event.challenge)), /*#__PURE__*/React.createElement("div", {
    className: "narrative-panel"
  }, /*#__PURE__*/React.createElement("h4", null, "Solution"), /*#__PURE__*/React.createElement("p", null, event.solution)), /*#__PURE__*/React.createElement("div", {
    className: "narrative-panel"
  }, /*#__PURE__*/React.createElement("h4", null, "Outcome"), /*#__PURE__*/React.createElement("p", null, event.outcome))), /*#__PURE__*/React.createElement(InlineCTA, {
    title: "Want Similar Results?",
    text: "Let's plan your event together."
  }), related.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-48"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 24,
      color: "var(--charcoal)",
      marginBottom: 16
    }
  }, "More Events"), /*#__PURE__*/React.createElement("div", {
    className: "event-grid"
  }, related.map(e => /*#__PURE__*/React.createElement(EventCard, {
    key: e.id,
    event: e,
    onClick: () => navigate(`/events/${e.slug}`)
  })))))));
}
function ReviewsPage() {
  const [filter, setFilter] = useState("all");
  const serviceOpts = [...new Set(REVIEWS.map(r => r.service))].map(s => ({
    value: s,
    label: SERVICES.find(sv => sv.id === s)?.shortTitle || s
  }));
  let filtered = [...REVIEWS].sort((a, b) => b.date.localeCompare(a.date));
  if (filter !== "all") filtered = filtered.filter(r => r.service === filter);
  const avg = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HeroSection, {
    badge: "Reviews",
    title: "What Our Clients Say",
    subtitle: "Real reviews from real events.",
    primaryCta: "Book a Tasting",
    secondaryCta: `Call ${BIZ.phone}`,
    heroImg: IMAGES.hero.reviews
  }), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stats-strip"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, avg), /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Average Rating")), /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, REVIEWS.length), /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Reviews")), /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, "100%"), /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "5-Star"))), /*#__PURE__*/React.createElement(FilterChips, {
    options: serviceOpts,
    active: filter,
    onChange: setFilter
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, filtered.map(r => /*#__PURE__*/React.createElement(ReviewCard, {
    key: r.id,
    review: r
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement(InlineCTA, null)));
}
function ServiceAreasPage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HeroSection, {
    badge: "Service Areas",
    title: "Serving <em>South Jersey</em> & Philadelphia",
    subtitle: "We proudly cater events across the greater Philadelphia and South Jersey region.",
    primaryCta: "Check Availability",
    secondaryCta: `Call ${BIZ.phone}`,
    heroImg: IMAGES.hero.areas
  }), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "service-grid"
  }, SERVICE_AREAS.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.slug,
    className: "card service-card",
    onClick: () => navigate(`/service-areas/${a.slug}`),
    role: "button",
    tabIndex: 0,
    onKeyDown: e => e.key === "Enter" && navigate(`/service-areas/${a.slug}`)
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, a.name), /*#__PURE__*/React.createElement("p", {
    className: "card-text",
    style: {
      marginBottom: 12
    }
  }, a.desc.slice(0, 120), "\u2026"), /*#__PURE__*/React.createElement("div", {
    className: "tag-row"
  }, a.topServices.map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    className: "tag"
  }, SERVICES.find(sv => sv.id === s)?.shortTitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      color: "var(--wine)",
      fontSize: 13,
      fontWeight: 600
    }
  }, "View details \u2192"))))))));
}
function ServiceAreaDetailPage({
  slug
}) {
  const area = getArea(slug);
  if (!area) return /*#__PURE__*/React.createElement("div", {
    className: "section section-inner"
  }, /*#__PURE__*/React.createElement("p", null, "Area not found."));
  const events = eventsForArea(slug).slice(0, 4);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HeroSection, {
    badge: `Service Area · ${area.fullName}`,
    title: `Catering in <em>${area.name}</em>`,
    subtitle: area.desc,
    primaryCta: `Book in ${area.name}`,
    secondaryCta: `Call ${BIZ.phone}`,
    heroImg: IMAGES.hero.areas
  }), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "breadcrumb"
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/")
  }, "Home"), " / ", /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/service-areas")
  }, "Service Areas"), " / ", area.name), /*#__PURE__*/React.createElement("div", {
    className: "grid-2 mt-32"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Neighborhoods We Serve"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 24,
      color: "var(--charcoal)",
      marginBottom: 16
    }
  }, "Areas in ", area.name), /*#__PURE__*/React.createElement("div", {
    className: "tag-row"
  }, area.neighborhoods.map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    className: "tag"
  }, n)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Popular Services Here"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 24,
      color: "var(--charcoal)",
      marginBottom: 16
    }
  }, "Most Requested"), area.topServices.map(sid => {
    const s = SERVICES.find(sv => sv.id === sid);
    return s ? /*#__PURE__*/React.createElement("div", {
      key: sid,
      onClick: () => navigate(`/services/${s.slug}`),
      className: "card",
      style: {
        cursor: "pointer",
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body",
      style: {
        padding: 16,
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 24
      }
    }, s.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "var(--charcoal)"
      }
    }, s.shortTitle), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        color: "var(--slate)",
        margin: 0
      }
    }, s.shortDesc.slice(0, 80), "\u2026")))) : null;
  }))), events.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-48"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Events in ", area.name), /*#__PURE__*/React.createElement("div", {
    className: "event-grid"
  }, events.map(e => /*#__PURE__*/React.createElement(EventCard, {
    key: e.id,
    event: e,
    onClick: () => navigate(`/events/${e.slug}`)
  })))), /*#__PURE__*/React.createElement(InlineCTA, {
    title: `Planning an Event in ${area.name}?`
  }))));
}
function AboutPage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HeroSection, {
    badge: "Our Story",
    title: `Act One Was the Recipe. <em>Act Two Is the Business.</em>`,
    subtitle: "We're turning a family tradition into something bigger.",
    primaryCta: "See Our Menu",
    secondaryCta: `Call ${BIZ.phone}`,
    heroImg: IMAGES.hero.about
  }), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "The Origin"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "From Sunday Dinner to Saturday Night"), /*#__PURE__*/React.createElement("p", {
    style: {
      lineHeight: 1.85,
      color: "var(--charcoal)",
      marginBottom: 16
    }
  }, "It started the way the best food businesses do \u2014 with a dish that people couldn't stop asking about. Our turkey croquettes were a family recipe, perfected over years of Sunday dinners, holiday tables, and \"bring that thing you make\" requests at every gathering."), /*#__PURE__*/React.createElement("p", {
    style: {
      lineHeight: 1.85,
      color: "var(--charcoal)",
      marginBottom: 16
    }
  }, "Act One was getting the recipe right. Learning what makes the filling creamy without being heavy. Finding the crunch that holds up for ten minutes after plating. Dialing in the seasoning until it was automatic."), /*#__PURE__*/React.createElement("p", {
    style: {
      lineHeight: 1.85,
      color: "var(--charcoal)"
    }
  }, "Act Two is taking that recipe and building something real. A catering company that proves the product in the field \u2014 at weddings, corporate events, pop-ups, and dinner parties \u2014 before scaling into retail. It's the smart way to build a food business, and it starts with making people happy, one plate at a time."), /*#__PURE__*/React.createElement("div", {
    className: "about-photos-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-photo-block"
  }, /*#__PURE__*/React.createElement(ImgWithFallback, {
    src: IMAGES.about.family,
    alt: "The Robertson family",
    fallback: /*#__PURE__*/React.createElement("div", {
      className: "about-photo-fallback"
    }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66"), "Family Photo")
  })), /*#__PURE__*/React.createElement("div", {
    className: "about-photo-block"
  }, /*#__PURE__*/React.createElement(ImgWithFallback, {
    src: IMAGES.about.kitchen,
    alt: "Behind the scenes in the kitchen",
    fallback: /*#__PURE__*/React.createElement("div", {
      className: "about-photo-fallback"
    }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDC68\u200D\uD83C\uDF73"), "Kitchen Photo")
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "The Strategy"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 24,
      color: "var(--charcoal)",
      marginBottom: 20
    }
  }, "Why Catering First"), [["Low-risk validation", "Catering lets us prove the product with real customers before investing in retail infrastructure."], ["Direct feedback loop", "We see reactions in real time. Every event teaches us something new about what works."], ["Brand building", "Every wedding, party, and pop-up creates word-of-mouth that money can't buy."], ["White space opportunity", "Turkey croquettes are virtually nonexistent in mainstream food. We're filling a gap."], ["Scalable path", "Catering → local brand → packaged product → retail. Each step funds the next."]].map(([title, desc], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      fontSize: 14,
      fontWeight: 600,
      color: "var(--charcoal)",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wine)",
      flexShrink: 0
    }
  }, "\u2726"), " ", title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--slate)",
      lineHeight: 1.6,
      paddingLeft: 24
    }
  }, desc))))), /*#__PURE__*/React.createElement("div", {
    className: "signature-banner mt-48"
  }, /*#__PURE__*/React.createElement("span", {
    className: "signature-banner-emoji"
  }, "\uD83C\uDFAD"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "The Name"), /*#__PURE__*/React.createElement("p", null, "\"Act Two\" is deliberate. In every great story, Act Two is where things get real \u2014 where the setup becomes action. Act One was the family recipe. Act Two is the business. We're not just cooking food. We're building a brand that starts at the table and grows from there."))), /*#__PURE__*/React.createElement("div", {
    className: "about-photo-block mt-48",
    style: {
      maxWidth: 900,
      margin: "48px auto 0"
    }
  }, /*#__PURE__*/React.createElement(ImgWithFallback, {
    src: IMAGES.about.team,
    alt: "The Act Two Catering team",
    style: {
      height: 360
    },
    fallback: /*#__PURE__*/React.createElement("div", {
      className: "about-photo-fallback",
      style: {
        height: 360
      }
    }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDF7D\uFE0F"), "Team Photo \u2014 Swap with /images/about-team.jpg")
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-48"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "The Roadmap"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 28,
      color: "var(--charcoal)",
      marginBottom: 24
    }
  }, "Where We're Going"), /*#__PURE__*/React.createElement(ProcessSteps, {
    steps: ["Catering Launch", "Local Brand Growth", "Packaged Product", "Retail Distribution"],
    details: ["Prove the product through weddings, corporate events, pop-ups, and private parties. Build the reputation.", "Expand the menu, grow the team, become the go-to comfort caterer in the Philadelphia and South Jersey market.", "Develop frozen retail-ready turkey croquettes for specialty food shops and direct-to-consumer sales.", "Enter regional grocery, restaurant distribution, and beyond. The family recipe goes national."]
  })))), /*#__PURE__*/React.createElement(InlineCTA, {
    title: "Be Part of the Story",
    text: "Book us for your next event and taste the beginning of something special."
  }));
}
function PricingPage() {
  const faqs = [{
    q: "What's included in the per-person price?",
    a: "All food preparation, delivery, setup, service staff (for events over 50), and cleanup. China and linen rentals are available at additional cost."
  }, {
    q: "Do you require a deposit?",
    a: "Yes — we require a 30% deposit to secure your date, with the balance due 7 days before the event."
  }, {
    q: "Can I customize the menu?",
    a: "Absolutely — customization is what we do. The tasting consultation is where we build your perfect menu together."
  }, {
    q: "Do you accommodate dietary restrictions?",
    a: "Yes. We handle gluten-free, dairy-free, vegetarian, vegan, nut-free, and other dietary needs. Just let us know during consultation."
  }, {
    q: "What's your cancellation policy?",
    a: "Full refund up to 30 days before the event. 50% refund 14–30 days out. Inside 14 days, the deposit is non-refundable but can be applied to a rescheduled date."
  }, {
    q: "Do you travel outside your service area?",
    a: "We can accommodate events outside our standard area for an additional travel fee. Contact us to discuss."
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HeroSection, {
    badge: "Pricing",
    title: "Transparent Pricing, <em>Custom Menus</em>",
    subtitle: "Know what to expect. Every quote is tailored to your event.",
    primaryCta: "Get a Custom Quote",
    secondaryCta: `Call ${BIZ.phone}`,
    heroImg: IMAGES.hero.pricing
  }), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Starting Ranges"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title",
    style: {
      fontSize: 28
    }
  }, "Pricing Guide"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--slate)",
      marginBottom: 24,
      lineHeight: 1.7
    }
  }, "Pricing depends on menu selection, guest count, service style, and event complexity. These ranges give you a starting point. Every quote is custom."), SERVICES.filter(s => s.id !== "packaging").map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 0",
      borderBottom: "1px solid var(--cream-dark)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--charcoal)"
    }
  }, s.shortTitle), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 12,
      color: "var(--slate)"
    }
  }, s.shortDesc.slice(0, 55), "\u2026")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 18,
      color: "var(--wine)",
      fontWeight: 600,
      whiteSpace: "nowrap"
    }
  }, "$", s.minRate, "\u2013$", s.maxRate, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--slate)",
      fontFamily: "var(--font-body)"
    }
  }, "/", s.unit))))), /*#__PURE__*/React.createElement(BudgetEstimator, null)), /*#__PURE__*/React.createElement(InlineCTA, {
    title: "Ready for a Custom Quote?",
    text: "Tell us about your event and we'll put together a detailed proposal."
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-32"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "FAQ"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 28,
      color: "var(--charcoal)",
      marginBottom: 20
    }
  }, "Common Questions"), /*#__PURE__*/React.createElement(FAQAccordion, {
    faqs: faqs
  })))));
}
function ContactPage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HeroSection, {
    badge: "Contact",
    title: "Let's Plan Your <em>Next Event</em>",
    subtitle: "Tell us about your event and we'll be in touch within 24 hours.",
    primaryCta: `Call ${BIZ.phone}`,
    secondaryCta: null,
    showReassurance: true,
    heroImg: IMAGES.hero.contact
  }), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement(QuoteForm, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Get In Touch"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 24,
      color: "var(--charcoal)",
      marginBottom: 20
    }
  }, "Contact Information"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--charcoal)",
      fontSize: 14
    }
  }, "Phone"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
    href: BIZ.phoneTel,
    style: {
      color: "var(--wine)",
      fontSize: 18,
      fontWeight: 600,
      textDecoration: "none"
    }
  }, BIZ.phone))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--charcoal)",
      fontSize: 14
    }
  }, "Email"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
    href: `mailto:${BIZ.email}`,
    style: {
      color: "var(--wine)",
      textDecoration: "none"
    }
  }, BIZ.email))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--charcoal)",
      fontSize: 14
    }
  }, "Based In"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--charcoal)"
    }
  }, BIZ.city, ", ", BIZ.state)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--charcoal)",
      fontSize: 14
    }
  }, "Hours"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--charcoal)"
    }
  }, BIZ.hours.weekday, /*#__PURE__*/React.createElement("br", null), BIZ.hours.saturday, /*#__PURE__*/React.createElement("br", null), BIZ.hours.sunday)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--charcoal)",
      fontSize: 14
    }
  }, "Service Areas"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--charcoal)"
    }
  }, "Camden, Burlington, Gloucester Counties (NJ) \xB7 Philadelphia, Delaware, Montgomery Counties (PA)")), /*#__PURE__*/React.createElement("div", {
    className: "signature-banner",
    style: {
      marginTop: 28,
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "signature-banner-emoji",
    style: {
      fontSize: 36
    }
  }, "\uD83C\uDF7D\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18
    }
  }, "Free Tastings"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13
    }
  }, "Every event inquiry includes a complimentary tasting. Experience the food before you commit."))))))));
}

// ═══════════════════════════════════════════════════════════════
// LAYOUT
// ═══════════════════════════════════════════════════════════════

function Header({
  currentPath
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const navTo = path => {
    navigate(path);
    closeMenu();
  };
  const links = [{
    label: "Menu",
    path: "/menu"
  }, {
    label: "Services",
    path: "/services"
  }, {
    label: "Events",
    path: "/events"
  }, {
    label: "Reviews",
    path: "/reviews"
  }, {
    label: "Areas",
    path: "/service-areas"
  }, {
    label: "Pricing",
    path: "/pricing"
  }, {
    label: "About",
    path: "/about"
  }];
  return /*#__PURE__*/React.createElement("header", {
    className: "site-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-utility"
  }, /*#__PURE__*/React.createElement("span", null, "Premium Comfort Catering \xB7 South Jersey & Philadelphia \xB7 ", /*#__PURE__*/React.createElement("strong", null, "Free Tastings"))), /*#__PURE__*/React.createElement("div", {
    className: "header-main"
  }, /*#__PURE__*/React.createElement("a", {
    className: "header-logo",
    onClick: () => navTo("/"),
    tabIndex: 0,
    onKeyDown: e => e.key === "Enter" && navTo("/")
  }, /*#__PURE__*/React.createElement("span", {
    className: "logo-act"
  }, "Act"), " ", /*#__PURE__*/React.createElement("span", {
    className: "logo-two"
  }, "Two")), /*#__PURE__*/React.createElement("nav", {
    className: `header-nav ${menuOpen ? "open" : ""}`,
    "aria-label": "Main navigation"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.path,
    className: currentPath.startsWith(l.path) ? "active" : "",
    onClick: () => navTo(l.path)
  }, l.label)), /*#__PURE__*/React.createElement("button", {
    className: "mobile-quote-btn",
    onClick: () => navTo("/contact"),
    style: {
      display: menuOpen ? "block" : "none"
    }
  }, "Book a Tasting")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: BIZ.phoneTel,
    className: "header-phone header-phone-desktop"
  }, BIZ.phone), /*#__PURE__*/React.createElement("button", {
    className: "mobile-menu-btn",
    onClick: () => setMenuOpen(!menuOpen),
    "aria-expanded": menuOpen,
    "aria-label": "Toggle navigation menu"
  }, menuOpen ? "✕" : "☰"))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "site-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-brand"
  }, /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement("span", null, "Act"), " Two Catering"), /*#__PURE__*/React.createElement("p", null, "Premium comfort catering anchored by our signature turkey croquettes. Serving South Jersey and the greater Philadelphia area."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      opacity: 0.6
    }
  }, "From family recipe to your table.")), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("h4", null, "Services"), SERVICES.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.id,
    onClick: () => navigate(`/services/${s.slug}`)
  }, s.shortTitle))), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("h4", null, "Company"), /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/menu")
  }, "Menu"), /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/about")
  }, "Our Story"), /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/reviews")
  }, "Reviews"), /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/events")
  }, "Past Events"), /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/pricing")
  }, "Pricing")), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("h4", null, "Contact"), /*#__PURE__*/React.createElement("a", {
    href: BIZ.phoneTel
  }, BIZ.phone), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${BIZ.email}`
  }, BIZ.email), /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/contact")
  }, "Book a Tasting"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: 12,
      opacity: 0.6
    }
  }, BIZ.city, ", ", BIZ.state, /*#__PURE__*/React.createElement("br", null), BIZ.hours.weekday, /*#__PURE__*/React.createElement("br", null), BIZ.hours.saturday))), /*#__PURE__*/React.createElement("div", {
    className: "footer-bottom"
  }, "\xA9 ", new Date().getFullYear(), " Act Two Catering. All rights reserved."));
}
function MobileCallBar() {
  return /*#__PURE__*/React.createElement("div", {
    className: "mobile-call-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mobile-call-bar-inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: BIZ.phoneTel,
    className: "mcb-call"
  }, "\uD83D\uDCDE Call Now"), /*#__PURE__*/React.createElement("button", {
    className: "mcb-quote",
    onClick: () => navigate("/contact")
  }, "\uD83C\uDF7D\uFE0F Book Tasting")));
}

// ═══════════════════════════════════════════════════════════════
// ROUTER & APP SHELL
// ═══════════════════════════════════════════════════════════════

function Router({
  hash
}) {
  const {
    parts
  } = parseRoute(hash.replace("#", ""));
  const p0 = parts[0] || "";
  const p1 = parts[1] || "";
  if (!p0) return /*#__PURE__*/React.createElement(HomePage, null);
  if (p0 === "menu") return /*#__PURE__*/React.createElement(MenuPage, null);
  if (p0 === "services" && !p1) return /*#__PURE__*/React.createElement(ServicesHub, null);
  if (p0 === "services" && p1) return /*#__PURE__*/React.createElement(ServiceDetailPage, {
    slug: p1
  });
  if (p0 === "events" && !p1) return /*#__PURE__*/React.createElement(EventsPage, null);
  if (p0 === "events" && p1) return /*#__PURE__*/React.createElement(EventDetailPage, {
    slug: p1
  });
  if (p0 === "reviews") return /*#__PURE__*/React.createElement(ReviewsPage, null);
  if (p0 === "service-areas" && !p1) return /*#__PURE__*/React.createElement(ServiceAreasPage, null);
  if (p0 === "service-areas" && p1) return /*#__PURE__*/React.createElement(ServiceAreaDetailPage, {
    slug: p1
  });
  if (p0 === "about") return /*#__PURE__*/React.createElement(AboutPage, null);
  if (p0 === "pricing") return /*#__PURE__*/React.createElement(PricingPage, null);
  if (p0 === "contact") return /*#__PURE__*/React.createElement(ContactPage, null);
  return /*#__PURE__*/React.createElement(HomePage, null);
}
window.__App = function ActTwoCateringApp() {
  const hash = useHash();
  const currentPath = hash.replace("#", "") || "/";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement("a", {
    id: "skip-link",
    href: "#main-content"
  }, "Skip to main content"), /*#__PURE__*/React.createElement(Header, {
    currentPath: currentPath
  }), /*#__PURE__*/React.createElement("main", {
    id: "main-content"
  }, /*#__PURE__*/React.createElement(Router, {
    hash: hash
  })), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(MobileCallBar, null));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(window.__App));

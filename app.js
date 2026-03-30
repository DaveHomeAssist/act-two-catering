(() => {
  const { useState, useEffect, useRef } = React;
  const BIZ = {
    name: "Act Two Catering",
    phone: "(856) 555-0192",
    phoneTel: "tel:+18565550192",
    email: "hello@acttwocatering.com",
    address: "Collingswood, NJ",
    city: "Collingswood",
    state: "NJ",
    zip: "08108",
    hours: { weekday: "Mon\u2013Fri: 9AM\u20136PM", saturday: "Sat: By Appointment", sunday: "Sun: Event Days" },
    founded: 2025,
    tagline: "From family recipe to your table \u2014 premium comfort catering rooted in tradition.",
    owner: "Robertson"
  };
  const SERVICES = [
    {
      id: "weddings",
      slug: "weddings",
      title: "Wedding Catering",
      shortTitle: "Weddings",
      icon: "\u{1F942}",
      shortDesc: "Elevated comfort food that makes your reception unforgettable.",
      fullDesc: "Your wedding deserves food that sparks conversation. We craft bespoke menus anchored by our signature turkey croquettes, complemented by seasonal sides and passed appetizers that feel both celebratory and deeply personal.",
      process: ["Tasting Consultation", "Menu Design", "Day-Of Execution", "Seamless Service"],
      processDetails: [
        "Meet with us to sample dishes, discuss your vision, and explore flavor profiles",
        "We build a custom menu around your preferences, guest count, and venue",
        "Our team handles prep, presentation, and timing so you enjoy every moment",
        "Professional staff, elegant plating, and flawless coordination from first bite to last dance"
      ],
      benefits: ["Custom menus built around your vision", "Signature croquettes as a showstopper appetizer", "Professional service staff included", "Tastings before you commit", "Dietary accommodations handled gracefully", "Coordination with your venue and planner"],
      faqs: [
        { q: "How far in advance should we book?", a: "We recommend 4\u20136 months for weddings to ensure availability, though we can sometimes accommodate shorter timelines." },
        { q: "Can you handle dietary restrictions?", a: "Absolutely. We design menus that accommodate gluten-free, dairy-free, vegetarian, and other dietary needs without sacrificing flavor." },
        { q: "Do you provide tastings?", a: "Yes \u2014 every wedding package includes a complimentary tasting session for up to 4 people so you can experience the food before your big day." },
        { q: "What's included in your service?", a: "Full catering with prep, service staff, elegant disposables or china rental options, setup, and cleanup. We handle everything food-related." }
      ],
      pricingModel: "person",
      minRate: 45,
      maxRate: 95,
      unit: "guest"
    },
    {
      id: "corporate",
      slug: "corporate",
      title: "Corporate Events",
      shortTitle: "Corporate",
      icon: "\u{1F3E2}",
      shortDesc: "Impress clients and energize teams with food worth remembering.",
      fullDesc: "From board meetings to company celebrations, we deliver polished catering that elevates your brand. Our menus blend comfort and sophistication \u2014 think passed croquettes at your product launch or a build-your-own bowl bar for your team retreat.",
      process: ["Needs Assessment", "Menu Proposal", "Logistics Planning", "Flawless Delivery"],
      processDetails: [
        "We learn about your event goals, audience, and budget",
        "Receive a tailored menu proposal with pricing and options",
        "We coordinate timing, setup, and any venue requirements",
        "On-time delivery with professional presentation every time"
      ],
      benefits: ["Reliable, on-time delivery", "Scalable from 20 to 500+ guests", "Professional presentation that reflects your brand", "Recurring order options for regular meetings"],
      faqs: [
        { q: "Can you handle recurring weekly orders?", a: "Yes \u2014 we offer corporate accounts with recurring scheduling and simplified ordering for regular meetings or team lunches." },
        { q: "What's your minimum order?", a: "We typically require a minimum of 20 guests for corporate events, though we can work with smaller groups for premium packages." }
      ],
      pricingModel: "person",
      minRate: 25,
      maxRate: 65,
      unit: "guest"
    },
    {
      id: "private",
      slug: "private-events",
      title: "Private Events",
      shortTitle: "Private Events",
      icon: "\u{1F37D}\uFE0F",
      shortDesc: "Dinner parties, milestones, and gatherings made effortless.",
      fullDesc: "Birthday celebrations, anniversary dinners, graduation parties, family reunions \u2014 whatever the occasion, we bring the food and the experience. You focus on your guests; we handle everything from prep to cleanup.",
      process: ["Event Consultation", "Menu Customization", "Preparation & Setup", "Service & Cleanup"],
      processDetails: [
        "Tell us about your event \u2014 the vibe, the guest list, the occasion",
        "We craft a menu that fits your style, from casual buffet to plated dinner",
        "Our team arrives early to set up and ensure everything is perfect",
        "Professional service throughout, with full cleanup when we're done"
      ],
      benefits: ["Fully customizable menus", "Intimate dinner parties to large celebrations", "Setup and cleanup included", "Flexible service styles \u2014 buffet, plated, or family-style"],
      faqs: [
        { q: "What's the minimum guest count?", a: "We can cater intimate gatherings of 10+ guests. Smaller dinner parties are available as a premium package." },
        { q: "Do you bring your own equipment?", a: "Yes \u2014 we bring everything needed including chafing dishes, serving ware, and utensils. China and linen rentals available." }
      ],
      pricingModel: "person",
      minRate: 30,
      maxRate: 75,
      unit: "guest"
    },
    {
      id: "holiday",
      slug: "holiday-parties",
      title: "Holiday Parties",
      shortTitle: "Holiday",
      icon: "\u{1F384}",
      shortDesc: "Seasonal menus that bring warmth and joy to every holiday gathering.",
      fullDesc: "Thanksgiving, Christmas, New Year's, Fourth of July \u2014 our holiday menus celebrate the season with comfort food done right. Our turkey croquettes are a natural holiday centerpiece, and we build festive menus around them.",
      process: ["Season Planning", "Festive Menu Design", "Holiday Prep", "Celebration Service"],
      processDetails: [
        "Book early \u2014 holiday dates fill fast. We plan months ahead.",
        "Seasonal menus with holiday-specific dishes and our signature items",
        "We handle the heavy lifting so your holiday stays stress-free",
        "Warm, attentive service that makes your gathering feel special"
      ],
      benefits: ["Seasonal specialty menus", "Turkey croquettes as the perfect holiday appetizer", "Take the stress out of holiday hosting", "Early booking discounts available"],
      faqs: [
        { q: "How early should I book for holidays?", a: "We recommend booking 2\u20133 months ahead for major holidays. Thanksgiving and Christmas dates fill quickly." },
        { q: "Can you do Thanksgiving dinner catering?", a: "Yes \u2014 it's one of our most popular offerings. Full Thanksgiving spreads with our signature twist on classic dishes." }
      ],
      pricingModel: "person",
      minRate: 35,
      maxRate: 80,
      unit: "guest"
    },
    {
      id: "popups",
      slug: "pop-ups",
      title: "Pop-Up Events",
      shortTitle: "Pop-Ups",
      icon: "\u{1F525}",
      shortDesc: "Street food energy meets premium quality \u2014 find us at markets and festivals.",
      fullDesc: "Our pop-up events are where people discover Act Two for the first time. We show up at farmers markets, food festivals, and community events with fresh-made croquettes and rotating specials. It's our test kitchen meets the street.",
      process: ["Event Selection", "Menu Curation", "On-Site Prep", "Live Service"],
      processDetails: [
        "We choose events that align with our brand and audience",
        "Focused menu \u2014 signature croquettes plus 2\u20133 rotating items",
        "Fresh preparation on-site for maximum flavor and presentation",
        "Fast, friendly service with that food-truck energy"
      ],
      benefits: ["Try before you book us for your event", "Fresh-made on site", "Rotating seasonal specials", "Follow us on social for upcoming dates"],
      faqs: [
        { q: "Where can I find your pop-ups?", a: "We announce locations on our social media. We frequent local farmers markets, food festivals, and community events throughout the Philadelphia and South Jersey area." },
        { q: "Can I hire you for a pop-up at my event?", a: "Absolutely \u2014 private pop-up bookings are available for festivals, block parties, and community events." }
      ],
      pricingModel: "item",
      minRate: 4,
      maxRate: 12,
      unit: "item"
    },
    {
      id: "packaging",
      slug: "retail-packaging",
      title: "Retail & Wholesale",
      shortTitle: "Retail",
      icon: "\u{1F4E6}",
      shortDesc: "Frozen croquettes for shops, restaurants, and your freezer \u2014 coming soon.",
      fullDesc: "The next chapter of Act Two: our signature turkey croquettes packaged for retail. We're developing frozen retail-ready products for specialty food shops, restaurant distribution, and direct-to-consumer sales. Get on the waitlist.",
      process: ["Recipe Refinement", "Production Scaling", "Packaging Design", "Distribution Launch"],
      processDetails: [
        "Perfecting the recipe for consistency at scale",
        "Partnering with certified production facilities",
        "Designing packaging that tells our story on the shelf",
        "Rolling out to specialty shops and direct sales"
      ],
      benefits: ["Our signature recipe, ready when you are", "Premium ingredients, no compromises", "Perfect for restaurants and specialty shops", "Direct-to-consumer shipping planned"],
      faqs: [
        { q: "When will retail products be available?", a: "We're currently in development. Join our waitlist to be first to know when we launch." },
        { q: "Can restaurants order wholesale?", a: "We're building our wholesale program now. Contact us to discuss partnership opportunities." }
      ],
      pricingModel: "unit",
      minRate: 8,
      maxRate: 16,
      unit: "box"
    }
  ];
  const assetPath = (relativePath) => {
    const cleanPath = relativePath.replace(/^\/+/, "");
    const pathname = window.location.pathname || "/";
    const basePath = pathname.endsWith("/") ? pathname : pathname.replace(/[^/]*$/, "");
    return `${basePath}${cleanPath}`;
  };
  const IMAGES = {
    // Hero background images (one per page — dark, moody food/event photography works best)
    hero: {
      home: assetPath("images/hero-home.jpg"),
      // Signature croquettes plated beautifully
      menu: assetPath("images/hero-menu.jpg"),
      // Overhead spread of dishes
      services: assetPath("images/hero-services.jpg"),
      // Elegant event table setting
      events: assetPath("images/hero-events.jpg"),
      // Candid shot from a catered event
      reviews: assetPath("images/hero-reviews.jpg"),
      // Happy guests at a table
      pricing: assetPath("images/hero-pricing.jpg"),
      // Close-up of plated food
      about: assetPath("images/hero-about.jpg"),
      // Family/team in kitchen or at event
      contact: assetPath("images/hero-contact.jpg"),
      // Warm, inviting table setup
      areas: assetPath("images/hero-areas.jpg")
      // Philadelphia/SJ skyline or venue exterior
    },
    // About page photos
    about: {
      family: assetPath("images/about-family.jpg"),
      // Family photo or candid cooking shot
      kitchen: assetPath("images/about-kitchen.jpg"),
      // Kitchen prep / behind the scenes
      team: assetPath("images/about-team.jpg")
      // Team at an event
    },
    // Placeholder fallback (generated gradient when image fails to load)
    placeholder: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect fill='%23F0EBE1' width='600' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Georgia' font-size='18' fill='%23B8B4AC'%3EPhoto Coming Soon%3C/text%3E%3C/svg%3E"
  };
  const MENU_ITEMS = [
    {
      id: "croquettes-classic",
      category: "signature",
      name: "Classic Turkey Croquettes",
      desc: "Our flagship \u2014 crispy golden exterior, creamy seasoned turkey filling. The dish that started it all.",
      tags: ["Signature", "GF Option"],
      featured: true,
      icon: "\u{1F947}",
      img: assetPath("images/menu-croquettes-classic.jpg")
    },
    {
      id: "croquettes-herb",
      category: "signature",
      name: "Garden Herb Croquettes",
      desc: "Fresh rosemary, thyme, and sage folded into our turkey base. A nod to Sunday dinner.",
      tags: ["Signature", "Seasonal"],
      featured: true,
      icon: "\u{1F33F}",
      img: assetPath("images/menu-croquettes-herb.jpg")
    },
    {
      id: "croquettes-spicy",
      category: "signature",
      name: "Smoky Chipotle Croquettes",
      desc: "Slow-smoked chipotle and roasted pepper give these a warm, lingering kick.",
      tags: ["Signature", "Spicy"],
      featured: true,
      icon: "\u{1F336}\uFE0F",
      img: assetPath("images/menu-croquettes-spicy.jpg")
    },
    {
      id: "croquettes-truffle",
      category: "signature",
      name: "Black Truffle Croquettes",
      desc: "Elevated with black truffle and aged parmesan \u2014 our premium offering for special occasions.",
      tags: ["Premium", "Signature"],
      featured: true,
      icon: "\u{1F5A4}",
      img: assetPath("images/menu-croquettes-truffle.jpg")
    },
    {
      id: "mac-cheese",
      category: "sides",
      name: "Three-Cheese Baked Mac",
      desc: "Sharp cheddar, gruy\xE8re, and fontina with a golden breadcrumb crust.",
      tags: ["Comfort Classic", "Vegetarian"],
      featured: false,
      icon: "\u{1F9C0}",
      img: assetPath("images/menu-mac-cheese.jpg")
    },
    {
      id: "collard-greens",
      category: "sides",
      name: "Braised Collard Greens",
      desc: "Slow-cooked with smoked turkey and a touch of apple cider vinegar.",
      tags: ["Southern", "GF"],
      featured: false,
      icon: "\u{1F96C}",
      img: assetPath("images/menu-collard-greens.jpg")
    },
    {
      id: "sweet-potato",
      category: "sides",
      name: "Whipped Sweet Potato",
      desc: "Brown butter, warm spices, and a maple pecan crumble.",
      tags: ["Seasonal", "GF"],
      featured: false,
      icon: "\u{1F360}",
      img: assetPath("images/menu-sweet-potato.jpg")
    },
    {
      id: "cornbread",
      category: "sides",
      name: "Honey Jalape\xF1o Cornbread",
      desc: "Sweet heat in every bite \u2014 baked fresh and served warm.",
      tags: ["House Made"],
      featured: false,
      icon: "\u{1F33D}",
      img: assetPath("images/menu-cornbread.jpg")
    },
    {
      id: "slaw",
      category: "sides",
      name: "Citrus Herb Slaw",
      desc: "Bright, crunchy, and refreshing \u2014 the perfect counterpoint to rich comfort food.",
      tags: ["Fresh", "Vegan", "GF"],
      featured: false,
      icon: "\u{1F957}",
      img: assetPath("images/menu-citrus-slaw.jpg")
    },
    {
      id: "dipping-trio",
      category: "extras",
      name: "Dipping Sauce Trio",
      desc: "House-made cranberry mostarda, garlic aioli, and honey mustard.",
      tags: ["House Made"],
      featured: false,
      icon: "\u{1FAD9}",
      img: assetPath("images/menu-dipping-trio.jpg")
    },
    {
      id: "dessert-bites",
      category: "extras",
      name: "Mini Dessert Bites",
      desc: "Rotating selection \u2014 pecan tarts, lemon bars, and chocolate truffles.",
      tags: ["Dessert", "Seasonal"],
      featured: false,
      icon: "\u{1F36B}",
      img: assetPath("images/menu-dessert-bites.jpg")
    }
  ];
  const EVENTS = [
    {
      id: 1,
      slug: "collingswood-wedding-reception",
      service: "weddings",
      neighborhood: "Collingswood",
      area: "camden",
      eventType: "Intimate Wedding Reception",
      scope: "Full dinner service for 85 guests",
      challenge: "Couple wanted comfort food elevated to wedding-level elegance without losing the homey feel. Venue had limited kitchen access.",
      solution: "Passed croquette appetizers during cocktail hour, followed by a family-style dinner with three sides and a carving station. All prep done off-site with seamless on-location finishing.",
      outcome: "Guests raved about the croquettes \u2014 several booked us for their own events afterward",
      guests: 85,
      items: ["Classic Croquettes", "Herb Croquettes", "Three-Cheese Mac", "Collard Greens"],
      rating: 5,
      featured: true,
      emoji: "\u{1F492}",
      date: "2026-01"
    },
    {
      id: 2,
      slug: "philly-tech-launch",
      service: "corporate",
      neighborhood: "Center City",
      area: "philadelphia",
      eventType: "Tech Company Product Launch",
      scope: "Cocktail reception with passed apps for 200",
      challenge: "Client needed food that felt premium but approachable \u2014 not stuffy. Fast service for a standing reception with high energy.",
      solution: "Three varieties of croquettes passed on elegant boards, plus a dipping station and seasonal small bites. Branded napkins and presentation.",
      outcome: "The food became a talking point \u2014 attendees posted about the croquettes on social media",
      guests: 200,
      items: ["Classic Croquettes", "Chipotle Croquettes", "Truffle Croquettes", "Dipping Trio"],
      rating: 5,
      featured: true,
      emoji: "\u{1F680}",
      date: "2025-11"
    },
    {
      id: 3,
      slug: "haddonfield-holiday-party",
      service: "holiday",
      neighborhood: "Haddonfield",
      area: "camden",
      eventType: "Holiday Dinner Party",
      scope: "Plated dinner for 40 guests",
      challenge: "Host wanted a fully catered holiday dinner that felt homemade, not corporate. Menu needed to work for diverse dietary needs.",
      solution: "Plated four-course dinner anchored by herb croquettes, with GF and vegetarian options at every course. Warm, attentive family-style service.",
      outcome: "Host said it was the best holiday party they'd ever thrown \u2014 already rebooked for next year",
      guests: 40,
      items: ["Herb Croquettes", "Sweet Potato", "Braised Greens", "Mini Dessert Bites"],
      rating: 5,
      featured: true,
      emoji: "\u{1F384}",
      date: "2025-12"
    },
    {
      id: 4,
      slug: "cherry-hill-graduation",
      service: "private",
      neighborhood: "Cherry Hill",
      area: "camden",
      eventType: "Graduation Party",
      scope: "Buffet service for 120 guests",
      challenge: "Large family celebration with guests ranging from kids to grandparents. Needed crowd-pleasing food that could hold up on a buffet.",
      solution: "Buffet-style service with croquettes kept crispy in warming stations, alongside mac & cheese, collard greens, cornbread, and citrus slaw.",
      outcome: "Every dish was cleared \u2014 the croquettes ran out first and guests asked where to order more",
      guests: 120,
      items: ["Classic Croquettes", "Three-Cheese Mac", "Cornbread", "Citrus Slaw"],
      rating: 5,
      featured: true,
      emoji: "\u{1F393}",
      date: "2026-02"
    },
    {
      id: 5,
      slug: "collingswood-farmers-market",
      service: "popups",
      neighborhood: "Collingswood",
      area: "camden",
      eventType: "Farmers Market Pop-Up",
      scope: "Walk-up service, 300+ croquettes sold",
      challenge: "First public pop-up \u2014 needed to make a strong first impression and test demand in the local market.",
      solution: "Simple focused menu: classic and chipotle croquettes with dipping sauces. Fresh-fried on site for maximum crunch and aroma.",
      outcome: "Sold out in 3 hours. Built an email list of 150+ people on day one",
      guests: 300,
      items: ["Classic Croquettes", "Chipotle Croquettes", "Dipping Trio"],
      rating: 5,
      featured: false,
      emoji: "\u{1F3EA}",
      date: "2025-10"
    },
    {
      id: 6,
      slug: "voorhees-corporate-lunch",
      service: "corporate",
      neighborhood: "Voorhees",
      area: "camden",
      eventType: "Corporate Team Lunch",
      scope: "Drop-off catering for 50",
      challenge: "Weekly team lunch program \u2014 needed variety, reliability, and food that people actually get excited about.",
      solution: "Rotating menu of croquette varieties with different sides each week. Delivered hot, set up and ready to serve.",
      outcome: "Became a recurring weekly client \u2014 team morale around lunch measurably improved",
      guests: 50,
      items: ["Rotating Croquettes", "Weekly Sides", "Dipping Sauces"],
      rating: 5,
      featured: false,
      emoji: "\u{1F3E2}",
      date: "2026-01"
    }
  ];
  const REVIEWS = [
    {
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
    },
    {
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
    },
    {
      id: 3,
      author: "Patricia M.",
      neighborhood: "Haddonfield",
      rating: 5,
      service: "holiday",
      date: "2025-12",
      source: "Google",
      verified: true,
      featured: true,
      text: "I've hosted holiday parties for 20 years and this was the first time I actually enjoyed my own party. The food was incredible \u2014 comfort food that felt elevated without being pretentious. Already booked for next year."
    },
    {
      id: 4,
      author: "Angela W.",
      neighborhood: "Cherry Hill",
      rating: 5,
      service: "private",
      date: "2026-02",
      source: "Yelp",
      verified: true,
      featured: true,
      text: "My daughter's graduation party was perfect thanks to Act Two. 120 guests and not a single complaint \u2014 just compliments. The turkey croquettes were gone in 20 minutes flat."
    },
    {
      id: 5,
      author: "Mike R.",
      neighborhood: "Collingswood",
      rating: 5,
      service: "popups",
      date: "2025-10",
      source: "Google",
      verified: true,
      featured: false,
      text: "Stumbled onto their pop-up at the farmers market and immediately booked them for a dinner party. The croquettes are addictive \u2014 crispy outside, creamy inside, perfectly seasoned."
    },
    {
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
    },
    {
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
    },
    {
      id: 8,
      author: "Chris B.",
      neighborhood: "Mount Laurel",
      rating: 5,
      service: "weddings",
      date: "2025-11",
      source: "Google",
      verified: true,
      featured: false,
      text: "From the tasting to the wedding day, Act Two was professional and easy to work with. They nailed the vibe we wanted \u2014 elevated comfort food that felt like us."
    }
  ];
  const SERVICE_AREAS = [
    {
      slug: "camden",
      name: "Camden County",
      fullName: "Camden County, NJ",
      desc: "Our home base. Collingswood, Cherry Hill, Haddonfield, Voorhees \u2014 we know every venue and every neighborhood.",
      neighborhoods: ["Collingswood", "Cherry Hill", "Haddonfield", "Voorhees", "Merchantville", "Audubon", "Oaklyn"],
      topServices: ["weddings", "private", "holiday"],
      featured: true
    },
    {
      slug: "burlington",
      name: "Burlington County",
      fullName: "Burlington County, NJ",
      desc: "Mount Laurel, Moorestown, Medford and beyond. Beautiful venues and wonderful communities.",
      neighborhoods: ["Mount Laurel", "Moorestown", "Medford", "Marlton", "Cinnaminson"],
      topServices: ["weddings", "corporate", "private"],
      featured: true
    },
    {
      slug: "gloucester",
      name: "Gloucester County",
      fullName: "Gloucester County, NJ",
      desc: "Washington Township, Woodbury, Pitman and surrounding communities across Gloucester County.",
      neighborhoods: ["Washington Township", "Woodbury", "Pitman", "Deptford", "Glassboro"],
      topServices: ["private", "holiday", "popups"],
      featured: false
    },
    {
      slug: "philadelphia",
      name: "Philadelphia",
      fullName: "Philadelphia, PA",
      desc: "Crossing the bridge to serve Philly. Center City, South Philly, Fishtown and beyond.",
      neighborhoods: ["Center City", "South Philadelphia", "Fishtown", "Old City", "Northern Liberties", "Rittenhouse Square"],
      topServices: ["corporate", "popups", "weddings"],
      featured: true
    },
    {
      slug: "delaware",
      name: "Delaware County",
      fullName: "Delaware County, PA",
      desc: "Media, Swarthmore, Ridley Park and surrounding communities in Delco.",
      neighborhoods: ["Media", "Swarthmore", "Ridley Park", "Springfield", "Upper Darby"],
      topServices: ["private", "corporate"],
      featured: false
    },
    {
      slug: "montgomery",
      name: "Montgomery County",
      fullName: "Montgomery County, PA",
      desc: "The Main Line and beyond \u2014 Ardmore, Bryn Mawr, King of Prussia.",
      neighborhoods: ["Ardmore", "Bryn Mawr", "King of Prussia", "Conshohocken", "Norristown"],
      topServices: ["weddings", "corporate"],
      featured: false
    }
  ];
  const TRUST_BADGES = [
    { id: 1, label: "Family Recipe", icon: "\u{1F468}\u200D\u{1F373}", detail: "Rooted in tradition" },
    { id: 2, label: "Premium Ingredients", icon: "\u2726", detail: "No compromises" },
    { id: 3, label: "Licensed & Insured", icon: "\u{1F6E1}\uFE0F", detail: "Fully certified" },
    { id: 4, label: "Free Tastings", icon: "\u{1F37D}\uFE0F", detail: "Try before you book" }
  ];
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

/* \u2500\u2500 ANIMATIONS \u2500\u2500 */
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

/* \u2500\u2500 HEADER \u2500\u2500 */
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
  cursor: pointer; white-space: nowrap; display: flex; align-items: baseline; gap: 8px;
}
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

/* \u2500\u2500 MOBILE CTA BAR \u2500\u2500 */
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

/* \u2500\u2500 FOOTER \u2500\u2500 */
.site-footer {
  background: var(--charcoal); color: rgba(255,255,255,0.6); padding: 64px 24px 32px;
  font-size: 14px;
}
.footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
.footer-brand h3 { font-family: var(--font-display); font-size: 24px; color: white; margin-bottom: 12px; font-weight: 700; }
.footer-brand h3 span { color: var(--gold-light); font-style: italic; }
.footer-brand p { line-height: 1.7; margin-bottom: 16px; }
.footer-col h4 { color: var(--gold); font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px; font-weight: 600; }
.footer-col a { display: block; color: rgba(255,255,255,0.5); text-decoration: none; padding: 4px 0; transition: var(--transition); cursor: pointer; }
.footer-col a:hover { color: white; }
.footer-bottom { max-width: 1200px; margin: 40px auto 0; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center; font-size: 12px; opacity: 0.4; }
@media (max-width: 768px) { .footer-inner { grid-template-columns: 1fr; gap: 32px; } }

/* \u2500\u2500 HERO \u2500\u2500 */
.hero {
  background: var(--linen);
  padding: 88px 24px 76px; text-align: center; position: relative; overflow: hidden;
  border-bottom: 1px solid var(--cream-dark);
}
.hero.has-bg-image {
  padding: 120px 24px 100px;
  background: var(--charcoal);
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

/* Split hero (homepage) */
.hero-split {
  text-align: left; padding: 72px 24px 64px;
  background: linear-gradient(160deg, var(--linen) 0%, var(--blush) 50%, var(--cream) 100%);
  border-bottom: none;
}
.hero-split::before { display: none; }
.hero-split::after { display: none; }
.hero-split .hero-inner {
  max-width: 1200px; display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 56px; align-items: center;
}
.hero-split h1 { max-width: 10.5ch; }
.hero-split .hero-ctas { justify-content: flex-start; }
.hero-split .hero-reassurance { justify-content: flex-start; }
.hero-kpi-grid {
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px;
  max-width: 560px; margin-top: 24px;
}
.hero-kpi {
  background: rgba(255,255,255,0.78); border-radius: 18px; padding: 16px 18px;
  border: 1px solid rgba(42,42,42,0.06); box-shadow: var(--shadow-sm);
  backdrop-filter: blur(10px);
}
.hero-kpi-value {
  display: block; font-family: var(--font-display); font-size: 30px; line-height: 1;
  color: var(--charcoal); margin-bottom: 6px;
}
.hero-kpi-label {
  display: block; font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--slate); font-weight: 600;
}
.hero-note {
  font-size: 13px; color: var(--charcoal-light); line-height: 1.7;
  margin-top: 18px; max-width: 560px;
}
.hero-feature-col {
  display: flex; flex-direction: column; gap: 14px;
}
.hero-feature-card {
  background: rgba(255,255,255,0.88); border-radius: 18px; padding: 22px 24px;
  box-shadow: var(--shadow-md); display: flex; align-items: center; gap: 16px;
  border: 1px solid rgba(42,42,42,0.06); transition: var(--transition);
}
.hero-feature-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
.hero-feature-card-icon { font-size: 32px; flex-shrink: 0; }
.hero-feature-card-label {
  font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em;
  color: var(--wine); font-weight: 700; margin-bottom: 5px;
}
.hero-feature-card h4 { font-family: var(--font-display); font-size: 18px; color: var(--charcoal); margin-bottom: 3px; }
.hero-feature-card p { font-size: 12px; color: var(--slate); line-height: 1.5; }
.hfc-accent { font-size: 11px; color: var(--wine); font-weight: 600; margin-top: 4px; display: block; }
@media (max-width: 800px) {
  .hero-split .hero-inner { grid-template-columns: 1fr; gap: 32px; }
  .hero-split { text-align: center; }
  .hero-split .hero-ctas { justify-content: center; }
  .hero-split .hero-reassurance { justify-content: center; }
  .hero-feature-col { max-width: 400px; margin: 0 auto; }
  .hero-kpi-grid, .hero-note { margin-left: auto; margin-right: auto; }
}
@media (max-width: 640px) {
  .hero-kpi-grid { grid-template-columns: 1fr; }
}

/* Decorative divider between sections */
.section-divider {
  height: 1px; max-width: 120px; margin: 0 auto;
  background: linear-gradient(90deg, transparent, var(--wine-pale), var(--gold-pale), var(--wine-pale), transparent);
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
.hero-reassurance {
  display: flex; gap: 28px; justify-content: center; flex-wrap: wrap;
  margin-top: 28px; padding-top: 0; border-top: none;
}
.hero-reassurance span {
  color: var(--slate); font-size: 12px; display: flex; align-items: center; gap: 6px; font-weight: 500;
  background: rgba(255,255,255,0.78); border: 1px solid rgba(42,42,42,0.06);
  padding: 10px 14px; border-radius: 999px;
}
.hero-reassurance span::before { content: '\u2713'; color: var(--sage); font-weight: 700; }
.hero.has-bg-image .hero-reassurance span {
  background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.14);
  color: rgba(251,248,243,0.78);
}
.hero.has-bg-image .hero-reassurance span::before { color: var(--gold-light); }

/* \u2500\u2500 SECTIONS \u2500\u2500 */
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

/* \u2500\u2500 TRUST BAR \u2500\u2500 */
.trust-bar {
  max-width: 1200px; margin: -16px auto 0; padding: 0 24px 24px;
  display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px;
  position: relative; z-index: 2;
}
.trust-badge {
  display: flex; align-items: center; gap: 14px; font-size: 13px; font-weight: 600; color: var(--charcoal);
  padding: 18px 20px; border-radius: 18px; background: rgba(255,255,255,0.88);
  border: 1px solid rgba(42,42,42,0.06); box-shadow: var(--shadow-sm);
}
.trust-badge-icon { font-size: 24px; }
.trust-badge-text strong { display: block; }
.trust-badge-text span { display: block; font-size: 11px; color: var(--slate); font-weight: 400; margin-top: 2px; }
@media (max-width: 900px) { .trust-bar { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 560px) { .trust-bar { grid-template-columns: 1fr; } }

/* \u2500\u2500 CARDS \u2500\u2500 */
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

/* \u2500\u2500 SERVICE GRID \u2500\u2500 */
.service-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 20px; }
.service-card { display: block; cursor: pointer; text-decoration: none; color: inherit; height: 100%; }
.service-card .card-body { padding: 30px 28px 26px; display: flex; flex-direction: column; height: 100%; }
.service-card-kicker {
  font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em;
  color: var(--wine); font-weight: 700; margin-bottom: 16px;
}
.service-card-head {
  display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 12px;
}
.service-card-head .card-title { margin-bottom: 0; }
.service-card-price {
  flex-shrink: 0; font-size: 10.5px; font-weight: 700; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--wine-deep); background: var(--parchment);
  border: 1px solid rgba(139,58,68,0.08); border-radius: 999px; padding: 6px 10px;
}
.service-card-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.service-card-meta span {
  font-size: 10.5px; letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--slate); background: rgba(42,42,42,0.03); border-radius: 999px; padding: 6px 9px;
}
.service-card-footer {
  margin-top: auto; padding-top: 18px; display: flex; align-items: center; justify-content: space-between;
  color: var(--wine); font-size: 13px; font-weight: 700;
}

/* \u2500\u2500 MENU GRID \u2500\u2500 */
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

/* \u2500\u2500 ABOUT PAGE PHOTOS \u2500\u2500 */
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

/* \u2500\u2500 EVENT CARDS \u2500\u2500 */
.event-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
.event-card { display: block; cursor: pointer; border-top: 3px solid var(--wine); text-decoration: none; color: inherit; }
.event-header {
  background: linear-gradient(135deg, var(--blush) 0%, var(--wine-pale) 100%);
  padding: 24px 28px; color: var(--charcoal); display: flex; align-items: flex-start; gap: 16px;
  border-bottom: 1px solid rgba(139,58,68,0.08);
}
.event-emoji { font-size: 36px; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; background: white; border-radius: var(--radius); box-shadow: var(--shadow-sm); flex-shrink: 0; }
.event-header-copy { flex: 1; min-width: 0; }
.event-card-topline { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
.event-card-pill {
  font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--wine-deep); background: rgba(255,255,255,0.72); padding: 5px 8px;
  border-radius: 999px; border: 1px solid rgba(139,58,68,0.10);
}
.event-header h3 { font-family: var(--font-display); font-size: 17px; font-weight: 600; margin-bottom: 2px; color: var(--charcoal); }
.event-header p { font-size: 12px; color: var(--slate); }
.event-card .card-body { padding: 24px 26px; }
.event-scope { font-size: 13px; color: var(--charcoal); font-weight: 600; }
.event-outcome { font-size: 13px; color: var(--slate); line-height: 1.7; margin-top: 12px; }
.event-card .card-body p { font-size: 13px; color: var(--slate); }
.event-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; }
.event-tag { font-size: 10px; padding: 3px 8px; border-radius: 4px; background: var(--wine-pale); color: var(--wine-deep); font-weight: 600; letter-spacing: 0.02em; }

/* \u2500\u2500 REVIEW CARDS \u2500\u2500 */
.review-card { padding: 28px; border-top: 3px solid var(--gold-pale); }
.review-card:hover { border-top-color: var(--gold); }
.review-topline { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
.review-stars { color: var(--gold); font-size: 14px; letter-spacing: 2px; margin-bottom: 14px; }
.review-text { font-size: 14px; line-height: 1.8; color: var(--charcoal); margin-bottom: 18px; font-style: italic; position: relative; padding-left: 16px; border-left: 2px solid var(--wine-pale); }
.review-meta { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; font-size: 13px; }
.review-author { font-weight: 700; color: var(--charcoal); font-size: 14px; }
.review-detail { color: var(--slate); font-size: 12px; }
.review-service {
  display: block; margin-top: 6px; font-size: 10.5px; text-transform: uppercase;
  letter-spacing: 0.12em; color: var(--wine); font-weight: 700;
}
.review-source,
.review-verified,
.review-date {
  font-size: 10px; padding: 4px 8px; border-radius: 999px; font-weight: 700; letter-spacing: 0.02em;
}
.review-source { background: var(--wine-pale); color: var(--wine-deep); }
.review-verified, .review-date { background: rgba(42,42,42,0.05); color: var(--slate); }

/* \u2500\u2500 FILTER CHIPS \u2500\u2500 */
.filter-bar { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
.filter-chip {
  padding: 7px 16px; border-radius: 20px; font-size: 13px; font-weight: 500;
  border: 1px solid var(--mist); background: white; color: var(--slate); cursor: pointer;
  transition: var(--transition); font-family: var(--font-body);
}
.filter-chip:hover { border-color: var(--wine); color: var(--wine); }
.filter-chip.active { background: var(--wine); color: white; border-color: var(--wine); }

/* \u2500\u2500 PROCESS STEPS \u2500\u2500 */
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

/* \u2500\u2500 FAQ \u2500\u2500 */
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

/* \u2500\u2500 QUOTE FORM \u2500\u2500 */
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

/* \u2500\u2500 INLINE CTA \u2500\u2500 */
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

/* \u2500\u2500 STATS \u2500\u2500 */
.stats-strip { display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; padding: 24px 0; margin-bottom: 32px; }
.stat-item { text-align: center; }
.stat-num { font-family: var(--font-display); font-size: 38px; font-weight: 700; color: var(--wine); }
.stat-label { font-size: 12px; color: var(--slate); text-transform: uppercase; letter-spacing: 0.06em; }

/* \u2500\u2500 BUDGET / PRICING \u2500\u2500 */
.budget-calc { background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); padding: 32px; border: 1px solid var(--cream-dark); }
.budget-result {
  background: var(--parchment);
  border-radius: var(--radius); padding: 28px; color: var(--charcoal); margin-top: 24px; text-align: center;
  border: 1px solid var(--cream-dark);
}
.budget-range { font-family: var(--font-display); font-size: 38px; font-weight: 700; color: var(--wine); }
.budget-note { font-size: 12px; color: var(--slate); margin-top: 10px; }

/* \u2500\u2500 PROJECT DETAIL \u2500\u2500 */
.project-detail { max-width: 900px; margin: 0 auto; }
.project-facts { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; margin: 24px 0; }
.project-fact { padding: 16px; border-radius: var(--radius); background: var(--parchment); font-size: 13px; border: 1px solid var(--cream-dark); }
.project-fact strong { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--wine); margin-bottom: 4px; }
.project-narrative { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin: 32px 0; }
@media (max-width: 700px) { .project-narrative { grid-template-columns: 1fr; } }
.narrative-panel { padding: 24px; border-radius: var(--radius); background: white; box-shadow: var(--shadow-sm); border: 1px solid var(--cream-dark); }
.narrative-panel h4 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--wine); margin-bottom: 8px; font-weight: 600; }
.narrative-panel p { font-size: 14px; line-height: 1.65; color: var(--charcoal); }

/* \u2500\u2500 BREADCRUMB \u2500\u2500 */
.breadcrumb { font-size: 13px; color: var(--slate); margin-bottom: 8px; }
.breadcrumb a { color: var(--wine); text-decoration: none; cursor: pointer; }
.breadcrumb a:hover { text-decoration: underline; }

/* \u2500\u2500 SIGNATURE BANNER \u2500\u2500 */
.signature-banner {
  background: white; border: 1px solid rgba(0,0,0,0.06); border-radius: var(--radius-lg);
  padding: 40px; display: flex; align-items: center; gap: 32px; margin: 40px 0;
  box-shadow: var(--shadow-sm);
}
.signature-banner-emoji { font-size: 56px; flex-shrink: 0; }
.signature-banner h3 { font-family: var(--font-display); font-size: 24px; color: var(--charcoal); margin-bottom: 8px; }
.signature-banner p { font-size: 14px; color: var(--slate); line-height: 1.7; }
@media (max-width: 600px) { .signature-banner { flex-direction: column; text-align: center; } }

/* \u2500\u2500 SIGNATURE FEATURE (editorial spotlight) \u2500\u2500 */
.sig-feature {
  background: white; border-radius: var(--radius-lg); overflow: hidden;
  box-shadow: var(--shadow-lg); border: 1px solid rgba(0,0,0,0.04);
  display: grid; grid-template-columns: 1fr 1fr; min-height: 360px;
  margin-bottom: 48px;
}
.sig-feature-img {
  background: linear-gradient(135deg, var(--wine-pale) 0%, var(--blush) 50%, var(--cream-dark) 100%);
  display: flex; align-items: center; justify-content: center;
  font-size: 80px; position: relative; overflow: hidden;
}
.sig-feature-img::after {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 30% 70%, var(--wine-glow), transparent 60%);
}
.sig-feature-body {
  padding: 48px 44px; display: flex; flex-direction: column; justify-content: center;
}
.sig-feature-body h2 {
  font-family: var(--font-display); font-size: 30px; font-weight: 700;
  color: var(--charcoal); line-height: 1.15; margin-bottom: 16px;
}
.sig-feature-body h2 em { font-style: italic; color: var(--wine); }
.sig-feature-body > p { font-size: 15px; color: var(--slate); line-height: 1.75; margin-bottom: 20px; }
.sig-varieties { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
.sig-variety { padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; background: var(--wine-pale); color: var(--wine-deep); }
@media (max-width: 700px) {
  .sig-feature { grid-template-columns: 1fr; }
  .sig-feature-img { min-height: 200px; }
  .sig-feature-body { padding: 32px 28px; }
}

/* \u2500\u2500 STORY SECTION (editorial split) \u2500\u2500 */
.story-section {
  background: var(--blush); padding: 80px 24px; position: relative; overflow: hidden;
}
.story-section::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--wine-pale), var(--gold-pale), var(--wine-pale), transparent);
}
.story-section::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--wine-pale), var(--gold-pale), var(--wine-pale), transparent);
}
.story-inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1.2fr; gap: 56px; align-items: center;
}
.story-pull-quote {
  font-family: var(--font-display); font-size: clamp(26px, 3.5vw, 38px);
  font-weight: 600; color: var(--charcoal); line-height: 1.25;
  font-style: italic; position: relative; padding-left: 24px;
  border-left: 3px solid var(--wine);
}
.story-pull-quote em { color: var(--wine); }
.story-text p { font-size: 15px; color: var(--slate); line-height: 1.85; margin-bottom: 16px; }
.story-text p:last-of-type { margin-bottom: 0; }
@media (max-width: 768px) {
  .story-inner { grid-template-columns: 1fr; gap: 32px; }
  .story-pull-quote { font-size: 24px; }
}

/* \u2500\u2500 SECTION DIVIDER \u2500\u2500 */
.section-divider {
  height: 1px; max-width: 120px; margin: 0 auto;
  background: linear-gradient(90deg, transparent, var(--wine-pale), var(--gold-pale), var(--wine-pale), transparent);
}

/* \u2500\u2500 MISC \u2500\u2500 */
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
`;
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
  function routeHref(path) {
    return `#${path === "/" ? "/" : path}`;
  }
  function parseRoute(hash) {
    const path = hash.replace("#", "") || "/";
    const parts = path.split("/").filter(Boolean);
    return { path, parts };
  }
  function getService(slug) {
    return SERVICES.find((s) => s.slug === slug);
  }
  function getEvent(slug) {
    return EVENTS.find((p) => p.slug === slug);
  }
  function getArea(slug) {
    return SERVICE_AREAS.find((a) => a.slug === slug);
  }
  function eventsForService(serviceId) {
    return EVENTS.filter((p) => p.service === serviceId);
  }
  function eventsForArea(areaSlug) {
    return EVENTS.filter((p) => p.area === areaSlug);
  }
  function reviewsForService(serviceId) {
    return REVIEWS.filter((r) => r.service === serviceId);
  }
  function TrustBar() {
    return /* @__PURE__ */ React.createElement("div", { className: "trust-bar" }, TRUST_BADGES.map((b) => /* @__PURE__ */ React.createElement("div", { key: b.id, className: "trust-badge" }, /* @__PURE__ */ React.createElement("span", { className: "trust-badge-icon" }, b.icon), /* @__PURE__ */ React.createElement("div", { className: "trust-badge-text" }, /* @__PURE__ */ React.createElement("strong", null, b.label), /* @__PURE__ */ React.createElement("span", null, b.detail)))));
  }
  function ImgWithFallback({ src, alt, className, fallback, style }) {
    const [failed, setFailed] = useState(false);
    if (failed || !src) return fallback || null;
    return /* @__PURE__ */ React.createElement("img", { src, alt: alt || "", className, style, onError: () => setFailed(true), loading: "lazy" });
  }
  function HashLink({ to, className, children, onClick, ...props }) {
    const handleClick = (e) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      e.preventDefault();
      navigate(to);
    };
    return /* @__PURE__ */ React.createElement("a", { href: routeHref(to), className, onClick: handleClick, ...props }, children);
  }
  function formatMonthYear(value) {
    if (!value) return "";
    const date = /* @__PURE__ */ new Date(`${value}-01T12:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  }
  function SectionHeading({ label, title, subtitle }) {
    return /* @__PURE__ */ React.createElement("div", { className: "section-heading" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, label), /* @__PURE__ */ React.createElement("h2", { className: "section-title" }, title)), subtitle ? /* @__PURE__ */ React.createElement("p", { className: "section-subtitle section-heading-copy" }, subtitle) : null);
  }
  function HeroSection({ badge, title, subtitle, primaryCta, secondaryCta, tertiaryLabel, tertiaryRoute, showReassurance = true, heroImg }) {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgFailed, setImgFailed] = useState(false);
    const hasImg = heroImg && !imgFailed;
    return /* @__PURE__ */ React.createElement("section", { className: `hero ${hasImg ? "has-bg-image" : ""}` }, hasImg && /* @__PURE__ */ React.createElement("div", { className: "hero-bg-image" }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: heroImg,
        alt: "",
        onLoad: () => setImgLoaded(true),
        onError: () => setImgFailed(true),
        style: { opacity: imgLoaded ? 0.35 : 0 }
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "hero-inner" }, badge && /* @__PURE__ */ React.createElement("div", { className: "hero-badge" }, badge), /* @__PURE__ */ React.createElement("h1", { dangerouslySetInnerHTML: { __html: title } }), subtitle && /* @__PURE__ */ React.createElement("p", null, subtitle), /* @__PURE__ */ React.createElement("div", { className: "hero-ctas" }, primaryCta && /* @__PURE__ */ React.createElement("button", { className: "btn-primary", onClick: () => navigate("/contact") }, primaryCta), secondaryCta && /* @__PURE__ */ React.createElement("a", { href: BIZ.phoneTel, className: "btn-secondary" }, secondaryCta)), tertiaryLabel && /* @__PURE__ */ React.createElement("button", { className: "hero-tertiary", onClick: () => navigate(tertiaryRoute) }, tertiaryLabel), showReassurance && /* @__PURE__ */ React.createElement("div", { className: "hero-reassurance" }, /* @__PURE__ */ React.createElement("span", null, "Licensed & Insured"), /* @__PURE__ */ React.createElement("span", null, "Free Tastings Available"), /* @__PURE__ */ React.createElement("span", null, "Custom Menus for Every Event"))));
  }
  function InlineCTA({ title = "Ready to Taste the Difference?", text = "Book a free tasting and let's plan your event.", cta = "Book a Tasting" }) {
    return /* @__PURE__ */ React.createElement("div", { className: "inline-cta" }, /* @__PURE__ */ React.createElement("h3", null, title), /* @__PURE__ */ React.createElement("p", null, text), /* @__PURE__ */ React.createElement("button", { className: "btn-primary", onClick: () => navigate("/contact"), style: { position: "relative" } }, cta));
  }
  function FAQAccordion({ faqs }) {
    const [openId, setOpenId] = useState(null);
    return /* @__PURE__ */ React.createElement("div", null, faqs.map((f, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "faq-item" }, /* @__PURE__ */ React.createElement("button", { className: "faq-q", onClick: () => setOpenId(openId === i ? null : i), "aria-expanded": openId === i }, f.q, /* @__PURE__ */ React.createElement("span", { className: `faq-arrow ${openId === i ? "open" : ""}` }, "\u25BE")), openId === i && /* @__PURE__ */ React.createElement("div", { className: "faq-a" }, f.a))));
  }
  function ProcessSteps({ steps, details }) {
    return /* @__PURE__ */ React.createElement("div", { className: "process-steps" }, steps.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "process-step" }, /* @__PURE__ */ React.createElement("div", { className: "step-num" }, i + 1), /* @__PURE__ */ React.createElement("div", { className: "step-content" }, /* @__PURE__ */ React.createElement("h4", null, s), details && details[i] && /* @__PURE__ */ React.createElement("p", null, details[i])))));
  }
  function FilterChips({ options, active, onChange, allLabel = "All" }) {
    return /* @__PURE__ */ React.createElement("div", { className: "filter-bar", role: "group", "aria-label": "Filter options" }, /* @__PURE__ */ React.createElement("button", { className: `filter-chip ${active === "all" ? "active" : ""}`, onClick: () => onChange("all") }, allLabel), options.map((o) => /* @__PURE__ */ React.createElement("button", { key: o.value, className: `filter-chip ${active === o.value ? "active" : ""}`, onClick: () => onChange(o.value) }, o.label)));
  }
  function ReviewCard({ review }) {
    const service = SERVICES.find((s) => s.id === review.service);
    return /* @__PURE__ */ React.createElement("div", { className: "card review-card" }, /* @__PURE__ */ React.createElement("div", { className: "review-topline" }, /* @__PURE__ */ React.createElement("span", { className: "review-source" }, review.source), review.verified ? /* @__PURE__ */ React.createElement("span", { className: "review-verified" }, "Verified client") : null, /* @__PURE__ */ React.createElement("span", { className: "review-date" }, formatMonthYear(review.date))), /* @__PURE__ */ React.createElement("div", { className: "review-stars" }, "\u2605".repeat(review.rating), "\u2606".repeat(5 - review.rating)), /* @__PURE__ */ React.createElement("p", { className: "review-text" }, '"', review.text, '"'), /* @__PURE__ */ React.createElement("div", { className: "review-meta" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "review-author" }, review.author), /* @__PURE__ */ React.createElement("span", { className: "review-detail" }, " \xB7 ", review.neighborhood), service ? /* @__PURE__ */ React.createElement("span", { className: "review-service" }, service.shortTitle) : null), /* @__PURE__ */ React.createElement("span", { className: "review-detail" }, review.rating, ".0 / 5.0")));
  }
  function ServiceCard({ service }) {
    const rateLabel = `$${service.minRate}\u2013$${service.maxRate}/${service.unit}`;
    const pricingNote = service.pricingModel === "person" ? "Guest-count pricing" : "Flexible quantity pricing";
    return /* @__PURE__ */ React.createElement(HashLink, { to: `/services/${service.slug}`, className: "card service-card", "aria-label": `View ${service.title}` }, /* @__PURE__ */ React.createElement("div", { className: "card-body" }, /* @__PURE__ */ React.createElement("div", { className: "service-card-kicker" }, service.title), /* @__PURE__ */ React.createElement("div", { className: "card-icon" }, service.icon), /* @__PURE__ */ React.createElement("div", { className: "service-card-head" }, /* @__PURE__ */ React.createElement("h3", { className: "card-title" }, service.shortTitle), /* @__PURE__ */ React.createElement("span", { className: "service-card-price" }, rateLabel)), /* @__PURE__ */ React.createElement("p", { className: "card-text" }, service.shortDesc), /* @__PURE__ */ React.createElement("div", { className: "service-card-meta" }, /* @__PURE__ */ React.createElement("span", null, service.process[0]), /* @__PURE__ */ React.createElement("span", null, pricingNote)), /* @__PURE__ */ React.createElement("div", { className: "service-card-footer" }, /* @__PURE__ */ React.createElement("span", null, "See service details"), /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true" }, "\u2192"))));
  }
  function EventCard({ event }) {
    const service = SERVICES.find((s) => s.id === event.service);
    return /* @__PURE__ */ React.createElement(HashLink, { to: `/events/${event.slug}`, className: "card event-card", "aria-label": `View event: ${event.neighborhood}` }, /* @__PURE__ */ React.createElement("div", { className: "event-header" }, /* @__PURE__ */ React.createElement("span", { className: "event-emoji" }, event.emoji), /* @__PURE__ */ React.createElement("div", { className: "event-header-copy" }, /* @__PURE__ */ React.createElement("div", { className: "event-card-topline" }, /* @__PURE__ */ React.createElement("span", { className: "event-card-pill" }, formatMonthYear(event.date)), service ? /* @__PURE__ */ React.createElement("span", { className: "event-card-pill" }, service.shortTitle) : null), /* @__PURE__ */ React.createElement("h3", null, event.neighborhood), /* @__PURE__ */ React.createElement("p", null, event.eventType))), /* @__PURE__ */ React.createElement("div", { className: "card-body" }, /* @__PURE__ */ React.createElement("p", { className: "event-scope" }, event.scope), /* @__PURE__ */ React.createElement("p", { className: "event-outcome" }, event.outcome), /* @__PURE__ */ React.createElement("div", { className: "event-tags" }, /* @__PURE__ */ React.createElement("span", { className: "event-tag" }, event.guests, " guests"), event.items.slice(0, 2).map((m) => /* @__PURE__ */ React.createElement("span", { key: m, className: "event-tag" }, m)))));
  }
  function MenuItemCard({ item }) {
    const [imgFailed, setImgFailed] = useState(false);
    return /* @__PURE__ */ React.createElement("div", { className: `card menu-card ${item.category === "signature" ? "signature" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "menu-card-img-wrap" }, item.img && !imgFailed ? /* @__PURE__ */ React.createElement(
      "img",
      {
        src: item.img,
        alt: item.name,
        className: "menu-card-img",
        onError: () => setImgFailed(true),
        loading: "lazy"
      }
    ) : /* @__PURE__ */ React.createElement("div", { className: "menu-card-fallback" }, item.icon)), /* @__PURE__ */ React.createElement("div", { className: "card-body" }, /* @__PURE__ */ React.createElement("h4", null, /* @__PURE__ */ React.createElement("span", null, item.icon), " ", item.name), /* @__PURE__ */ React.createElement("p", null, item.desc), /* @__PURE__ */ React.createElement("div", { className: "menu-tags" }, item.tags.map((t) => /* @__PURE__ */ React.createElement("span", { key: t, className: "menu-tag" }, t)))));
  }
  function QuoteForm({ preselectedService }) {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
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
    const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));
    if (submitted) return /* @__PURE__ */ React.createElement("div", { className: "quote-form-container" }, /* @__PURE__ */ React.createElement("div", { className: "form-success" }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48 } }, "\u{1F389}"), /* @__PURE__ */ React.createElement("h3", null, "Request Received!"), /* @__PURE__ */ React.createElement("p", null, "We'll reach out within 24 hours to discuss your event."), /* @__PURE__ */ React.createElement("p", { style: { marginTop: 12 } }, "Or call us now: ", /* @__PURE__ */ React.createElement("a", { href: BIZ.phoneTel, style: { color: "var(--wine)", fontWeight: 600 } }, BIZ.phone))));
    return /* @__PURE__ */ React.createElement("div", { className: "quote-form-container" }, /* @__PURE__ */ React.createElement("div", { className: "form-progress" }, /* @__PURE__ */ React.createElement("div", { className: "form-progress-fill", style: { width: `${step / totalSteps * 100}%` } })), /* @__PURE__ */ React.createElement("div", { className: "form-step-header" }, /* @__PURE__ */ React.createElement("div", { className: "form-step-label" }, "Step ", step, " of ", totalSteps), /* @__PURE__ */ React.createElement("div", { className: "form-step-title" }, step === 1 ? "Your Event" : step === 2 ? "Contact Details" : "Event Details")), /* @__PURE__ */ React.createElement("div", { className: "form-body" }, step === 1 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "form-field" }, /* @__PURE__ */ React.createElement("label", { className: "form-label", htmlFor: "qf-service" }, "Event Type"), /* @__PURE__ */ React.createElement("select", { id: "qf-service", className: "form-select", value: form.service, onChange: (e) => set("service", e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Select an event type\u2026"), SERVICES.filter((s) => s.id !== "packaging").map((s) => /* @__PURE__ */ React.createElement("option", { key: s.id, value: s.id }, s.title)))), /* @__PURE__ */ React.createElement("div", { className: "form-row" }, /* @__PURE__ */ React.createElement("div", { className: "form-field" }, /* @__PURE__ */ React.createElement("label", { className: "form-label", htmlFor: "qf-guests" }, "Estimated Guest Count"), /* @__PURE__ */ React.createElement("input", { id: "qf-guests", className: "form-input", type: "number", inputMode: "numeric", placeholder: "e.g. 75", value: form.guests, onChange: (e) => set("guests", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "form-field" }, /* @__PURE__ */ React.createElement("label", { className: "form-label", htmlFor: "qf-date" }, "Event Date"), /* @__PURE__ */ React.createElement("input", { id: "qf-date", className: "form-input", type: "date", value: form.eventDate, onChange: (e) => set("eventDate", e.target.value) }))), /* @__PURE__ */ React.createElement("div", { className: "form-field" }, /* @__PURE__ */ React.createElement("label", { className: "form-label", htmlFor: "qf-location" }, "Event Location / City"), /* @__PURE__ */ React.createElement("input", { id: "qf-location", className: "form-input", placeholder: "e.g. Collingswood, NJ", value: form.location, onChange: (e) => set("location", e.target.value) }))), step === 2 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "form-field" }, /* @__PURE__ */ React.createElement("label", { className: "form-label", htmlFor: "qf-name" }, "Full Name *"), /* @__PURE__ */ React.createElement("input", { id: "qf-name", className: "form-input", value: form.name, onChange: (e) => set("name", e.target.value), required: true })), /* @__PURE__ */ React.createElement("div", { className: "form-row" }, /* @__PURE__ */ React.createElement("div", { className: "form-field" }, /* @__PURE__ */ React.createElement("label", { className: "form-label", htmlFor: "qf-phone" }, "Phone *"), /* @__PURE__ */ React.createElement("input", { id: "qf-phone", className: "form-input", type: "tel", inputMode: "tel", value: form.phone, onChange: (e) => set("phone", e.target.value), required: true })), /* @__PURE__ */ React.createElement("div", { className: "form-field" }, /* @__PURE__ */ React.createElement("label", { className: "form-label", htmlFor: "qf-email" }, "Email *"), /* @__PURE__ */ React.createElement("input", { id: "qf-email", className: "form-input", type: "email", inputMode: "email", value: form.email, onChange: (e) => set("email", e.target.value), required: true })))), step === 3 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "form-field" }, /* @__PURE__ */ React.createElement("label", { className: "form-label", htmlFor: "qf-details" }, "Tell us about your event"), /* @__PURE__ */ React.createElement("textarea", { id: "qf-details", className: "form-textarea", style: { minHeight: 120 }, placeholder: "What's the occasion? Any dietary needs? Vision for the food? The more you share, the better we can plan\u2026", value: form.details, onChange: (e) => set("details", e.target.value) }))), /* @__PURE__ */ React.createElement("div", { className: "form-actions" }, step > 1 && /* @__PURE__ */ React.createElement("button", { className: "form-btn-back", onClick: () => setStep((s) => s - 1) }, "\u2190 Back"), step < totalSteps && /* @__PURE__ */ React.createElement("button", { className: "form-btn-next", onClick: () => setStep((s) => s + 1) }, "Continue \u2192"), step === totalSteps && /* @__PURE__ */ React.createElement("button", { className: "form-btn-next", onClick: () => setSubmitted(true) }, "Submit Request"))));
  }
  function BudgetEstimator() {
    const [service, setService] = useState("weddings");
    const [guests, setGuests] = useState(75);
    const svc = SERVICES.find((s) => s.id === service);
    let low = 0, high = 0;
    if (svc && svc.pricingModel === "person") {
      low = svc.minRate * guests;
      high = svc.maxRate * guests;
    } else if (svc && svc.pricingModel === "item") {
      low = svc.minRate * guests;
      high = svc.maxRate * guests;
    }
    return /* @__PURE__ */ React.createElement("div", { className: "budget-calc" }, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "Budget Estimator"), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontSize: 28, color: "var(--charcoal)", marginBottom: 20 } }, "Estimate Your Event"), /* @__PURE__ */ React.createElement("div", { className: "form-row" }, /* @__PURE__ */ React.createElement("div", { className: "form-field" }, /* @__PURE__ */ React.createElement("label", { className: "form-label", htmlFor: "be-service" }, "Event Type"), /* @__PURE__ */ React.createElement("select", { id: "be-service", className: "form-select", value: service, onChange: (e) => setService(e.target.value) }, SERVICES.filter((s) => s.id !== "packaging").map((s) => /* @__PURE__ */ React.createElement("option", { key: s.id, value: s.id }, s.title)))), /* @__PURE__ */ React.createElement("div", { className: "form-field" }, /* @__PURE__ */ React.createElement("label", { className: "form-label", htmlFor: "be-guests" }, svc?.pricingModel === "item" ? "Estimated Items" : "Guest Count"), /* @__PURE__ */ React.createElement("input", { id: "be-guests", className: "form-input", type: "number", inputMode: "numeric", value: guests, onChange: (e) => setGuests(Number(e.target.value) || 0) }))), low > 0 && /* @__PURE__ */ React.createElement("div", { className: "budget-result" }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 } }, "Estimated Range"), /* @__PURE__ */ React.createElement("div", { className: "budget-range" }, "$", low.toLocaleString(), " \u2013 $", high.toLocaleString()), /* @__PURE__ */ React.createElement("div", { className: "budget-note" }, "*Estimates vary by menu selection and service style. Final pricing follows a tasting consultation.")));
  }
  function HomePage() {
    const featuredEvents = EVENTS.filter((p) => p.featured).slice(0, 4);
    const featuredReviews = REVIEWS.filter((r) => r.featured).slice(0, 3);
    const signatureItems = MENU_ITEMS.filter((m) => m.category === "signature");
    const menuById = new Map(MENU_ITEMS.map((item) => [item.id, item]));
    const homeMenuItems = [
      "croquettes-classic",
      "croquettes-truffle",
      "mac-cheese",
      "collard-greens",
      "cornbread",
      "dessert-bites"
    ].map((id) => menuById.get(id)).filter(Boolean);
    const heroStats = [
      { value: `${signatureItems.length}`, label: "signature styles" },
      { value: `${SERVICE_AREAS.length}`, label: "service zones" },
      { value: `${Math.max(...EVENTS.map((event) => event.guests))}+`, label: "largest proof point" }
    ];
    const heroFeatures = [
      {
        icon: "\u{1F947}",
        label: "Signature Program",
        title: "Croquettes that set the tone",
        text: "Classic, herb, chipotle, and truffle variations built from one family recipe.",
        accent: "Our most requested first bite"
      },
      {
        icon: "\u{1F5FA}\uFE0F",
        label: "Service Footprint",
        title: "South Jersey to Center City",
        text: "Serving six surrounding regions with the same polished setup, service, and cleanup."
      },
      {
        icon: "\u{1F570}\uFE0F",
        label: "Host Experience",
        title: "Tasting first. Logistics handled.",
        text: "Menus are tuned to the room, dietary needs, timing, and how you actually want the event to feel."
      }
    ];
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("section", { className: "hero hero-split" }, /* @__PURE__ */ React.createElement("div", { className: "hero-inner" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "hero-badge anim" }, "Premium Comfort Catering \xB7 South Jersey & Philadelphia"), /* @__PURE__ */ React.createElement("h1", { className: "anim anim-d1" }, "Where Family Recipes Become ", /* @__PURE__ */ React.createElement("em", null, "Unforgettable Events")), /* @__PURE__ */ React.createElement("p", { className: "anim anim-d2", style: { color: "var(--slate)", fontSize: 17, lineHeight: 1.75, marginBottom: 32, maxWidth: 520 } }, "Our signature turkey croquettes and elevated comfort food become the centerpiece of your next celebration. From intimate dinners to grand receptions."), /* @__PURE__ */ React.createElement("div", { className: "hero-ctas anim anim-d3" }, /* @__PURE__ */ React.createElement("button", { className: "btn-primary", onClick: () => navigate("/contact") }, "Book a Tasting"), /* @__PURE__ */ React.createElement("a", { href: BIZ.phoneTel, className: "btn-secondary" }, "Call ", BIZ.phone)), /* @__PURE__ */ React.createElement("div", { className: "hero-kpi-grid anim anim-d4" }, heroStats.map((stat) => /* @__PURE__ */ React.createElement("div", { key: stat.label, className: "hero-kpi" }, /* @__PURE__ */ React.createElement("span", { className: "hero-kpi-value" }, stat.value), /* @__PURE__ */ React.createElement("span", { className: "hero-kpi-label" }, stat.label)))), /* @__PURE__ */ React.createElement("p", { className: "hero-note anim anim-d5" }, "Family-led comfort catering for wedding receptions, office launches, holiday tables, and milestone dinners."), /* @__PURE__ */ React.createElement("div", { className: "hero-reassurance anim anim-d5" }, /* @__PURE__ */ React.createElement("span", null, "Licensed & Insured"), /* @__PURE__ */ React.createElement("span", null, "Free Tastings"), /* @__PURE__ */ React.createElement("span", null, "Menus tuned to the room"))), /* @__PURE__ */ React.createElement("div", { className: "hero-feature-col anim anim-d3 anim-scale" }, heroFeatures.map((feature) => /* @__PURE__ */ React.createElement("div", { key: feature.label, className: "hero-feature-card" }, /* @__PURE__ */ React.createElement("span", { className: "hero-feature-card-icon" }, feature.icon), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "hero-feature-card-label" }, feature.label), /* @__PURE__ */ React.createElement("h4", null, feature.title), /* @__PURE__ */ React.createElement("p", null, feature.text), feature.accent ? /* @__PURE__ */ React.createElement("div", { className: "hfc-accent" }, feature.accent) : null)))))), /* @__PURE__ */ React.createElement(TrustBar, null), /* @__PURE__ */ React.createElement("section", { className: "section" }, /* @__PURE__ */ React.createElement("div", { className: "section-inner" }, /* @__PURE__ */ React.createElement("div", { className: "sig-feature" }, /* @__PURE__ */ React.createElement("div", { className: "sig-feature-img" }, /* @__PURE__ */ React.createElement(
      ImgWithFallback,
      {
        src: IMAGES.hero.home,
        alt: "Signature turkey croquettes",
        style: { width: "100%", height: "100%", objectFit: "cover" },
        fallback: /* @__PURE__ */ React.createElement("span", { style: { fontSize: 80, position: "relative", zIndex: 1 } }, "\u{1F947}")
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "sig-feature-body" }, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "Our Signature"), /* @__PURE__ */ React.createElement("h2", null, "Premium Turkey ", /* @__PURE__ */ React.createElement("em", null, "Croquettes")), /* @__PURE__ */ React.createElement("p", null, "Crispy golden exterior, creamy seasoned turkey filling \u2014 born from a family recipe and refined for events of every size. The appetizer your guests can't stop talking about."), /* @__PURE__ */ React.createElement("div", { className: "sig-varieties" }, /* @__PURE__ */ React.createElement("span", { className: "sig-variety" }, "Classic"), /* @__PURE__ */ React.createElement("span", { className: "sig-variety" }, "Garden Herb"), /* @__PURE__ */ React.createElement("span", { className: "sig-variety" }, "Smoky Chipotle"), /* @__PURE__ */ React.createElement("span", { className: "sig-variety" }, "Black Truffle")), /* @__PURE__ */ React.createElement("button", { className: "link-btn", onClick: () => navigate("/menu") }, "Explore the full menu \u2192"))), /* @__PURE__ */ React.createElement(
      SectionHeading,
      {
        label: "From the Menu",
        title: "A Fuller Look at the Table",
        subtitle: "The croquettes may start the conversation, but the sides and sweets are what make the spread feel complete."
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "menu-grid" }, homeMenuItems.map((item) => /* @__PURE__ */ React.createElement(MenuItemCard, { key: item.id, item }))), /* @__PURE__ */ React.createElement("div", { className: "text-center mt-32" }, /* @__PURE__ */ React.createElement("button", { className: "link-btn", onClick: () => navigate("/menu") }, "See the full menu \u2192")))), /* @__PURE__ */ React.createElement("div", { className: "section-divider" }), /* @__PURE__ */ React.createElement("section", { className: "section section-alt" }, /* @__PURE__ */ React.createElement("div", { className: "section-inner" }, /* @__PURE__ */ React.createElement(
      SectionHeading,
      {
        label: "What We Do",
        title: "Catering for Every Occasion",
        subtitle: "From wedding receptions to pop-up markets, we bring the same care and craft to every event."
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "service-grid" }, SERVICES.map((s) => /* @__PURE__ */ React.createElement(ServiceCard, { key: s.id, service: s }))))), /* @__PURE__ */ React.createElement("section", { className: "section" }, /* @__PURE__ */ React.createElement("div", { className: "section-inner" }, /* @__PURE__ */ React.createElement(
      SectionHeading,
      {
        label: "Recent Events",
        title: "Stories from the Table",
        subtitle: "Every event is different. Here\u2019s how we made each one special."
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "event-grid" }, featuredEvents.map((e) => /* @__PURE__ */ React.createElement(EventCard, { key: e.id, event: e }))), /* @__PURE__ */ React.createElement("div", { className: "text-center mt-32" }, /* @__PURE__ */ React.createElement("button", { className: "btn-primary", onClick: () => navigate("/events") }, "View All Events \u2192")))), /* @__PURE__ */ React.createElement("div", { className: "section-divider" }), /* @__PURE__ */ React.createElement("section", { className: "section section-alt" }, /* @__PURE__ */ React.createElement("div", { className: "section-inner" }, /* @__PURE__ */ React.createElement(
      SectionHeading,
      {
        label: "What People Say",
        title: "Reviews from Our Guests",
        subtitle: "Real feedback from real celebrations."
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "grid-3" }, featuredReviews.map((r) => /* @__PURE__ */ React.createElement(ReviewCard, { key: r.id, review: r }))), /* @__PURE__ */ React.createElement("div", { className: "text-center mt-32" }, /* @__PURE__ */ React.createElement("button", { className: "link-btn", onClick: () => navigate("/reviews") }, "Read All Reviews \u2192")))), /* @__PURE__ */ React.createElement("section", { className: "story-section" }, /* @__PURE__ */ React.createElement("div", { className: "story-inner" }, /* @__PURE__ */ React.createElement("div", { className: "story-pull-quote" }, "Act One was the family recipe. ", /* @__PURE__ */ React.createElement("em", null, "Act Two"), " is sharing it with the world."), /* @__PURE__ */ React.createElement("div", { className: "story-text" }, /* @__PURE__ */ React.createElement("p", null, "Every great dish has an origin story. Ours began as turkey croquettes made for Sunday dinners and holiday tables. The recipe that people couldn't stop asking about."), /* @__PURE__ */ React.createElement("p", null, "We're building a food business the right way: starting with catering, proving the product with real people at real events, and growing from there. No shortcuts, no compromises."), /* @__PURE__ */ React.createElement("button", { className: "btn-primary", onClick: () => navigate("/about"), style: { marginTop: 8 } }, "Our Full Story \u2192")))), /* @__PURE__ */ React.createElement(InlineCTA, null));
  }
  function MenuPage() {
    const [filter, setFilter] = useState("all");
    const catOpts = [
      { value: "signature", label: "Signature Croquettes" },
      { value: "sides", label: "Sides" },
      { value: "extras", label: "Extras" }
    ];
    let filtered = MENU_ITEMS;
    if (filter !== "all") filtered = filtered.filter((m) => m.category === filter);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(HeroSection, { badge: "Our Menu", title: "Comfort Food, <em>Elevated</em>", subtitle: "Every dish is made from scratch with premium ingredients. Our signature turkey croquettes anchor every menu.", primaryCta: "Book a Tasting", secondaryCta: `Call ${BIZ.phone}`, heroImg: IMAGES.hero.menu }), /* @__PURE__ */ React.createElement("section", { className: "section" }, /* @__PURE__ */ React.createElement("div", { className: "section-inner" }, /* @__PURE__ */ React.createElement(
      SectionHeading,
      {
        label: "Menu Categories",
        title: "Browse the core lineup",
        subtitle: "Start with the signature croquettes, then layer in sides, sauces, and finishing touches for your event."
      }
    ), /* @__PURE__ */ React.createElement(FilterChips, { options: catOpts, active: filter, onChange: setFilter }), /* @__PURE__ */ React.createElement("div", { className: "menu-grid" }, filtered.map((item) => /* @__PURE__ */ React.createElement(MenuItemCard, { key: item.id, item }))), /* @__PURE__ */ React.createElement("div", { className: "signature-banner mt-48" }, /* @__PURE__ */ React.createElement("span", { className: "signature-banner-emoji" }, "\u{1F468}\u200D\u{1F373}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "Custom Menus Available"), /* @__PURE__ */ React.createElement("p", null, "Our menu is a starting point. For weddings, corporate events, and private parties, we build custom menus tailored to your event, dietary needs, and vision. Every tasting is an opportunity to explore."))), /* @__PURE__ */ React.createElement(InlineCTA, { title: "Want to Try Before You Book?", text: "Schedule a complimentary tasting to experience the food firsthand.", cta: "Schedule Tasting" }))));
  }
  function ServicesHub() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(HeroSection, { badge: "Our Services", title: "Catering for <em>Every Occasion</em>", subtitle: "From intimate dinner parties to 500-guest receptions, we scale our craft to fit your event.", primaryCta: "Book a Tasting", secondaryCta: `Call ${BIZ.phone}`, heroImg: IMAGES.hero.services }), /* @__PURE__ */ React.createElement("section", { className: "section" }, /* @__PURE__ */ React.createElement("div", { className: "section-inner" }, /* @__PURE__ */ React.createElement(
      SectionHeading,
      {
        label: "Service Formats",
        title: "Built for the room you\u2019re hosting",
        subtitle: "Wedding receptions, office events, private dinners, holiday parties, pop-ups, and future retail programs."
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "service-grid" }, SERVICES.map((s) => /* @__PURE__ */ React.createElement(ServiceCard, { key: s.id, service: s }))))));
  }
  function ServiceDetailPage({ slug }) {
    const svc = getService(slug);
    if (!svc) return /* @__PURE__ */ React.createElement("div", { className: "section section-inner" }, /* @__PURE__ */ React.createElement("p", null, "Service not found."));
    const events = eventsForService(svc.id).slice(0, 3);
    const reviews = reviewsForService(svc.id).slice(0, 2);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      HeroSection,
      {
        badge: svc.shortTitle,
        title: svc.title,
        subtitle: svc.fullDesc,
        primaryCta: "Request a Quote",
        secondaryCta: `Call ${BIZ.phone}`,
        tertiaryLabel: "See Pricing \u2192",
        tertiaryRoute: "/pricing",
        heroImg: IMAGES.hero.services
      }
    ), /* @__PURE__ */ React.createElement("section", { className: "section" }, /* @__PURE__ */ React.createElement("div", { className: "section-inner" }, /* @__PURE__ */ React.createElement("div", { className: "breadcrumb" }, /* @__PURE__ */ React.createElement(HashLink, { to: "/" }, "Home"), " / ", /* @__PURE__ */ React.createElement(HashLink, { to: "/services" }, "Services"), " / ", svc.shortTitle), /* @__PURE__ */ React.createElement("div", { className: "grid-2 mt-32" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "Our Process"), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontSize: 28, color: "var(--charcoal)", marginBottom: 20 } }, "How It Works"), /* @__PURE__ */ React.createElement(ProcessSteps, { steps: svc.process, details: svc.processDetails })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "Why Choose Us"), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontSize: 28, color: "var(--charcoal)", marginBottom: 20 } }, "What You Get"), svc.benefits.map((b, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 10, marginBottom: 14, fontSize: 14, color: "var(--charcoal)" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "var(--wine)", fontWeight: 700, flexShrink: 0 } }, "\u2726"), " ", b)))), events.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mt-48" }, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "Past ", svc.shortTitle, " Events"), /* @__PURE__ */ React.createElement("div", { className: "event-grid" }, events.map((e) => /* @__PURE__ */ React.createElement(EventCard, { key: e.id, event: e })))), /* @__PURE__ */ React.createElement(InlineCTA, { title: `Planning a ${svc.shortTitle} Event?` }), svc.faqs.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mt-32" }, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "FAQ"), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontSize: 28, color: "var(--charcoal)", marginBottom: 20 } }, "Common Questions"), /* @__PURE__ */ React.createElement(FAQAccordion, { faqs: svc.faqs })), reviews.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mt-48" }, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "Client Reviews"), /* @__PURE__ */ React.createElement("div", { className: "grid-2" }, reviews.map((r) => /* @__PURE__ */ React.createElement(ReviewCard, { key: r.id, review: r })))))));
  }
  function EventsPage() {
    const [filter, setFilter] = useState("all");
    const serviceOpts = [...new Set(EVENTS.map((p) => p.service))].map((s) => ({ value: s, label: SERVICES.find((sv) => sv.id === s)?.shortTitle || s }));
    let filtered = EVENTS;
    if (filter !== "all") filtered = filtered.filter((p) => p.service === filter);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(HeroSection, { badge: "Past Events", title: "Stories from <em>the Table</em>", subtitle: "Every event tells a story. Here are some of ours.", primaryCta: "Book Your Event", secondaryCta: `Call ${BIZ.phone}`, heroImg: IMAGES.hero.events }), /* @__PURE__ */ React.createElement("section", { className: "section" }, /* @__PURE__ */ React.createElement("div", { className: "section-inner" }, /* @__PURE__ */ React.createElement(FilterChips, { options: serviceOpts, active: filter, onChange: setFilter }), /* @__PURE__ */ React.createElement("div", { className: "event-grid" }, filtered.map((e) => /* @__PURE__ */ React.createElement(EventCard, { key: e.id, event: e }))))), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", padding: "0 24px" } }, /* @__PURE__ */ React.createElement(InlineCTA, null)));
  }
  function EventDetailPage({ slug }) {
    const event = getEvent(slug);
    if (!event) return /* @__PURE__ */ React.createElement("div", { className: "section section-inner" }, /* @__PURE__ */ React.createElement("p", null, "Event not found."));
    const svc = SERVICES.find((s) => s.id === event.service);
    const related = EVENTS.filter((e) => e.id !== event.id).slice(0, 3);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      HeroSection,
      {
        badge: `Case Study \xB7 ${svc?.shortTitle}`,
        title: `${event.neighborhood} \u2014 <em>${event.eventType}</em>`,
        subtitle: event.scope,
        primaryCta: "Plan a Similar Event",
        secondaryCta: `Call ${BIZ.phone}`,
        showReassurance: false,
        heroImg: IMAGES.hero.events
      }
    ), /* @__PURE__ */ React.createElement("section", { className: "section" }, /* @__PURE__ */ React.createElement("div", { className: "section-inner project-detail" }, /* @__PURE__ */ React.createElement("div", { className: "breadcrumb" }, /* @__PURE__ */ React.createElement(HashLink, { to: "/" }, "Home"), " / ", /* @__PURE__ */ React.createElement(HashLink, { to: "/events" }, "Events"), " / ", event.neighborhood), /* @__PURE__ */ React.createElement("div", { className: "event-header", style: { borderRadius: "var(--radius-lg)", marginTop: 24, justifyContent: "center", background: "linear-gradient(135deg, var(--blush) 0%, var(--wine-pale) 100%)" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 72 } }, event.emoji)), /* @__PURE__ */ React.createElement("div", { className: "project-facts" }, /* @__PURE__ */ React.createElement("div", { className: "project-fact" }, /* @__PURE__ */ React.createElement("strong", null, "Location"), event.neighborhood), /* @__PURE__ */ React.createElement("div", { className: "project-fact" }, /* @__PURE__ */ React.createElement("strong", null, "Event Type"), event.eventType), /* @__PURE__ */ React.createElement("div", { className: "project-fact" }, /* @__PURE__ */ React.createElement("strong", null, "Service"), svc?.shortTitle), /* @__PURE__ */ React.createElement("div", { className: "project-fact" }, /* @__PURE__ */ React.createElement("strong", null, "Guests"), event.guests), /* @__PURE__ */ React.createElement("div", { className: "project-fact" }, /* @__PURE__ */ React.createElement("strong", null, "Menu Highlights"), event.items.join(", "))), /* @__PURE__ */ React.createElement("div", { className: "project-narrative" }, /* @__PURE__ */ React.createElement("div", { className: "narrative-panel" }, /* @__PURE__ */ React.createElement("h4", null, "Challenge"), /* @__PURE__ */ React.createElement("p", null, event.challenge)), /* @__PURE__ */ React.createElement("div", { className: "narrative-panel" }, /* @__PURE__ */ React.createElement("h4", null, "Solution"), /* @__PURE__ */ React.createElement("p", null, event.solution)), /* @__PURE__ */ React.createElement("div", { className: "narrative-panel" }, /* @__PURE__ */ React.createElement("h4", null, "Outcome"), /* @__PURE__ */ React.createElement("p", null, event.outcome))), /* @__PURE__ */ React.createElement(InlineCTA, { title: "Want Similar Results?", text: "Let's plan your event together." }), related.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mt-48" }, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontSize: 24, color: "var(--charcoal)", marginBottom: 16 } }, "More Events"), /* @__PURE__ */ React.createElement("div", { className: "event-grid" }, related.map((e) => /* @__PURE__ */ React.createElement(EventCard, { key: e.id, event: e })))))));
  }
  function ReviewsPage() {
    const [filter, setFilter] = useState("all");
    const serviceOpts = [...new Set(REVIEWS.map((r) => r.service))].map((s) => ({ value: s, label: SERVICES.find((sv) => sv.id === s)?.shortTitle || s }));
    let filtered = [...REVIEWS].sort((a, b) => b.date.localeCompare(a.date));
    if (filter !== "all") filtered = filtered.filter((r) => r.service === filter);
    const avg = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(HeroSection, { badge: "Reviews", title: "What Our Clients Say", subtitle: "Real reviews from real events.", primaryCta: "Book a Tasting", secondaryCta: `Call ${BIZ.phone}`, heroImg: IMAGES.hero.reviews }), /* @__PURE__ */ React.createElement("section", { className: "section" }, /* @__PURE__ */ React.createElement("div", { className: "section-inner" }, /* @__PURE__ */ React.createElement("div", { className: "stats-strip" }, /* @__PURE__ */ React.createElement("div", { className: "stat-item" }, /* @__PURE__ */ React.createElement("div", { className: "stat-num" }, avg), /* @__PURE__ */ React.createElement("div", { className: "stat-label" }, "Average Rating")), /* @__PURE__ */ React.createElement("div", { className: "stat-item" }, /* @__PURE__ */ React.createElement("div", { className: "stat-num" }, REVIEWS.length), /* @__PURE__ */ React.createElement("div", { className: "stat-label" }, "Reviews")), /* @__PURE__ */ React.createElement("div", { className: "stat-item" }, /* @__PURE__ */ React.createElement("div", { className: "stat-num" }, "100%"), /* @__PURE__ */ React.createElement("div", { className: "stat-label" }, "5-Star"))), /* @__PURE__ */ React.createElement(FilterChips, { options: serviceOpts, active: filter, onChange: setFilter }), /* @__PURE__ */ React.createElement("div", { className: "grid-2" }, filtered.map((r) => /* @__PURE__ */ React.createElement(ReviewCard, { key: r.id, review: r }))))), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", padding: "0 24px" } }, /* @__PURE__ */ React.createElement(InlineCTA, null)));
  }
  function ServiceAreasPage() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(HeroSection, { badge: "Service Areas", title: "Serving <em>South Jersey</em> & Philadelphia", subtitle: "We proudly cater events across the greater Philadelphia and South Jersey region.", primaryCta: "Check Availability", secondaryCta: `Call ${BIZ.phone}`, heroImg: IMAGES.hero.areas }), /* @__PURE__ */ React.createElement("section", { className: "section" }, /* @__PURE__ */ React.createElement("div", { className: "section-inner" }, /* @__PURE__ */ React.createElement("div", { className: "service-grid" }, SERVICE_AREAS.map((a) => /* @__PURE__ */ React.createElement(HashLink, { key: a.slug, to: `/service-areas/${a.slug}`, className: "card service-card", "aria-label": `View ${a.name}` }, /* @__PURE__ */ React.createElement("div", { className: "card-body" }, /* @__PURE__ */ React.createElement("h3", { className: "card-title" }, a.name), /* @__PURE__ */ React.createElement("p", { className: "card-text", style: { marginBottom: 12 } }, a.desc.slice(0, 120), "\u2026"), /* @__PURE__ */ React.createElement("div", { className: "tag-row" }, a.topServices.map((s) => /* @__PURE__ */ React.createElement("span", { key: s, className: "tag" }, SERVICES.find((sv) => sv.id === s)?.shortTitle))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, color: "var(--wine)", fontSize: 13, fontWeight: 600 } }, "View details \u2192"))))))));
  }
  function ServiceAreaDetailPage({ slug }) {
    const area = getArea(slug);
    if (!area) return /* @__PURE__ */ React.createElement("div", { className: "section section-inner" }, /* @__PURE__ */ React.createElement("p", null, "Area not found."));
    const events = eventsForArea(slug).slice(0, 4);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      HeroSection,
      {
        badge: `Service Area \xB7 ${area.fullName}`,
        title: `Catering in <em>${area.name}</em>`,
        subtitle: area.desc,
        primaryCta: `Book in ${area.name}`,
        secondaryCta: `Call ${BIZ.phone}`,
        heroImg: IMAGES.hero.areas
      }
    ), /* @__PURE__ */ React.createElement("section", { className: "section" }, /* @__PURE__ */ React.createElement("div", { className: "section-inner" }, /* @__PURE__ */ React.createElement("div", { className: "breadcrumb" }, /* @__PURE__ */ React.createElement(HashLink, { to: "/" }, "Home"), " / ", /* @__PURE__ */ React.createElement(HashLink, { to: "/service-areas" }, "Service Areas"), " / ", area.name), /* @__PURE__ */ React.createElement("div", { className: "grid-2 mt-32" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "Neighborhoods We Serve"), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontSize: 24, color: "var(--charcoal)", marginBottom: 16 } }, "Areas in ", area.name), /* @__PURE__ */ React.createElement("div", { className: "tag-row" }, area.neighborhoods.map((n) => /* @__PURE__ */ React.createElement("span", { key: n, className: "tag" }, n)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "Popular Services Here"), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontSize: 24, color: "var(--charcoal)", marginBottom: 16 } }, "Most Requested"), area.topServices.map((sid) => {
      const s = SERVICES.find((sv) => sv.id === sid);
      return s ? /* @__PURE__ */ React.createElement(HashLink, { key: sid, to: `/services/${s.slug}`, className: "card", style: { display: "block", textDecoration: "none", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { className: "card-body", style: { padding: 16, display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 24 } }, s.icon), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--charcoal)" } }, s.shortTitle), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "var(--slate)", margin: 0 } }, s.shortDesc.slice(0, 80), "\u2026")))) : null;
    }))), events.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mt-48" }, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "Events in ", area.name), /* @__PURE__ */ React.createElement("div", { className: "event-grid" }, events.map((e) => /* @__PURE__ */ React.createElement(EventCard, { key: e.id, event: e })))), /* @__PURE__ */ React.createElement(InlineCTA, { title: `Planning an Event in ${area.name}?` }))));
  }
  function AboutPage() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(HeroSection, { badge: "Our Story", title: `Act One Was the Recipe. <em>Act Two Is the Business.</em>`, subtitle: "We're turning a family tradition into something bigger.", primaryCta: "See Our Menu", secondaryCta: `Call ${BIZ.phone}`, heroImg: IMAGES.hero.about }), /* @__PURE__ */ React.createElement("section", { className: "section" }, /* @__PURE__ */ React.createElement("div", { className: "section-inner" }, /* @__PURE__ */ React.createElement("div", { className: "grid-2" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "The Origin"), /* @__PURE__ */ React.createElement("h2", { className: "section-title" }, "From Sunday Dinner to Saturday Night"), /* @__PURE__ */ React.createElement("p", { style: { lineHeight: 1.85, color: "var(--charcoal)", marginBottom: 16 } }, `It started the way the best food businesses do \u2014 with a dish that people couldn't stop asking about. Our turkey croquettes were a family recipe, perfected over years of Sunday dinners, holiday tables, and "bring that thing you make" requests at every gathering.`), /* @__PURE__ */ React.createElement("p", { style: { lineHeight: 1.85, color: "var(--charcoal)", marginBottom: 16 } }, "Act One was getting the recipe right. Learning what makes the filling creamy without being heavy. Finding the crunch that holds up for ten minutes after plating. Dialing in the seasoning until it was automatic."), /* @__PURE__ */ React.createElement("p", { style: { lineHeight: 1.85, color: "var(--charcoal)" } }, "Act Two is taking that recipe and building something real. A catering company that proves the product in the field \u2014 at weddings, corporate events, pop-ups, and dinner parties \u2014 before scaling into retail. It's the smart way to build a food business, and it starts with making people happy, one plate at a time."), /* @__PURE__ */ React.createElement("div", { className: "about-photos-grid" }, /* @__PURE__ */ React.createElement("div", { className: "about-photo-block" }, /* @__PURE__ */ React.createElement(
      ImgWithFallback,
      {
        src: IMAGES.about.family,
        alt: "The Robertson family",
        fallback: /* @__PURE__ */ React.createElement("div", { className: "about-photo-fallback" }, /* @__PURE__ */ React.createElement("span", null, "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}"), "Family Photo")
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "about-photo-block" }, /* @__PURE__ */ React.createElement(
      ImgWithFallback,
      {
        src: IMAGES.about.kitchen,
        alt: "Behind the scenes in the kitchen",
        fallback: /* @__PURE__ */ React.createElement("div", { className: "about-photo-fallback" }, /* @__PURE__ */ React.createElement("span", null, "\u{1F468}\u200D\u{1F373}"), "Kitchen Photo")
      }
    )))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "The Strategy"), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontSize: 24, color: "var(--charcoal)", marginBottom: 20 } }, "Why Catering First"), [
      ["Low-risk validation", "Catering lets us prove the product with real customers before investing in retail infrastructure."],
      ["Direct feedback loop", "We see reactions in real time. Every event teaches us something new about what works."],
      ["Brand building", "Every wedding, party, and pop-up creates word-of-mouth that money can't buy."],
      ["White space opportunity", "Turkey croquettes are virtually nonexistent in mainstream food. We're filling a gap."],
      ["Scalable path", "Catering \u2192 local brand \u2192 packaged product \u2192 retail. Each step funds the next."]
    ].map(([title, desc], i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, fontSize: 14, fontWeight: 600, color: "var(--charcoal)", marginBottom: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "var(--wine)", flexShrink: 0 } }, "\u2726"), " ", title), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "var(--slate)", lineHeight: 1.6, paddingLeft: 24 } }, desc))))), /* @__PURE__ */ React.createElement("div", { className: "signature-banner mt-48" }, /* @__PURE__ */ React.createElement("span", { className: "signature-banner-emoji" }, "\u{1F3AD}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "The Name"), /* @__PURE__ */ React.createElement("p", null, `"Act Two" is deliberate. In every great story, Act Two is where things get real \u2014 where the setup becomes action. Act One was the family recipe. Act Two is the business. We're not just cooking food. We're building a brand that starts at the table and grows from there.`))), /* @__PURE__ */ React.createElement("div", { className: "about-photo-block mt-48", style: { maxWidth: 900, margin: "48px auto 0" } }, /* @__PURE__ */ React.createElement(
      ImgWithFallback,
      {
        src: IMAGES.about.team,
        alt: "The Act Two Catering team",
        style: { height: 360 },
        fallback: /* @__PURE__ */ React.createElement("div", { className: "about-photo-fallback", style: { height: 360 } }, /* @__PURE__ */ React.createElement("span", null, "\u{1F37D}\uFE0F"), "Team Photo \u2014 Swap with /images/about-team.jpg")
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "mt-48" }, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "The Roadmap"), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontSize: 28, color: "var(--charcoal)", marginBottom: 24 } }, "Where We're Going"), /* @__PURE__ */ React.createElement(
      ProcessSteps,
      {
        steps: ["Catering Launch", "Local Brand Growth", "Packaged Product", "Retail Distribution"],
        details: [
          "Prove the product through weddings, corporate events, pop-ups, and private parties. Build the reputation.",
          "Expand the menu, grow the team, become the go-to comfort caterer in the Philadelphia and South Jersey market.",
          "Develop frozen retail-ready turkey croquettes for specialty food shops and direct-to-consumer sales.",
          "Enter regional grocery, restaurant distribution, and beyond. The family recipe goes national."
        ]
      }
    )))), /* @__PURE__ */ React.createElement(InlineCTA, { title: "Be Part of the Story", text: "Book us for your next event and taste the beginning of something special." }));
  }
  function PricingPage() {
    const faqs = [
      { q: "What's included in the per-person price?", a: "All food preparation, delivery, setup, service staff (for events over 50), and cleanup. China and linen rentals are available at additional cost." },
      { q: "Do you require a deposit?", a: "Yes \u2014 we require a 30% deposit to secure your date, with the balance due 7 days before the event." },
      { q: "Can I customize the menu?", a: "Absolutely \u2014 customization is what we do. The tasting consultation is where we build your perfect menu together." },
      { q: "Do you accommodate dietary restrictions?", a: "Yes. We handle gluten-free, dairy-free, vegetarian, vegan, nut-free, and other dietary needs. Just let us know during consultation." },
      { q: "What's your cancellation policy?", a: "Full refund up to 30 days before the event. 50% refund 14\u201330 days out. Inside 14 days, the deposit is non-refundable but can be applied to a rescheduled date." },
      { q: "Do you travel outside your service area?", a: "We can accommodate events outside our standard area for an additional travel fee. Contact us to discuss." }
    ];
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(HeroSection, { badge: "Pricing", title: "Transparent Pricing, <em>Custom Menus</em>", subtitle: "Know what to expect. Every quote is tailored to your event.", primaryCta: "Get a Custom Quote", secondaryCta: `Call ${BIZ.phone}`, heroImg: IMAGES.hero.pricing }), /* @__PURE__ */ React.createElement("section", { className: "section" }, /* @__PURE__ */ React.createElement("div", { className: "section-inner" }, /* @__PURE__ */ React.createElement("div", { className: "grid-2" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "Starting Ranges"), /* @__PURE__ */ React.createElement("h2", { className: "section-title", style: { fontSize: 28 } }, "Pricing Guide"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "var(--slate)", marginBottom: 24, lineHeight: 1.7 } }, "Pricing depends on menu selection, guest count, service style, and event complexity. These ranges give you a starting point. Every quote is custom."), SERVICES.filter((s) => s.id !== "packaging").map((s) => /* @__PURE__ */ React.createElement("div", { key: s.id, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid var(--cream-dark)" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--charcoal)" } }, s.shortTitle), /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontSize: 12, color: "var(--slate)" } }, s.shortDesc.slice(0, 55), "\u2026")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--font-display)", fontSize: 18, color: "var(--wine)", fontWeight: 600, whiteSpace: "nowrap" } }, "$", s.minRate, "\u2013$", s.maxRate, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "var(--slate)", fontFamily: "var(--font-body)" } }, "/", s.unit))))), /* @__PURE__ */ React.createElement(BudgetEstimator, null)), /* @__PURE__ */ React.createElement(InlineCTA, { title: "Ready for a Custom Quote?", text: "Tell us about your event and we'll put together a detailed proposal." }), /* @__PURE__ */ React.createElement("div", { className: "mt-32" }, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "FAQ"), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontSize: 28, color: "var(--charcoal)", marginBottom: 20 } }, "Common Questions"), /* @__PURE__ */ React.createElement(FAQAccordion, { faqs })))));
  }
  function ContactPage() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(HeroSection, { badge: "Contact", title: "Let's Plan Your <em>Next Event</em>", subtitle: "Tell us about your event and we'll be in touch within 24 hours.", primaryCta: `Call ${BIZ.phone}`, secondaryCta: null, showReassurance: true, heroImg: IMAGES.hero.contact }), /* @__PURE__ */ React.createElement("section", { className: "section" }, /* @__PURE__ */ React.createElement("div", { className: "section-inner" }, /* @__PURE__ */ React.createElement("div", { className: "grid-2" }, /* @__PURE__ */ React.createElement(QuoteForm, null), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "Get In Touch"), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontSize: 24, color: "var(--charcoal)", marginBottom: 20 } }, "Contact Information"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--charcoal)", fontSize: 14 } }, "Phone"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("a", { href: BIZ.phoneTel, style: { color: "var(--wine)", fontSize: 18, fontWeight: 600, textDecoration: "none" } }, BIZ.phone))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--charcoal)", fontSize: 14 } }, "Email"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("a", { href: `mailto:${BIZ.email}`, style: { color: "var(--wine)", textDecoration: "none" } }, BIZ.email))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--charcoal)", fontSize: 14 } }, "Based In"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "var(--charcoal)" } }, BIZ.city, ", ", BIZ.state)), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--charcoal)", fontSize: 14 } }, "Hours"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "var(--charcoal)" } }, BIZ.hours.weekday, /* @__PURE__ */ React.createElement("br", null), BIZ.hours.saturday, /* @__PURE__ */ React.createElement("br", null), BIZ.hours.sunday)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--charcoal)", fontSize: 14 } }, "Service Areas"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "var(--charcoal)" } }, "Camden, Burlington, Gloucester Counties (NJ) \xB7 Philadelphia, Delaware, Montgomery Counties (PA)")), /* @__PURE__ */ React.createElement("div", { className: "signature-banner", style: { marginTop: 28, padding: 24 } }, /* @__PURE__ */ React.createElement("span", { className: "signature-banner-emoji", style: { fontSize: 36 } }, "\u{1F37D}\uFE0F"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 18 } }, "Free Tastings"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13 } }, "Every event inquiry includes a complimentary tasting. Experience the food before you commit."))))))));
  }
  function Header({ currentPath }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const closeMenu = () => setMenuOpen(false);
    const links = [
      { label: "Menu", path: "/menu" },
      { label: "Services", path: "/services" },
      { label: "Events", path: "/events" },
      { label: "Reviews", path: "/reviews" },
      { label: "Areas", path: "/service-areas" },
      { label: "Pricing", path: "/pricing" },
      { label: "About", path: "/about" }
    ];
    return /* @__PURE__ */ React.createElement("header", { className: "site-header" }, /* @__PURE__ */ React.createElement("div", { className: "header-utility" }, /* @__PURE__ */ React.createElement("div", { className: "header-utility-inner" }, /* @__PURE__ */ React.createElement("span", null, "Family-led comfort catering"), /* @__PURE__ */ React.createElement("span", null, "South Jersey + Philadelphia"), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", null, "Free tastings"), " for qualified events"))), /* @__PURE__ */ React.createElement("div", { className: "header-main" }, /* @__PURE__ */ React.createElement(HashLink, { to: "/", className: "header-logo", onClick: closeMenu }, /* @__PURE__ */ React.createElement("span", { className: "logo-act" }, "Act"), " ", /* @__PURE__ */ React.createElement("span", { className: "logo-two" }, "Two")), /* @__PURE__ */ React.createElement("nav", { className: `header-nav ${menuOpen ? "open" : ""}`, "aria-label": "Main navigation" }, links.map((l) => /* @__PURE__ */ React.createElement(HashLink, { key: l.path, to: l.path, className: currentPath.startsWith(l.path) ? "active" : "", onClick: closeMenu }, l.label)), /* @__PURE__ */ React.createElement(HashLink, { to: "/contact", className: "mobile-quote-btn", onClick: closeMenu, style: { display: menuOpen ? "block" : "none" } }, "Book a Tasting")), /* @__PURE__ */ React.createElement("div", { className: "header-actions" }, /* @__PURE__ */ React.createElement("a", { href: BIZ.phoneTel, className: "header-phone header-phone-desktop" }, BIZ.phone), /* @__PURE__ */ React.createElement(HashLink, { to: "/contact", className: "header-quote-link header-phone-desktop" }, "Book a Tasting"), /* @__PURE__ */ React.createElement("button", { className: "mobile-menu-btn", onClick: () => setMenuOpen(!menuOpen), "aria-expanded": menuOpen, "aria-label": "Toggle navigation menu" }, menuOpen ? "\u2715" : "\u2630"))));
  }
  function Footer() {
    return /* @__PURE__ */ React.createElement("footer", { className: "site-footer" }, /* @__PURE__ */ React.createElement("div", { className: "footer-inner" }, /* @__PURE__ */ React.createElement("div", { className: "footer-brand" }, /* @__PURE__ */ React.createElement("h3", null, /* @__PURE__ */ React.createElement("span", null, "Act"), " Two Catering"), /* @__PURE__ */ React.createElement("p", null, "Premium comfort catering anchored by our signature turkey croquettes. Serving South Jersey and the greater Philadelphia area."), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, opacity: 0.6 } }, "From family recipe to your table.")), /* @__PURE__ */ React.createElement("div", { className: "footer-col" }, /* @__PURE__ */ React.createElement("h4", null, "Services"), SERVICES.map((s) => /* @__PURE__ */ React.createElement(HashLink, { key: s.id, to: `/services/${s.slug}` }, s.shortTitle))), /* @__PURE__ */ React.createElement("div", { className: "footer-col" }, /* @__PURE__ */ React.createElement("h4", null, "Company"), /* @__PURE__ */ React.createElement(HashLink, { to: "/menu" }, "Menu"), /* @__PURE__ */ React.createElement(HashLink, { to: "/about" }, "Our Story"), /* @__PURE__ */ React.createElement(HashLink, { to: "/reviews" }, "Reviews"), /* @__PURE__ */ React.createElement(HashLink, { to: "/events" }, "Past Events"), /* @__PURE__ */ React.createElement(HashLink, { to: "/pricing" }, "Pricing")), /* @__PURE__ */ React.createElement("div", { className: "footer-col" }, /* @__PURE__ */ React.createElement("h4", null, "Contact"), /* @__PURE__ */ React.createElement("a", { href: BIZ.phoneTel }, BIZ.phone), /* @__PURE__ */ React.createElement("a", { href: `mailto:${BIZ.email}` }, BIZ.email), /* @__PURE__ */ React.createElement(HashLink, { to: "/contact" }, "Book a Tasting"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, fontSize: 12, opacity: 0.6 } }, BIZ.city, ", ", BIZ.state, /* @__PURE__ */ React.createElement("br", null), BIZ.hours.weekday, /* @__PURE__ */ React.createElement("br", null), BIZ.hours.saturday))), /* @__PURE__ */ React.createElement("div", { className: "footer-bottom" }, "\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " Act Two Catering. All rights reserved."));
  }
  function MobileCallBar() {
    return /* @__PURE__ */ React.createElement("div", { className: "mobile-call-bar" }, /* @__PURE__ */ React.createElement("div", { className: "mobile-call-bar-inner" }, /* @__PURE__ */ React.createElement("a", { href: BIZ.phoneTel, className: "mcb-call" }, "\u{1F4DE} Call Now"), /* @__PURE__ */ React.createElement("button", { className: "mcb-quote", onClick: () => navigate("/contact") }, "\u{1F37D}\uFE0F Book Tasting")));
  }
  function Router({ hash }) {
    const { parts } = parseRoute(hash.replace("#", ""));
    const p0 = parts[0] || "";
    const p1 = parts[1] || "";
    if (!p0) return /* @__PURE__ */ React.createElement(HomePage, null);
    if (p0 === "menu") return /* @__PURE__ */ React.createElement(MenuPage, null);
    if (p0 === "services" && !p1) return /* @__PURE__ */ React.createElement(ServicesHub, null);
    if (p0 === "services" && p1) return /* @__PURE__ */ React.createElement(ServiceDetailPage, { slug: p1 });
    if (p0 === "events" && !p1) return /* @__PURE__ */ React.createElement(EventsPage, null);
    if (p0 === "events" && p1) return /* @__PURE__ */ React.createElement(EventDetailPage, { slug: p1 });
    if (p0 === "reviews") return /* @__PURE__ */ React.createElement(ReviewsPage, null);
    if (p0 === "service-areas" && !p1) return /* @__PURE__ */ React.createElement(ServiceAreasPage, null);
    if (p0 === "service-areas" && p1) return /* @__PURE__ */ React.createElement(ServiceAreaDetailPage, { slug: p1 });
    if (p0 === "about") return /* @__PURE__ */ React.createElement(AboutPage, null);
    if (p0 === "pricing") return /* @__PURE__ */ React.createElement(PricingPage, null);
    if (p0 === "contact") return /* @__PURE__ */ React.createElement(ContactPage, null);
    return /* @__PURE__ */ React.createElement(HomePage, null);
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
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("style", null, CSS), /* @__PURE__ */ React.createElement("a", { id: "skip-link", href: "#main-content" }, "Skip to main content"), /* @__PURE__ */ React.createElement(Header, { currentPath }), /* @__PURE__ */ React.createElement("main", { id: "main-content" }, /* @__PURE__ */ React.createElement(Router, { hash })), /* @__PURE__ */ React.createElement(Footer, null), /* @__PURE__ */ React.createElement(MobileCallBar, null));
  };
})();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(window.__App));

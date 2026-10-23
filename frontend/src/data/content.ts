/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT — the single place every page / component reads its data from.
 *
 *  Everything is a plain array (or object). To add a reel, a logo, a feedback or
 *  a sample-work card: drop the file in /public/media/... and add ONE entry here.
 *  Components never hard-code media paths or copy.
 *
 *  Components don't import this file directly — they call the getters in
 *  `src/lib/content.ts`, so the data source can later be swapped for a CMS / API
 *  without touching any component.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ───────────────────────────── types ───────────────────────────── */

export type Logo = {
  slug: string;
  name: string;
  src: string;
  width: number;
  height: number;
};

export type Reel = {
  id: string;
  src: string; // /media/videos/...
  poster: string; // /media/images/posters/...
  label?: string; // small caption line
  title?: string; // caption (use \n for a line break)
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export type CaseStudyBlock =
  | { type: "heading"; text: string }
  | { type: "text"; text: string }
  | { type: "lead"; text: string } // big standalone line
  | { type: "pull"; text: string } // highlighted pull-quote
  | {
      type: "stats";
      items: { value: string; label: string; featured?: boolean }[];
    }
  | { type: "figure"; src: string; alt: string; width: number; height: number }
  | { type: "cards"; items: { title: string; text: string }[] }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] };

export type SampleWork = {
  slug: string;
  brand: string;
  categories: string[]; // used for the filter chips + the card tag
  tag: string; // text on the thumbnail pill
  title: string;
  result: { value: string; label: string };
  image: string; // card thumbnail
  imageAlt: string;
  imagePosition?: string; // CSS object-position for the card crop
  caseStudy: {
    kicker: string;
    headline: string;
    tagline: string;
    summary: string; // used for <meta description>
    blocks: CaseStudyBlock[];
    cta: { heading: string; button: string; href: string };
    signoff: { brand: string; line: string };
  };
};

/* ───────────────────────────── site ───────────────────────────── */

/**
 * WhatsApp click-to-chat link built from the phone number (wa.me is WhatsApp's official format).
 * The old business short link (api.whatsapp.com/message/FJUZK6OHAX52C1) returned HTTP 400, the same as a made-up
 * code, so it no longer opened a chat. A wa.me phone link never expires and Android hands it straight to the app.
 */
const WHATSAPP_NUMBER = "917827891978"; // country code + number, digits only
const WHATSAPP_MESSAGE = "Hi ThirtyThree!";
const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const site = {
  name: "ThirtyThree",
  title: "ThirtyThree — Performance Marketing, Delhi",
  description:
    "ThirtyThree is a performance-led marketing studio blending strategy, creative and media into one growth engine.",
  email: "thirty3.in@gmail.com",
  phone: { display: "+91 78278 91978", tel: "+917827891978" },
  whatsapp: whatsappLink,
  socials: [
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/thirty3.in/",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/thirtythree-ads/posts/?feedView=all",
    },
    { id: "whatsapp", label: "WhatsApp", href: whatsappLink },
  ],
  footerBlurb:
    "A performance led marketing studio building growth engines for ambitious brands strategy, creative and media, under one roof.",
};

export const navLinks = [
  { label: "Services", href: "/#capabilities" },
  { label: "Work", href: "/#work" },
  { label: "Reels", href: "/#reels" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ───────────────────────────── hero ───────────────────────────── */

export const hero = {
  tag: "[ Performance Marketing // Delhi ]",
  headline: "You build the brand.",
  headlineDim: "We make sure people see it.",
  sub: "Strategy, creative and media, built under one roof and engineered to compound. We don't chase impressions — we chase results.",
  ticker: [
    "+300% AVG ROAS SCALED",
    "BUILDING CATEGORY LEADING BRANDS",
    "₹1Cr+ MANAGED SPEND",
    "8M+ LEADS DELIVERED",
  ],
};

export const stats = [
  { value: 100, suffix: "+", label: "Brands scaled" },
  { value: 5.2, suffix: "x", decimals: 1, label: "Avg. ROAS delivered" },
  { value: 1, prefix: "₹", suffix: "Cr+", label: "Ad spend managed" },
  { value: 4, suffix: "yrs", label: "In the trenches" },
];

export const aboutTeaser = {
  eyebrow: "About",
  title: "We don't burn budgets. We compound them.",
  paragraphs: [
    "ThirtyThree is a performance led marketing studio blending strategy, creative and media into a single growth engine. We partner with founders and marketing leads who want real revenue, not vanity decks.",
    "Every campaign is run like a P&L. No jargon, no fluff just compounding outcomes, reported to you in plain English, every week.",
  ],
};

/* ───────────────────────────── why us ───────────────────────────── */

export const whyUs = [
  {
    title: "Senior teams, not interns",
    text: "Your account is run by marketers who've scaled brands before not juniors learning on your ad spend.",
    tag: "No account manager telephone game",
  },
  {
    title: "Profit over vanity",
    text: "We chase real sales and margin, not likes, clicks or last-click ROAS that looks good on a screenshot.",
    tag: "Measured on contribution margin",
  },
  {
    title: "Creative + media, one roof",
    text: "Our studio ships the content, our media team runs the ads. New creative weekly, killed fast when it doesn't sell.",
    tag: "Weekly creative refresh cycle",
  },
  {
    title: "Full visibility, always",
    text: "Live dashboards and weekly updates. You always know what we spent, what it made, and what's next.",
    tag: "Dashboard access from day one",
  },
];

/* ───────────────────────────── logos on board ───────────────────────────── */

const logo = (
  slug: string,
  name: string,
  width: number,
  height: number,
): Logo => ({
  slug,
  name,
  src: `/media/logos/clients/${slug}-v2.png`,
  width,
  height,
});

export const clientLogos: Logo[] = [
  logo("echoes-cafe", "Echoes Cafe", 213, 120),
  logo("mvri-by-the-sea", "MVRI By The Sea", 925, 120),
  logo("kris-gethin-gyms", "Kris Gethin Gyms", 191, 120),
  logo("the-ryan-farm", "The Ryan Farm", 120, 120),
  logo("british-man-unisex-salon", "British Man Unisex Salon", 505, 120),
  logo("kuljit-singh-nagra", "Kuljit Singh Nagra", 382, 120),
  logo("the-vogue-luxe", "The Vogue Luxe", 211, 120),
  logo("varya-label", "Varya Label", 253, 120),
  logo("wickle", "Wickle", 228, 120),
  logo("alpha-omega", "Alpha Omega", 212, 120),
  logo("dhani-foundation", "Dhani Foundation", 143, 120),
  logo("ceecee", "CeeCee", 563, 120),
  logo("reformulate", "Reformulate", 520, 120),
];

/** Instagram handles shown in the slower second marquee row. */
export const clientHandles = [
  "RuhDecors",
  "alphamax.global",
  "comsol",
  "cloa.official",
  "crsbagshouse",
  "tent&tulips",
  "clubninee",
  "krisgethingymsnoida",
  "GAMEPG",
  "labebalphaomega",
];

/* ───────────────────────────── capabilities / process / faq ───────────────────────────── */

export const capabilities = [
  {
    title: "Performance Marketing",
    text: "Data driven paid media across Meta, Google and YouTube engineered for ROAS, not impressions.",
    tags: [
      "Meta & Google Ads",
      "Conversion Tracking",
      "Media Planning",
      "Retargeting",
      "Attribution",
    ],
  },
  {
    title: "Brand & Creative",
    text: "Scroll stopping creative built to perform static, motion and UGC that earns the click.",
    tags: [
      "Ad Creatives",
      "Motion & Reels",
      "Brand Identity",
      "UGC",
      "Photography",
    ],
  },
  {
    title: "Web Development",
    text: "Fast, conversion optimised landing pages and storefronts that turn paid traffic into revenue.",
    tags: ["Landing Pages", "E-commerce", "UI/UX", "Analytics"],
  },
  {
    title: "Social & SEO",
    text: "Owned channels that compound over time and lower your blended CAC for good.",
    tags: [
      "Social Management",
      "SEO Strategy",
      "Content Calendars",
      "Community",
      "Influencer",
    ],
  },
];

export const process = [
  {
    title: "Audit",
    text: "We dig into your funnel, brand and unit economics. You get a thesis, not a pitch deck.",
  },
  {
    title: "Architect",
    text: "Strategy, creative direction and a 90 day media plan with projected ROAS and spend.",
  },
  {
    title: "Activate",
    text: "Full funnel campaigns go live. New creative ships weekly. We test, kill and scale fast.",
  },
  {
    title: "Amplify",
    text: "We compound what works into a growth engine monthly reviews, quarterly bets.",
  },
];

export const faqs = [
  {
    q: "How fast can we see results?",
    a: "Most clients see meaningful ROAS lift inside 30 days. Full funnel compounding kicks in by day 60–90 once creative testing matures.",
  },
  {
    q: "Do you work with early stage brands?",
    a: "Yes our Ignite retainer is built for early stage brands. We won't take you on if we can't move the needle, no matter the budget.",
  },
  {
    q: "Is there a minimum contract?",
    a: "No lock ins. Retainers run month-to-month. We earn the renewal with results, not paperwork.",
  },
  {
    q: "Who actually runs my account?",
    a: "A senior pod strategist, media buyer and creative lead with founders in every weekly review. No juniors, no hand-offs.",
  },
  {
    q: "Can you handle creative production in-house?",
    a: "Yes. Static, motion, UGC, photography and landing pages all shipped from one roof so the brief never gets lost in translation.",
  },
];

/* ───────────────────────────── OUR POV reels ───────────────────────────── */

export const povReels: Reel[] = [
  {
    id: "pov-originality",
    src: "/media/videos/pov/why-ads-need-originality.mp4",
    poster: "/media/images/posters/why-ads-need-originality.jpg",
    label: "Marketing explained",
    title: "Why your ads\nneed originality",
  },
  {
    id: "pov-small-brands",
    src: "/media/videos/pov/amplifying-small-brands.mp4",
    poster: "/media/images/posters/amplifying-small-brands.jpg",
    label: "Amplifying small brands",
    title: "How we amplify\nsmall brands",
  },
  {
    id: "pov-engagement-leads",
    src: "/media/videos/pov/driving-engagement-and-leads.mp4",
    poster: "/media/images/posters/driving-engagement-and-leads.jpg",
    label: "Performance marketing",
    title: "Driving engagement\n& leads",
  },
];

export const povSection = {
  eyebrow: "Our POV",
  lines: ["We don't just run ads.", "We build attention."],
  lede: "Ideas, strategies and insights from the ThirtyThree team.",
};

/* ───────────────────────────── ADS WE SHOOT reels ───────────────────────────── */

// Number of ad reels shown: ad-01 … ad-NN. Each needs public/media/videos/ads/ad-NN.mp4 AND
// public/media/images/posters/ad-NN.jpg. Add the next file pair, then raise this number (posters exist up to 14).
const AD_COUNT = 8;
export const adReels: Reel[] = Array.from({ length: AD_COUNT }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: `ad-${n}`,
    src: `/media/videos/ads/ad-${n}.mp4`,
    poster: `/media/images/posters/ad-${n}.jpg`,
  };
});

export const adsSection = {
  eyebrow: "In-house production",
  title: "We Make Ads, Then Make Them Work.",
  lede: "Recent cuts from our in-house team concept to camera to checkout.",
};

/* ───────────────────────────── SAMPLE WORK (+ case-study pages) ───────────────────────────── */

export const workSection = {
  eyebrow: "Selected work",
  title: "Sample work.",
  note: "Real campaigns. Real growth. Real brands.",
};

export const sampleWork: SampleWork[] = [
  {
    slug: "mvri-by-the-sea",
    brand: "MVRI By The Sea",
    categories: ["Lifestyle", "Fashion"],
    tag: "Lifestyle · Fashion",
    title: "Putting a seaside stay on every feed",
    result: { value: "4.2x", label: "reach in a single season" },
    image: "/media/images/work/mvri-by-the-sea.jpg",
    imageAlt: "MVRI By The Sea campaign",
    imagePosition: "50% 58%",
    caseStudy: {
      kicker: "Case study · Lifestyle · Fashion",
      headline: "A pretty brand. A much bigger presence.",
      tagline: "Swimwear. Resortwear. Strong visuals.",
      summary:
        "How ThirtyThree took MVRI by the Sea from 20.4K views to 6M+ Instagram views with sharper audience targeting, funnel-led creative and constant testing.",
      blocks: [
        {
          type: "text",
          text: "MVRI by the Sea had the kind of products that naturally catch your eye. But getting noticed is one thing. Getting noticed by the right people, building an audience around the brand and turning that attention into actual interest? That's a different game.",
        },
        { type: "text", text: "That's where we came in." },
        {
          type: "pull",
          text: "The idea was simple: make every impression work harder.",
        },

        { type: "heading", text: "First, a little context." },
        {
          type: "text",
          text: "Before Thirtythree, MVRI's Instagram was generating:",
        },
        {
          type: "figure",
          src: "/media/case-studies/mvri-by-the-sea/figure-1-v2.webp",
          alt: "Baseline stats before ThirtyThree: 20.4K views, 13.2K accounts reached, 354 content interactions",
          width: 1408,
          height: 768,
        },
        { type: "lead", text: "A starting point. Not a ceiling." },
        {
          type: "text",
          text: "We saw an opportunity to take the brand beyond visibility and build a more intentional presence, one that could bring the right audience closer to the products.",
        },

        { type: "heading", text: "Less guesswork. More of the right people." },
        {
          type: "text",
          text: "We weren't interested in putting the same ad in front of everyone and hoping something stuck.",
        },
        { type: "text", text: "The first big shift was audience precision." },
        {
          type: "text",
          text: "We moved towards female-first targeting, with a sharper focus on relevant urban audiences and the demographics most aligned with the brand.",
        },
        { type: "text", text: "And the difference was visible." },
        {
          type: "text",
          text: "The audience mix moved from a historically near-even gender split to over 90% female reach in subsequent campaign reporting.",
        },
        { type: "text", text: "Because reach is great." },
        { type: "pull", text: "Relevant reach is better." },
        {
          type: "figure",
          src: "/media/case-studies/mvri-by-the-sea/figure-2-v2.webp",
          alt: "Audience gender mix moving from a near-even 51% female baseline to 94.7% female reach",
          width: 1361,
          height: 768,
        },

        { type: "heading", text: "Then came the fun part. The ads." },
        { type: "text", text: "One creative doesn't need to do everything." },
        {
          type: "text",
          text: "Some creatives need to stop the scroll. Some need to make people curious. Others need to get them clicking, enquiring or taking the next step.",
        },
        {
          type: "text",
          text: "So we built campaigns around different jobs in the funnel.",
        },
        {
          type: "cards",
          items: [
            {
              title: "Reels that get noticed.",
              text: "Short-form videos, product details and influencer-led content helped bring the brand into more feeds and build awareness.",
            },
            {
              title: "Creatives that make people look twice.",
              text: "Product-led carousels and strong visual storytelling gave people a closer look at the pieces.",
            },
            {
              title: "Ads that get people moving.",
              text: "Product-focused statics and purchase-oriented creatives helped drive direct enquiries and leads.",
            },
          ],
        },
        {
          type: "text",
          text: "We tested different formats, watched what people responded to and gave the stronger performers room to do more.",
        },
        {
          type: "list",
          items: [
            "Some need to get attention.",
            "Some need to build the brand.",
            "Some need to get the click.",
            "Some need to get the DM.",
          ],
        },
        { type: "text", text: "So we tested across the funnel." },
        {
          type: "steps",
          items: [
            "Reels",
            "Carousels",
            "Product statics",
            "UGC-style content",
            "Influencer-led content",
          ],
        },
        { type: "text", text: "And the pattern became pretty clear." },
        {
          type: "lead",
          text: "Different creatives. Different roles. One connected strategy.",
        },

        { type: "heading", text: "Not just one campaign. A whole funnel." },
        {
          type: "text",
          text: "We brought together awareness, traffic, sales and messaging campaigns instead of relying on a single campaign objective.",
        },
        {
          type: "text",
          text: "That meant reaching new audiences, bringing interested people closer to the brand and creating more opportunities for them to take action.",
        },
        {
          type: "text",
          text: "We also used non-feed placements and dark-post campaigns where they made sense, allowing us to test and distribute campaign creatives beyond the regular organic feed.",
        },
        {
          type: "text",
          text: "And as the data came in, we kept refining the mix.",
        },
        { type: "lead", text: "Test. Learn. Optimise. Repeat." },
        {
          type: "text",
          text: "Because the point isn't to spend more. It's to make smarter decisions with the spend.",
        },

        { type: "heading", text: "Now, let's talk numbers." },
        {
          type: "text",
          text: "From the first campaign traction to the larger scale-up, here's what the campaigns generated across the reported windows:",
        },
        {
          type: "figure",
          src: "/media/case-studies/mvri-by-the-sea/figure-3-v2.webp",
          alt: "Four-month campaign impact: 6M+ Instagram views, 1.38M+ peak accounts reached, 45K+ content interactions, 10K+ website link clicks, 2000+ qualified leads",
          width: 1376,
          height: 768,
        },

        { type: "heading", text: "And the audience kept growing." },
        {
          type: "text",
          text: "A campaign can bring someone to your profile. A good brand experience gives them a reason to stay.",
        },
        {
          type: "text",
          text: "MVRI's lifetime Instagram follower base moved from approximately 9.2K to 12.6K+ through the engagement.",
        },
        {
          type: "text",
          text: "More people discovering the brand. More people choosing to follow along. More potential customers entering the picture.",
        },
        {
          type: "figure",
          src: "/media/case-studies/mvri-by-the-sea/figure-4-v2.webp",
          alt: "Lifetime follower progression from 9.2K to 12.6K+, with 90%+ female and niche-specific followers",
          width: 1396,
          height: 768,
        },

        {
          type: "heading",
          text: "A million views is nice. What happens next matters more.",
        },
        {
          type: "text",
          text: "The account went on to cross the million-view mark in multiple reported campaign windows, with one scale-up snapshot recording over 1.4M views and 1.38M accounts reached.",
        },
        {
          type: "text",
          text: "But we weren't looking at views in isolation. We were looking at the bigger picture: who was seeing the brand, what they were engaging with, which creatives were driving enquiries and where the next opportunity was.",
        },
        {
          type: "text",
          text: "That meant making changes when the data called for them, not just keeping campaigns running because they were already live.",
        },
        {
          type: "lead",
          text: "And that's the difference between simply running ads and actually managing performance.",
        },

        { type: "heading", text: "So, what did we take away?" },
        {
          type: "list",
          items: [
            "A strong product gets you started.",
            "The right audience gets you closer.",
            "The right creative gets people interested.",
            "And a well-built funnel gives that interest somewhere to go.",
          ],
        },
        {
          type: "text",
          text: "With MVRI, the work wasn't about finding one magic ad and calling it a day. It was about testing different ways to reach people, understanding what worked and building on those signals.",
        },
        {
          type: "pull",
          text: "More than just getting seen. Getting somewhere.",
        },
      ],
      cta: {
        heading: "Want your brand to be our next growth story?",
        button: "Let's talk",
        href: "/contact",
      },
      signoff: {
        brand: "MVRI by the Sea × ThirtyThree",
        line: "Good products deserve good marketing. Great performance makes it count.",
      },
    },
  },
];

/* ───────────────────────────── feedbacks ───────────────────────────── */

export const testimonials: Testimonial[] = [
  {
    id: "rk",
    initials: "RK",
    name: "R. Kapoor",
    role: "Founder, D2C Fashion",
    quote:
      "They think like operators, not vendors. Every dollar is treated like it's their own.",
  },
  {
    id: "an",
    initials: "AN",
    name: "A. Nair",
    role: "Marketing Lead, Beauty Brand",
    quote:
      "Sincere, sharp and obsessed with the numbers that actually move the business.",
  },
  {
    id: "sm",
    initials: "SM",
    name: "S. Mehta",
    role: "Co-founder, Consumer Brand",
    quote:
      "Clear reporting, fast execution and a team that genuinely cares about our growth. Our campaigns finally feel scalable.",
  },
];

export const testimonialsSection = {
  eyebrow: "Words of thanks",
  title: "What leaders say.",
  note: "Placeholder quotes — replace with real client testimonials.",
};

/* ───────────────────────────── about page ───────────────────────────── */

export const aboutPage = {
  intro: {
    eyebrow: "About Thirtythree",
    title: "We don’t just make brands look good online.",
    titleDim: "We make them work.",
    facts: [
      { value: "2024", label: "Established, and growing brands since" },
      { value: "Meta", label: "Certified social media marketers" },
    ],
    paragraphs: [
      "Thirtythree is a performance marketing company built around one simple idea: being seen is great, but being seen by the right people is better.",
      "We help brands build a strong online presence through social media marketing, paid advertising, and performance-driven strategy — bringing together creative ideas, sharp targeting, and data that actually tells us something.",
      "From scrolling thumbs to serious leads, we’re focused on turning digital attention into meaningful outcomes.",
      "Our team consists of META-certified social media marketers who understand that good marketing isn’t about blindly following trends. It’s about testing, learning, optimising, and scaling what works.",
      "Our strategies are data-backed, tried, tested, and built around what actually works in the ever-changing digital landscape. Since 2024, we’ve been helping brands grow their presence, reach the right audiences, and turn their digital platforms into growth engines.",
    ],
  },
  story: {
    eyebrow: "Our story",
    title: "Why Thirtythree exists",
    before: [
      "Thirtythree started with a visible gap in this niche, a lot of curiosity, and a slightly unhealthy obsession with figuring out why some marketing works and some… really doesn’t.",
      "The journey began with an early role in the social media industry, followed by experience at an edtech startup. It was here that the foundations were built — from executing marketing ideas and experimenting with strategies to understanding how digital assets can be built, tested, and scaled.",
      "But somewhere along the way came a realisation:",
    ],
    pull: "Why just execute someone else’s vision when you could build your own?",
    after: [
      "Freelancing became the next step. It meant working directly with clients, owning the process from strategy to execution, and — most importantly — seeing the actual impact of the work.",
      "That experience changed the perspective from “doing marketing” to “building businesses through marketing.”",
      "And that’s where Thirtythree came in.",
      "What started as an individual pursuit evolved into a brand built around ownership, accountability, creativity, and measurable growth.",
      "Today, Thirtythree exists to help brands stop treating digital marketing like another box to tick — and start treating it like what it really is:",
    ],
    bigEnd: "A growth hack.",
  },
  founder: {
    eyebrow: "About the founder",
    name: "Aryan Tandon",
    role: "Founder & Strategist, Thirtythree",
    duo: [
      { value: "~5", label: "Years in social media" },
      { value: "4", label: "Years in performance marketing" },
    ],
    paragraphs: [
      "Nearly five years in social media. Four years in performance marketing. And a slightly obsessive habit of asking, “But why are we doing it this way?”",
      "Aryan Tandon is the founder and strategist behind Thirtythree — a digital marketer who likes to sit somewhere between creative thinking, data, and getting his hands dirty with the actual campaigns.",
      "From shaping brand strategies and working closely with clients to diving into targeting, creatives, campaigns and performance, Aryan is involved where the ideas meet the numbers.",
    ],
    emphasis: {
      before:
        "His approach is simple: don’t follow the playbook just because it exists. ",
      strong: "Question it. Test it. Make it better.",
    },
  },
  backstory: {
    eyebrow: "The backstory",
    title: "Business foundations, hands-on education.",
    creds: [
      {
        title: "Graduation, Delhi University",
        text: "From a renowned college in Delhi University.",
      },
      {
        title: "MBA, Entrepreneurship & Leadership",
        text: "A foundation in business and what it takes to build and scale one.",
      },
      {
        title: "Digital Marketing, IIT Delhi",
        text: "Certification with a focus on Instagram and Facebook Ads.",
      },
      {
        title: "Marqet Cloud Solutions Pvt. Ltd.",
        text: "Industry recognition for expertise in Performance Marketing Strategies and ROI optimisation.",
      },
    ],
    paragraphs: [
      "Aryan holds a graduation degree from a renowned college in Delhi University, followed by an MBA specialising in Entrepreneurship & Leadership, combining a foundation in business with a deeper understanding of what it takes to build and scale one.",
      "His professional journey is backed by industry-focused certifications and recognition, including a Digital Marketing certification from IIT Delhi, with a focus on Instagram and Facebook Ads, along with industry recognition from Marqet Cloud Solutions Pvt. Ltd. for expertise in Performance Marketing Strategies and ROI optimisation.",
      "But certifications are only one part of the story.",
      "The real education has come from running campaigns, testing ideas, learning from what flopped, doubling down on what worked, and doing it all over again.",
      "At Thirtythree, Aryan brings all of that to the table — strategy without the jargon, creativity with a purpose, and performance that can actually be measured.",
    ],
    closer: {
      line: "Because at the end of the day, the goal isn’t to make marketing look busy.",
      end: "It’s to make it work.",
      button: "Start a project",
    },
  },
};

/* ───────────────────────────── contact page ───────────────────────────── */

export const contactPage = {
  eyebrow: "Contact us",
  title: "Got a brand to grow?",
  titleDim: "Let’s make it work.",
  lede: "Tell us about your brand, your goals and where things feel stuck. We’ll take it from there — strategy without the jargon, and performance that can actually be measured.",
  formTitle: "Start a project",
  services: [
    "Performance marketing",
    "Website development",
    "Social media management",
    "Creative and content",
    "Branding and strategy",
    "Others",
  ],
};

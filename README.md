# grey advisor — AI real estate for india

> find verified properties, run investment math, and book site visits. all in one chat.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript) ![Supabase](https://img.shields.io/badge/Supabase-auth%20%2B%20db-green?logo=supabase) ![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3_70B-orange) ![RERA](https://img.shields.io/badge/RERA-verified-emerald)

---

## what is this

grey advisor is an ai-powered real estate platform i built for the indian property market. instead of doing the boring filter thing (pick bhk, pick budget, click search) you just describe what you want in plain english and the ai figures it out.

like: *"3bhk in baner pune under 90 lakhs, rera verified, near good schools"*

and it gives you actual verified property cards with prices, rental yields, and a button to book a site visit on whatsapp.

i also built a full property valuation tool (avm), emi calculator, rera checker, area comparison, interactive map, and more. basically everything a real estate buyer would need.

---

## features

- **ai concierge** — groq llama 3.3 70b powering natural language property search
- **property valuation (avm)** — ai estimates market value with confidence scores + bull/bear analysis
- **map search** — maplibre gl interactive map with cluster view, bhk/price filters
- **emi calculator** — real-time slider with principal vs interest breakdown
- **rera verification** — check if a project is registered before investing
- **area comparison** — compare two micro-markets on price, yield, infra etc
- **market trends** — price trend charts with recharts
- **wishlist** — save properties (needs sign in)
- **whatsapp booking** — direct site visit booking from property cards
- **premium plans** — subscription tier (razorpay integration)

---

## tech stack

| thing | what i used |
|---|---|
| framework | Next.js 16.2 (app router + turbopack) |
| language | TypeScript 5 |
| styling | Tailwind CSS v4 |
| ai / llm | Groq LLaMA 3.3 70B via @ai-sdk/groq |
| auth | Supabase Auth + @supabase/ssr |
| database | Supabase (postgres) |
| maps | MapLibre GL JS |
| charts | Recharts |
| validation | Zod (price guardrails so ai cant hallucinate ₹200/sqft in mumbai lol) |
| icons | Lucide React |

---

## about me

hey, im hridya. im 17 and i built this whole thing basically because i was bored and wanted to learn nextjs properly. my family was looking for a flat in pune and the existing sites like magicbricks and 99acres were honestly terrible — slow, full of fake listings, and zero ai integration.

so i thought, why not build something better. started as a weekend project and kind of got out of hand. now its a full platform with auth, ai, maps, payment integration, and like 15+ pages.

i dont have a CS degree (obviously lol) but ive been coding since i was 14. mostly self-taught through youtube, docs, and a lot of stackoverflow. this project is probably the most complex thing ive built so far.

if you find any bugs or want to contribute, open an issue or just dm me.

---

## how to install and run

### what you need first

- node.js 18 or higher (check with `node -v`)
- npm (comes with node)
- a supabase account — free tier works fine, go to [supabase.com](https://supabase.com)
- a groq api key — also free, get it at [console.groq.com](https://console.groq.com)

### step 1 — clone the repo

```bash
git clone https://github.com/hridyagarg098-oss/grey.deal.git
cd grey.deal/grey-advisor-next
```

### step 2 — install dependencies

```bash
npm install
```

this installs everything. might take a minute or two.

### step 3 — set up environment variables

create a file called `.env.local` in the `grey-advisor-next` folder:

```bash
cp .env.example .env.local
```

then open `.env.local` and fill in your keys:

```env
# supabase (required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# groq (required — this powers the ai concierge and valuation)
GROQ_API_KEY=your_groq_api_key

# anthropic claude (optional)
ANTHROPIC_API_KEY=sk-ant-...

# google ai (optional — for gemini features)
GOOGLE_AI_KEY=AIza...

# google places (optional — for real property photos)
GOOGLE_PLACES_API_KEY=AIza...

# razorpay (optional — only needed for premium subscription)
RAZORPAY_KEY_ID=rzp_...
RAZORPAY_KEY_SECRET=...
```

> **dont commit your .env.local** — its already in .gitignore but just double check

### step 4 — run it

```bash
npm run dev
```

open [http://localhost:3000](http://localhost:3000) in your browser.

the ai concierge is at `/concierge`, the map is at `/map`, valuation tool at `/avm`.

---

## project structure

```
grey-advisor-next/
├── src/
│   ├── app/
│   │   ├── api/              ← all the backend routes
│   │   │   ├── concierge/    ← ai chat api (groq)
│   │   │   ├── avm/          ← property valuation api
│   │   │   ├── auth/         ← signin, signup, signout, me
│   │   │   ├── rera-check/   ← rera compliance checker
│   │   │   ├── whatsapp/     ← whatsapp booking webhook
│   │   │   ├── wishlist/     ← save/unsave properties
│   │   │   └── search/       ← ai search intent parser
│   │   ├── concierge/        ← ai chat page
│   │   ├── avm/              ← property valuation page
│   │   ├── map/              ← interactive map
│   │   ├── emi-calculator/   ← emi tool
│   │   ├── compare-areas/    ← area comparison
│   │   ├── rera/             ← rera lookup
│   │   ├── trends/           ← price trends charts
│   │   ├── wishlist/         ← saved properties
│   │   ├── premium/          ← subscription plans
│   │   └── auth/             ← signin / signup pages
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileNav.tsx
│   │   └── ui/               ← shadcn components
│   └── lib/
│       ├── ai-router.ts      ← routes to groq chat/financial/complex model
│       ├── validation.ts     ← zod price guardrails (city benchmarks)
│       ├── financial-calculations.ts  ← emi, ltcg, gst, stamp duty math
│       ├── intent-parser.ts  ← extracts bhk/city/budget from natural language
│       └── rag.ts            ← property database + market data queries
├── middleware.ts              ← supabase auth + html redirect fix
└── .agents/skills/            ← agentic skill documentation
```

---

## known issues / roadmap

- [ ] rag pipeline — need to migrate properties to supabase pgvector for real semantic search
- [ ] real listings — currently uses curated seed data, not live scraped listings
- [ ] mobile app — react native version planned
- [ ] gemini vision — property photo analysis (coming when i figure out the api lol)
- [ ] real-time price updates via supabase realtime on the map

---

## due out / shoutouts

big thanks to:

- **groq** — for making llama 3.3 70b inference insanely fast and free (seriously)
- **supabase** — the auth and db setup was way easier than i expected
- **vercel / nextjs team** — the app router docs actually saved me multiple times
- **lucide icons** — clean icon library, no drama
- **maplibre-gl** — open source maps without needing google maps billing
- **the indian real estate community on twitter/x** — got a lot of price benchmark data from threads there
- **my dad** — who kept asking about the pune flat and accidentally gave me the idea for this

and anyone who stars this repo, you're a legend honestly.

---

## disclaimer

grey advisor is an ai-generated advisory tool for informational purposes only. all property valuations, rera ids shown (unless explicitly verified), and investment analysis are illustrative. always verify property details independently and consult a sebi-registered advisor before making real estate investment decisions.

---

## license

MIT — do whatever you want with it, just don't blame me if the ai hallucinates a ₹10L flat in south mumbai lol

---

<div align="center">
  built with ❤️ by hridya · 17 · pune/mumbai
  <br/>
  <strong>grey advisor</strong> — ai property intelligence for india
</div>

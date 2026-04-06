# OnTheWay

## The Problem

I enjoy reading fiction but every short story I find online is either too short
to be satisfying or too long to finish in a single commute. My train ride is
12 minutes. Books require too much context to jump in and out of. Articles feel
like homework. I built OnTheWay so that anyone with a commute and a genre
preference can get a complete short story — beginning, middle, and end — sized
to fit exactly inside their travel window.

## What It Does

The user selects their commute duration (5–25 minutes) and a genre (thriller,
mystery, folklore, sci-fi, or romance). OnTheWay sends these inputs to a backend
Express server which calculates the target word count, builds a structured prompt,
and calls the OpenRouter AI API. The AI returns a complete, self-contained short
story calibrated to that exact reading length. The user gets a fresh piece of
fiction that fits their commute — something that didn't exist before they clicked
Generate.

## AI Integration

**API:** OpenRouter  
**Model:** openai/gpt-4o-mini  
**Location:** `backend/controllers/story.controllers.js` → `story()` function  
**What the AI does:** Transforms a duration and genre into a complete,
self-contained short story calibrated to the user's exact commute length.

## What I Intentionally Excluded

- **Audio/TTS output** — Would require a second API integration, audio blob
  handling in the browser, and autoplay restrictions across browsers. The reading
  experience is the core product. Audio is a future v2.
- **User accounts and saved stories** — Requires a database and authentication
  layer. The tool is stateless by design — every commute is a fresh request.
  This keeps the architecture simple and the experience frictionless.
- **Story ratings and recommendations** — Training a preference model is a
  separate product entirely. The genre and duration inputs already give users
  direct control, which solves the same need more simply.

## Monthly Cost Calculation

Model: openai/gpt-4o-mini  
Input rate: $0.15 per 1M tokens  
Output rate: $0.60 per 1M tokens

Avg input tokens per call: ~200 (system prompt + user params)  
Avg output tokens per call: ~1,800 (a 1,200-word story ≈ 1,600 tokens)

Cost per call:

- Input: (200 / 1,000,000) × $0.15 = $0.000030
- Output: (1,800 / 1,000,000) × $0.60 = $0.001080
- Total per call: $0.001110

Expected calls/month: 200  
**Monthly total: 200 × $0.001110 = $0.222 (~$0.22/month)**

Note: Output tokens dominate the cost because stories are long. A single
20-minute story request (~2,400 words) costs roughly $0.002 — still under
half a cent.

## Live Deployment

**Frontend:** [\[Vercel Deployment Link\]](https://ontheway-phi.vercel.app/)
**Backend:** [\[Railway Deployment Link\]](https://ontheway-production-118a.up.railway.app/)

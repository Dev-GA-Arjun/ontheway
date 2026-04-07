# OnTheWay

## What It Is

A web app that generates complete short stories sized to fit your exact commute
length, and lets you save, rename, and revisit the ones worth keeping.

## The Problem It Solves

I enjoy reading fiction but every short story I found online was either too short
to be satisfying or too long to finish in a single commute. OnTheWay generates a
complete story — beginning, middle, and end — calibrated to fit exactly inside
your travel window, and saves the ones you want to read again.

## What I Intentionally Excluded

- **Audio/TTS output**: Would require a second API integration and audio blob
  handling in the browser. The reading experience is the core product — audio is a
  future v2.
- **User authentication**: Adding login would require sessions or JWT tokens,
  significantly increasing complexity. The library is device-local for now, which
  is sufficient for a single commuter's use case.
- **Story ratings and recommendations**: Training a preference model is a separate
  product. Genre and duration inputs already give users direct control, which
  solves the same need more simply.

## Tech Stack

- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Frontend**: React (Vite) + React Router
- **Deployed**: Railway (backend) + Vercel (frontend)

## Live Deployment

**Frontend:** [ontheway-phi.vercel.app](https://ontheway-phi.vercel.app/)  
**Backend:** [ontheway-production-118a.up.railway.app](https://ontheway-production-118a.up.railway.app/)

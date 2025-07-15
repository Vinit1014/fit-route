
## FitRoute Lite

A lightweight, real-time route tracking app built with React, TypeScript, and TailwindCSS — powered by native Web APIs for geolocation, network awareness, and device wake-locks. Ideal for runners, cyclists, or anyone who wants to track movement without relying on third-party mapping libraries.

### Live Demo

[🔗 Visit the deployed app](https://fit-route.vercel.app/)

---

## Features

*  **Real-time location tracking** using the **Geolocation API**
*  **Prevents screen from sleeping** while tracking using the **Wake Lock API**
*  **Detects network quality (2G/3G/4G)** and warns about offline mode using the **Network Information API**
*  **Canvas-based route visualization** — plots your movement path live
*  Fully client-side, no backend or third-party APIs involved

---

## Web APIs Used

| Web API                     | Purpose                                              |
| --------------------------- | ---------------------------------------------------- |
| **Geolocation API**         | Tracks user location as they move                    |
| **Wake Lock API**           | Keeps screen active while tracking is running        |
| **Network Information API** | Detects online/offline state and connection type     |
| **Canvas API**              | Renders a live visual path from your GPS coordinates |

> ⚠️ *The Background Tasks API is still experimental and not fully supported. As a fallback, the Wake Lock API is used to simulate persistent behavior during location tracking.*

---

## Tech Stack

* [React + Vite + TypeScript](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* Custom React Hooks (`useGeoTracker`, `useWakeLock`, `useNetworkStatus`)
* HTML Canvas API for drawing the route

---

## How to Run Locally

```bash
git clone https://github.com/your-username/fitroute-lite.git
cd fitroute-lite
npm install
npm run dev
```

---

##  Folder Structure

```
src/
├── App.tsx
├── components/
│   └── RouteCanvas.tsx
│   └── Tracker.tsx
├── hooks/
│   ├── useGeoTracker.ts
│   ├── useNetworkStatus.ts
│   └── useWakeLock.ts
```

---


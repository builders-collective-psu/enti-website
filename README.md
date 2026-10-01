# Penn State Engineering Entrepreneurship (E-SHIP)

Modern, interactive web platform for the **Engineering Entrepreneurship Program** (Product Innovation Cluster) in the School of Engineering Design and Innovation (SEDI), Penn State College of Engineering.

Inspired by [alche.studio](https://alche.studio/) with scroll-driven Three.js dynamic visualization, brutalist typography, technical cluster modeling, and live builder showcases.

---

## Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with glassmorphic brutalist design tokens
- **3D Choreography**: [Three.js](https://threejs.org/) (scroll-driven camera lerping, exploded assembly, gyroscopic precession, procedural particle field)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Hosting & CI/CD**: [Vercel](https://vercel.com/)

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Development

```bash
npm install
npm run dev
```

Local server starts at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

Artifacts are compiled into `dist/`.

---

## Core Architecture

- `src/components/ThreeCanvas.tsx`: Fullscreen WebGL canvas with 5-stage scroll-driven camera lerping:
  1. Hero Stage: Dynamic wireframe dual-tetrahedron / core lattice with cursor reactive lighting.
  2. Technical Architecture: Exploded cross-section articulating CAD, PCBs, and BOMs.
  3. The Forge: High-velocity gyroscopic precession representing hardware prototyping.
  4. Roster & Community: Camera orbit offset to frame faculty and Builders Collective.
  5. Global Immersion: Orbital satellite ring plane representing global hardware delegations (TSMC, Taiwan Tech).
- `src/components/Navbar.tsx`: HUD glassmorphic navigation with live telemetry indicator and quick-jump links.
- `src/components/Hero.tsx`: Brutalist header with technical pillars and key program metrics.
- `src/components/EngineeringCluster.tsx`: Clarifies E-SHIP's engineering identity vs generic business entrepreneurship.
- `src/components/Curriculum.tsx`: Interactive course inspector for ENGR 310, 407, 411, 425, and technical electives.
- `src/components/FacultySection.tsx`: Complete roster (Ted Graef, Brad Groznik, Dr. Frank Koe, Daniel Goldberg, Gregory Woodman, Angela Rothrock, Steve Betza).
- `src/components/VenturesAndBuilders.tsx`: GameDay Ventures (Whirl Pong case study) and Penn State Builders Collective (`psu.builders`).
- `src/components/TaiwanExpedition.tsx`: Global hardware immersion recap (TSMC, OnLogic, TAILYN, ViewSonic, Taipei Tech).
- `src/components/ContactSection.tsx`: Direct mail dispatcher and SEDI room 304 location details.

---

## Continuous Deployment

This repository is connected directly to Vercel. Pushes to `main` automatically trigger production builds and deployments.

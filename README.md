# FitLog — Train With Intent. Log Every Set.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A modern, dark-themed workout planner built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. FitLog lets users browse exercises across every major muscle group, build a focused daily training plan, bookmark lifts for later, and track live workout metrics — all persisted client-side.

**Live Demo:** [https://fitlog-murex.vercel.app/](https://fitlog-murex.vercel.app/) <br/>
**Repository:** [github.com/CodeWithTanim/FITLOG-PH-Module-6-Assignment-6](https://github.com/CodeWithTanim/FITLOG-PH-Module-6-Assignment-6)

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Design Decisions](#design-decisions)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

FitLog is a full client-side workout management app: a searchable exercise library, a plan builder with a deliberate daily cap, a saved-for-later list, and real-time metrics — built to demonstrate clean component architecture, typed context-based state management, and a production-quality dark UI.

## Key Features

### Workout Library

- 12+ exercises spanning Chest, Back, Arms, Legs, Core, and Shoulders.
- Responsive 3×4 grid with imagery, category tags, equipment requirements, and quick stats (duration, estimated calories, rating).

### Exercise Detail View

- Two-column layout with difficulty, target sets/reps, duration, and calorie estimates.
- Step-by-step, numbered form instructions for safe execution.

### Today's Plan

- One-click "Add to Plan" with a **built-in 5-exercise daily cap**, encouraging focused, non-excessive training sessions.

### Save for Later

- Bookmark any exercise to a dedicated Saved list.
- Promote saved lifts into Today's Plan whenever you're ready to train.

### Live Metrics

- Real-time totals for **exercises**, **workout duration**, and **calories burned**, recalculated instantly on every add/remove.

### Progress Tracking

- **Mark as Done** with visual confirmation (highlight, strikethrough, toast).
- One-click removal from either Plan or Saved lists.

### Sorting & Feedback

- Sort both Plan and Saved views by Duration, Calories, or Rating.
- Live navbar badges for Plan/Saved counts, with dark-themed toast notifications (`react-toastify`) on every action.

### Persistence

- Full state persistence via `localStorage` — plans, saved items, and completion status survive reloads and browser restarts.

### Responsive Design

- Optimized layouts across mobile, tablet, and desktop breakpoints.

## Tech Stack

| Technology                  | Role                                             |
| :-------------------------- | :----------------------------------------------- |
| **Next.js 16 (App Router)** | Routing, SSR, and route-level metadata           |
| **React 19**                | Component architecture and hooks-based state     |
| **TypeScript**              | End-to-end type safety and interface contracts   |
| **Tailwind CSS v4**         | Utility-first styling for the dark gym aesthetic |
| **DaisyUI 5**               | Semantic UI components on top of Tailwind        |
| **React Icons**             | Feather and FontAwesome icon sets                |
| **React Toastify**          | Toast notifications for user actions             |

## Project Structure

```text
src/
├── app/
│   ├── globals.css               # Global styles & Tailwind config
│   ├── layout.tsx                # Root layout, wrapped in WorkoutProvider
│   ├── page.tsx                  # Home — hero banner + library section
│   ├── not-found.tsx             # Custom 404 page
│   ├── my-plan/
│   │   └── page.tsx              # Plan page — tabs, metrics, sorting, cards
│   └── workout/
│       └── [id]/
│           └── page.tsx          # Exercise detail — specs + instructions
├── components/
│   ├── homepage/
│   │   ├── Banner.tsx            # Hero section with CTA
│   │   └── Library.tsx           # 3x4 exercise grid
│   ├── shared/
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx            # Active-route styling + live counters
│   │   ├── PlannedWorkoutCard.tsx
│   │   └── WorkoutCard.tsx
│   └── workoutDetails/
│       ├── AddToPlanButton.tsx
│       └── SaveForLaterButton.tsx
├── context/
│   └── WorkoutContext.tsx        # Global state + localStorage persistence
└── types/
    └── workout.type.ts           # Shared TypeScript interfaces
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- `npm`, `yarn`, or `pnpm`

### Installation

```bash
git clone https://github.com/CodeWithTanim/FITLOG-PH-Module-6-Assignment-6.git
cd FITLOG-PH-Module-6-Assignment-6
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command         | Description                           |
| :-------------- | :------------------------------------ |
| `npm run dev`   | Starts the local development server   |
| `npm run build` | Creates an optimized production build |
| `npm run start` | Serves the production build           |
| `npm run lint`  | Runs the project linter               |

## Design Decisions

- **5-exercise daily cap** — a deliberate constraint that nudges users toward focused, sustainable training rather than overloading a single session.
- **Context + localStorage over a backend** — keeps the app fully client-side for this scope, while the `WorkoutContext` layer is structured so a future API/database swap only touches one module.
- **Typed workout model** — a single `workout.type.ts` source of truth keeps the library, plan, and detail views in sync and refactor-safe.

## Roadmap

- [ ] User accounts with cloud-synced plans
- [ ] Weekly/monthly progress history and charts
- [ ] Custom exercise creation
- [ ] Deployed live demo link

## License

© 2026 **FitLog**. Released under the [MIT License](LICENSE).

---

<p align="center">Built by <a href="https://github.com/CodeWithTanim">CodeWithTanim</a></p>

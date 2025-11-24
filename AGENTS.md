# AGENTS.md

This file provides guidance to coding agents working in this repository.

## Project Overview

BeerClicker is an idle game built with Next.js 16 and React 19. The game is a beer-themed clicker where players accumulate beers by clicking and purchasing buildings that generate beers automatically. Players can also unlock a research system that generates "hops" currency to unlock new buildings, and earn achievements for reaching milestones.

**Tech Stack:**

- Next.js 16.0.3 with App Router and Turbopack (dev) / Webpack (production builds)
- React 19.2.0
- TypeScript 5.9.3
- Material UI 7.3.5 with Emotion styling
- Zustand 5.0.8 for state management (with devtools, persist, subscribeWithSelector, and immer middleware)
- Immer 11.0.0 for immutable state updates
- Custom game loop using requestAnimationFrame (frame-rate independent)
- react-hot-toast 2.6.0 for notifications
- Vitest 4.0.13 for testing

**Recently Migrated:** This project was recently migrated from Create React App to Next.js 16 with React 19 and Material UI v7 upgrades. The README.md still contains outdated CRA documentation.

## Development Commands

```bash
# Start development server (uses Turbopack)
npm run dev

# Build for production (uses Webpack)
npm run build

# Run production build locally
npm start

# Lint code
npm run lint

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Architecture Overview

**State Management:**
- Zustand store with middleware stack (devtools, persist, subscribeWithSelector, immer)
- Automatic localStorage persistence for game state
- Hydration handling to prevent SSR mismatches (`useHydration` hook)
- Selector hooks in `src/store/selectors.ts` for optimized re-renders

**Game Loop:**
- Custom implementation using `requestAnimationFrame` (not a third-party library)
- Frame-rate independent calculations using delta time
- FPS tracking with 60-frame rolling average
- Auto-save every 10 seconds
- Located in `src/hooks/useGameLoop.ts`

**Code Organization:**
- `src/game-logic/` - Pure business logic functions
- `src/store/` - Zustand state management
- `src/entities/` - Game UI components (Buildings, Research, Achievements)
- `src/viewComponents/` - UI components (BeerClicker)
- `src/assets/` - Game data definitions
- `src/hooks/` - Custom React hooks
- `src/types/` - TypeScript type definitions
- `app/` - Next.js App Router files

**Game Features:**
- **Resources:** Beers (primary currency), Hops (research currency)
- **Buildings:** 6 types with exponential cost scaling (Brew Kit, Fellow Sapper, Beer Tree, Craft Brewery, Hopetship, Corporate Office)
- **Research:** Magnifying Glass (unlocks at 3 total buildings owned)
- **Achievements:** 6 achievements with toast notifications
- **Clicking:** Click beer SVG to increment beers, animated floating "+1" numbers
- **Audio:** Audio files present but NOT yet implemented (deferred feature)

## Definition of Done

Before considering any task complete, ALL of the following criteria must be met:

1. **Tests Pass**: All tests must be updated to reflect changes and must pass successfully
2. **Lint Clean**: `npm run lint` must complete with zero errors
3. **Build Success**: `npm run build` must complete without any errors
4. **Runtime Clean**: Run `npm run dev` to start the app in dev mode. Use the playwright mcp to validate that it renders correctly.

These checks are non-negotiable. If any criterion fails, the work is not complete.

## Testing Considerations

**Current Test Status:**
- Testing framework: Vitest with happy-dom environment
- Coverage: Minimal (only sanity test exists at `src/__tests__/sanity.test.ts`)
- Setup: Mock localStorage, Audio, and window.matchMedia in `src/test/setup.ts`

**Important Test Scenarios:**
- Test building purchases update costs correctly (exponential growth formula: `baseCost × growthRate^(owned + 1)`)
- Verify production is frame-rate independent (test at different FPS)
- Check achievement unlocks trigger only once and at correct thresholds
- Verify unlock conditions work (e.g., Magnifying Glass at 3 total buildings)
- Test that clicking the beer icon increments beers correctly
- Verify localStorage persistence and hydration
- Test Zustand store actions and selectors
- Validate game loop calculations (delta time, auto-save every 10 seconds)
- **Note:** Audio playback is NOT yet implemented (files exist but feature is deferred)

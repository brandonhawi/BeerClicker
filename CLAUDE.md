# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BeerClicker is an idle game built with Next.js 16 and React 19. The game is a beer-themed clicker where players accumulate beers by clicking and purchasing buildings that generate beers automatically. Players can also unlock a research system that generates "hops" currency to unlock new buildings, and earn achievements for reaching milestones.

**Tech Stack:**

- Next.js 16.0.3 with App Router and Turbopack (dev) / Webpack (production builds)
- React 19.2.0
- TypeScript 5.9.3
- Tailwind CSS 4.1.17 with PostCSS for styling
- Zustand 5.0.8 for state management (with devtools, persist, subscribeWithSelector, and immer middleware)
- Immer 11.0.0 for immutable state updates
- Custom game loop using requestAnimationFrame (frame-rate independent)
- react-hot-toast 2.6.0 for notifications
- Vitest 4.0.13 for testing

**Recently Migrated:** This project was recently migrated from Create React App to Next.js 16 with React 19. It also transitioned from Material UI to Tailwind CSS for styling. The README.md still contains outdated CRA documentation.

## Development Commands

```bash
# Start development server (uses Turbopack)
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Lint code
npm run lint
```

## Definition of Done

Before considering any task complete, ALL of the following criteria must be met:

1. **Tests Pass**: All tests must be updated to reflect changes and must pass successfully
2. **Lint Clean**: `npm run lint` must complete with zero errors
3. **Build Success**: `npm run build` must complete without any errors
4. **Runtime Clean**: Run `npm run dev` to start the app in dev mode. Use the playwright mcp to validate that it renders correctly.

These checks are non-negotiable. If any criterion fails, the work is not complete.

## Testing Considerations

- Test building purchases update costs correctly (exponential growth formula: `baseCost × growthRate^(owned + 1)`)
- Verify production is frame-rate independent (test at different FPS)
- Check achievement unlocks trigger only once and at correct thresholds
- Verify unlock conditions work (e.g., Magnifying Glass at 3 total buildings)
- Test that clicking the beer icon increments beers correctly
- Verify localStorage persistence and hydration
- Test Zustand store actions and selectors
- Validate game loop calculations (delta time, auto-save every 10 seconds)
- **Note:** Audio playback is NOT yet implemented (files exist but feature is deferred)

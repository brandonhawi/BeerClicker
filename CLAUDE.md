# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BeerClicker is an idle game built with Next.js 16 and React 18. The game is a beer-themed clicker where players accumulate beers by clicking and purchasing buildings that generate beers automatically. Players can also unlock a research system that generates "hops" currency to unlock new buildings, and earn achievements for reaching milestones.

**Tech Stack:**

- Next.js 16 with App Router and Turbopack
- React 18.3.1
- TypeScript 5.9.3
- Material UI 5.11.0 with Emotion styling
- react-game-engine for the game loop
- react-hot-toast for notifications

**Recently Migrated:** This project was recently migrated from Create React App to Next.js 16. The README.md still contains outdated CRA documentation.

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

- Test building purchases update costs correctly (exponential growth)
- Verify production is frame-rate independent (test at different FPS)
- Check achievement unlocks trigger only once
- Verify unlock conditions work (e.g., Magnifying Glass at 3 buildings)
- Test that clicking the beer icon increments beers correctly
- Ensure audio plays on clicks and achievement unlocks

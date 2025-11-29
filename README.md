# BeerClicker [![Build App](https://github.com/brandonhawi/BeerClicker/actions/workflows/build.yml/badge.svg)](https://github.com/brandonhawi/BeerClicker/actions/workflows/build.yml)

A beer-themed idle game built with Next.js 16 and React 19. Click to earn beers, purchase buildings for passive income, unlock research technologies, and achieve milestones!

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (uses Turbopack)
npm run dev

# Open http://localhost:3000 in your browser
```

## Tech Stack

- **Framework**: Next.js 16.0.3 with App Router
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.17 with PostCSS
- **State Management**: Zustand 5.0.8 (with devtools, persist, subscribeWithSelector, immer)
- **Testing**: Vitest 4.0.13
- **Notifications**: react-hot-toast 2.6.0

## Available Commands

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build            # Build for production (uses Webpack)
npm start                # Run production build locally

# Code Quality
npm run lint             # Run ESLint
npm run test             # Run tests once
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
```

## Game Features

### Resources
- **Beers**: Primary currency earned by clicking and building production
- **Hops**: Secondary currency unlocked through research

### Buildings
Six building types with exponential cost scaling:
- Brew Kit
- Fellow Sapper
- Beer Tree
- Craft Brewery
- Hopetship
- Corporate Office

### Gameplay Systems
- **Clicking**: Click the beer SVG to earn beers instantly
- **Production**: Buildings generate beers passively (frame-rate independent)
- **Research**: Unlock new buildings and upgrades (unlocks at 3 total buildings owned)
- **Achievements**: 6 achievements with toast notifications for milestones
- **Auto-save**: Game state saves every 10 seconds to localStorage

## Development Notes

### Game Loop
- Custom implementation using `requestAnimationFrame` (not a library)
- Frame-rate independent calculations using delta time
- 60-frame rolling average for FPS tracking

### State Management
- Zustand with localStorage persistence
- Automatic hydration to prevent SSR mismatches
- Immer middleware for immutable state updates

### Testing
- Minimal test coverage (sanity test only)
- Mock localStorage, Audio, and window.matchMedia in test setup
- Test framework: Vitest with happy-dom environment

### Future Features
- Audio implementation (files present but deferred)
- Additional achievements and progression systems
- UI/UX enhancements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)

## License

Private project

## Getting Help

For development guidance, see [AGENTS.md](./AGENTS.md) or [CLAUDE.md](./CLAUDE.md) for detailed architecture and testing information.

# BeerClicker Technology Revamp Plan

## Revamp Goal

Migrate BeerClicker from Create React App + react-game-engine to Next.js 16 + Zustand state management, and upgrade to latest versions of all dependencies.

## Target Stack (Latest Versions - 2025)

- **Framework**: [Next.js 16](https://nextjs.org/blog/next-16) (with Turbopack, Cache Components, App Router)
- **Runtime**: [React 19.2.0](https://react.dev/blog/2025/10/01/react-19-2) (latest with React Compiler v1.0)
- **Language**: [TypeScript 5.9.3](https://devblogs.microsoft.com/typescript/announcing-typescript-5-9/)
- **State Management**: [Zustand 5.0.8](https://github.com/pmndrs/zustand)
- **UI Library**: [Material UI 7.3.5](https://mui.com/blog/material-ui-v7-is-here/) (with ESM support, CSS Layers, Slots API)
- **Notifications**: [react-hot-toast 2.6.0](https://react-hot-toast.com/)

**System Requirements:**

- Node.js >= 20.9.0 (LTS)
- TypeScript >= 5.1.0

---

## Sprint Overview

**Total Story Points**: 74
**Sprint Count**: 2 sprints (maximum parallelization strategy)
**Team Size**: 12 developers working in parallel
**Timeline**: 4 weeks total

---

## Sprint 1: Foundation & Core Architecture

**Duration**: 2 weeks
**Story Points**: 35
**Team Size**: 8 developers
**Goal**: Establish Next.js foundation, implement all Zustand stores, and create game loop

### Week 1: Parallel Foundation Setup

#### Story 1: Next.js 16 Foundation Setup

**Tasks:**

- [ ] Initialize Next.js 16 project with App Router and TypeScript 5.9.3
- [ ] Configure `next.config.js` for client-side game (disable SSR for game components)
- [ ] Enable Turbopack as default bundler
- [ ] Set up directory structure (`app/`, `components/`, `stores/`, `lib/`)
- [ ] Configure `tsconfig.json` with TypeScript 5.9.3 settings
- [ ] Migrate static assets (click.wav, achievement.wav) to `/public` directory
- [ ] Set up environment configuration

**Acceptance Criteria:**

- Next.js 16 dev server runs with Turbopack
- App Router structure is in place
- Static assets accessible from `/public`
- TypeScript 5.9.3 compiles without errors
- Fast Refresh works correctly

---

#### Story 2: Dependency Updates & Package Management

**Assignee**: Developer B
**Points**: 3
**Dependencies**: None
**Parallel With**: Story 1

**Tasks:**

- [ ] Update `package.json` to React 19.2.0
- [ ] Update TypeScript to 5.9.3
- [ ] Install Material UI 7.3.5 (@mui/material, @emotion/react, @emotion/styled)
- [ ] Install Zustand 5.0.8 (may require --legacy-peer-deps with React 19)
- [ ] Install react-hot-toast 2.6.0 (may require --legacy-peer-deps with React 19)
- [ ] Remove react-game-engine from dependencies
- [ ] Remove react-scripts and Create React App dependencies
- [ ] Update all other dependencies to latest compatible versions
- [ ] Configure package.json scripts for Next.js (dev, build, start, lint)
- [ ] Verify Node.js >= 20.9.0 requirement in package.json

**Acceptance Criteria:**

- All dependencies install without conflicts
- `npm run dev` works with Next.js 16
- No security vulnerabilities in dependencies
- Lock file is updated
- All dependencies are latest stable versions

---

#### Story 3: Material UI v7 Theme & Provider Setup

**Assignee**: Developer C
**Points**: 3
**Dependencies**: Stories 1, 2
**Parallel With**: Story 4 (starts mid-week)

**Tasks:**

- [ ] Create MUI v7 theme configuration using new Slots API
- [ ] Set up ThemeProvider in Next.js App Router layout
- [ ] Migrate existing theme colors (primary: #2f5ffc, secondary: #fccc2f)
- [ ] Leverage new CSS Layers feature for better integration
- [ ] Configure CSS baseline and global styles
- [ ] Test theme applies correctly to sample components
- [ ] Ensure ESM support is properly configured

**Acceptance Criteria:**

- Theme provider wraps the app correctly
- Custom colors preserved
- No MUI deprecation warnings
- New v7 features (Slots API, CSS Layers) properly configured

---

### Week 1-2: Sequential Store Development

#### Story 4: Game Store (Core State)

**Assignee**: Developer D
**Points**: 5
**Dependencies**: Story 2
**Blocks**: Story 5

**Tasks:**

- [ ] Create `stores/gameStore.ts` with Zustand 5.0.8
- [ ] Define state: `totalBeers`, `totalHops`, `currentFps`
- [ ] Implement actions:
  - `addBeers(amount: number)`
  - `addHops(amount: number)`
  - `updateFps(fps: number)`
  - `resetGame()` (for future use)
- [ ] Add TypeScript 5.9.3 types for store state and actions
- [ ] Write unit tests for store actions
- [ ] Use Zustand v5 best practices (no deprecated patterns)

**Acceptance Criteria:**

- Store compiles without TypeScript errors
- Actions correctly update state
- State is immutable (proper Zustand patterns)
- Tests pass
- Compatible with Zustand 5.0.8

---

#### Story 5: Buildings Store

**Assignee**: Developer E
**Points**: 8
**Dependencies**: Stories 2, 4
**Blocks**: Stories 6, 7 (both depend on buildingsStore)

**Tasks:**

- [ ] Create `stores/buildingsStore.ts`
- [ ] Import building definitions from `assets/buildings.ts`
- [ ] Define state: `buildings` Map with owned counts, costs, unlock status
- [ ] Implement actions:
  - `purchaseBuilding(buildingId: string)` - deducts beers, increments owned
  - `updateBuildingCosts()` - recalculates costs based on formula
  - `calculateProduction()` - returns total beers/sec from all buildings
  - `unlockBuilding(buildingId: string)` - marks building as available
- [ ] Add helper selectors:
  - `canPurchase(buildingId: string, totalBeers: number): boolean`
  - `getBuildingCost(buildingId: string): number`
- [ ] Integrate with gameStore for beer deduction

**Acceptance Criteria:**

- Buildings can be purchased when player has enough beers
- Costs scale correctly (baseCost × growthRate^owned)
- Production calculation is accurate
- Store integrates with gameStore

---

#### Story 6: Research Store

**Assignee**: Developer F
**Points**: 6
**Dependencies**: Stories 2, 4, 5
**Parallel With**: Story 7

**Tasks:**

- [ ] Create `stores/researchStore.ts`
- [ ] Import research building definitions from `assets/researchBuildings.ts`
- [ ] Define state: `researchBuildings` Map with owned counts, costs
- [ ] Implement actions:
  - `purchaseResearchBuilding(buildingId: string)` - deducts beers
  - `calculateHopProduction()` - returns total hops/sec
  - `unlockBuildingWithHops(buildingId: string)` - spends hops to unlock
- [ ] Add unlock validation logic
- [ ] Integrate with gameStore (beer deduction) and buildingsStore (unlocking)

**Acceptance Criteria:**

- Research buildings can be purchased with beers
- Hops production calculates correctly
- Can unlock regular buildings using hops
- Conditional unlocks work (e.g., Magnifying Glass at 3 buildings)

---

#### Story 7: Achievements Store

**Assignee**: Developer G
**Points**: 5
**Dependencies**: Stories 2, 4, 5
**Parallel With**: Story 6

**Tasks:**

- [ ] Create `stores/achievementsStore.ts`
- [ ] Import achievement definitions from `assets/achievements.ts`
- [ ] Define state: `achievements` Map with earned status, timestamps
- [ ] Implement actions:
  - `checkAchievements(gameState)` - evaluates all achievement conditions
  - `unlockAchievement(achievementId: string)` - marks as earned
  - `getEarnedCount(): number`
- [ ] Add achievement condition checkers for different types
- [ ] Integrate toast notifications via react-hot-toast 2.6.0

**Acceptance Criteria:**

- Achievements unlock when conditions are met
- Toast notifications appear on unlock using react-hot-toast 2.6.0
- Achievement state persists
- No duplicate unlock notifications

---

#### Story 8: Game Loop Implementation

**Assignee**: Developer H
**Points**: 5
**Dependencies**: Stories 4, 5, 6, 7

**Tasks:**

- [ ] Create `lib/gameLoop.ts` with requestAnimationFrame loop
- [ ] Implement FPS calculation and tracking
- [ ] Call store actions each frame:
  - Calculate beer production from buildings
  - Calculate hop production from research buildings
  - Update FPS in gameStore
  - Check achievements
- [ ] Create custom React hook `useGameLoop()` to start/stop loop
- [ ] Handle cleanup on unmount
- [ ] Optimize for React 19.2 performance improvements

**Acceptance Criteria:**

- Game loop runs at consistent FPS
- Production calculations are frame-rate independent
- Loop stops when component unmounts
- No memory leaks
- Compatible with React 19.2 concurrent features

---

### Sprint 1 Deliverables

✅ Next.js 16 project with Turbopack
✅ All latest dependencies installed
✅ Material UI v7 theme configured
✅ All 4 Zustand stores implemented
✅ Game loop functional

---

## Sprint 2: UI Migration & Integration

**Duration**: 2 weeks
**Story Points**: 31
**Team Size**: 6 developers (4 UI devs in parallel, 1 integration, 1 QA)
**Goal**: Migrate all UI components to Next.js 16, integrate everything, test, and cleanup

### Week 1: Parallel UI Component Migration

#### Story 9: BeerClicker Component Migration

**Assignee**: Developer I
**Points**: 4
**Dependencies**: Stories 1, 3, 4, 8
**Parallel With**: Stories 10, 11, 12

**Tasks:**

- [ ] Migrate `viewComponents/BeerClicker.tsx` to use Zustand hooks
- [ ] Replace entity props with `useGameStore()` hook
- [ ] Update click handler to call `gameStore.addBeers(1)`
- [ ] Ensure audio playback works in Next.js 16
- [ ] Migrate `viewComponents/BeerClickNumber.tsx` to work with new structure
- [ ] Test animated "+1" numbers appear on click
- [ ] Leverage React 19.2 optimizations

**Acceptance Criteria:**

- Beer icon is clickable and increments totalBeers
- Click sound plays
- Animated numbers appear and fade
- Component uses Zustand 5.0.8 hooks
- No performance regressions with React 19.2

---

#### Story 10: Buildings UI Migration

**Assignee**: Developer J
**Points**: 5
**Dependencies**: Stories 1, 3, 5, 8
**Parallel With**: Stories 9, 11, 12

**Tasks:**

- [ ] Migrate `entities/Buildings.tsx` to use Zustand hooks
- [ ] Migrate `entities/BuildingView.tsx` to use `useBuildingsStore()`
- [ ] Replace entity props with store selectors
- [ ] Update purchase handlers to call `buildingsStore.purchaseBuilding()`
- [ ] Update MUI components to v7 syntax (slots, slotProps)
- [ ] Ensure tooltips and disabled states work correctly
- [ ] Test useMemo optimizations with React 19.2

**Acceptance Criteria:**

- Buildings render with correct costs and owned counts
- Purchase buttons work and deduct beers
- Disabled state shows when cannot afford
- Tooltips display building descriptions
- MUI v7 Slots API used correctly

---

#### Story 11: Research UI Migration

**Assignee**: Developer K
**Points**: 5
**Dependencies**: Stories 1, 3, 6, 8
**Parallel With**: Stories 9, 10, 12

**Tasks:**

- [ ] Migrate `entities/Research.tsx` to use Zustand hooks
- [ ] Migrate `entities/ResearchBuildingView.tsx` to use `useResearchStore()`
- [ ] Update purchase handlers for research buildings
- [ ] Update unlock handlers to spend hops
- [ ] Update unlock hints to show requirements
- [ ] Ensure conditional unlocks work (Magnifying Glass logic)
- [ ] Apply MUI v7 updates

**Acceptance Criteria:**

- Research buildings can be purchased
- Hops accumulate correctly
- Can unlock regular buildings with hops
- Unlock hints display correctly
- MUI v7 compatible

---

#### Story 12: Achievements UI Migration

**Assignee**: Developer L
**Points**: 4
**Dependencies**: Stories 1, 3, 7, 8
**Parallel With**: Stories 9, 10, 11

**Tasks:**

- [ ] Migrate `entities/Achievements.tsx` to use Zustand hooks
- [ ] Migrate `viewComponents/Achievement.tsx` to use `useAchievementsStore()`
- [ ] Ensure toast notifications trigger on unlock
- [ ] Ensure achievement sound plays
- [ ] Update modal to show earned/unearned achievements
- [ ] Test achievement icons and descriptions render correctly
- [ ] Verify react-hot-toast 2.6.0 integration

**Acceptance Criteria:**

- Achievement bar shows earned count
- Modal displays all achievements
- Toast appears when achievement unlocked using react-hot-toast 2.6.0
- Sound effect plays on unlock

---

### Week 1-2: Integration, Testing, Cleanup

#### Story 13: Main App Layout & Integration

**Assignee**: Developer A
**Points**: 5
**Dependencies**: Stories 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 (all previous stories)

**Tasks:**

- [ ] Create Next.js `app/layout.tsx` with providers (MUI, Toaster)
- [ ] Create `app/page.tsx` as main game page
- [ ] Integrate all migrated components (BeerClicker, Buildings, Research, Achievements)
- [ ] Start game loop on page mount
- [ ] Remove all react-game-engine imports and references
- [ ] Test overall layout and responsiveness
- [ ] Leverage Next.js 16 Cache Components for optimization
- [ ] Configure Turbopack optimizations

**Acceptance Criteria:**

- All components render in Next.js app
- Game loop starts automatically
- Layout matches original design (drawers, center content)
- No console errors
- Turbopack builds successfully
- Cache Components configured for optimal performance

---

#### Story 14: Testing & Quality Assurance

**Assignee**: QA Team
**Points**: 8
**Dependencies**: Story 13

**Tasks:**

- [ ] Test clicking beer icon increments count
- [ ] Test purchasing buildings deducts beers and increases production
- [ ] Test building costs scale correctly with each purchase
- [ ] Test research buildings produce hops
- [ ] Test unlocking buildings with hops
- [ ] Test all 6 achievements trigger correctly
- [ ] Test toast notifications appear (react-hot-toast 2.6.0)
- [ ] Test audio playback (click.wav, achievement.wav)
- [ ] Test UI responsiveness on different screen sizes
- [ ] Test production calculations are accurate
- [ ] Verify no memory leaks from game loop
- [ ] Check browser console for errors/warnings
- [ ] Performance testing with React 19.2
- [ ] Test Turbopack build and Fast Refresh
- [ ] Cross-browser compatibility testing

**Acceptance Criteria:**

- All game mechanics work identically to original
- No regressions in functionality
- Performance is equal or better than original
- No console errors or warnings
- Turbopack builds complete successfully
- Fast Refresh works reliably

---

### Week 2: Final Cleanup

#### Story 15: Cleanup & Documentation

**Assignee**: Developer B
**Points**: 3
**Dependencies**: Story 14

**Tasks:**

- [ ] Remove unused Create React App files (`public/index.html`, `src/index.tsx` references)
- [ ] Remove `react-app-env.d.ts`
- [ ] Update README.md with new setup instructions (Next.js 16, Node.js 20.9+)
- [ ] Document Zustand 5.0.8 store architecture
- [ ] Document game loop implementation
- [ ] Add code comments where needed
- [ ] Remove any unused dependencies
- [ ] Final package.json cleanup
- [ ] Add migration guide from old stack to new stack
- [ ] Document system requirements (Node.js 20.9.0+, TypeScript 5.1.0+)

**Acceptance Criteria:**

- No CRA artifacts remain
- README reflects Next.js 16 setup
- Code is well-documented
- Clean build with no warnings
- System requirements clearly documented

---

### Sprint 2 Deliverables

✅ All UI components migrated to Next.js 16
✅ Full app integration complete
✅ Comprehensive testing passed
✅ Documentation updated
✅ Production-ready build

---

## Post-Launch Optimization (Optional)

After the 2-sprint delivery, consider these follow-up improvements:

- Performance profiling with React 19.2 DevTools
- Leverage Next.js 16 Cache Components for aggressive caching
- Code splitting optimization
- Lighthouse score optimization
- Accessibility improvements (WCAG compliance)
- E2E testing setup (Playwright/Cypress)
- CI/CD pipeline setup

---

## Dependency Graph

```
Story 1 (Next.js) ────────┬───────────────────────┬─────┬─────┬─────┬─────┐
                          │                       │     │     │     │     │
Story 2 (Dependencies) ───┼───┬───────────────────┼─────┼─────┼─────┼─────┤
                          │   │                   │     │     │     │     │
Story 3 (MUI Theme) ──────┴───┴───────────────────┼─────┼─────┼─────┤     │
                                                  │     │     │     │     │
Story 4 (gameStore) ──────────┬───────────────────┼─────┼─────┼─────┼─────┤
                              │                   │     │     │     │     │
Story 5 (buildingsStore) ─────┼───────────────────┼─────┼─────┤     │     │
                              │                   │     │     │     │     │
Story 6 (researchStore) ──────┤                   │     │     │     │     │
                              │                   │     │     │     │     │
Story 7 (achievementsStore) ──┤                   │     │     │     │     │
                              │                   │     │     │     │     │
Story 8 (Game Loop) ──────────┴───────────────────┼─────┼─────┼─────┤     │
                                                  │     │     │     │     │
Story 9 (BeerClicker UI) ─────────────────────────┤     │     │     │     │
                                                  │     │     │     │     │
Story 10 (Buildings UI) ──────────────────────────┼─────┴─────┘     │     │
                                                  │                 │     │
Story 11 (Research UI) ───────────────────────────┼─────────────────┘     │
                                                  │                       │
Story 12 (Achievements UI) ───────────────────────┤                       │
                                                  │                       │
Story 13 (Integration) ───────────────────────────┴───────────────────────┘
                                                  │
Story 14 (Testing) ───────────────────────────────┘
                                                  │
Story 15 (Cleanup) ───────────────────────────────┘
```

---

## Sprint Allocation (2-Sprint Maximum Velocity)

### Sprint 1: Foundation & Core Architecture (2 weeks)

**Team Size**: 8 developers
**Story Points**: 40
**Goal**: Complete Next.js setup and all Zustand stores

**Developer Assignments:**

- **Dev A**: Story 1 (Next.js Setup) - 5 pts
- **Dev B**: Story 2 (Dependencies) - 3 pts
- **Dev C**: Story 3 (MUI Theme) - starts after 1&2 - 3 pts
- **Dev D**: Story 4 (gameStore) - starts after 2 - 5 pts
- **Dev E**: Story 5 (buildingsStore) - starts after 4 - 8 pts
- **Dev F**: Story 6 (researchStore) - parallel with 7 after 5 - 6 pts
- **Dev G**: Story 7 (achievementsStore) - parallel with 6 after 5 - 5 pts
- **Dev H**: Story 8 (Game Loop) - after 4,5,6,7 - 5 pts

**Week 1 Parallel Work:**

- Days 1-2: Stories 1 & 2 (parallel)
- Days 3-4: Story 3 (sequential), Story 4 starts
- Days 5-7: Story 4 completes

**Week 2 Parallel Work:**

- Days 1-5: Story 5
- Days 6-10: Stories 6 & 7 (parallel)
- Days 8-10: Story 8 (overlaps with end of 6&7)

### Sprint 2: UI, Integration & Delivery (2 weeks)

**Team Size**: 12 developers (add 4 UI specialists + QA)
**Story Points**: 34
**Goal**: Complete all UI migrations, integrate, test, and ship

**Developer Assignments:**

- **Dev I**: Story 9 (BeerClicker UI) - 4 pts
- **Dev J**: Story 10 (Buildings UI) - 5 pts
- **Dev K**: Story 11 (Research UI) - 5 pts
- **Dev L**: Story 12 (Achievements UI) - 4 pts
- **Dev A**: Story 13 (Integration) - 5 pts
- **QA Team (4 devs)**: Story 14 (Testing) - 8 pts
- **Dev B + Dev C**: Story 15 (Cleanup) - 3 pts
- **Devs D-H**: Support, code review, bug fixes

**Week 1 Parallel Work:**

- Days 1-7: Stories 9, 10, 11, 12 (all parallel)
- Days 5-7: Story 13 starts integration

**Week 2 Parallel Work:**

- Days 1-3: Story 13 completes
- Days 4-8: Story 14 (Testing) - QA team
- Days 9-10: Story 15 (Cleanup) - parallel with end of testing

**Sprint 2 Velocity Strategy:**
All 4 UI migrations (9-12) run completely in parallel during Week 1, enabling integration to start by day 5. QA can begin preliminary testing while integration completes, and cleanup happens in final 2 days.

---

## Critical Path

The critical path through this project is:
**Story 2 → Story 4 → Story 5 → Story 8 → Story 13 → Story 14 → Story 15**

This represents the minimum sequential dependencies. All other stories can be parallelized around this path.

**Critical Path Duration**: 37 story points (3+5+8+5+5+8+3)

This represents the absolute minimum timeline - even with unlimited developers, the sequential dependencies require approximately 4-5 weeks.

With maximum parallelization (12 developers), we can complete this in 2 sprints (4 weeks) by:

1. Running Stories 1 & 2 in parallel immediately
2. Starting Story 4 as soon as Story 2 completes
3. Running Stories 6 & 7 in parallel after Story 5
4. Running all 4 UI stories (9-12) in parallel
5. Overlapping testing with final integration work

---

## Technology Upgrade Benefits

### Next.js 16

- **Turbopack**: 2-5× faster builds, up to 10× faster Fast Refresh
- **Cache Components**: Better control over caching strategy
- **React 19.2 Support**: Latest React features out of the box

### React 19.2

- **React Compiler v1.0**: Automatic optimization
- **Enhanced Suspense**: Better async handling
- **Performance**: Improved rendering performance

### TypeScript 5.9.3

- **Latest Features**: Most recent language improvements
- **Better Type Inference**: Fewer manual type annotations needed
- **Performance**: Faster type checking

### Zustand 5.0.8

- **Bug Fixes**: Latest stability improvements
- **Modern Patterns**: Updated best practices
- **Better TypeScript**: Improved type safety

### Material UI 7.3.5

- **ESM Support**: Better tree-shaking and bundle size
- **CSS Layers**: Better integration with modern tools
- **Slots API**: More flexible component customization

---

## Sources

- [React 19.2](https://react.dev/blog/2025/10/01/react-19-2)
- [Next.js 16](https://nextjs.org/blog/next-16)
- [TypeScript 5.9](https://devblogs.microsoft.com/typescript/announcing-typescript-5-9/)
- [Zustand 5.0.8](https://github.com/pmndrs/zustand/releases)
- [Material UI v7](https://mui.com/blog/material-ui-v7-is-here/)
- [react-hot-toast 2.6.0](https://www.npmjs.com/package/react-hot-toast)

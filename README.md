# Full Stack Open — State Management

Starter structure and supplied tests from https://github.com/fullstack-hy2020/fs-statemanagement at commit 676919a2766f4dd52ecee027924ffe385f236bc8. All original files are retained.

## Progress

- Chapter 1 warm-up: submitted and graded 1/1 on 20 October 2026.
- Exercise 1: Unicafe feedback counters use a Zustand store, with separate action selectors and derived statistics. Production build and ESLint pass.
- Exercise 2: original six browser tests are unchanged; their workflow is enabled on main. Local Chromium download failed because the downloaded archive was truncated. [GitHub Actions run 39448384730](https://github.com/ShaonInTheCloud/full-stack-state-management/actions/runs/39448384730) passed all six supplied browser tests on 20 October 2026. Exercises 1 and 2 are prepared but have not been submitted to the course portal.
- Exercises 3–17: Zustand Anecdotes implementation includes immutable voting and sorting, separate form/list, filtering, Fetch persistence, five-second notifications, zero-vote deletion and six unit tests. Build, lint, unit tests and the supplied mutation checks pass locally.
- Exercises 19–26: Query Anecdotes implementation uses TanStack Query custom hooks, Fetch, Context notifications and server-error handling. Production build and lint pass locally.
- Browser workflows for both anecdote apps and the unit-test verification workflow are enabled. All five workflows passed on source commit `7c0ae967cda1d5241576c9b87bc08f6a2840a2dc`: [Anecdotes browser tests](https://github.com/ShaonInTheCloud/full-stack-state-management/actions/runs/39455827469), [unit and mutation checks](https://github.com/ShaonInTheCloud/full-stack-state-management/actions/runs/39455827438), [Query behavior](https://github.com/ShaonInTheCloud/full-stack-state-management/actions/runs/39455827417), [Query notifications](https://github.com/ShaonInTheCloud/full-stack-state-management/actions/runs/39455827410), and [Unicafe](https://github.com/ShaonInTheCloud/full-stack-state-management/actions/runs/39455827490). Local browser execution remains unverified as explained below.
- Only the chapter 1 warm-up is submitted in this course. The remaining code is prepared for review, not course credit. Local browser-test execution remains blocked by a truncated Chromium download.

Run each anecdote app in two terminals: `npm ci`, `npm run server`, and `npm run dev` from its directory. In `anecdotes`, `npm test` runs unit tests. The corresponding test directories contain the supplied Playwright suites; their tests are unchanged.

Run `npm ci` and `npm run dev` in `unicafe`. Tests: install dependencies in `unicafe-tests`, run `npx playwright install chromium`, then `npm test`.

Implementation and validation were AI-assisted. Review the code and report assistance as required by the course before submission. No study hours or personal reading completion are claimed here.

## Exercise map and sources

| Exercises | Implementation |
| --- | --- |
| 1–2 | `unicafe/src/store.js`, counters/statistics and supplied browser suite |
| 3–6 | `anecdotes/src/store.js`, `AnecdoteForm` and `AnecdoteList` |
| 7–12 | Filter, Fetch service, persistent actions, notification store and deletion |
| 13–18 | Supplied browser suite, `anecdotes/src/store.test.jsx`, mutation checks |
| 19–23 | `query-anecdotes/src/hooks/useAnecdotes.js` and Fetch service |
| 24–27 | `NotificationContext.jsx`, notification hooks and error callbacks |
| 28 | This public repository URL, to be submitted after the prior chapters |

Requirements reviewed from the University of Helsinki course on 20 October 2026:

- https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-state-management/chapter-2
- https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-state-management/chapter-3
- https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-state-management/chapter-4

The official starter and supplied browser tests remain attributed above. The final anecdote implementation replaces the early in-memory version with backend persistence as the later exercises require. Failed network mutations preserve existing state; forms clear only after success. These are local course demonstrations, with the supplied unauthenticated JSON Server backend.

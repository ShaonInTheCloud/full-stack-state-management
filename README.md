# Full Stack Open — State Management

Starter structure and supplied tests from https://github.com/fullstack-hy2020/fs-statemanagement at commit 676919a2766f4dd52ecee027924ffe385f236bc8. All original files are retained.

## Progress

- Warm-up and exercises 1–27 are submitted and individually graded 1/1. Chapters 1–3 are locked. Exercise 2 and exercises 7–27 were submitted in one batch on 22 October 2026 (Europe/Kiev), more than six hours after the preceding batch.
- Exercise 28 is prepared with this repository URL, but is not submitted. Its personal acknowledgement checkbox remains for the student to read and complete. Chapter 4 remains unlocked; final repository grading by a teacher is pending.
- All supplied browser tests passed locally on 22 October: Unicafe 6/6, Zustand Anecdotes 14/14, Query Anecdotes behavior 8/8 and notifications 5/5. All six unit tests and the supplied mutation verification also passed. Test assertions were unchanged.
- The normal Playwright browser download was truncated in the execution environment. Local verification used Chromium 153 from the npm package `@sparticuz/chromium@153.0.0`, extracted without ownership changes, with temporary Playwright configuration outside the repository. The temporary configuration selected that executable, one worker and absolute server paths; the serverless single-process flag was removed to allow successive browser contexts. No test assertions or application source were changed for this verification.
- All five GitHub workflows passed on source commit `7c0ae967cda1d5241576c9b87bc08f6a2840a2dc`: [Unicafe](https://github.com/ShaonInTheCloud/full-stack-state-management/actions/runs/39455827490), [Anecdotes browser tests](https://github.com/ShaonInTheCloud/full-stack-state-management/actions/runs/39455827469), [unit and mutation checks](https://github.com/ShaonInTheCloud/full-stack-state-management/actions/runs/39455827438), [Query behavior](https://github.com/ShaonInTheCloud/full-stack-state-management/actions/runs/39455827417) and [Query notifications](https://github.com/ShaonInTheCloud/full-stack-state-management/actions/runs/39455827410). Reverified on 22 October; later commits only update this README.

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
| 28 | This public repository URL; prepared, pending student acknowledgement and submission |

Requirements reviewed from the University of Helsinki course on 20 October 2026:

- https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-state-management/chapter-2
- https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-state-management/chapter-3
- https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-state-management/chapter-4

The official starter and supplied browser tests remain attributed above. The final anecdote implementation replaces the early in-memory version with backend persistence as the later exercises require. Failed network mutations preserve existing state; forms clear only after success. These are local course demonstrations, with the supplied unauthenticated JSON Server backend.

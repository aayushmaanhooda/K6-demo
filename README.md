## k6 Practice Notes

- Started by learning the basics of k6: scripting HTTP tests, setting VUs, durations, and checks.
- Tried browser automation with `k6/browser` to interact with forms and validate page content.
- Practiced load patterns: smoke, average-load, stress, and simple browser flows.

## Repo Layout (brief)
- `http/` — API and HTTP-focused k6 scripts (POST tests, options tuning).
- `browser/` — Browser-based k6 scripts for UI interactions and navigation.
- `cloud/` — k6 Cloud run config; uses `__ENV.id` for projectID.
- `initial-test/` — Early k6 scripts for basic smoke checks.
- `theory/` — Quick notes summarizing test types and ideas.

## Experiments Done
- Sent POST requests to a FastAPI `/users` endpoint and validated responses.
- Ran short load tests (fixed VUs over a few seconds) to see request throughput.
- Automated a sample registration flow in the browser and asserted on final page text.
- Captured basic performance signals (response status, navigation waits) during runs.
- Triggered a k6 Cloud test (`cloud/cloud-test.js`) with VUs/duration and named runs; set `id` via env var (`__ENV.id`) for project mapping.

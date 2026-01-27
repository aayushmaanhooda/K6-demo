# k6 Practice Notes

## Basics
- Started by learning the basics of k6: scripting HTTP tests, setting VUs, durations, and checks.
- Tried browser automation with `k6/browser` to interact with forms and validate page content.
- Practiced load patterns: smoke, average-load, stress, and simple browser flows.

---

## Repo Layout (Brief)

- `http/` — API and HTTP-focused k6 scripts (POST tests, options tuning).
- `browser/` — Browser-based k6 scripts for UI interactions and navigation.
- `cloud/` — k6 Cloud run config; uses `__ENV.id` for projectID.
- `initial-test/` — Early k6 scripts for basic smoke checks.
- `theory/` — Quick notes summarizing test types and ideas.
- `backend/` — FastAPI Todo CRUD API with k6 test files.

---

## Backend

Simple Todo API built with **FastAPI + PostgreSQL** for practicing load testing.

### Endpoints
- `GET /`
- `POST /todo`
- `GET /todo`
- `GET /todo/{id}`
- `PUT /todo/{id}`
- `DELETE /todo/{id}`

---

## Test Files (`backend/test/`)

- `sanity.js` — 1 user, 1 request
- `smoke.js` — 3 users, 30 seconds
- `load.js` — ramp up to 20 users
- `stress.js` — push to 150 users
- `improve.txt` — backend optimization notes

---

## Experiments Done

- Sent POST requests to a FastAPI `/todo` endpoint and validated responses.
- Ran short load tests (fixed VUs over a few seconds) to see request throughput.
- Automated a sample registration flow in the browser and asserted on final page text.
- Captured basic performance signals (response status, navigation waits) during runs.
- Triggered a k6 Cloud test (`cloud/cloud-test.js`) with VUs and duration.
- Named cloud runs and set project ID via environment variable `__ENV.id`.
- Tested the Todo API with sanity, smoke, load, and stress tests.

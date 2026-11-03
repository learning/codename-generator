# Codename Generator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a static, responsive slider-driven codename generator.

**Architecture:** A small ES module owns the ordered roots and the 120-position mapping. The browser module renders that data from a native slider; HTML and CSS provide the accessible single-screen interface. GitHub Actions publishes the static root to Pages.

**Tech Stack:** HTML, CSS, browser ES modules, Node.js native test runner, GitHub Actions Pages.

**Spec:** `docs/superpowers/specs/2026-11-03-codename-generator-design.md`

## Global Constraints

- Preserve all approved roots and their order exactly.
- Support every whole-number slider position from 1 through 120.
- Ship with no runtime dependencies and no build step.
- Deploy from `main` using GitHub Pages Actions.

---

### Task 1: Cycle Module

**Files:**
- Create: `tests/codename.test.mjs`
- Create: `js/codename.mjs`
- Create: `package.json`

**Interfaces:**
- Produces: `getCodename(position)` returning `{ position, adjective, noun, codename }`.
- Produces: `MIN_POSITION` and `MAX_POSITION` constants for the UI.

- [ ] **Step 1: Write a failing test**

Test literal mappings for positions 1, 10, 11, and 120, plus clamping for values below and above the cycle.

- [ ] **Step 2: Run the failing test**

Run: `node --test tests/codename.test.mjs`
Expected: failure because `js/codename.mjs` does not yet exist.

- [ ] **Step 3: Write minimal cycle implementation**

Export the approved root lists, bounds, a clamping function, and `getCodename` using the one-based 10 x 12 index formula.

- [ ] **Step 4: Verify the module**

Run: `npm test`
Expected: all tests pass.

### Task 2: Static Generator Surface

**Files:**
- Create: `index.html`
- Create: `css/site.css`
- Create: `js/app.mjs`

**Interfaces:**
- Consumes: `getCodename(position)`, `MIN_POSITION`, and `MAX_POSITION` from `js/codename.mjs`.
- Produces: a slider that updates the displayed position, root names, and codename without a page reload.

- [ ] **Step 1: Implement semantic page and slider**

Use a labelled range input with a visible 1-120 range and live result output.

- [ ] **Step 2: Connect browser state**

Update all result fields on slider `input` events and set the slider fill from its current percentage.

- [ ] **Step 3: Build responsive visual treatment**

Create a readable editorial tool layout with an airy neutral background, dark ink typography, restrained teal accent, visible focus state, and mobile-safe sizing.

- [ ] **Step 4: Verify visible behavior**

Load the page locally, move the slider to 1, 11, and 120, and confirm that the shown values match the tested contract.

### Task 3: Pages Delivery

**Files:**
- Create: `.github/workflows/deploy-pages.yml`
- Create: `README.md`

**Interfaces:**
- Consumes: repository-root static files.
- Produces: a GitHub Pages deployment on pushes to `main`.

- [ ] **Step 1: Add least-privilege Pages workflow**

Use `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages` with `pages: write` and `id-token: write` permissions.

- [ ] **Step 2: Document local verification and deployed URL**

Record `npm test`, a simple local server command, and the expected Pages URL.

- [ ] **Step 3: Run final checks and deploy**

Run tests and browser checks, create the initial commit, push `main`, then confirm the Pages deployment status when GitHub credentials allow it.

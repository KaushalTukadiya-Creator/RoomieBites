*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

# 🥑 RoomieBites - Allergy-Safe Roommate Meal Planner

> A simple, privacy-first meal planner and shopping list generator designed to keep track of your roommates' food allergies and dietary preferences, suggest guaranteed safe meals, schedule 7-day weekly calendars, and automatically organize grocery lists by aisle.

---

## What I Built

Living with roommates is one of the best parts of university and young adulthood—until it comes time to answer the age-old question: *"What are we having for dinner?"*

I built **RoomieBites** for my roommate **Alex** (and our apartment circle). Alex lives with severe peanut and tree nut allergies alongside celiac disease (strict gluten intolerance). In a shared living space, planning communal dinners or even keeping shared pantry staples safe can be stressful. One accidental dash of ordinary soy sauce or cross-contaminated sauce can turn dinner into a medical emergency. 

**RoomieBites** solves this by turning allergy safety into an effortless, collaborative experience:
- **Roommate Allergy Guard**: Tracks each roommate's specific allergies (Peanuts, Tree Nuts, Gluten, Dairy, Shellfish, Eggs, Soy, etc.), dietary lifestyle (Vegetarian, Vegan, Halal, High-Protein), and personal dislikes.
- **Whole Household Safety Mode**: A single filter that computes the intersection of everyone's dietary restrictions, guaranteeing that any meal chosen is 100% safe for everyone at the table.
- **Automated Safe 7-Day Planner**: A 1-click "Auto-Fill Safe Week" generator that creates a balanced weekly menu (Breakfast, Lunch, Dinner, Snack) with zero allergen conflicts.
- **Smart Aisle-Organized Grocery List**: Collects ingredients from planned meals, aggregates quantities, groups items by supermarket aisles (*Produce*, *Dairy & Substitutes*, *Meat & Protein*, *Grains & Bakery*, *Pantry*), and provides interactive store checkboxes.
- **Allergen Alert Shield**: If someone tries to manually schedule a recipe containing an allergen, an active warning alert warns the user before it gets scheduled.

---

## Demo

RoomieBites runs completely client-side with zero build steps or complex dependencies required. 

**Live Local Demo :** Open ['https://kaushaltukadiya-creator.github.io/RoomieBites/'] in amy mordern browser.

### Quick Preview & Walkthrough:
1. **Household Safety Status**: The top banner dynamically updates to reflect who is being protected (e.g., *Protecting Alex: ⚠️ Avoids Peanuts, Tree Nuts, Gluten*).
2. **Weekly Meal Calendar**: Displays Monday through Sunday across 4 daily slots. Click **"✨ Auto-Fill Safe Week"** to instantly generate an allergen-free week.
3. **Safe Meal Suggestions**: Browse cards tagged with 🟢 **Safe for Roomie** or 🔴 **Contains [Allergen]** warning banners. Filter by cooking time (< 20 mins), diet, or category.
4. **Smart Grocery Shopping List**: View aggregated ingredients categorized by aisle. Check off items in the store, add custom extra items (e.g. oat milk, coffee), and click **"📋 Copy to Clipboard"** or **"🖨️ Print / Save PDF"**.

### Running Locally:
Clone the repository and open `index.html` directly in any web browser:
```bash
git clone https://github.com/KaushalTukadiya-Creator/RoomieBites.git
cd RoomieBites

# On Windows PowerShell:
Start-Process "index.html"

# On macOS:
open index.html

# On Linux:
xdg-open index.html
```

---

## Code

{% github https://github.com/KaushalTukadiya-Creator/RoomieBites %}

🔗 **GitHub Repository**: [https://github.com/KaushalTukadiya-Creator/RoomieBites](https://github.com/KaushalTukadiya-Creator/RoomieBites)

The project is built cleanly with zero bloat, emphasizing maximum performance, responsive accessibility, and zero-setup deployment.

- **Frontend Core**: Semantic HTML5 with tabbed views, modal dialogs, and ARIA attributes for screen-reader accessibility.
- **Styling**: Tailored Vanilla CSS with glassmorphism, responsive grid/flexbox layouts, modern typography (*Outfit* & *Plus Jakarta Sans*), and dedicated `@media print` styling for paper or PDF grocery sheets.
- **Engine Logic (`app.js`)**:
  - Deterministic allergen conflict detection engine.
  - Multi-profile state manager with `localStorage` persistence.
  - Dynamic shopping list aggregator that extracts and categorizes ingredients from planned recipes.
  - Clipboard export and toast notification system.

---

## How I Built It

RoomieBites was architected and pair-programmed collaboratively with **Google Antigravity** using an agentic coding workflow:

1. **Safety-First Engine Architecture**: We designed a strict allergen validation model where recipes must pass a comprehensive checklist against all active roommate constraints before being recommended.
2. **Privacy-Centric Client-Side Execution**: Many people are hesitant to enter sensitive medical and dietary data into third-party servers. RoomieBites is architected entirely on local browser state (`localStorage`), ensuring private health data never leaves the user's machine without explicit consent.
3. **Iterative UX & Micro-Interactions**: We iteratively refined the design system—incorporating high-contrast safety badges, intuitive modal workflows, responsive calendar viewports, and one-click clipboard formatting for WhatsApp/iMessage group texts.

---

## Why Does Open Innovation Matter?

Food allergies affect more than **32 million Americans** and hundreds of millions worldwide. Navigating dietary restrictions should not require expensive, ad-riddled proprietary meal apps with locked paywalls and data monetization.

Open innovation matters because:
- **Safety is Universal**: Open-source tools allow anyone—students in dorms, multi-generational families, or community kitchens—to adapt, fork, and tailor meal planning algorithms to rare allergies or regional ingredients.
- **Radical Transparency**: When dealing with anaphylactic allergies or celiac disease, opaque algorithms and hidden sponsored recipe promotions can be dangerous. An open codebase means the allergy verification logic is clear, auditable, and trustworthy.
- **Zero Lock-In & Portability**: Open innovation guarantees that people retain full control over their recipes, profiles, and grocery workflows forever.

---

## My Agent Session

This application was conceptualized, designed, and developed in a continuous session with Google Antigravity.

You can inspect the full agent workflow, design decisions, and coding iterations in the session transcript:

{% agent_session 440e0d6f-f2da-4ccb-80d6-d455a084b204 %}

---

## Prize Categories

- **Build for a Friend**: Dedicated to my roommate Alex, transforming stressful shared-kitchen meal planning into a safe, joyful everyday routine.

<!-- Team Submissions: Built solo for my friend and roommates -->
<!-- Thanks for participating in Hacktoberfest! -->

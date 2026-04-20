# LDS Ward Emergency Preparedness App

A clean, responsive web app for Nampa and Canyon County families to complete two self-evaluations:

- General Emergency Preparedness Assessment
- Food Storage Assessment

The app is built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- Home page describing both assessments
- Guided multi-step survey flow for each assessment
- Readiness scoring with thoughtful, locally relevant weighting
- Customized action plan with top priorities and time-based recommendations
- Print-friendly report layout and local export to JSON/CSV
- Privacy-first approach and ward-friendly export architecture

## Setup

1. Install Node.js (recommended version 18+).
2. Open a terminal in the project folder.
3. Run:

```bash
npm install
npm run dev
```

4. Open `http://localhost:3000` in your browser.

## Build for deployment

```bash
npm run build
npm start
```

## Project structure

- `app/` — Next.js app routes and pages
- `components/` — reusable UI pieces
- `lib/` — survey questions, scoring logic, and types
- `public/` — static assets (none added yet)

## Customizing local risk factors

Local hazards are defined in `lib/questions.ts` and used in the preparedness assessment.

To update local risk language or add questions:

1. Open `lib/questions.ts`.
2. Update the relevant question group under `preparednessQuestionGroups`.
3. Adjust labels, options, or add new items in the same format.

## Customizing food storage questions

Food storage question definitions are also in `lib/questions.ts`.

- Short-term storage questions are in the `foodStorageQuestionGroups` array.
- Longer-term staple categories are included as numerical fields.

To add a new staple item:

1. Add a new object to the `stapleItems` array.
2. It will automatically appear in the longer-term storage section.

## Scoring logic

Scoring is implemented in `lib/scoring.ts`.

- The general preparedness score weights water, communication, medical readiness, evacuation planning, first aid, and local hazard awareness more heavily.
- The food storage score emphasizes a realistic 1-week and 1-month supply, then 3-month supply and longer-term staples.
- The score engines are intentionally gradual and encourage progress without penalizing families for early-stage preparation.

## Print-friendly report

A dedicated print view is available after completing each assessment.

- Use the `Open print view` button on the results page.
- The print stylesheet in `app/globals.css` formats the layout for paper.

## Privacy and ward export

The app stores responses locally in the browser and does not transmit personal data to a backend.

Export buttons save anonymized results as JSON or CSV for future ward-level review.

## Notes

- The tone of the tool is practical, reassuring, and family-focused.
- It is not medical or legal advice.
- The app is designed for easy local deployment and later enhancement.

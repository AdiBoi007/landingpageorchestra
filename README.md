# Orchestra

<p align="center">
  <strong>The landing experience for an AI operating system for engineering teams.</strong>
</p>

<p align="center">
  Orchestra turns requirements into distributed developer tasks, tracks progress from real code activity, and translates delivery status back into plain English for managers.
</p>

<p align="center">
  <a href="https://unihackdemo.vercel.app">Live Landing Page</a>
  ·
  <a href="https://unihackjira.vercel.app/">UniHackJira Demo</a>
  ·
  <a href="https://commit4commit-vscode-clone.vercel.app/">Commit4Commit Demo</a>
</p>

## What This Repo Is

This repository contains the marketing and demo landing page for the Orchestra project. It is a React + Vite single-page site designed to explain the product, walk visitors through the multi-agent workflow, preview the manager and developer interfaces, and capture waitlist signups.

The page is built to sell the idea clearly:

- managers upload requirements instead of chasing updates
- developers receive role-matched work inside their environment
- commits are interpreted into progress signals automatically
- blockers and sprint health are surfaced without another standup

## Project Ecosystem

Orchestra is presented across three related experiences:

| Experience | Purpose | Repository | Live Demo |
| --- | --- | --- | --- |
| Orchestra Landing Page | Main product story, workflow walkthrough, waitlist | This repo | [unihackdemo.vercel.app](https://unihackdemo.vercel.app) |
| UniHackJira | Jira-style management experience | [AdiBoi007/unihackJira](https://github.com/AdiBoi007/unihackJira) | [unihackjira.vercel.app](https://unihackjira.vercel.app/) |
| Commit4Commit | VS Code-inspired developer experience | [litkeys/Commit4Commit](https://github.com/litkeys/Commit4Commit) | [commit4commit-vscode-clone.vercel.app](https://commit4commit-vscode-clone.vercel.app/) |

## Highlights

- Cinematic landing page with a strong product narrative
- Animated agent-system walkthrough explaining the Orchestra workflow
- Interactive 7-step demo from PRD upload to live insights
- Manager-facing product preview for `CodeSync Insights`
- Developer-facing product preview for the `Orchestra` extension
- Waitlist form with optional API integration
- Responsive single-page build ready for Vercel deployment

## Built With

- React 19
- Vite 8
- Plain CSS
- ESLint

## Local Development

```bash
npm install
npm run dev
```

Production commands:

```bash
npm run build
npm run preview
```

## Environment Variables

No environment variables are required for local development.

Optional configuration:

```bash
VITE_INSIGHTS_URL=https://insights.orchestra.dev
VITE_ORCHESTRA_URL=https://orchestra.dev
VITE_WAITLIST_API_URL=https://api.orchestra.dev/waitlist
```

These control:

- the manager preview link
- the developer preview link
- the waitlist form submission endpoint

## App Structure

```text
src/
  App.jsx        Main landing page, workflow demo, waitlist logic
  App.css        Full visual system and section styling
  index.css      Global resets
  main.jsx       App entry point

public/
  favicon.svg
  icons.svg
```

## Experience Flow

The landing page is structured around the full Orchestra story:

1. The coordination problem inside software teams
2. The six-agent intelligence layer
3. The workflow from requirements to task distribution
4. Real-time reporting for managers in CodeSync Insights
5. In-editor support for developers inside Orchestra
6. The product advantages and target users
7. The private beta waitlist

## Deployment

This project is a static frontend and works cleanly on Vercel.

Primary live deployment:

- [unihackdemo.vercel.app](https://unihackdemo.vercel.app)

## Why This README Exists

The goal of this README is simple: if someone lands on the repo, they should understand the product, see the full ecosystem, find every important link immediately, and know how to run the project locally in under a minute.

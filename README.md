# HealthDash - Interactive Health Analytics Dashboard

![version](https://img.shields.io/badge/version-2.1.0-blue.svg)

![HealthDash Dashboard](/img/healthdash-dashboard.jpg)

HealthDash is an interactive frontend health analytics dashboard that visualizes daily & weekly vitals (heart rate, steps, sleep, calories) with live charts, an interactive water tracker, and a symptom checker. Built purely in the frontend using React, Tailwind, Recharts and Framer Motion.

## Features

- **Live Health Monitoring**: Real-time heart rate simulation updating every 1.8 seconds
- **Interactive Charts**: Weekly steps, sleep patterns, and heart rate visualizations
- **Water Tracker**: Interactive slider for tracking daily water intake
- **Symptom Checker**: Toggleable symptom buttons with health suggestions
- **Health Insights**: Quick insights dashboard with personalized metrics
- **Export Reports**: Export dashboard as PDF, PNG, or CSV
- **Chart Drilldown**: Click on charts to see detailed day-specific information
- **Presentation Mode**: Press 'P' to enter fullscreen presentation mode
- **Mobile Gestures**: Swipe cards for quick actions on mobile devices
- **Theme Presets**: Choose from Neon, Calm, or Corporate themes
- **Accessibility Mode**: High-contrast and large-text options
- **Multi-Profile Support**: Switch between different user profiles
- **PWA Support**: Install as a standalone app on mobile devices
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Dark Mode**: Beautiful dark-themed UI with glassmorphism effects
- **Animations**: Smooth transitions and micro-interactions with Framer Motion
- **Unified Patient Records**: Consolidated view of patient health information from multiple sources
- **FHIR Export/Import**: Export patient records as FHIR-like JSON bundles and import external data
- **Appointment Scheduling**: Calendar view with appointment booking and wait time estimates
- **Resource Allocation Dashboard**: Visualize bed utilization, staff availability, and equipment status
- **Consent & Privacy Controls**: Per-record consent toggles and global data sharing preferences
- **Audit Logging**: Track all user activities and system access for compliance
- **Role-Based Access**: Switch between patient, clinician, and administrator views
- **PHI Redaction**: Export options that remove protected health information
- **Advanced Search**: Full-text search across all patient records with highlighting

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Demo Script](#demo-script)
- [Export Instructions](#export-instructions)
- [Terminal Commands](#terminal-commands)
- [File Structure](#file-structure)
- [Browser Support](#browser-support)
- [Licensing](#licensing)

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to http://localhost:5179/dashboard/home

## Demo Script

HealthDash — Interactive frontend health analytics dashboard. Visualizes daily & weekly vitals (heart rate, steps, sleep, calories) with live charts, an interactive water tracker, and a symptom checker. Built purely in the frontend using React, Tailwind, Recharts and Framer Motion. Demo focus: UX polish, responsive design, and interactive micro-features.

### 2-Minute Core Demo Flow:
1) Open site and show top cards + dark mode.
2) Expand Heart Rate card to show live updates.
3) Drag water slider & toggle symptoms.
4) Show weekly charts and Quick Insights.
5) Export report as PDF/PNG/CSV.
6) Click on Steps chart to show drilldown modal.
7) Press 'P' to enter presentation mode.
8) Switch between user profiles.
9) Change theme presets and accessibility settings.
10) Close with 1-line future roadmap (connect wearables & backend).

### 3-Minute Extended Demo Flow (New Features):
1) Navigate to Unified Records page to show consolidated patient data.
2) Demonstrate FHIR export/import functionality with sample JSON.
3) Book a new appointment and show wait time estimates.
4) View Resource Allocation dashboard with heatmaps.
5) Toggle consent preferences for data sharing.
6) View Audit Log to see tracked activities.
7) Switch roles to show different UI capabilities.
8) Use advanced search to find specific records.
9) Export records with PHI redaction enabled.

## Export Instructions

### CSV Export
To export your health data as CSV:
1. Navigate to the Analytics dashboard
2. Click the "Export CSV" button in the top right corner
3. The CSV file will be downloaded automatically

### Demo Recording
To record a demo of HealthDash:
- **Windows**: Use the built-in Xbox Game Bar (Windows + G) or Steps Recorder
- **Mac**: Use QuickTime Player or the built-in Screen Recording feature
- **Linux**: Use OBS Studio or recordMyDesktop
- **Browser Extension**: Use Loom or Screencastify for easy browser-based recording

Recommended recording settings:
- Resolution: 1920x1080 or higher
- Frame rate: 30 FPS
- Audio: Include microphone narration explaining features

## Terminal Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Format code with Prettier
npm run format
```

### What's included

Within the download you'll find the following directories and files:

```
healthdash
    ├── public
    │   ├── css
    │   └── img
    ├── src
    │   ├── components
    │   ├── configs
    │   ├── context
    │   ├── data
    │   ├── layouts
    │   ├── pages
    │   ├── widgets
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── routes.jsx
    ├── .gitignore
    ├── CHANGELOG.md
    ├── index.html
    ├── ISSUE_TEMPLATE.md
    ├── jsconfig.json
    ├── LICENSE
    ├── package.json
    ├── postcsss.config.cjs
    ├── prettier.config.cjs
    ├── README.md
    ├── tailwind.config.cjs
    └── vite.config.js
```

## Deployment

### Deploy to Vercel
1. Sign up for a Vercel account at https://vercel.com
2. Install the Vercel CLI: `npm install -g vercel`
3. Run `vercel` in your project directory
4. Follow the prompts to deploy

### Deploy to Netlify
1. Sign up for a Netlify account at https://netlify.com
2. Install the Netlify CLI: `npm install -g netlify-cli`
3. Run `netlify deploy` in your project directory
4. Follow the prompts to deploy

### Deploy to GitHub Pages
1. Create a GitHub repository for your project
2. Install gh-pages: `npm install gh-pages --save-dev`
3. Add these scripts to your package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Run `npm run deploy` to deploy

## Browser Support

HealthDash supports all modern browsers including Chrome, Firefox, Safari, and Edge.

## Safety Disclaimer

⚠️ **Hackathon Demo Only - Not for Medical Use**

This application is a frontend demonstration created for educational and hackathon purposes only. It is not a medical device, diagnostic tool, or substitute for professional healthcare. All data is mock data for UI/UX evaluation. No real patient data is stored, transmitted, or processed. Features like FHIR export/import, appointment scheduling, and resource allocation are simulated for demonstration purposes. Always consult qualified healthcare professionals for medical advice and treatment decisions.

## Licensing

This project is based on the Material Tailwind Dashboard React template by Creative Tim, which is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

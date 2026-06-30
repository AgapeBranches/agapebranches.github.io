# Agape Branches

Agape Branches is a community organisation dedicated to promoting generosity, sustainability, and human connection through the gift of giving. We reshape how people view rescued food by highlighting its value, potential, and positive impact on both people and the planet.

This repository contains the source code for the Agape Branches website and volunteer portal. It is built using React, Vite, and TypeScript, and integrates with Supabase for backend services.

## Features

- **Public Website**: Information about the mission, features, and ways to get involved.
- **Videos & Recipes**: Short-form video recipes demonstrating how to use rescued ingredients.
- **Volunteer Portal**: A secure portal for volunteers and staff to manage food rescue drives, log inventory, and coordinate media creation.

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript, React Router
- **Backend / Auth**: Supabase
- **Hosting**: GitHub Pages
- **Styling**: Vanilla CSS (based on bespoke design)

## Local Development

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/AgapeBranches/agapebranches.github.io.git
   cd agapebranches.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory and add your Supabase keys:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

This project is automatically deployed to GitHub Pages via GitHub Actions whenever changes are pushed to the `main` or `master` branch. The deployment workflow can be found in `.github/workflows/deploy.yml`.

## Contributing

We welcome contributions! Whether you're a developer, a cook, or a driver, there are many ways to get involved. Reach out to us at [hello@agapebranches.org](mailto:hello@agapebranches.org).

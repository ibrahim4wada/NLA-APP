# Wavedone Platform - Frontend Application

This is the frontend application for the Wavedone Digital Platform, built with Next.js and Tailwind CSS. It provides the user interface for interacting with the backend API, browsing products, managing accounts, and accessing various digital services.

## Vision

To provide a seamless, mobile-first user experience for Africa’s #1 platform for AI-powered digital tools, creative products, micro-learning content, and service subscriptions.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Development Setup](#development-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Learn More (Next.js)](#learn-more-nextjs)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack

- **Framework**: Next.js (with App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Context (for Authentication initially)
- **Linting**: ESLint
- **Package Manager**: npm

## Project Structure

A typical Next.js project structure with the `src` directory enabled:

```
wavedone-frontend/
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router (pages, layouts)
│   │   ├── (auth)/         # Group for auth-related pages (e.g. login, register) - if adopted
│   │   ├── products/
│   │   │   ├── [id]/page.js # Dynamic product detail page
│   │   │   └── page.js      # Product listing page
│   │   ├── about/page.js
│   │   ├── contact/page.js
│   │   ├── login/page.js
│   │   ├── register/page.js
│   │   ├── globals.css     # Global styles (Tailwind base, custom)
│   │   ├── layout.js       # Root layout
│   │   └── page.js         # Homepage
│   ├── components/
│   │   ├── layout/         # Layout components (Navbar, Footer)
│   │   └── ui/             # Reusable UI elements (Button, Card, etc.)
│   ├── contexts/           # React Context providers (e.g., AuthContext)
│   ├── services/           # API service clients (e.g., apiService.js)
│   └── lib/                # Utility functions, helper modules (if any)
├── .env.local              # Local environment variables (Gitignored)
├── .env.example            # Example environment variables
├── .eslintrc.json          # ESLint configuration (or eslint.config.mjs)
├── .gitignore              # Files to be ignored by Git
├── next.config.mjs         # Next.js configuration
├── package-lock.json
├── package.json
├── postcss.config.mjs      # PostCSS configuration (for Tailwind)
├── tailwind.config.mjs     # Tailwind CSS configuration
└── README.md               # This file
```

## Prerequisites

- Node.js (LTS version recommended, e.g., v18.x, v20.x)
- npm (comes with Node.js)
- Git
- Wavedone Backend API running (for full functionality) - see `wavedone-platform` backend README.

## Development Setup

1.  **Clone the repository (if not already part of a monorepo/main project clone):**
    ```bash
    # Assuming you are in a directory where you want to place the frontend
    git clone <repository-url-for-frontend-or-main-project>
    cd wavedone-frontend
    ```
    (If this frontend is in the same repo as the backend, you might just `cd` into `wavedone-frontend`.)

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the `wavedone-frontend` directory by copying from `.env.example` (which should be created next, if it doesn't exist):
    ```bash
    cp .env.example .env.local
    ```
    Then, edit `.env.local` with your specific configurations. See [Environment Variables](#environment-variables) for details.

## Environment Variables

Create a `.env.local` file in the project root (`wavedone-frontend/.env.local`).
An `.env.example` should be provided in the repository.

```ini
# Next.js public environment variables need to be prefixed with NEXT_PUBLIC_
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1
# This should point to your running Wavedone backend API.
# The backend (from Phase 1) runs on port 3000 by default.

# Add other frontend-specific environment variables here if needed.
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode.<br />
Open [http://localhost:3001](http://localhost:3001) (or the next available port if 3000 is taken by the backend and Next.js picks 3001) to view it in the browser.
The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `.next` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run start`

Starts the production server after a build has been made (`npm run build` first).<br />
This is not typically used for development.

### `npm run lint`

Runs ESLint to check for code quality and style issues.

<!-- Add test script information once tests are more established -->
<!--
### `npm test`
Runs the test suite using Jest.
-->

## Learn More (Next.js)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Contributing

(To be defined - placeholder for contribution guidelines)

## License

(To be defined - placeholder for project license, e.g., ISC, MIT)

---

This README provides a starting point for the Wavedone Frontend and will be updated as the project evolves.
```

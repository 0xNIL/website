# 0xNIL Project Website

You can see it at [0xnil.com](http://0xnil.com) :-)

## About

This is a static website for the 0xNIL token project - an experimental eventually-valuable token, initially priced at zero.

## Tech Stack

- **Build Tool**: Vite
- **Framework**: React (legacy class components)
- **Styling**: CSS + Milligram
- **Deployment**: GitHub Pages

## Development

### Prerequisites

- Node.js 20+ 
- pnpm

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The dev server will be available at `http://localhost:3000`

### Build

```bash
# Build for production
pnpm build
```

The build output will be in the `dist/` folder.

### Preview

```bash
# Preview production build locally
pnpm preview
```

## Deployment

### Automatic Deployment (Recommended)

The site automatically deploys to GitHub Pages when you push to the `master` or `main` branch. The GitHub Actions workflow handles:

1. Building the site with Vite
2. Creating the `.nojekyll` file for GitHub Pages
3. Deploying to GitHub Pages

**Setup GitHub Pages:**

1. Go to your repository Settings > Pages
2. Under "Build and deployment", select "GitHub Actions" as the source
3. Push to master/main branch - the site will auto-deploy

### Manual Deployment

```bash
# Deploy to GitHub Pages manually
pnpm deploy
```

This will build the site and push it to the `gh-pages` branch.

## Project Structure

```
.
├── client/js/           # React components and client-side code
├── src/                 # Old Express server code (no longer used)
├── static/              # Static assets (images, CSS)
├── dist/                # Build output (gitignored)
├── index.html           # Main HTML entry point
├── vite.config.mjs      # Vite configuration
└── .github/workflows/   # GitHub Actions for auto-deployment
```

## Migration Notes

This project was migrated from:
- Webpack → Vite
- Express server → Static site
- Complex SRI post-build scripts → Simple Vite build

The site is now a pure static website that can be hosted on any static hosting service (GitHub Pages, Netlify, Vercel, etc.).

## License

See project documentation.

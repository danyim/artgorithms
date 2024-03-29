# Artgorithms

### https://artgorithms.vercel.app

Inspired by exhibitions at the SFMOMA and Bret Victor's [Inventing on Principle talk](https://vimeo.com/36579366), this project aims to recreate the artwork in code and alogrithms.
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Deploy on Vercel

```bash
# Run a local build
npm run build
```

```bash
vercel
vercel --prod
```

## Adding New Artwork
- Decide on a slug name and add a new entry to the enum in `./constants/art-manifest.ts`
- Add an entry in `./pages/art/[slug]/index.tsx`
- Copy `./components/_Template` and change the name of the component
- Add a 100x100 thumbnail entry into `./public/thumb/[slug].png` (with the slug name)

## Research
- [Pentagonal tiling](https://en.wikipedia.org/wiki/Pentagonal_tiling)
- [Tesselation](https://en.wikipedia.org/wiki/Tessellation)
- [Generative art](https://en.wikipedia.org/wiki/Generative_art)

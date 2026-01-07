
#  Portfolio by Soumya

A modern, high-performance, and fully responsive portfolio website built with Next.js 16, TypeScript, Tailwind CSS, and Shadcn UI.Designed with a strong focus on performance, accessibility, scalability, and clean UI/UX.
![Portfolio Preview](/public/assets/hero.png)

## Deploy 

[![Live Demo](https://img.shields.io/badge/🚀-Live%20Demo-brightgreen)](https://soumyaranjan-1.vercel.app)

## Features

- **Next.js 16** with App Router
- **Tailwind CSS** for styling
- **Shadcn UI** components
- **Dark/Light** mode
- **Responsive** design
- **MDX** for blog posts and project details
- **TypeScript** for type safety


## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
GEMINI_API_KEY="your-api-key"
NODE_ENV="development"
NEXT_PUBLIC_URL="http://localhost:3000"
SPOTIFY_KEY="your-api"
```


   ```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Soumyaranjan-p/My-Portfolio
   cd My-Portfolio
   ```

2. Install dependencies:

   ```bash

   # Using npm
   npm install
   ```

3. Run the development server:

   ```bash
 
   # Using npm
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

The project uses configuration files in the `app/config` directory for easy customization:

- `About.tsx` - About section content
- `Contact.tsx` - Contact form settings
- `Experience.tsx` - Work experience details
- `Footer.tsx` - Footer links and content
- `Gears.tsx` - Setup/gear section
- `Hero.tsx` - Hero section content
- `Meta.tsx` - SEO and metadata
- `Navbar.tsx` - Navigation links
- `Projects.tsx` - Project showcase settings
- `Quote.ts` - Random quotes configuration
- `Resume.ts` - Resume section details
- `Setup.tsx` - Development setup information
- `cat.ts` - Enable disable the cat


### Blog Posts

1. Create a new MDX file in `app/data/blog/`
2. Add metadata and content following existing post structure
3. Add blog thumbnail in `public/blog/`

### Projects

1. Create a new MDX file in `app/data/projects/`
2. Add metadata and content following existing project structure
3. Add project thumbnail in `public/project/`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

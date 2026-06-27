
import { about } from './About';
import { heroConfig } from './Hero';
export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

// Base site configuration
export const siteConfig = {
  name: heroConfig.name,
  title: 'Minimal Portfolio',
  
  url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
  ogImage: '/meta/opengraph-image.png',
  author: {
    name: about.name,
    twitter: '@soumya_ai',
    github: 'Soumyaranjan-p',
    linkedin: 'soumya-ranjan-parida-44b71b286',
    email: 'ranjanparidasoumya04@gmail.com',
  },
  keywords: [
    'portfolio',
    'developer',
    'full-stack',
    'react',
    'nextjs',
    'typescript',
    'web development',
    heroConfig.name.toLowerCase(),
  ],
};

export const pageMetadata: Record<string, PageMeta> = {
  // Home page
  '/': {
    title: `${heroConfig.name} - ${heroConfig.title}`,
    description: `${about.description} Explore my projects, experience, and technical expertise.`,
    keywords: [
      'portfolio',
      'developer',
      'full-stack',
      'web development',
      'projects',
    ],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
  '/work-experience': {
    title: `Work Experience - ${heroConfig.name}`,
    description: `Detailed history of my professional engineering roles, projects, and career milestones.`,
    keywords: ['work', 'experience', 'career', 'resume', 'software engineer'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
  '/blog': {
    title: `Blogs - ${heroConfig.name}`,
    description: `Thoughts, tutorials, and insights on engineering, programming, and technology.`,
    keywords: ['blog', 'articles', 'tutorials', 'tech', 'software engineering'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
  '/projects': {
    title: `Projects - ${heroConfig.name}`,
    description: `A collection of applications, libraries, and open-source contributions.`,
    keywords: ['projects', 'portfolio', 'apps', 'open source', 'react'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
  '/contact': {
    title: `Contact - ${heroConfig.name}`,
    description: `Get in touch for opportunities, collaborations, or inquiries.`,
    keywords: ['contact', 'email', 'hire me', 'freelance'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
  '/resume': {
    title: `Resume - ${heroConfig.name}`,
    description: `My official curriculum vitae outlining skills, education, and career experience.`,
    keywords: ['resume', 'cv', 'pdf', 'hiring'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
  '/gears': {
    title: `Gears - ${heroConfig.name}`,
    description: `The physical equipment, hardware, and dev gear I use daily.`,
    keywords: ['gear', 'hardware', 'setup', 'devices'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
  '/setup': {
    title: `Setup - ${heroConfig.name}`,
    description: `My editor, theme, and font configurations.`,
    keywords: ['vscode', 'cursor', 'editor theme', 'coding environment'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
  '/terminal': {
    title: `Terminal - ${heroConfig.name}`,
    description: `My shell configuration, terminal emulator, and custom shortcuts.`,
    keywords: ['zsh', 'terminal emulator', 'shell', 'configuration'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
  '/books': {
    title: `Books - ${heroConfig.name}`,
    description: `A collection of books that have influenced my thinking, design, and programming career.`,
    keywords: ['reading list', 'books', 'engineering books', 'growth'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
  '/movies': {
    title: `Movies - ${heroConfig.name}`,
    description: `Films, documentaries, and shows that have inspired and entertained me.`,
    keywords: ['watchlist', 'movies', 'shows', 'inspiration'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
};

// Helper function to get metadata for a specific page
export function getPageMetadata(pathname: string): PageMeta {
  return pageMetadata[pathname] || pageMetadata['/'];
}

// Helper function to generate complete metadata object for Next.js
export function generateMetadata(pathname: string) {
  const pageMeta = getPageMetadata(pathname);

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: pageMeta.keywords?.join(', '),
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    openGraph: {
      type: 'website',
      url: `${siteConfig.url}${pathname}`,
      title: pageMeta.title,
      description: pageMeta.description,
      siteName: siteConfig.title,
      images: [
        {
          url: pageMeta.ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: pageMeta.title,
        },
      ],
    },
    twitter: {
      card: pageMeta.twitterCard || 'summary_large_image',
      title: pageMeta.title,
      description: pageMeta.description,
      creator: siteConfig.author.twitter,
      images: [pageMeta.ogImage || siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${siteConfig.url}${pathname}`,
    },
  };
}

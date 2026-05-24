import Container from '@/app/components/common/Container';
import { Separator } from '@/components/ui/separator';
import { generateMetadata as getMetadata } from '@/app/config/Meta';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import ArrowLeft from '@/app/components/svgs/ArrowLeft';

export const metadata: Metadata = {
  ...getMetadata('/movies'),
};

const movies = [
  {
    title: 'The Social Network',
    type: 'Movie',
    genre: 'Drama / Biography',
    desc: 'The birth of Facebook. Captures the intense pressure, engineering speed, and complex human dynamics of startup life.',
  },
  {
    title: 'Interstellar',
    type: 'Movie',
    genre: 'Sci-Fi / Adventure',
    desc: 'Christopher Nolan\'s masterpiece exploring time dilatation, gravity, space travel, and human relationships.',
  },
  {
    title: 'Mr. Robot',
    type: 'Series',
    genre: 'Techno-thriller / Drama',
    desc: 'One of the most accurate depictions of computer programming, cybersecurity, and hacktivism on television.',
  },
];

export default function MoviesPage() {
  return (
    <Container className="py-16">
      <div className="space-y-10">
        {/* Back Link */}
        <div>
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold tracking-tight">
            Movies
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            A small collection of movies, TV shows, and sci-fi sagas that I enjoy and find inspiring.
          </p>
        </div>

        <Separator className="bg-muted/40" />

        {/* Movies List */}
        <div className="flex flex-col gap-6">
          {movies.map((item) => (
            <div key={item.title} className="py-4 border-b border-muted/30 last:border-0 pb-4 last:pb-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <span className="text-xs text-muted-foreground">{item.genre}</span>
              </div>
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1 uppercase tracking-wider">
                {item.type}
              </p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

import Container from '@/app/components/common/Container';
import { Separator } from '@/components/ui/separator';
import { generateMetadata as getMetadata } from '@/app/config/Meta';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import ArrowLeft from '@/app/components/svgs/ArrowLeft';

export const metadata: Metadata = {
  ...getMetadata('/books'),
};

const books = [
  {
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    category: 'Software Engineering',
    desc: 'The best resource for learning the concepts behind scalable, reliable storage systems and distributed databases.',
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Software Engineering',
    desc: 'A handbook of agile software craftsmanship. Teaches how to write cleaner, more maintainable code.',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Personal Development',
    desc: 'Practical strategies for building good habits, breaking bad ones, and mastering tiny behaviors that lead to remarkable results.',
  },
];

export default function BooksPage() {
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
            Books
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            A selection of books that have influenced my programming journey, technical design, and perspective on productivity.
          </p>
        </div>

        <Separator className="bg-muted/40" />

        {/* Books List */}
        <div className="flex flex-col gap-6">
          {books.map((book) => (
            <div key={book.title} className="py-4 border-b border-muted/30 last:border-0 pb-4 last:pb-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-sm font-semibold">{book.title}</h3>
                <span className="text-xs text-muted-foreground">by {book.author}</span>
              </div>
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1 uppercase tracking-wider">
                {book.category}
              </p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {book.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

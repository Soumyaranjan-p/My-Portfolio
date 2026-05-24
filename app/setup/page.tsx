import Container from '@/app/components/common/Container';
import { Separator } from '@/components/ui/separator';
import { generateMetadata as getMetadata } from '@/app/config/Meta';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import ArrowLeft from '@/app/components/svgs/ArrowLeft';

export const metadata: Metadata = {
  ...getMetadata('/setup'),
};

const setupItems = [
  {
    category: 'Editor',
    items: [
      { name: 'Cursor / VS Code', desc: 'Primary editors for TypeScript and Next.js projects' },
      { name: 'Color Theme', desc: 'GitHub Dark Default or Vesper for a clean distraction-free UI' },
      { name: 'Font', desc: 'Geist Mono or JetBrains Mono with ligatures enabled' },
    ],
  },
  {
    category: 'Key Extensions',
    items: [
      { name: 'Prettier', desc: 'Opinionated code formatter for consistent coding style' },
      { name: 'ESLint', desc: 'Pluggable JavaScript linter to catch runtime and formatting errors' },
      { name: 'GitLens', desc: 'Visualizes code authorship history directly within the editor' },
      { name: 'Tailwind CSS IntelliSense', desc: 'Provides auto-completion and linting for Tailwind utility classes' },
    ],
  },
];

export default function SetupPage() {
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
            Setup
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            My local coding environment settings, preferred themes, editor configurations, and productivity tools.
          </p>
        </div>

        <Separator className="bg-muted/40" />

        {/* Setup List */}
        <div className="space-y-8">
          {setupItems.map((group) => (
            <div key={group.category} className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
                {group.category}
              </h2>
              <div className="flex flex-col gap-4">
                {group.items.map((item) => (
                  <div key={item.name} className="flex justify-between items-start gap-4 border-b border-muted/30 pb-3 last:border-0 last:pb-0">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-xs text-muted-foreground text-right max-w-xs">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

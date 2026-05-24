import Container from '@/app/components/common/Container';
import { Separator } from '@/components/ui/separator';
import { generateMetadata as getMetadata } from '@/app/config/Meta';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import ArrowLeft from '@/app/components/svgs/ArrowLeft';

export const metadata: Metadata = {
  ...getMetadata('/terminal'),
};

const terminalSpecs = [
  {
    category: 'Environment',
    items: [
      { name: 'Terminal Emulator', spec: 'Alacritty or macOS Terminal / WezTerm' },
      { name: 'Shell', spec: 'Zsh (Z Shell) configured with custom scripts' },
      { name: 'Prompt Engine', spec: 'Starship Prompt (clean, ultra-fast, cross-shell)' },
    ],
  },
  {
    category: 'Productivity Utilities',
    items: [
      { name: 'zsh-autosuggestions', spec: 'Auto-completes shell commands as you type based on command history' },
      { name: 'zsh-syntax-highlighting', spec: 'Highlights valid and invalid command syntax dynamically' },
      { name: 'fzf', spec: 'General-purpose command-line fuzzy finder' },
      { name: 'eza', spec: 'Modern, feature-rich replacement for standard ls command' },
    ],
  },
];

export default function TerminalPage() {
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
            Terminal
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            My terminal preferences, shell configurations, CLI utilities, and key plugins that keep the command line fast.
          </p>
        </div>

        <Separator className="bg-muted/40" />

        {/* Terminal List */}
        <div className="space-y-8">
          {terminalSpecs.map((group) => (
            <div key={group.category} className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
                {group.category}
              </h2>
              <div className="flex flex-col gap-4">
                {group.items.map((item) => (
                  <div key={item.name} className="flex justify-between items-start gap-4 border-b border-muted/30 pb-3 last:border-0 last:pb-0">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-xs text-muted-foreground text-right max-w-xs">{item.spec}</span>
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

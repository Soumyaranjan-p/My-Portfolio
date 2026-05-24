import Container from '@/app/components/common/Container';
import { Separator } from '@/components/ui/separator';
import { generateMetadata as getMetadata } from '@/app/config/Meta';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import ArrowLeft from '@/app/components/svgs/ArrowLeft';

export const metadata: Metadata = {
  ...getMetadata('/gears'),
};

const gears = [
  {
    category: 'Workstation',
    items: [
      { name: 'MacBook Pro 14"', spec: 'M3 Pro, 18GB Unified Memory, 512GB SSD' },
      { name: 'Dell UltraSharp 27" Monitor', spec: '4K USB-C Hub Monitor (U2723QE)' },
    ],
  },
  {
    category: 'Peripherals',
    items: [
      { name: 'Keychron K2 V2', spec: 'Hot-swappable Mechanical Keyboard with Gateron Brown Switches' },
      { name: 'Logitech MX Master 3S', spec: 'Ergonomic wireless mouse with silent clicks' },
    ],
  },
  {
    category: 'Audio & Office',
    items: [
      { name: 'Sony WH-1000XM4', spec: 'Wireless Noise Canceling Headphones' },
      { name: 'Ergonomic Desk Chair', spec: 'High-back mesh chair with lumbar support' },
    ],
  },
];

export default function GearsPage() {
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
            Gears
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            A list of the hardware, physical equipment, and workplace items I use to develop software daily.
          </p>
        </div>

        <Separator className="bg-muted/40" />

        {/* Gears List */}
        <div className="space-y-8">
          {gears.map((group) => (
            <div key={group.category} className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
                {group.category}
              </h2>
              <div className="flex flex-col gap-4">
                {group.items.map((item) => (
                  <div key={item.name} className="flex justify-between items-start gap-4 border-b border-muted/30 pb-3 last:border-0 last:pb-0">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-xs text-muted-foreground text-right">{item.spec}</span>
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

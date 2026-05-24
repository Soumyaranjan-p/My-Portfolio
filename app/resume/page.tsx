import Container from '../components/common/Container';
import { Separator } from '@/components/ui/separator';
import { resumeConfig } from '../config/Resume';
import { generateMetadata as getMetadata } from '../config/Meta';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import ArrowLeft from '@/app/components/svgs/ArrowLeft';

export const metadata: Metadata = {
  ...getMetadata('/resume'),
};

export default function ResumePage() {
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
            Resume
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            My official CV. You can also{' '}
            <a 
              href={resumeConfig.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground font-medium underline underline-offset-4 hover:text-foreground/80 transition-colors"
            >
              download it directly
            </a>
            .
          </p>
        </div>

        <Separator className="bg-muted/40" />

        {/* PDF Viewer */}
        <div className="border border-border/60 rounded-lg overflow-hidden bg-muted/20">
          <iframe
            src={`${resumeConfig.url}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-[800px] border-none"
            title="Resume PDF"
          ></iframe>
        </div>
      </div>
    </Container>
  );
}

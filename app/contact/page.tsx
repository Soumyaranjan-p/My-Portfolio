import Container from '../components/common/Container';
import ContactForm from '../components/contact/ContactForm';
import { Separator } from '@/components/ui/separator';
import { contactConfig } from '@/app/config/Contact';
import { generateMetadata as getMetadata } from '@/app/config/Meta';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import ArrowLeft from '@/app/components/svgs/ArrowLeft';

export const metadata: Metadata = {
  ...getMetadata('/contact'),
};

export default function ContactPage() {
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
            {contactConfig.title}
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            {contactConfig.description}
          </p>
        </div>

        <Separator className="bg-muted/40" />

        {/* Contact Form */}
        <div className="max-w-xl pt-2">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}

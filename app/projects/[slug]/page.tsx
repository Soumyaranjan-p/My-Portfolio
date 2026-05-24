import Container from '@/app/components/common/Container';
import { ProjectContent } from '@/app/components/projects/ProjectContent';
import { ProjectNavigation } from '@/app/components/projects/ProjectNavigation';
import ArrowLeft from '@/app/components/svgs/ArrowLeft';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/app/config/Meta';
import {
  getProjectCaseStudyBySlug,
  getProjectCaseStudySlugs,
  getProjectNavigation,
  getRelatedProjectCaseStudies,
} from '@/app/lib/project';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

interface ProjectCaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getProjectCaseStudySlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getProjectCaseStudyBySlug(slug);

  if (!caseStudy || !caseStudy.frontmatter.isPublished) {
    return {
      title: 'Project Not Found',
    };
  }

  const { title, description, image } = caseStudy.frontmatter;

  return {
    metadataBase: new URL(siteConfig.url),
    title: `${title} - Project Case Study`,
    description,
    openGraph: {
      title: `${title} - Project Case Study`,
      description,
      images: [image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - Project Case Study`,
      description,
      images: [image],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectCaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await getProjectCaseStudyBySlug(slug);

  if (!caseStudy || !caseStudy.frontmatter.isPublished) {
    notFound();
  }

  const navigation = await getProjectNavigation(slug);
  const relatedProjects = await getRelatedProjectCaseStudies(slug, 2);

  return (
    <Container className="py-16">
      <div className="space-y-10">
        {/* Back Link */}
        <div>
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* Project Content */}
        <ProjectContent
          frontmatter={caseStudy.frontmatter}
          content={caseStudy.content}
        />

        {/* Project Navigation */}
        <ProjectNavigation
          previous={navigation.previous}
          next={navigation.next}
        />

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="space-y-6 pt-4 max-w-2xl mx-auto">
            <Separator className="bg-muted/40" />
            <div className="space-y-4">
              <h2 className="text-base font-semibold">Related Projects</h2>
              <div className="flex flex-col gap-4">
                {relatedProjects.map((project) => (
                  <div
                    key={project.slug}
                    className="group py-4 border-b border-muted/50 last:border-0"
                  >
                    <Link href={`/projects/${project.slug}`}>
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                          <h3 className="text-sm font-semibold hover:underline">
                            {project.frontmatter.title}
                          </h3>
                          <Badge 
                            variant="outline"
                            className="w-fit text-xs font-normal px-2 py-0.5 border-border/85 text-muted-foreground bg-transparent shadow-none"
                          >
                            {project.frontmatter.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {project.frontmatter.description}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Back to Projects CTA */}
        <div className="text-center pt-6">
          <Separator className="mb-8 bg-muted/40" />
          <Link 
            href="/projects"
            className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors border-b border-dashed border-muted-foreground/40 pb-0.5"
          >
            View all projects
          </Link>
        </div>
      </div>
    </Container>
  );
}

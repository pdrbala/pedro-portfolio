import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/work/CaseStudyView";
import { getProject, projectSlugs } from "@/data/projects";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug, "en");
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!projectSlugs.includes(slug)) notFound();
  return <CaseStudyView slug={slug} />;
}

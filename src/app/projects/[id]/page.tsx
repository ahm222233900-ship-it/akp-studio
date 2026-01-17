import { PROJECTS } from '@/constants';
import ProjectDetails from './ProjectDetails';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find(p => p.id === id);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | AKP STUDIO`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const project = PROJECTS.find(p => p.id === id);
  
  if (!project) {
    return notFound();
  }

  return <ProjectDetails project={project} />;
}

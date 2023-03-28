import { Project } from '@/exports/exports';

export const metadata = {
  title: {
    default: 'Project Management | HYPPADEC',
    template: '%s | Project Management | HYPPADEC',
  },
  description: 'HYPPADEC - Project Management',
};

export default function ProjectMM() {
  return <Project />;
}

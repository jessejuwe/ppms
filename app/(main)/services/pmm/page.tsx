import { Project } from '@/exports/exports';

export const metadata = {
  title: {
    default: 'Project Management | PPMS',
    template: '%s | Project Management | PPMS',
  },
  description: 'Get to know what PPMS is all about',
};

export default function ProjectMM() {
  return <Project />;
}

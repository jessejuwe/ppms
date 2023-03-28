import { images } from '@/constants';

interface DashboardService {
  breadcrumb: String;
  title: String;
  content: String;
  img: any;
  alt: string;
}

export const DashboardService: DashboardService[] = [
  {
    breadcrumb: 'Empowerment Program Management',
    title: 'Empowerment Program Management',
    content: 'Content goes here',
    img: images.empowerment,
    alt: 'empowerment',
  },
  {
    breadcrumb: 'Community Support Program Management',
    title: 'Community Support Program Management',
    content: 'Content goes here',
    img: images.community,
    alt: 'community',
  },
  {
    breadcrumb: 'Education Support Program Management',
    title: 'Education Support Program Management',
    content: 'Content goes here',
    img: images.education,
    alt: 'education',
  },
  {
    breadcrumb: 'Emergency Management',
    title: 'Emergency Management',
    content: 'Content goes here',
    img: images.emergency,
    alt: 'emergency',
  },
  {
    breadcrumb: 'Project Management',
    title: 'Project Management',
    content: 'Content goes here',
    img: images.project,
    alt: 'project',
  },
  {
    breadcrumb: 'Store Inventory Management',
    title: 'Store Inventory Management',
    content: 'Content goes here',
    img: images.inventory,
    alt: 'inventory',
  },
];

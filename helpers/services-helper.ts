import { images } from '@/constants';

interface Service {
  breadcrumb: String;
  title: String;
  content: String;
  img: any;
  alt: string;
}

export const EMPOWERMENT: Service = {
  breadcrumb: 'Empowerment Program Management',
  title: 'Empowerment Program Management',
  content: 'Content goes here',
  img: images.empowerment,
  alt: 'empowerment',
};

export const COMMUNITY: Service = {
  breadcrumb: 'Community Support Program Management',
  title: 'Community Support Program Management',
  content: 'Content goes here',
  img: images.community,
  alt: 'community',
};

export const EDUCATION: Service = {
  breadcrumb: 'Education Support Program Management',
  title: 'Education Support Program Management',
  content: 'Content goes here',
  img: images.education,
  alt: 'education',
};

export const EMERGENCY: Service = {
  breadcrumb: 'Emergency Management',
  title: 'Emergency Management',
  content: 'Content goes here',
  img: images.emergency,
  alt: 'emergency',
};

export const PROJECT: Service = {
  breadcrumb: 'Project Management',
  title: 'Project Management',
  content: 'Content goes here',
  img: images.project,
  alt: 'project',
};

export const INVENTORY: Service = {
  breadcrumb: 'Store Inventory Management',
  title: 'Store Inventory Management',
  content: 'Content goes here',
  img: images.inventory,
  alt: 'inventory',
};

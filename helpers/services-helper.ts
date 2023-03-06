import { images } from '@/constants';

interface Modules {
  title: String;
  to: string;
  img: any;
}

export const MODULES: Modules[] = [
  {
    to: '/services/epmm',
    title: 'Empowerment Program Management',
    img: images.empowerment,
  },
  {
    to: '/services/cspmm',
    title: 'Community Support Program Management',
    img: images.community,
  },

  {
    to: '/services/espmm',
    title: 'Education Support Program Management',
    img: images.education,
  },
  {
    to: '/services/emm',
    title: 'Emergency Management',
    img: images.emergency,
  },
  {
    to: '/services/pmm',
    title: 'Project Management',
    img: images.project,
  },
  {
    to: '/services/simm',
    title: 'Store-Inventory Management',
    img: images.inventory,
  },
];

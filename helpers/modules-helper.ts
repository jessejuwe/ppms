import { images } from '@/constants';

interface Modules {
  title: String;
  to: string;
  img: any;
}

interface DashboardModules {
  title: String;
  drawer: string;
  img: any;
}

export const MODULES: Modules[] = [
  {
    to: '/services/epmm',
    title: 'Youth Empowerment',
    img: images.empowerment,
  },
  {
    to: '/services/cspmm',
    title: 'Community Empowerment',
    img: images.community,
  },

  {
    to: '/services/espmm',
    title: 'Education Empowerment',
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

export const DASHOARD_MODULES: DashboardModules[] = [
  {
    title: 'Youth Empowerment',
    drawer: 'Youth Empowerment',
    img: images.empowerment,
  },
  {
    title: 'Community Empowerment',
    drawer: 'Community Empowerment',
    img: images.community,
  },

  {
    title: 'Education Empowerment',
    drawer: 'Education Empowerment',
    img: images.education,
  },
  {
    title: 'Emergency Management',
    drawer: 'Emergency Management',
    img: images.emergency,
  },
  {
    title: 'Project Management',
    drawer: 'Project Management',
    img: images.project,
  },
  {
    title: 'Store-Inventory Management',
    drawer: 'Store-Inventory Management',
    img: images.inventory,
  },
];

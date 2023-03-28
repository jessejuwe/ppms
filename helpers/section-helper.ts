import { images } from '@/constants';

interface Service {
  title: String;
  to: string;
}

export const SERVICES: Service[] = [
  {
    to: '/modules/epmm',
    title: 'Youth Empowerment',
  },
  {
    to: '/modules/cspmm',
    title: 'Community Empowerment',
  },

  {
    to: '/modules/espmm',
    title: 'Education Empowerment',
  },
  {
    to: '/modules/emm',
    title: 'Emergency Management',
  },
  {
    to: '/modules/pmm',
    title: 'Project Management',
  },
  {
    to: '/modules/simm',
    title: 'Store-Inventory Management',
  },
];

interface TABS {
  active: boolean;
  title: String;
  heading: String;
  description: String;
  img: any;
  alt: string;
}

export const TABS: TABS[] = [
  {
    active: true,
    title: 'Access',
    heading: 'Access PPMS with ease',
    description:
      'Users will be able to access the system from any computer connected to the Internet using a standard browser. This equally means that you can use it wherever you are, even from mobile device, provided you are connected to the internet.',
    img: images.access,
    alt: 'access',
  },
  {
    active: false,
    title: 'Operation',
    heading: 'Adopt PPMS with ease',
    description:
      'Field officers and those operating at remote Local Government Areas can perform critical assignments in a real time fashion because PPMS is a system that can be easily adopted with little to no training.',
    img: images.operation,
    alt: 'operation',
  },
  {
    active: false,
    title: 'Comfort',
    heading: 'Use PPMS with ease',
    description:
      'Users can choice when and where they can use the application, thus promoting work flexibility that can increase the overall employee productivity.',
    img: images.comfort,
    alt: 'comfort',
  },
];

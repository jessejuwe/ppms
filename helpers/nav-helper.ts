interface NavLink {
  to: string;
  path: String;
  title: String;
}

interface DropdownLink {
  to: string;
  path: String;
  title: String;
}

interface Dashboard {
  title: String;
}

export const NavLink: NavLink[] = [
  { to: '/', path: '/', title: 'Home' },
  { to: '/about', path: '/about', title: 'About Us' },
];

export const DropdownLink: DropdownLink[] = [
  {
    to: '/services/epmm',
    path: '/services/epmm',
    title: 'Empowerment Program Management',
  },
  {
    to: '/services/cspmm',
    path: '/services/cspmm',
    title: 'Community Support Program Management',
  },

  {
    to: '/services/espmm',
    path: '/services/espmm',
    title: 'Education Support Program Management',
  },
  {
    to: '/services/emm',
    path: '/services/emm',
    title: 'Emergency Management',
  },
  {
    to: '/services/pmm',
    path: '/services/pmm',
    title: 'Project Management',
  },
  {
    to: '/services/simm',
    path: '/services/simm',
    title: 'Store-Inventory Management',
  },
];

export const Dashboard: Dashboard[] = [
  { title: 'Dashboard' },
  { title: 'Settings' },
  { title: 'Sign out' },
];

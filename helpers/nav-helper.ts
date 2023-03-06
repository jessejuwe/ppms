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
    to: '/modules/epmm',
    path: '/modules/epmm',
    title: 'Empowerment Program Management',
  },
  {
    to: '/modules/cspmm',
    path: '/modules/cspmm',
    title: 'Community Support Program Management',
  },

  {
    to: '/modules/espmm',
    path: '/modules/espmm',
    title: 'Education Support Program Management',
  },
  {
    to: '/modules/emm',
    path: '/modules/emm',
    title: 'Emergency Management',
  },
  {
    to: '/modules/pmm',
    path: '/modules/pmm',
    title: 'Project Management',
  },
  {
    to: '/modules/simm',
    path: '/modules/simm',
    title: 'Store-Inventory Management',
  },
];

export const Dashboard: Dashboard[] = [
  { title: 'Dashboard' },
  { title: 'Settings' },
  { title: 'Sign out' },
];

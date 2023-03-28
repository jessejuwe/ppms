import { images } from '@/constants';

interface Service {
  breadcrumb: String;
  title: String;
  content: String;
  img: any;
  alt: string;
}

export const EMPOWERMENT: Service = {
  breadcrumb: 'Youth Empowerment',
  title: 'Youth Empowerment',
  content: `One of the primary aims of HYPPADEC Empowerment initiatives is to
  reduce the level of unemployment in the HYPPADEC member states,
  through skill acquisition programmes code named Youth
  Transformation. Skill acquisition is one of the strategic paths
  towards helping the youths to actualize their dreams and aid those
  who are not privileged to secure employment.`,
  img: images.empowerment,
  alt: 'empowerment',
};

export const COMMUNITY: Service = {
  breadcrumb: 'Community Empowerment',
  title: 'Community Empowerment',
  content: `The HYPPADEC Community Support Programme (CSP) strives to improve
  the wellbeing of individuals living in the affected HYPPADEC
  communities. CSP aims to identify the communities issues and
  introduce intervention scheme to resolve the issues. The focus is
  on the following key areas - Relief Intervention, Poverty
  Alleviation, Empowerment, Medical Outreach, Fertilizer
  Distribution, Others areas as may be considered to be of critical
  importance.`,
  img: images.community,
  alt: 'community',
};

export const EDUCATION: Service = {
  breadcrumb: 'Education Empowerment',
  title: 'Education Empowerment',
  content: `HYPPADEC recognizes that funding education is increasingly
  becoming a challenge for many students, therefore, the Education
  Support Programme (ESP) is targeted at providing financial support
  to indigent students of affected areas of HYPPADEC member states,
  in tertiary educational institution. This is in line with the
  overarching mandate of the Commission. Students can take advantage
  of either the bursary scheme or scholarship funding.`,
  img: images.education,
  alt: 'education',
};

export const EMERGENCY: Service = {
  breadcrumb: 'Emergency Management',
  title: 'Emergency Management',
  content: `The Emergency Management module is aimed at prompting quick responses
  required to ensure adequate management of emergency situation, most
  especially as it relates to flooding.`,
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

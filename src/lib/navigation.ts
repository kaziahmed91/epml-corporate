export const navigationItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/projects",
    label: "Projects",
    children: [
      {
        href: "/projects/ongoing",
        label: "Ongoing",
      },
      {
        href: "/projects/upcoming",
        label: "Upcoming",
      },
      {
        href: "/projects/completed",
        label: "Completed",
      },
    ],
  },
  {
    href: "/news",
    label: "News",
  },
  {
    href: "/buyers-guide",
    label: "Buyers Guide",
  },
  {
    href: "/landowners",
    label: "Landowners",
  },
  {
    href: "/careers",
    label: "Careers",
  },
  {
    href: "/construction-status",
    label: "Construction Status",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export const footerLinks = {
  company: [
    // { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ],
  projects: [
    { href: "/projects/ongoing", label: "Ongoing Projects" },
    { href: "/projects/upcoming", label: "Upcoming Projects" },
    { href: "/projects/completed", label: "Completed Projects" },
  ],
  services: [
    { href: "/buyers-guide", label: "Buyers Guide" },
    { href: "/landowners", label: "For Landowners" },
    { href: "/construction-status", label: "Construction Status" },
  ],
  resources: [
    { href: "/news", label: "News & Updates" },
    { href: "/contact", label: "Support" },
  ],
};

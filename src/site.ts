// Studio details used across the site (header, footer, contact page, Google structured data).
// Fill in the empty values; anything left empty is simply not shown.
export const site = {
  name: 'Studio Infinity',
  description:
    'Studio Infinity is an architecture and interior design practice working on residential and commercial projects in Mumbai, Delhi, Bangalore and Jaipur.',
  email: '',
  phone: '', // e.g. '+91 98765 43210'
  whatsapp: '', // digits only with country code, e.g. '919876543210'
  address: {
    street: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'IN',
  },
  social: {
    instagram: '',
    linkedin: '',
    pinterest: '',
  },
};

export const nav = [
  { label: 'About', href: '/about/' },
  { label: 'Services', href: '/services/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Contact', href: '/contact/' },
];

export const projectCategories = {
  residential: 'Residential',
  commercial: 'Commercial',
  interior: 'Interior',
} as const;

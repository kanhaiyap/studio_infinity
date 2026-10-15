// Studio details used across the site (header, footer, contact page, Google structured data).
// Fill in the empty values; anything left empty is simply not shown.
export const site = {
  name: 'Studio Infinity',
  description:
    'Studio Infinity is an architecture and interior design firm in Jaipur designing luxury homes, villas, farmhouses, hotels, interiors, furniture and landscapes across Rajasthan, Ahmedabad, Pune, Surat and Hyderabad.',
  email: 'agrawal.shivaang@gmail.com', // main contact, shown in the header, footer and contact page
  phone: '+91 97836 50470',
  whatsapp: '919783650470', // digits only with country code
  address: {
    street: '117, Heera Nagar, DCM, Ajmer Road',
    city: 'Jaipur',
    region: 'Rajasthan',
    postalCode: '302019',
    country: 'IN',
  },
  // Principal architects, shown on the About and Contact pages and in Google structured data.
  founders: [
    { name: 'Ar. Shivang Agarwal', phone: '+91 97836 50470', email: 'agrawal.shivaang@gmail.com' },
    { name: 'Ar. Divya Gupta', phone: '+91 97855 96080', email: 'divyagupta512@gmail.com' },
  ],
  disciplines: ['Architecture', 'Interiors', 'Furniture design', 'Landscape'],
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
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
];

export const projectCategories = {
  residential: 'Residential',
  commercial: 'Commercial',
  interior: 'Interior',
} as const;

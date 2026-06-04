import PackagesClient from './PackagesClient';

export const metadata = {
  title: 'Luxury Tour Packages & Custom Trips | Shiv Travel Ahmedabad',
  description: 'Explore hand-crafted holiday packages by Shiv Travel. Includes spiritual yatras, couples getaways, international escapades, and custom adventures from Gujarat.',
  alternates: {
    canonical: 'https://travelbookshiva.in/packages',
  },
  openGraph: {
    title: 'Tour Packages | Shiv Travel Luxury Curated Adventures',
    description: 'Explore hand-crafted holiday packages by Shiv Travel. Includes spiritual yatras, couples getaways, and custom adventures.',
    url: 'https://travelbookshiva.in/packages',
    siteName: 'Shiv Travel',
    images: [{ url: 'https://travelbookshiva.in/api/uploads/logo.png' }]
  }
};

export default function Page() {
  return <PackagesClient />;
}

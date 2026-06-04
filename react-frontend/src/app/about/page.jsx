import AboutClient from './AboutClient';

export const metadata = {
  title: 'About Us & Our Luxury Travel Curations | Shiv Travel',
  description: 'Ahmedabad\'s premier agency since 2019. Trusted by 52,000+ travellers. Discover our story, customized tours, destination management, and customer satisfaction record.',
  alternates: {
    canonical: 'https://travelbookshiva.in/about',
  },
  openGraph: {
    title: 'About Shiv Travel | Luxury Curated Adventures',
    description: 'Ahmedabad\'s premier agency since 2019. Trusted by 52,000+ travellers.',
    url: 'https://travelbookshiva.in/about',
    siteName: 'Shiv Travel',
    images: [{ url: 'https://travelbookshiva.in/api/uploads/logo.png' }]
  }
};

export default function Page() {
  return <AboutClient />;
}

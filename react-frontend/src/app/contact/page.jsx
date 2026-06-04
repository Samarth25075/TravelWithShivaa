import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Us & Office Location | Shiv Travel Ahmedabad',
  description: 'Connect with Shiv Travel agents in Ahmedabad. Get custom itineraries, book domestic/international holidays, visit our office, or chat live on WhatsApp.',
  alternates: {
    canonical: 'https://travelbookshiva.in/contact',
  },
  openGraph: {
    title: 'Contact Shiv Travel | Premium Tours & Travels',
    description: 'Connect with Shiv Travel agents in Ahmedabad. Get custom itineraries or chat live on WhatsApp.',
    url: 'https://travelbookshiva.in/contact',
    siteName: 'Shiv Travel',
    images: [{ url: 'https://travelbookshiva.in/api/uploads/logo.png' }]
  }
};

export default function Page() {
  return <ContactClient />;
}

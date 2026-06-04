import HomeClient from './HomeClient';

export const metadata = {
  title: 'Shiv Travel | Luxury Curated Adventures & Tour Packages Ahmedabad',
  description: 'Premium Travel Agency Since 2019. 52,000+ happy travellers — Ahmedabad\'s most trusted agency for domestic and international custom tour packages, Manali excursions, and luxury holidays.',
  alternates: {
    canonical: 'https://travelbookshiva.in',
  },
  openGraph: {
    title: 'Shiv Travel | Luxury Curated Adventures',
    description: 'Premium Travel Agency Since 2019. 52,000+ happy travellers — Ahmedabad\'s most trusted agency.',
    url: 'https://travelbookshiva.in',
    siteName: 'Shiv Travel',
    images: [{ url: 'https://travelbookshiva.in/api/uploads/logo.png' }]
  }
};

export default function Page() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "TravelBookShiva",
    "alternateName": "Shiv Travel",
    "image": "https://travelbookshiva.in/api/uploads/logo.png",
    "@id": "https://travelbookshiva.in/#localbusiness",
    "url": "https://travelbookshiva.in",
    "telephone": "+919099599331",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "508/608, 3rd Eye Vision, Above Nexa Showroom, IIM Road",
      "addressLocality": "Ahmedabad",
      "postalCode": "380015",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.0315,
      "longitude": 72.5412
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://instagram.com/travelbookshiva",
      "https://facebook.com"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HomeClient />
    </>
  );
}

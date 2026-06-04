import GroupTripsClient from './GroupTripsClient';

export const metadata = {
  title: 'Elite Group Journeys & Luxury Departures | Shiv Travel',
  description: 'Join Ahmedabad\'s premium shared group holidays. Curated travel circles, international and domestic tours, full booking management, and luxury hospitality.',
  alternates: {
    canonical: 'https://travelbookshiva.in/group-trips',
  },
  openGraph: {
    title: 'Elite Group Departures | Shiv Travel',
    description: 'Join Ahmedabad\'s premium shared group holidays. Curated travel circles, international and domestic tours, and luxury hospitality.',
    url: 'https://travelbookshiva.in/group-trips',
    siteName: 'Shiv Travel',
    images: [{ url: 'https://travelbookshiva.in/api/uploads/logo.png' }]
  }
};

export default function Page() {
  return <GroupTripsClient />;
}

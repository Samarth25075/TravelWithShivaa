import CustomPackageClient from './CustomPackageClient';

export const metadata = {
  title: 'Custom Itinerary Planner & Tailored Holidays | Shiv Travel',
  description: 'Design your custom curated luxury vacation. Pick your locations, budget, and travel dates, and get a professional travel itinerary from Ahmedabad agents in 2 hours.',
  alternates: {
    canonical: 'https://travelbookshiva.in/custom-package',
  },
  openGraph: {
    title: 'Custom Holiday Planner | Shiv Travel',
    description: 'Design your custom curated luxury vacation. Pick your locations, budget, and travel dates.',
    url: 'https://travelbookshiva.in/custom-package',
    siteName: 'Shiv Travel',
    images: [{ url: 'https://travelbookshiva.in/api/uploads/logo.png' }]
  }
};

export default function Page() {
  return <CustomPackageClient />;
}

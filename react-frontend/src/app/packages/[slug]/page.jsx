import PackageDetailsClient from './PackageDetailsClient';
import axios from 'axios';

const defaultApiUrl = process.env.NODE_ENV === 'production'
  ? 'https://travelwithshivaa.onrender.com/api/'
  : 'http://localhost:8000/api/';

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || defaultApiUrl;
axios.defaults.baseURL = rawApiUrl.endsWith('/') ? rawApiUrl : `${rawApiUrl}/`;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await axios.get(`packages/${slug}`);
    const pkg = res.data;
    
    // Fallback description if none is present
    const descriptionText = pkg.description 
      ? (pkg.description.replace(/<[^>]*>/g, '').substring(0, 160) + '...')
      : `Book this premium custom luxury package for ${pkg.location || 'your next destination'} by Shiv Travel Ahmedabad.`;

    const imageUrl = pkg.image 
      ? (pkg.image.startsWith('http') ? pkg.image : `https://travelbookshiva.in/api/uploads/${pkg.image}`)
      : 'https://travelbookshiva.in/api/uploads/logo.png';

    return {
      title: `${pkg.title || 'Luxury Package'} | Shiv Travel`,
      description: descriptionText,
      alternates: {
        canonical: `https://travelbookshiva.in/packages/${slug}`,
      },
      openGraph: {
        title: `${pkg.title || 'Luxury Package'} Tour Package | Shiv Travel`,
        description: descriptionText,
        url: `https://travelbookshiva.in/packages/${slug}`,
        siteName: 'Shiv Travel',
        images: [{ url: imageUrl }]
      }
    };
  } catch (err) {
    return {
      title: 'Luxury Curated Holiday Tour Package | Shiv Travel',
      description: 'Custom curated domestic and international luxury travel packages by Ahmedabad\'s premium tour agency.'
    };
  }
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  return <PackageDetailsClient params={resolvedParams} />;
}

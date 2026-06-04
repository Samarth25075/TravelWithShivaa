import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default async function sitemap() {
  const baseUrl = 'https://travelbookshiva.in';

  // Core Static URLs
  const staticUrls = [
    { 
      url: `${baseUrl}`, 
      lastModified: new Date(), 
      changeFrequency: 'daily', 
      priority: 1.0 
    },
    { 
      url: `${baseUrl}/packages`, 
      lastModified: new Date(), 
      changeFrequency: 'daily', 
      priority: 0.9 
    },
    { 
      url: `${baseUrl}/about`, 
      lastModified: new Date(), 
      changeFrequency: 'monthly', 
      priority: 0.6 
    },
    { 
      url: `${baseUrl}/contact`, 
      lastModified: new Date(), 
      changeFrequency: 'monthly', 
      priority: 0.8 
    },
    { 
      url: `${baseUrl}/group-trips`, 
      lastModified: new Date(), 
      changeFrequency: 'weekly', 
      priority: 0.8 
    },
    { 
      url: `${baseUrl}/custom-package`, 
      lastModified: new Date(), 
      changeFrequency: 'monthly', 
      priority: 0.8 
    },
  ];

  // Dynamic Database-backed Packages URLs
  let dynamicUrls = [];
  try {
    const res = await axios.get('packages');
    const packages = res.data;
    
    if (Array.isArray(packages)) {
      dynamicUrls = packages.map((pkg) => {
        // Use ID or slug matching the dynamic router mapping
        const packageIdentifier = pkg.slug || pkg.id || pkg._id;
        return {
          url: `${baseUrl}/packages/${packageIdentifier}`,
          lastModified: new Date(pkg.updated_at || pkg.updatedAt || pkg.createdAt || new Date()),
          changeFrequency: 'weekly',
          priority: 0.7,
        };
      });
    }
  } catch (error) {
    console.error('Sitemap generator: Failed to fetch packages for XML aggregation:', error.message);
  }

  return [...staticUrls, ...dynamicUrls];
}

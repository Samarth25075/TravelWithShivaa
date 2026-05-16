import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url, image, structuredData }) => {
  const siteName = "Shiv Travel";
  const defaultTitle = "Shiv Travel | Premium Travel & Tour Packages from Ahmedabad";
  const defaultDescription = "Discover bespoke travel experiences, international and domestic tour packages with Shiv Travel. 52K+ happy travelers, 4.9 Justdial rating.";
  const defaultImage = "https://images.unsplash.com/photo-1549111451-40be357bd1b4?auto=format&fit=crop&w=1200&q=80"; // A default sharing image
  const defaultUrl = "https://travelbookshiva.in";

  const seoTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image || defaultImage;
  const seoUrl = url ? `${defaultUrl}${url}` : defaultUrl;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Shiv Travel",
    "url": "https://travelbookshiva.in",
    "logo": "https://travelbookshiva.in/logo.png",
    "image": seoImage,
    "telephone": "+919313634723",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "52000"
    }
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seoUrl} />
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={seoDescription} />
      <meta property="twitter:image" content={seoImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;

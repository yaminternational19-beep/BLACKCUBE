import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const defaultTitle = "BlackCube Solutions | Top Software & App Development Dubai";
  const defaultDescription = "Transform your business with BlackCube Solutions. Expert software engineers delivering custom web, mobile app development, and UI/UX design in Dubai, UAE.";
  const defaultKeywords = "software development dubai, mobile app developers uae, web development company dubai, it outsourcing uae, custom software solutions";
  const defaultImage = "https://blackcube.ae/images/og-blackcube-home.jpg";
  const siteUrl = "https://blackcube.ae";

  const seoTitle = title ? `${title} | BlackCube Solutions` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image || defaultImage;
  const seoUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <link rel="canonical" href={seoUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seoUrl} />
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={seoDescription} />
      <meta property="twitter:image" content={seoImage} />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://blackcube.ae/#organization",
              "name": "BlackCube Solutions LLC",
              "url": "https://blackcube.ae/",
              "logo": "https://blackcube.ae/images/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+971-4-123-4567",
                "contactType": "customer service",
                "areaServed": ["AE", "US", "GB", "SA"],
                "availableLanguage": ["English", "Arabic"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/black-cube-solutions",
                "https://twitter.com/blackcubesolutions",
                "https://www.facebook.com/blackcubesolutions",
                "https://www.instagram.com/blackcubesolutions"
              ]
            },
            {
              "@type": "LocalBusiness",
              "@id": "https://blackcube.ae/#localbusiness",
              "name": "BlackCube Solutions",
              "image": "https://blackcube.ae/images/dubai-office.jpg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Business Bay",
                "addressLocality": "Dubai",
                "addressRegion": "Dubai",
                "addressCountry": "AE"
              },
              "priceRange": "$1000-$50000",
              "telephone": "+971-4-123-4567"
            }
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;

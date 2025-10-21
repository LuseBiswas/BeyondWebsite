// JSON-LD Structured Data Schemas for Design Responsible

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Design Responsible",
  "alternateName": "DR",
  "url": "https://designresponsible.com",
  "logo": "https://designresponsible.com/image/logo.png",
  "description": "Beyond websites, let's transform. Thoughtful design at a price that respects your growth. Human-centric design and development powered by AI.",
  "foundingDate": "2024",
  "email": "hello@designresponsible.com",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@designresponsible.com",
    "contactType": "customer service",
    "availableLanguage": ["English"]
  },
  "sameAs": [
    // Add your social media profiles here when available
    // "https://www.linkedin.com/company/designresponsible",
    // "https://twitter.com/designresponsible"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Worldwide"
  }
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Web Design and Development",
  "provider": {
    "@type": "Organization",
    "name": "Design Responsible",
    "url": "https://designresponsible.com"
  },
  "description": "Professional web design and development services including landing pages, full websites, and custom digital products.",
  "areaServed": {
    "@type": "Place",
    "name": "Worldwide"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Design Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Purely Website",
          "description": "Starter Landing Page [1-5 Pages]. For startups and small businesses."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Website+",
          "description": "6-15 pages with CMS and advanced features. For growing businesses."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Beyond Site",
          "description": "Custom website or digital product. For ambitious brands and enterprises."
        }
      }
    ]
  }
};

export const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Web Design Pricing Plans",
  "description": "Transparent pricing for web design and development services",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Offer",
        "name": "Purely Website",
        "description": "Starter Landing Page [1-5 Pages]. A high-performing website with modern, responsive design.",
        "price": "4800",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2025-12-31",
        "category": "Quick",
        "itemOffered": {
          "@type": "Service",
          "name": "Purely Website Package",
          "provider": {
            "@type": "Organization",
            "name": "Design Responsible"
          }
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Offer",
        "name": "Website+",
        "description": "6-15 pages with Content Management System & Payment setup. For growing businesses.",
        "price": "6500",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2025-12-31",
        "category": "Popular",
        "itemOffered": {
          "@type": "Service",
          "name": "Website+ Package",
          "provider": {
            "@type": "Organization",
            "name": "Design Responsible"
          }
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Offer",
        "name": "Beyond Site",
        "description": "Custom Website for tailored digital product or SaaS platform. Highly customizable and scalable.",
        "price": "8000",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2025-12-31",
        "category": "Comprehensive",
        "itemOffered": {
          "@type": "Service",
          "name": "Beyond Site Package",
          "provider": {
            "@type": "Organization",
            "name": "Design Responsible"
          }
        }
      }
    }
  ]
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does it take to complete a website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Timeline varies by project complexity. A Purely Website typically takes 2-3 weeks, Website+ takes 3-4 weeks, and Beyond Site takes 4-6 weeks. We'll provide a detailed timeline during our initial consultation."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide ongoing support after launch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! All our packages include post-launch support. Website+ includes ongoing support and light content management, while Beyond Site offers dedicated design support with priority access to our team."
      }
    },
    {
      "@type": "Question",
      "name": "Can you work with our existing brand guidelines?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! We can work with your existing brand guidelines and ensure your website aligns perfectly with your brand identity. If you need brand development, we also offer deeper brand alignment services."
      }
    },
    {
      "@type": "Question",
      "name": "What platforms do you build websites on?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We work with various platforms including WordPress, Webflow, and custom solutions depending on your needs. We'll recommend the best platform based on your requirements, budget, and long-term goals."
      }
    },
    {
      "@type": "Question",
      "name": "Do you handle website hosting and domain setup?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we can assist with hosting recommendations and domain setup. We work with reliable hosting providers and can guide you through the entire process to ensure your website is properly deployed."
      }
    }
  ]
};

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://designresponsible.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://designresponsible.com#services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Pricing",
      "item": "https://designresponsible.com#pricing-section"
    }
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Design Responsible",
  "alternateName": "DR",
  "url": "https://designresponsible.com",
  "description": "Beyond websites, let's transform. Thoughtful design at a price that respects your growth.",
  "publisher": {
    "@type": "Organization",
    "name": "Design Responsible"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://designresponsible.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};


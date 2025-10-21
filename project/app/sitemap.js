// Sitemap configuration for Design Responsible
export default function sitemap() {
  const baseUrl = 'https://designresponsible.com';
  const currentDate = new Date().toISOString();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Add additional pages here when you create them
    // Example:
    // {
    //   url: `${baseUrl}/blog`,
    //   lastModified: currentDate,
    //   changeFrequency: 'daily',
    //   priority: 0.8,
    // },
  ];
}


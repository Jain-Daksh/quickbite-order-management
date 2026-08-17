export default async function sitemap() {
  return [
    {
      url: 'https://quickbite-order-management-nine.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}

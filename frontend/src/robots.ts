// app/robots.js

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://quickbite-order-management-nine.vercel.app/sitemap.xml',
  };
}

import './globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Momentum',
};

// async function getData() {
//   const res = await fetch(
//     `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&tags=nature&extras=url_l&format=json&nojsoncallback=1&per_page=1`,
//     {
//       cache: 'no-cache',
//     },
//   );
//   const data = await res.json();
//   return data;
// }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

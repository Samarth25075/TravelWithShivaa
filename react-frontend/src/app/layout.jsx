import '../index.css';
import { Inter, Playfair_Display } from 'next/font/google';
import ClientLayout from './ClientLayout';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', weight: ['400', '500'] });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', weight: ['500'] });

export const metadata = {
  metadataBase: new URL('https://travelbookshiva.in'),
  title: 'TravelBookShiva | Luxury Curated Adventures',
  description: 'Premium Travel Since 2019. 52,000+ happy travellers — Ahmedabad\'s most trusted agency.',
  openGraph: {
    title: 'TravelBookShiva | Luxury Curated Adventures',
    description: 'Premium Travel Since 2019. 52,000+ happy travellers — Ahmedabad\'s most trusted agency.',
    images: [{ url: '/api/uploads/logo.png' }]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link id="favicon" rel="icon" type="image/png" href="/api/uploads/logo.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('hasSeenIntro') || window.location.pathname.startsWith('/admin')) {
                  document.documentElement.classList.add('has-seen-intro');
                }
              } catch (e) {}
            `
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

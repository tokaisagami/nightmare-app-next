import type { Metadata } from "next";
import { Provider } from 'react-redux';
import store from '../store/store'; // ストアをインポート
import localFont from "next/font/local";
import "./globals.css";
import "../styles/index.css"; // グローバルCSSをインポート

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nightmare App",
  description: "AIで悪夢を改変し、すっきりした気分になりましょう！",
  openGraph: {
    type: 'website',
    url: 'https://nightmare-app-frontend.vercel.app/',
    title: 'Nightmare App',
    description: 'AIで悪夢を改変し、すっきりした気分になりましょう！',
    siteName: 'Nightmare App',
    images: [
      {
        url: 'https://nightmare-app-frontend.vercel.app/images/nightmare-app_OGP.png',
        width: 800,
        height: 600,
        alt: 'Nightmare App OGP Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nightmare App',
    description: 'AIで悪夢を改変し、すっきりした気分になりましょう！',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo192.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Web site created using Next.js" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          {children}
        </Provider>
      </body>
    </html>
  );
}

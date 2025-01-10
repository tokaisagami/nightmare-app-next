import type { Metadata } from "next";

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

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Web site created using Next.js" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Aoboshi+One&family=Dela+Gothic+One&family=Noto+Sans+JP&family=Noto+Sans+Linear+A&family=Noto+Serif+JP:wght@500;700;900&family=Open+Sans&family=Sawarabi+Gothic&family=Shizuru&family=Zen+Kurenaido&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Aoboshi+One&family=Dela+Gothic+One&family=Kablammo&family=Kaisei+Opti&family=Klee+One&family=Noto+Sans+JP&family=Noto+Sans+Linear+A&family=Noto+Serif+JP:wght@500;700;900&family=Open+Sans&family=Playwrite+GB+S:ital,wght@0,100..400;1,100..400&family=Sawarabi+Gothic&family=Shizuru&family=Zen+Kurenaido&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Aoboshi+One&family=Dela+Gothic+One&family=Kablammo&family=Kaisei+Decol&family=Kaisei+Opti&family=Klee+One&family=Noto+Sans+JP&family=Noto+Sans+Linear+A&family=Noto+Serif+JP:wght@500;700;900&family=Open+Sans&family=Playwrite+GB+S:ital,wght@0,100..400;1,100..400&family=Sawarabi+Gothic&family=Shizuru&family=Zen+Kurenaido&display=swap"
            rel="stylesheet"
          />
          <meta property="og:image" content="https://nightmare-app-frontend.vercel.app/images/nightmare-app_OGP.png" />
          <meta property="og:description" content="AIで悪夢を改変し、すっきりした気分になりましょう！" />
          <meta property="og:title" content="Nightmare App" />
          <meta property="og:url" content="https://nightmare-app-frontend.vercel.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Nightmare App" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Nightmare App" />
          <meta name="twitter:description" content="AIで悪夢を改変し、すっきりした気分になりましょう！" />
          <title>Nightmare App</title>
        </Head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

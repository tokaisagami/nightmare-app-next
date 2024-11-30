import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ja">
        <Head>
          {/* カスタムフォントの追加 */}
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Aoboshi+One&family=Dela+Gothic+One&family=Noto+Sans+JP&family=Noto+Sans+Linear+A&family=Noto+Serif+JP:wght@500;700;900&family=Open+Sans&family=Sawarabi+Gothic&family=Shizuru&family=Zen+Kurenaido&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Aoboshi+One&family=Dela+Gothic+One&family=Kablammo&family=Kaisei+Opti&family=Klee+One&family=Noto+Sans+JP&family=Noto+Sans+Linear+A&family=Noto+Serif+JP:wght@500;700;900&family=Open+Sans&family=Playwrite+GB+S:ital,wght@0,100..400;1,100..400&family=Sawarabi+Gothic&family=Shizuru&family=Zen+Kurenaido&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Aoboshi+One&family=Dela+Gothic+One&family=Kablammo&family=Kaisei+Decol&family=Kaisei+Opti&family=Klee+One&family=Noto+Sans+JP&family=Noto+Sans+Linear+A&family=Noto+Serif+JP:wght@500;700;900&family=Open+Sans&family=Playwrite+GB+S:ital,wght@0,100..400;1,100..400&family=Sawarabi+Gothic&family=Shizuru&family=Zen+Kurenaido&display=swap" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

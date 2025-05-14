import Document, { Html, Head, Main, NextScript } from 'next/document';

// ----------------------------------------------------------------------

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="Manage your expenses and cards" />
          <meta name="emotion-insertion-point" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="shortcut icon" href="/favicon.ico" />
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

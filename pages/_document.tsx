import { Head as NextHead, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <NextHead>
        <link
          href="https://fonts.googleapis.com/css2?family=Abel&family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta charSet="UTF-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </NextHead>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

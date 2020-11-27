import Document, {
  DocumentContext,
  Head as NextHead,
  Html,
  Main,
  NextScript,
} from "next/document";

import React from "react";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
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
}

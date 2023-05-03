import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { resetServerContext } from 'react-beautiful-dnd';

type Props = {};

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await super.getInitialProps(ctx);
    resetServerContext();
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

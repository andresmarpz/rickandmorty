import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import { globalCss } from '@/stitches.config';
import type { AppProps } from 'next/app';

const globalStyles = globalCss({
    '*': {
        boxSizing: 'border-box'
    },
    'html, body': {
        // backgroundColor: theme.colors.background,
        padding: 0,
        margin: 0,
        fontFamily: `-apple-system, Inter, BlinkMacSystemFont, "Helvetica Neue", sans-serif`
    }
});

function MyApp({ Component, pageProps }: AppProps) {
    globalStyles();

    return (
        <Layout>
            <Component {...pageProps} />
            <Footer />
        </Layout>
    );
}

export default MyApp;

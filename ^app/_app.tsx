import '../styles/globals.scss';
import { AppProps } from 'next/app';

function SafetyTest({ Component, pageProps }: AppProps) {
    try {
        return <Component {...pageProps} />
    } catch (error: unknown) {
        console.error(error as string);
    }
}


export default SafetyTest;
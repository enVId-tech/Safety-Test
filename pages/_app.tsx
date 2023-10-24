import '../styles/globals.scss';
import { AppProps } from 'next/app';

function SafetyTest({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}


export default SafetyTest;
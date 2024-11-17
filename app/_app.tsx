import React from 'react';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

function SafetyTest({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}

export default SafetyTest;
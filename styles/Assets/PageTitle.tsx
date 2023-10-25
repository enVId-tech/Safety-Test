import Head from 'next/head';
import React from 'react';

interface Props {
    title?: string;
}

const PageTitle: React.FC<Props> = ({ title }: Props): JSX.Element => {
    try {
        if (title === undefined) {
            return (
                <Head>
                    <title>Next.js</title>
                </Head>
            );
        } else {
            return (
                <Head>
                    <title>OA Robotics - {title}</title>
                </Head>
            );
        }
    } catch (error: unknown) {
        console.error(error as string);
        return (
            <Head>
                <title>OA Robotics</title>
            </Head>
        )
    }
};

export default PageTitle;
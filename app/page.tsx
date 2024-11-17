"use server";
import { Work_Sans } from 'next/font/google';
import Head from 'next/head';

const font = Work_Sans({
	weight: "300",
	style: 'normal',
	subsets: ['latin'],
})

export default async function Home(): Promise<JSX.Element> {


	return (
		<div className={font.className}>
			<Head>Home - OA Robotics</Head>
			<span className=
		</div>
	)
}
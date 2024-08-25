"use server";
import React from 'react';
import Head from 'next/head';
import styles from '@/styles/home.module.scss';
import { Work_Sans } from 'next/font/google';

const font = Work_Sans({
	weight: "300",
	style: 'normal',
	subsets: ['latin']
});

export default async function Homepage(): Promise<React.JSX.Element> {


	return (
		<div className={`${styles.homePage} ${font.className}`}>
			<Head>Home - OA Robotics</Head>
			<span className={styles.mainElements}>
		
			</span>
		</div>
	)
}
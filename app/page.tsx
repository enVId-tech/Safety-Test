"use server";
import React from "react";
import { Work_Sans } from 'next/font/google';
import styles from "@/styles/home.module.scss";
import Head from 'next/head';
import HomePageForm from "@/app/_components/homepageform.tsx";
import { NextFont } from "next/dist/compiled/@next/font";

const font: NextFont = Work_Sans({
	weight: "300",
	style: 'normal',
	subsets: ['latin'],
})

let errorMessage: string = "";
let pageClosed: boolean = false;

export async function setErrorMessage(error: string, time: number): Promise<void> {
    try {
        errorMessage = error;
        setTimeout((): void => {
            errorMessage = "";
        }, time);
    } catch (error: unknown) {
        console.error("Lines 123-126");
        console.error(error as string);
    }
}


export async function setPageClosed(isClosed: boolean = false): Promise<void> {
    pageClosed = isClosed;
}

export default async function Home(): Promise<React.ReactElement> {
	return (
		<div className={font.className}>
			<Head>Home - OA Robotics</Head>
			<span className={styles.mainElements}>
                <div className={`${styles.left} ${pageClosed ? styles.mainCloseLeft : ""}`}>
                    <div className={`${styles.leftContent} ${pageClosed ? styles.pageClosed : ""}`}>
                        <h1 className={styles.selectionTitle}>Test Selection</h1>
						<HomePageForm/>
						{
							errorMessage !== "" ? (
								<h2 id="ErrorMessage">{errorMessage as string}</h2>
							) : (
								<></>
							)
						}
						<footer className={styles.footer}>
                            <div className={styles.OARobotics}>
                                <a className={styles.RoboticsFooter} href="https://frc4079.org/">OA Robotics</a>
                                <div className={styles.footerimg}/>
                            </div>
                            <p className={styles.revisionDate}>
                                Revision 30.00
                                <br/>
                                11-18-2024 10:59:55 PT
                            </p>
                        </footer>
					</div>
				</div>
                <div className={`${styles.right} ${pageClosed ? styles.mainCloseRight : ""}`}>
                    <div className={`${styles.rightContent} ${pageClosed ? styles.pageClosed : ""}`}>
                        <h1 className={`${styles.pageName} ${font.className} ${pageClosed ? styles.pageClosed : ""}`}>
                            Oxford Academy Robotics
                        </h1>
                        <h2 className={`${styles.testTitle} ${font.className} ${pageClosed ? styles.pageClosed : ""}`}>
                            Performance and Testing
                        </h2>
                    </div>
                </div>
			</span>
		</div>
	)
}
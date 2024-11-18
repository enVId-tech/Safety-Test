"use server";
import React from "react";
import { Work_Sans } from 'next/font/google';
import styles from "@/styles/selection.module.scss";
import Head from 'next/head';
import { NextFont } from "next/dist/compiled/@next/font";

const Work_Sans300: NextFont = Work_Sans({
    weight: "300",
    style: 'normal',
    subsets: ['latin']
});

const Work_Sans400: NextFont = Work_Sans({
    weight: "400",
    style: 'normal',
    subsets: ['latin']
});

const Work_Sans500: NextFont = Work_Sans({
    weight: "500",
    style: 'normal',
    subsets: ['latin']
});

const Work_Sans600: NextFont = Work_Sans({
    weight: "600",
    style: 'normal',
    subsets: ['latin']
});

export default async function Selection(): Promise<React.ReactElement> {
    return (
        <div>
            <Head>Selection - OA Robotics</Head>
            <div className={styles.mainElements}>
                <nav className={`${styles.topBar} ${pageClose ? styles.topBarClose : ""}`}>
                    <h1 className={`${styles.categoryTitle} ${Work_Sans500.className} ${pageClose ? styles.pageClosedSelection : ""}`}>Prerequisites</h1>
                    <p className={`${styles.categoryLabel} ${Work_Sans400.className} ${pageClose ? styles.pageClosedSelection : ""}`}>
                        This page has available resources and options for taking this
                        test. The test will allow you to go back to this page and save
                        your answers.
                    </p>
                </nav>
                <span className={`${styles.selectionContent} ${pageClose ? styles.selectionContentClose : ""}`}>
                    {settings[0] === "TS" && (
                        <div className={`${styles.resourcesTab} ${pageClose ? styles.pageClosedSelection : ""}`}>
                            <h2 className={`${styles.resourcesTitle} ${Work_Sans600.className}`}>Resources</h2>
                            <p className={`${styles.resourcesLabel} ${Work_Sans300.className}`}>
                                This section contains resources that you can use for the test.
                            </p>
                            <div className={styles.linksSection}>
                                <h1 id="SafetyLink">
                                    <a
                                        href="https://docs.google.com/presentation/d/1fQ98hhuO8KD8b8ZOy71ZRj2cuW5fbBJ8/edit#slide=id.p1"
                                        rel="noreferrer"
                                        target="_blank"
                                        id="SafetySlidesLink"
                                        className={`${styles.safetySlidesLink} ${Work_Sans300.className}`}
                                    >
                                        Safety Slides Link
                                    </a>
                                </h1>
                            </div>
                            <br />
                        </div>
                    )}
                </span>
            </div>
        </div>
    );
}
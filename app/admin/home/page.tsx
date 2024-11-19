"use server";
import React from "react";
import styles from "@/styles/adminhome.module.scss";
import Head from "next/head";

export default async function AdminHome(): Promise<React.ReactElement> {
    const loggedIn: boolean = true;

    return (
        <>
            {
                loggedIn ? (
                    <div className={styles.adminHome}>
                        <Head>Admin Panel</Head>
                        <div className={styles.adminHomeContainer}>
                            <h1 className={styles.topTitle}>Admin Panel</h1>
                            <hr />
                            <div className={styles.pagePanel}>
                                <button id="questionsButton" name="button" className={styles.button} onClick={redirect}>Questions</button>
                                <button id="responsesButton" name="button" className={styles.button} onClick={redirect}>Responses</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <Head>Redirecting...</Head>
                    </>
                )
            }
        </>
    )
}
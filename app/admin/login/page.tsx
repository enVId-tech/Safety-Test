"use server";
import React from "react";
import styles from "@/styles/adminlogin.module.scss";
import Head from "next/head";

export default async function AdminLogin(): Promise<React.ReactElement> {
    return (
        <div className={styles.adminLogin}>
            <Head>Admin Panel Login</Head>
            <div className={styles.adminLoginContainer}>
                <h1 className={styles.topTitle}>Admin Panel</h1>
                <hr />
                <div className={styles.loginTab}>
                    <p className={styles.loginTitle}>Login</p>
                    <input type="text" className={styles.usernameInput} id="username" name="username" placeholder="Username" required />
                    <p id="errorMessage"></p>
                    <button id="submit" className={styles.submitButton} name="submit" onClick={start}>Login</button>
                </div>
            </div>
        </div>
    );
}
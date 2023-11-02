import React from "react";
import styles from '../../styles/adminhome.module.scss';
import Head from "next/head";

const AdminHome: React.FC = (): React.JSX.Element => {
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

    React.useEffect((): void => {
        try {
            const loggedIn: string | null = sessionStorage.getItem("admin");

            if (loggedIn === "isAdmin[@98duN@9xSW(SJ)]") {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
                window.location.href = "/admin/login";
            }
        } catch (error: unknown) {
            console.error(error as string);
        }
    }, []);

    const redirect = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        try {
            const button: HTMLButtonElement = event.target as HTMLButtonElement;
            if (button.id === "questionsButton") {
                window.location.href = "/admin/questions";
            } else if (button.id === "responsesButton") {
                window.location.href = "/admin/responses";
            }
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

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
    );
}

export default AdminHome;
import React from "react";
import styles from '../../styles/adminlogin.module.scss';
import Head from "next/head";

type LoginResponse = {
    send: string;
}

const AdminPanel: React.FC = (): React.JSX.Element => {
    React.useEffect(() => {
        try {
            const handleKeyDown = (event: KeyboardEvent): void => {
                if (event.key === "Enter") {
                    start(event as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>);
                }
            };

            window.addEventListener("keydown", handleKeyDown);

            return (): void => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        } catch (error: unknown) {
            console.error(error as string);
        }
    }, []);

    const start: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
        try {
            event.preventDefault();
            const username: string = (document.getElementById("username") as HTMLInputElement).value;

            const data: object = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username })
            }

            const login: Response = await fetch("/admin/login", data);
            const loginJSON: LoginResponse = await login.json();

            if (loginJSON.send === "Success") {
                sessionStorage.setItem("admin", "isAdmin[@98duN@9xSW(SJ)]");
                window.location.href = "/admin/home";
            } else {
                const errorMessage: HTMLElement = document.getElementById("errorMessage") as HTMLElement;
                errorMessage.innerText = "Incorrect username";

                setTimeout((): void => {
                    errorMessage.innerText = "";
                }, 3000);
            }
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

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

export default AdminPanel;
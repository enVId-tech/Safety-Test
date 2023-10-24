import React from "react";
import styles from '../../styles/adminlogin.module.scss';
import PageTitle from "@/styles/Assets/PageTitle";

const AdminPanel: React.FC = (): React.JSX.Element => {
    React.useEffect((): (() => void) => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === "Enter") {
                start(event as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return (): void => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const start: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
        event.preventDefault();
        console.log("Login");

        const username: string = (document.getElementById("username") as HTMLInputElement).value;

        const data: object = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username })
        }

        type LoginResponse = {
            send: string;
        }

        const login: Response = await fetch("http://localhost:19640/admin/login", data);
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
    }

    return (
        <div className={styles.adminLogin}>
            <PageTitle title="Admin Panel Login" />
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
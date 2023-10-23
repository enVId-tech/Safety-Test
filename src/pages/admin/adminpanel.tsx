import React from "react";
import '../../Assets/scss/admin/adminlogin.scss';
import PageTitle from "../../Assets/ts/pagetitle/pagetitle";

const AdminPanel: React.FC = (): React.JSX.Element => {
    const start: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
        event.preventDefault();
        console.log("Login");

        const username: string = (document.getElementById("username") as HTMLInputElement).value;

        const data = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username })
        }

        type LoginResponse = {
            send: string;
        }

        const login: Response = await fetch("/admin/login", data);
        const loginJSON: LoginResponse = await login.json();

        if (loginJSON.send === "Success") {
            sessionStorage.setItem("admin", "isAdmin[@98duN@9xSW(SJ)]");
            window.location.href = "/admin/home";
        } else {
            const errorMessage: HTMLElement = document.getElementById("errorMessage") as HTMLElement;
            errorMessage.innerText = "Incorrect username";

            setTimeout(() => {
                errorMessage.innerText = "";
            }, 3000);
        }
    }

    window.onkeydown = (event: KeyboardEvent): void => {
        if (event.key === "Enter") {
            start(event as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>);
        }
    }

    return (
        <div id="AdminLogin">
            <PageTitle title="Admin Panel Login" />
            <div id="AdminLoginContainer">
                <h1 id="TopTitle">Admin Panel</h1>
                <hr />
                <div id="Login">
                    <p id="LoginTitle">Login</p>
                    <input type="text" id="username" name="username" placeholder="Username" required />
                    <p id="errorMessage"></p>
                    <button id="submit" name="submit" onClick={start}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
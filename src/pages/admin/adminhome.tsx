import React from "react";
import '../../Assets/scss/admin/adminhome.scss';
import PageTitle from "../../Assets/ts/pagetitle/pagetitle";

const AdminHome: React.FC = (): React.JSX.Element => {
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

    window.onload = (): void => {
        const loggedIn: string | null = sessionStorage.getItem("admin");
        if (loggedIn === "isAdmin[@98duN@9xSW(SJ)]") {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
            window.location.href = "/admin";
        }
    }

    const redirect = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const button: HTMLButtonElement = event.target as HTMLButtonElement;
        if (button.id === "questionsButton") {
            window.location.href = "/admin/questions";
        } else if (button.id === "responsesButton") {
            window.location.href = "/admin/responses";
        }
    }

    return (
        <>
            {
                loggedIn ? (
                    <div id="AdminHome">
                        <PageTitle title="Admin Panel" />
                        <div id="AdminHomeContainer">
                            <h1 id="TopTitle">Admin Panel</h1>
                            <hr />
                            <div id="Login">
                                <button id="questionsButton" name="button" className="button" onClick={redirect}>Questions</button>
                                <button id="responsesButton" name="button" className="button" onClick={redirect}>Responses</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <PageTitle title="Redirecting..." />
                    </>
                )
            }
        </>
    );
}

export default AdminHome;
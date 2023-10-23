import React from "react";
import PageTitle from "../Assets/ts/pagetitle/pagetitle";
import '../Assets/scss/home.scss';

const Home: React.FC = (): React.JSX.Element => {
    const [selectedValue, setSelectedValue] = React.useState<string>("Safety-Test");
    const [availableSelections, setAvailableSelections] = React.useState<string[]>(["Safety Test"]);
    const [errorMessage, setErrorMessage] = React.useState<string>("");

    const USER = React.useRef<HTMLInputElement>(null);

    window.onload = async(): Promise<void> => {
        try {
            const getFolders: Response = await fetch("/home/get/folders");
            const foldersJSON: string[] = await getFolders.json();
            setAvailableSelections(foldersJSON);

        } catch (error: unknown) {
            setErrorMessage(error as string);
        }
    }

    const saveUser: () => void = async (): Promise<void> => {
        const username: string = USER.current!.value;

        if (username === "") {
            setError("Please enter a username", 3000);
            return;
        } else if (!username.includes(" ")) {
            setError("You must have a first and last name", 3000);
            return;
        } else if (username.split(" ")[0].length > 20 || username.split(" ")[1].length > 25) {
            setError("First name must be less than 20 characters and last name must be less than 25 characters", 3000);
            return;
        } else if (username.split(" ")[0].length < 1 || username.split(" ")[1].length < 1) {
            setError("First name must be more than 2 characters and last name must be more than 1 character", 3000);
            return;
        } else if (username.split(" ")[2] !== undefined) {
            setError("You can only have a first and last name", 3000);
            return;
        } else if (username.split(" ")[0][0] !== username.split(" ")[0][0].toUpperCase() ||
            username.split(" ")[1][0] !== username.split(" ")[1][0].toUpperCase()) {
            setError("First and last name must be capitalized", 3000);
            return;
        } else {
            localStorage.setItem("username", username);
            const typeOfTest = (document.getElementById("typeOfTest") as HTMLSelectElement).value;
            localStorage.setItem("typeOfTest", typeOfTest);
            try {
                const data: object = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ folder: selectedValue })
                }

                const saveUser: Response = await fetch("/home/post/folders/dir", data);
                const saveUserJSON: string = await saveUser.json();

                if (saveUserJSON === "Error") {
                    setError("Error", 3000);
                    return;
                }

                window.location.href = "/selection";
            } catch (error: unknown) {
                console.error(error as string);
            }
        }
    }

    const start: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void = (e: React.MouseEvent<HTMLInputElement, MouseEvent>): void => {
        e.preventDefault();
        saveUser();
    }

    window.onkeydown = (e: KeyboardEvent): void => {
        if (e.key === "Enter") {
            saveUser();
        }
    }

    const setError: (error: string, time: number) => void = (error: string, time: number): void => {
        setErrorMessage(error);
        setTimeout((): void => {
            setErrorMessage("");
        }, time);
    }

    return (
        <div id="Home">
            <PageTitle title="Home" />
            <span id="mainElements">
                <div id="left">
                    <div id="leftContent">
                        <h1 id="SelectionTitle">Test Selection</h1>
                        <form id="LoginForm">
                            <input type="text" id="username" name="username" placeholder="Username" required ref={USER} />
                            <br />
                            {
                                availableSelections.length > 1 ?
                                    <select id="typeOfTest" value={selectedValue} onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => setSelectedValue(e.target.value)}>
                                        {
                                            availableSelections.map((selection: string, index: number): React.JSX.Element => {
                                                return (
                                                    <option key={index} value={selection} className="typeOfTestOption">{selection}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    :
                                    <select id="typeOfTest" value={selectedValue} onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => setSelectedValue(e.target.value)} disabled>
                                        <option value="Safety-Test" className="typeOfTestOption">Safety Test</option>
                                    </select>
                            }
                            <input type="submit" id="submit" name="submit" value="Start" onClick={start} style={{ cursor: "pointer" }} />
                        </form>
                        {
                            errorMessage !== "" ? <h2 id="ErrorMessage">{errorMessage}</h2> : <></>
                        }
                        <footer id="footer">
                            <div className="OARobotics">
                                <a id="RoboticsFooter" href="https://frc4079.org/">OA Robotics</a>
                                <div className="footerimg" />
                            </div>
                            <p id="Revision">Revision 22.00 <br /> 10-22-2023 20:28:02 PT</p>
                        </footer>
                    </div>
                </div>
                <div id="right">
                    <div id="rightContent">
                        <h1 id="PageName">
                            Oxford Academy Robotics
                        </h1>
                        <h2 id="TestTitle">
                            Performance and Testing
                        </h2>
                    </div>
                </div>
            </span>
        </div>
    )
}

export default Home;
"use client";
import React from "react";
import styles from "@/styles/home.module.scss";
import {setErrorMessage, setPageClosed} from "@/app/page";

export function setError(error: string, time: number): void {
    try {
        setErrorMessage(error, time).then();
        setTimeout((): void => {
            setErrorMessage("", time).then();
        }, time);
    } catch (error: unknown) {
        console.error("Lines 123-126");
        console.error(error as string);
    }
}

export default function HomePageForm(): React.ReactElement {
    const USER = React.createRef<HTMLInputElement>();
    const [selectedValue, setSelectedValue] = React.useState<string>("Safety-Test");
    const [availableSelections, setAvailableSelections] = React.useState<string[]>(["Safety Test"]);

    React.useEffect((): void => {
        try {
            getFolders();
        } catch (error: unknown) {
            console.error("Line 12");
            setErrorMessage(error as string, 2000).then();
        }
    }, []);

    const validateUsername: (username: string) => boolean = (username: string): boolean => {
        try {
            if (username === "") {
                setError("Please enter a username", 3000);
                return false;
            } else if (!username.includes(" ")) {
                setError("You must have a first and last name", 3000);
                return false;
            } else if (username.split(" ")[0].length > 20 || username.split(" ")[1].length > 25) {
                setError("First name must be less than 20 characters and last name must be less than 25 characters", 3000);
                return false;
            } else if (username.split(" ")[0].length < 1 || username.split(" ")[1].length < 1) {
                setError("First name must be more than 2 characters and last name must be more than 1 character", 3000);
                return false;
            } else if (username.split(" ")[2] !== undefined) {
                setError("You can only have a first and last name", 3000);
                return false;
            } else if (username.split(" ")[0][0] !== username.split(" ")[0][0].toUpperCase() ||
                username.split(" ")[1][0] !== username.split(" ")[1][0].toUpperCase()) {
                setError("First and last name must be capitalized", 3000);
                return false;
            } else {
                return true;
            }
        } catch (error: unknown) {
            console.error("Lines 41-63")
            console.error(error as string);
            return false;
        }
    }

    const saveUser: () => void = async (): Promise<void> => {
        try {
            const username: string = USER.current!.value;

            if (!validateUsername(username)) {
                return;
            } else {
                localStorage.setItem("username", username);
                const typeOfTest: string = (document.getElementById("typeOfTest") as HTMLSelectElement).value;
                localStorage.setItem("typeOfTest", typeOfTest);
                try {
                    console.log({ folder: selectedValue })
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

                    setPageClosed(true).then();
                    setTimeout((): void => {
                        window.location.href = "/selection";
                    }, 2000);
                } catch (error: unknown) {
                    console.error("Lines 71-99");
                    console.error(error as string);
                }
            }
        } catch (error: unknown) {
            console.error("Lines 73-106")
            console.error(error as string);
        }
    }

    const start: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void = (e: React.MouseEvent<HTMLInputElement, MouseEvent>): void => {
        try {
            e.preventDefault();
            saveUser();
        } catch (error: unknown) {
            console.error("Lines 114-115");
            console.error(error as string);
        }
    }


    const getFolders: () => void = async (): Promise<void> => {
        try {
            const getFolders: Response = await fetch("/api/home/get/folders");
            const foldersJSON: string[] = await getFolders.json();
            setAvailableSelections(foldersJSON);
        } catch (error: unknown) {
            console.error("Lines 31-33")
            await setErrorMessage(error as string, 2000);
        }
    }

    return (
        <form className={styles.loginForm}>
            <input type="text" className={styles.username} name="username" placeholder="Username" required ref={USER}
                   id="username"/>
            <br/>
            {
                availableSelections.length > 1 ?
                    <select value={selectedValue} id="typeOfTest"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => setSelectedValue(e.target.value)}>
                        {
                            availableSelections.map((selection: string, index: number): React.JSX.Element => {
                                return (
                                    <option key={index} value={selection}
                                            className="typeOfTestOption">{selection}</option>
                                )
                            })
                        }
                    </select>
                    :
                    <select className={styles.typeOfTest} id="typeOfTest" value={selectedValue}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => setSelectedValue(e.target.value)}
                            disabled>
                        <option value="Safety-Test" className={styles.typeOfTestOption}>Safety Test</option>
                    </select>
            }
            <input type="submit" className={styles.submit} name="submit" value="Start" onClick={start}/>
        </form>
    )
}
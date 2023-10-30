import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import styles from '../styles/home.module.scss';
import PageTitle from '@/styles/Assets/PageTitle';
import { Work_Sans } from 'next/font/google';

const font = Work_Sans({
    weight: "300",
    style: 'normal',
    subsets: ['latin']
});

const Home: React.FC = (): JSX.Element => {
    const [selectedValue, setSelectedValue] = React.useState<string>("Safety-Test");
    const [availableSelections, setAvailableSelections] = React.useState<string[]>(["Safety Test"]);
    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const [pageClosed, setPageClosed] = React.useState<boolean>(false);

    React.useEffect((): void => {
        try {
            getFolders();
        } catch (error: unknown) {
            console.error(error as string);
        }
    }, []);

    const USER = React.useRef<HTMLInputElement>(null);

    const getFolders: () => void = async (): Promise<void> => {
        try {
            const getFolders: Response = await fetch("http://localhost:19640/home/get/folders");
            const foldersJSON: string[] = await getFolders.json();
            setAvailableSelections(foldersJSON);

        } catch (error: unknown) {
            setErrorMessage(error as string);
        }
    }

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

                    const saveUser: Response = await fetch("http://localhost:19640/home/post/folders/dir", data);
                    const saveUserJSON: string = await saveUser.json();

                    if (saveUserJSON === "Error") {
                        setError("Error", 3000);
                        return;
                    }

                    setPageClosed(true);
                    setTimeout((): void => {
                        window.location.href = "/selection";
                    }, 2000);
                } catch (error: unknown) {
                    console.error(error as string);
                }
            }
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    const start: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void = (e: React.MouseEvent<HTMLInputElement, MouseEvent>): void => {
        try {
            e.preventDefault();
            saveUser();
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    const setError: (error: string, time: number) => void = (error: string, time: number): void => {
        try {
            setErrorMessage(error);
            setTimeout((): void => {
                setErrorMessage("");
            }, time);
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    return (
        <div className={font.className}>
            <PageTitle title="Home" />
            <div onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>): void => { if (e.key === "Enter") saveUser() }} />
            <span className={styles.mainElements}>
                <div className={`${styles.left} ${pageClosed ? styles.mainCloseLeft : ""}`}>
                    <div className={`${styles.leftContent} ${pageClosed ? styles.pageClosed : ""}`}>
                        <h1 className={styles.selectionTitle}>Test Selection</h1>
                        <form className={styles.loginForm}>
                            <input type="text" className={styles.username} name="username" placeholder="Username" required ref={USER} id="username" />
                            <br />
                            {
                                availableSelections.length > 1 ?
                                    <select value={selectedValue} id="typeOfTest" onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => setSelectedValue(e.target.value)}>
                                        {
                                            availableSelections.map((selection: string, index: number): React.JSX.Element => {
                                                return (
                                                    <option key={index} value={selection} className="typeOfTestOption">{selection}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    :
                                    <select className={styles.typeOfTest} id="typeOfTest" value={selectedValue} onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => setSelectedValue(e.target.value)} disabled>
                                        <option value="Safety-Test" className={styles.typeOfTestOption}>Safety Test</option>
                                    </select>
                            }
                            <input type="submit" className={styles.submit} name="submit" value="Start" onClick={start} />
                        </form>
                        {
                            errorMessage !== "" ? <h2 id="ErrorMessage">{errorMessage}</h2> : <></>
                        }
                        <footer className={styles.footer}>
                            <div className={styles.OARobotics}>
                                <a className={styles.RoboticsFooter} href="https://frc4079.org/">OA Robotics</a>
                                <div className={styles.footerimg} />
                            </div>
                            <p className={styles.revisionDate}>
                                Revision 25.42 
                                <br /> 
                                10-30-2023 13:59:30 PT
                            </p>
                        </footer>
                    </div>
                </div>
                <div className={`${styles.right} ${pageClosed ? styles.mainCloseRight : ""}`}>
                    <div className={`${styles.rightContent} ${pageClosed ? styles.pageClosed : ""}`}>
                        <h1 className={`${styles.pageName} ${font.className} ${pageClosed ? styles.pageClosed : ""}`} >
                            Oxford Academy Robotics
                        </h1>
                        <h2 className={`${styles.testTitle} ${font.className} ${pageClosed ? styles.pageClosed : ""}`}>
                            Performance and Testing
                        </h2>
                    </div>
                </div>
            </span>
        </div>
    )
}

export default Home;
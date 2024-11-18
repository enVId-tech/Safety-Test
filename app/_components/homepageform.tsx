"use client";
import React from "react";
import styles from "@/styles/home.module.scss";
import {setErrorMessage} from "@/app/page";

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
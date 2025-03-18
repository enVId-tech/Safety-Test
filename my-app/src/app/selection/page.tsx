'use client';

import React from 'react';
import { Work_Sans } from 'next/font/google';
import styles from '../../../styles/selection.module.scss';
import { useRouter } from 'next/navigation';

const Work_Sans300 = Work_Sans({
    weight: "300",
    style: 'normal',
    subsets: ['latin']
});

const Work_Sans400 = Work_Sans({
    weight: "400",
    style: 'normal',
    subsets: ['latin']
});

const Work_Sans500 = Work_Sans({
    weight: "500",
    style: 'normal',
    subsets: ['latin']
});

const Work_Sans600 = Work_Sans({
    weight: "600",
    style: 'normal',
    subsets: ['latin']
});

export default function Select() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = React.useState<string>("");
    const [settings, setSettings] = React.useState<string[][] | string[]>([]);
    const [pageClose, setpageClose] = React.useState<boolean>(false);

    React.useEffect((): void => {
        try {
            getSettings();
        } catch (error: unknown) {
            console.error(error as string);
        }
    }, []);

    const getSettings = async (): Promise<void> => {
        try {
            const getSettings: Response = await fetch("/home/get/selection");
            const settingsJSON: string[] = await getSettings.json();
            setSettings(settingsJSON);
        } catch (error: unknown) {
            console.error(error as string);
            setTimeout((): void => {
                router.push("/");
            }, 1000);
        }
    }

    const saveUser = (): void => {
        try {
            if (selectedCategory === "") {
                alert("Please select a category");
                return;
            }

            localStorage.setItem("selectedCategory", selectedCategory);

            setpageClose(true);
            setTimeout((): void => {
                router.push("/test");
            }, 1000);
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    const backButton = (): void => {
        router.push("/");
    }

    const nextButton = (): void => {
        try {
            saveUser();
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    const Save = (id: string): void => {
        try {
            setSelectedCategory(id);
            document.getElementsByClassName(styles.selected)[0]?.classList.remove(styles.selected);
            document.getElementById(`${id}Button`)?.classList.add(styles.selected);
            localStorage.setItem("selectedCategory", id);
        } catch (error: unknown) {
            console.error(error as string);
        }
    };

    return (
        <div className={styles.Selection}>
            <div className={styles.mainElements}>
                <nav className={`${styles.topBar} ${pageClose ? styles.topBarClose : ""}`}>
                    <h1 className={`${styles.categoryTitle} ${Work_Sans500.className} ${pageClose ? styles.pageClosedSelection : ""}`}>Prerequisites</h1>
                    <p className={`${styles.categoryLabel} ${Work_Sans400.className} ${pageClose ? styles.pageClosedSelection : ""}`}>
                        This page has available resources and options for taking this
                        test. The test will allow you to go back to this page and save
                        your answers.
                    </p>
                    <div className={`${styles.buttonSection} ${pageClose ? styles.pageClosedSelection : ""}`}>
                        <button id="CategoryBack" className={styles.categoryButton} onClick={backButton}>
                            Back
                        </button>
                        <button id="CategoryNext" className={styles.categoryButton} onClick={nextButton}>
                            Next
                        </button>
                    </div>
                </nav>
                <span className={`${styles.selectionContent} ${pageClose ? styles.selectionContentClose : ""}`}>
                    {settings[0] === "TS" && (
                        <div className={`${styles.resourcesTab} ${pageClose ? styles.pageClosedSelection : ""}`}>
                            <h2 className={`${styles.resourcesTitle} ${Work_Sans600.className}`}>Resources</h2>
                            <p className={`${styles.resourcesLabel} ${Work_Sans300.className}`}>
                                This section contains resources that you can use for the test.
                            </p>
                            <div className={styles.linksSection}>
                                <h1 id="SafetyLink">
                                    <a
                                        href="https://docs.google.com/presentation/d/1fQ98hhuO8KD8b8ZOy71ZRj2cuW5fbBJ8/edit#slide=id.p1"
                                        rel="noreferrer"
                                        target="_blank"
                                        id="SafetySlidesLink"
                                        className={`${styles.safetySlidesLink} ${Work_Sans300.className}`}
                                    >
                                        Safety Slides Link
                                    </a>
                                </h1>
                            </div>
                            <br />
                        </div>
                    )}
                    {settings[1] === "STG" && (
                        <div className={`${styles.categoriesTab} ${pageClose ? styles.pageClosedSelection : ""}`}>
                            <h2 className={`${styles.categoriesTitle} ${Work_Sans600.className}`}>Categories</h2>
                            <p id="CategoriesLabel" className={`${styles.categoriesLabel} ${Work_Sans300.className}`}>
                                This section contains categories that you can choose from.
                            </p>
                            <div className={styles.categorySelection}>
                                {Array.isArray(settings[2]) && settings[2].map((category: string, index: number) => (
                                    <div key={category} className={`${styles.categoryMainDiv}`}>
                                        <input
                                            type="button"
                                            value={category}
                                            id={`${category}Button`}
                                            className={`${styles.categoryButton} ${Work_Sans400.className}`}
                                            key={category}
                                            onClick={() => {
                                                Save(category);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </span>
            </div>
        </div>
    );
}
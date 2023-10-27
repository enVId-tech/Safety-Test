import React from 'react';
import PageTitle from '@/styles/Assets/PageTitle';
import { Work_Sans } from 'next/font/google';
import styles from '../styles/selection.module.scss';

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

const Select: React.FC = (): React.JSX.Element => {
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
            const getSettings: Response = await fetch("http://localhost:19640/home/get/selection");
            const settingsJSON: string[] = await getSettings.json();
            setSettings(settingsJSON);
        } catch (error: unknown) {
            console.error(error as string);
            setTimeout((): void => {
                window.location.href = "/";
            }, 1000);
        }
    }

    const saveUser: () => void = (): void => {
        try {
            if (selectedCategory === "") {
                alert("Please select a category");
                return;
            } else {
                localStorage.setItem("selectedCategory", selectedCategory);

                setpageClose(true);
                setTimeout((): void => {
                    window.location.href = "/test";
                }, 1000);
            }
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    const backButton = (): void => {
        window.location.href = "/";
    }

    const nextButton = (): void => {
        try {
            saveUser();
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    const Appear = (id: string): void => {
        try {
            document.getElementsByClassName(styles.show)[0]?.classList.remove(styles.show);
            const optionsElement = document.getElementById(`${id}Options`);
            optionsElement?.classList.add(styles.show);
        } catch (error: unknown) {
            console.error(error as string);
        }
    };

    const Save = (id: string): void => {
        try {
            setSelectedCategory(id);
            document.getElementsByClassName(styles.selected)[0]?.classList.remove(styles.selected);
            document.getElementById(`${id.split(" ")[0]}${id.split(" ")[1]}`)?.classList.add(styles.selected);
            localStorage.setItem("selectedCategory", id);
        } catch (error: unknown) {
            console.error(error as string);
        }
    };

    return (
        <div className={styles.Selection}>
            <PageTitle title="Select" />
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
                                <br />
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
                                <br />
                                <h1 id="CategoryChoose">
                                    <a
                                        href="https://docs.google.com/document/d/10V0XJ5hpwAzRJV55c4fkTmZtw_brwUsQKo5n-rWnwog/edit?usp=sharing"
                                        rel="noreferrer"
                                        target="_blank"
                                        id="CategoryChooseLink"
                                        className={`${styles.categoryChooseLink} ${Work_Sans300.className}`}
                                    >
                                        Category Choose Link
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
                                {Array.from(settings[2]).map((category: string, index: number) => (
                                    <div key={category} className={`${styles.categoryMainDiv}`}>
                                        <input
                                            type="button"
                                            value={category}
                                            id={`${category}Button`}
                                            className={`${styles.categoryButton} ${Work_Sans400.className}`}
                                            onClick={() => Appear(category)}
                                        />
                                        <div
                                            className={styles.categoryOptions}
                                            id={`${category}Options`}
                                        >
                                            {Array.from(settings[3]).map((subcategory: string, index: number) => (
                                                <input
                                                    type="button"
                                                    id={`${category}${settings[3][index]}`}
                                                    value={settings[3][index]}
                                                    className={`${styles.categorySubButton} ${Work_Sans300.className}`}
                                                    key={`${category}${settings[3][index]}`} // Add a unique "key" prop
                                                    onClick={() => {
                                                        Save(`${category} ${settings[3][index]}`);
                                                    }}
                                                />
                                            ))}
                                        </div>
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

export default Select;
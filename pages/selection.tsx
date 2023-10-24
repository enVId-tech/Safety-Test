import React from 'react';
import PageTitle from '@/styles/Assets/PageTitle';
import Script from 'next/script';
import styles from '../styles/selection.module.scss';

const Select: React.FC = (): React.JSX.Element => {
    const [selectedCategory, setSelectedCategory] = React.useState<string>("");
    const [settings, setSettings] = React.useState<string[][] | string[]>([]);

    React.useEffect((): void => {
        getSettings();
    }, []);

    const getSettings = async (): Promise<void> => {
        try {
            const getSettings: Response = await fetch("http://localhost:19640/home/get/selection");
            const settingsJSON: string[] = await getSettings.json();
            setSettings(settingsJSON);

            console.log(settingsJSON);
        } catch (error: unknown) {
            console.error(error as string);
            setTimeout((): void => {
                window.location.href = "/";
            }, 1000);
        }
    }

    const saveUser: () => void = (): void => {
        if (selectedCategory === "") {
            alert("Please select a category");
            return;
        } else {
            localStorage.setItem("selectedCategory", selectedCategory);
            window.location.href = "/test";
        }
    }

    const backButton = (): void => {
        window.location.href = "/";
    }

    const nextButton = (): void => {
        saveUser();
    }

    const Appear = (id: string): void => {
        document.getElementsByClassName(styles.show)[0]?.classList.remove(styles.show);
        const optionsElement = document.getElementById(`${id}Options`);
        console.log(id + "Options");
        optionsElement?.classList.add(styles.show);
        console.log(optionsElement);
    };

    const Save = (id: string): void => {
        setSelectedCategory(id);
        document.getElementsByClassName(styles.selected)[0]?.classList.remove(styles.selected);
        document.getElementById(`${id.split(" ")[0]}${id.split(" ")[1]}`)?.classList.add(styles.selected);
        localStorage.setItem("selectedCategory", id);
    };

    return (
        <div className={styles.Selection}>
            <PageTitle title="Select" />
            <div className={styles.mainElements}>
                <nav className={styles.topBar}>
                    <h1 className={styles.categoryTitle}>Prerequisites</h1>
                    <p className={styles.categoryLabel}>
                        This page has available resources and options for taking this
                        test. The test will allow you to go back to this page and save
                        your answers.
                    </p>
                    <div className={styles.buttonSection}>
                        <button id="CategoryBack" className={styles.categoryButton} onClick={backButton}>
                            Back
                        </button>
                        <button id="CategoryNext" className={styles.categoryButton} onClick={nextButton}>
                            Next
                        </button>
                    </div>
                </nav>
                <span className={styles.selectionContent}>
                    {settings[0] === "TS" && (
                        <div className={styles.resourcesTab}>
                            <h2 className={styles.resourcesTitle}>Resources</h2>
                            <p className={styles.resourcesLabel}>
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
                                    >
                                        Category Choose Link
                                    </a>
                                </h1>
                            </div>
                            <br />
                        </div>
                    )}
                    {settings[1] === "STG" && (
                        <div className={styles.categoriesTab}>
                            <h2 className={styles.categoriesTitle}>Categories</h2>
                            <p id="CategoriesLabel">
                                This section contains categories that you can choose from.
                            </p>
                            <div className={styles.categorySelection}>
                                {Array.from(settings[2]).map((category: string, index: number) => (
                                    <div key={category} className={styles.categoryMainDiv}>
                                        <input
                                            type="button"
                                            value={category}
                                            id={`${category}Button`}
                                            className={styles.categoryButton}
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
                                                    className={styles.categorySubButton}
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
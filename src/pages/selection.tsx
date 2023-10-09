import React from "react";
import PageTitle from "../Assets/ts/pagetitle/pagetitle";
import '../Assets/scss/selection.scss';

const Select: React.FC = (): React.JSX.Element => {
    const [selectedCategory, setSelectedCategory] = React.useState<string>("");
    const [settings, setSettings] = React.useState<string[]>([]);

    const getSettings = async (): Promise<void> => {
        try {
            const getSettings: Response = await fetch("/home/get/selection");
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
        const optionsElement = document.getElementById(`${id}Options`);
        optionsElement?.classList.toggle("show");
    };

    const Save = (id: string): void => {
    
    };

    window.onload = (): void => {
        getSettings();
    }

    return (
        <div id="Selection">
            <PageTitle title="Select" />
            <div className="mainElements">
                <nav id="Topbar">
                    <h1 id="CategoryTitle">Prerequisites</h1>
                    <p id="CategoryLabel">
                        This page has available resources and options for taking this
                        test. The test will allow you to go back to this page and save
                        your answers.
                    </p>
                    <div id="Buttons">
                        <button id="CategoryBack" className="CategoryButton" onClick={backButton}>
                            Back
                        </button>
                        <button id="CategoryNext" className="CategoryButton" onClick={nextButton}>
                            Next
                        </button>
                    </div>
                </nav>
                <span id="SelectionContent">
                    {settings[0] === "TS" && (
                        <div className="Resources">
                            <h2 className="ResourcesTitle">Resources</h2>
                            <p className="ResourcesLabel">
                                This section contains resources that you can use for the test.
                            </p>
                            <div id="Links">
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
                    <div className="Categories">
                        <h2 id="CategoriesTitle">Categories</h2>
                        <p id="CategoriesLabel">
                            This section contains categories that you can choose from.
                        </p>
                        <div id="CategorySelection">
                                    {Array.from(settings[2]).map((category: string, index: number) => (
                                        <div id={`${category}Div`} key={category}>
                                            <input
                                                type="button"
                                                id={category}
                                                value={category}
                                                className="CategoryButton"
                                                onClick={() => Appear(category)}
                                            />
                                            <div
                                                id={`${category}Options`}
                                                className="CategoryOptions"
                                            >
                                                {Array.from(settings[3][index]).map((subcategory) => (
                                                    <div
                                                        id={`${category}${subcategory}Div`}
                                                        key={subcategory}
                                                    >
                                                        <input
                                                            type="button"
                                                            id={`${category}${subcategory}`}
                                                            value={subcategory}
                                                            className="CategoryButton"
                                                            onClick={() => {
                                                                Save(`${category} ${subcategory}`);
                                                            }}
                                                        />
                                                    </div>
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
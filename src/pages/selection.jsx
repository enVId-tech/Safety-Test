import React, { useState, useEffect, useRef } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const CategoryPage = () => {
    const [selectedCate, setSelectedCate] = useState("");
    const [settings, setSettings] = useState([]);
    const CATEGORYCONTENT = useRef(null);

    useEffect(() => {
        selection();
        removeSelectedClass();
    }, []);

    async function selection() {
        const check = await fetch("/home/get/selection");
        const checkJSON = await check.json();

        setSettings(checkJSON.selectionSettings);
        console.log(checkJSON.selectionSettings);

        if (checkJSON.folderGet === "" || checkJSON.User === "" || checkJSON.error) {
            window.location.href = "/";
        }
    }

    const Appear = (id) => {
        const optionsElement = document.getElementById(`${id}Options`);
        optionsElement.classList.toggle("show");
    };

    const removeSelectedClass = () => {
        const buttons = document.getElementsByClassName("CategoryButton");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("SelectedButton");
        }
    };

    const Next = () => {
        if (selectedCate === "") {
            alert("Please select a category");
            return;
        }
        CATEGORYCONTENT.current.classList.add("CategoryContentNext");
        setTimeout(() => {
            window.location.href = "/test";
        }, 1000);
    };

    const Back = () => {
        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
    };

    const Save = async (cate) => {
        setSelectedCate(cate);

        // Remove the class from all buttons
        removeSelectedClass();

        // Add background color to the clicked button
        const selectedButton = document.getElementById(cate.replace(/\s/g, ""));
        if (selectedButton) {
            selectedButton.classList.add("SelectedButton");
        }

        // Save the selected category
        const data = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cate: cate }),
        };

        const dataSend = await fetch("/test/put/selection", data);
        const dataJSON = await dataSend.text();
        return dataJSON;
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>OA Robotics - Prerequisites</title>
                <link rel="icon" href="4079-transparent.png" alt="4079" />
            </Helmet>
            <center>
                <div className="categorymain">
                    <div className="CategoryContent" ref={CATEGORYCONTENT}>
                        <h1 id="CategoryTitle">Prerequisites</h1>
                        <p id="CategoryLabel">
                            This page has available resources and options for taking this
                            test. The test will allow you to go back to this page and save
                            your answers.
                        </p>
                        <div id="Buttons">
                            <button id="CategoryBack" onClick={Back}>
                                Back
                            </button>
                            <button id="CategoryNext" onClick={Next}>
                                Next
                            </button>
                        </div>
                    </div>
                    <span className="CategorySelections">
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
                                <h2 className="CategoriesTitle">Categories</h2>
                                <p className="CategoriesLabel">
                                    This section contains the categories that you can choose for
                                    the test.
                                </p>
                                <div id="CategorySelection">
                                    {settings[2]?.map((category) => (
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
                                                {settings[3]?.map((subcategory) => (
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
            </center>
        </HelmetProvider>
    );
};

export default CategoryPage;

import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const CategoryPage = () => {
    const Appear = (id) => {
        if (document.getElementById(`${id}Options`).style.display === "block") {
            document.getElementById(`${id}Options`).style.display = "none";
            document.getElementById(`${id}`).style.transition = "green linear 1s";
            return;
        }
        document.getElementById(`${id}Options`).style.display = "block";
        document.getElementById(`${id}`).style.transition = "green linear 1s";
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>OA Robotics - Prerequisites</title>
                <link rel="icon" href="4079-transparent.png" alt="4079"></link>
            </Helmet>
            <center>
                <div className="categorymain">
                    <div className="CategoryContent">
                        <h1 id="CategoryTitle">Prerequisites</h1>
                        <p id="CategoryLabel">
                            This page has available resources and options for taking this test. The test will allow you to go back to this page and save your answers.
                        </p>
                        <button id="Next">Next</button>
                    </div>
                    <hr />
                    <br />
                    <span className="CategorySelections">
                        <div className="Resources">
                            <h2 className="ResourcesTitle">Resources</h2>
                            <p className="ResourcesLabel">
                                This section contains resources that you can use for the test.
                            </p>
                            <div id="Links">
                                <br />
                                <h1 id="SafetyLink">
                                    <a href="https://docs.google.com/presentation/d/1fQ98hhuO8KD8b8ZOy71ZRj2cuW5fbBJ8/edit#slide=id.p1" rel="noreferrer" target="_blank" id="SafetySlidesLink">
                                        Safety Slides Link
                                    </a>
                                </h1>
                                <br />
                                <h1 id="CategoryChoose">
                                    <a href="https://docs.google.com/document/d/10V0XJ5hpwAzRJV55c4fkTmZtw_brwUsQKo5n-rWnwog/edit?usp=sharing" rel="noreferrer" target="_blank" id="CategoryChooseLink">
                                        Category Choose Link
                                    </a>
                                </h1>
                            </div>
                            <br />
                        </div>
                        <div className="Categories">
                            <h2 className="CategoriesTitle">Categories</h2>
                            <p className="CategoriesLabel">
                                This section contains the categories that you can choose for the test.
                            </p>
                            <div id="CategorySelection">
                                <br />
                                <div id="FRCDiv">
                                    <input
                                        type="button"
                                        id="FRC"
                                        value="FRC"
                                        className="CategoryButton"
                                        onClick={() => Appear("FRC")}
                                    />
                                    <div id="FRCOptions">
                                        <input
                                            type="button"
                                            id="MechanicalOption"
                                            value="Mechanical"
                                            className="CategoryButton"
                                        />
                                        <br />
                                        <input
                                            type="button"
                                            id="ElectricalOption"
                                            value="Electrical"
                                            className="CategoryButton"
                                        />
                                        <br />
                                        <input
                                            type="button"
                                            id="ProgrammingOption"
                                            value="Software"
                                            className="CategoryButton"
                                        />
                                        <br />
                                        <input
                                            type="button"
                                            id="LeadershipOption"
                                            value="Leadership"
                                            className="CategoryButton"
                                        />
                                    </div>
                                </div>
                                <br />
                                <div id="FTCDiv">
                                    <input
                                        type="button"
                                        id="FTC"
                                        value="FTC"
                                        className="CategoryButton"
                                        onClick={() => Appear("FTC")}
                                    />
                                    <div id="FTCOptions">
                                        <input
                                            type="button"
                                            id="MechanicalOption"
                                            value="Mechanical"
                                            className="CategoryButton"
                                        />
                                        <br />
                                        <input
                                            type="button"
                                            id="ElectricalOption"
                                            value="Electrical"
                                            className="CategoryButton"
                                        />
                                        <br />
                                        <input
                                            type="button"
                                            id="ProgrammingOption"
                                            value="Software"
                                            className="CategoryButton"
                                        />
                                    </div>
                                </div>
                                <br />
                                <div id="VEXDiv">
                                    <input
                                        type="button"
                                        id="VEX"
                                        value="VEX"
                                        className="CategoryButton"
                                        onClick={() => Appear("VEX")}
                                    />
                                    <div id="VEXOptions">
                                        <input
                                            type="button"
                                            id="MechanicalOption"
                                            value="Mechanical"
                                            className="CategoryButton"
                                        />
                                        <br />
                                        <input
                                            type="button"
                                            id="ElectricalOption"
                                            value="Electrical"
                                            className="CategoryButton"
                                        />
                                        <br />
                                        <input
                                            type="button"
                                            id="ProgrammingOption"
                                            value="Software"
                                            className="CategoryButton"
                                        />
                                        <br />
                                        <input
                                            type="button"
                                            id="LeadershipOption"
                                            value="Leadership"
                                            className="CategoryButton"
                                        />
                                    </div>
                                </div>
                                <br />
                                <br />
                            </div>
                        </div>
                    </span>
                </div>
            </center>
        </HelmetProvider>
    );
};

export default CategoryPage;

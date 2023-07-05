import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const TestPage = () => {

    const questionoption = (id) => {
        if (!document.getElementById(`${id}`).classList.contains("active")) {
            document.getElementById(`${id}`).classList.add("active");
            document.getElementById(`${id}`).style.transition = "green linear 1s";
            return;
        } else {
            document.getElementById(`${id}`).classList.remove("active");
            document.getElementById(`${id}`).style.transition = "rgba(124, 124, 124, 0.7) linear 1s";
        }
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>OA Robotics - Safety Test</title>
                <link rel="icon" href="4079-transparent.png" alt="4079"></link>
            </Helmet>
            <center>
                <span className="testmain">
                    <img alt="4079" id="image"></img>
                    <div className="QuestionContent">
                        <div className="QuestionContainer"></div>
                        <div className="QuestionContainer">
                            <div id="ContentDiv">
                                <h1 id="QuestionTitle">Question 1</h1>
                                <br />
                                <div id="QuestionContainerContent">
                                    <p id="QuestionLabel">What types of things are MSDSs used for?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="QuestionSelections">
                        <nav id="QuestionPages">

                        </nav>
                        <h1 id="Apply">Choose <strong><em>all</em></strong> that apply</h1>
                        <br />
                        <div className="QuestionOptions">
                            <div className="choices">
                                <div id="QuestionOption1" className="QuestionOption active">
                                    <h1 id="QuestionOptionLabel">Paint</h1>
                                </div>
                                <div id="QuestionOption2" className="QuestionOption">
                                    <h1 id="QuestionOptionLabel">Metal pieces</h1>
                                </div>
                                <div id="QuestionOption3" className="QuestionOption">
                                    <h1 id="QuestionOptionLabel">Injuries</h1>
                                </div>
                                <div id="QuestionOption4" className="QuestionOption">
                                    <h1 id="QuestionOptionLabel">Electrical Components</h1>
                                </div>
                                <div id="QuestionOption5" className="QuestionOption">
                                    <h1 id="QuestionOptionLabel">Personal Protective Equipment</h1>
                                </div>
                            </div>
                        </div>
                        <span className="ProgressionButtons">
                            <button id="PreviousQuestion" className="Progression">Previous</button>
                            <button id="NextQuestion" className="Progression">Next</button>
                        </span>
                    </div>
                </span>
            </center>
        </HelmetProvider>
    )
}

export default TestPage;
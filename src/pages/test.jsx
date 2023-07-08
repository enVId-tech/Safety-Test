import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

/* eslint-disable */
const TestPage = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [activeOptions, setActiveOptions] = useState([]);
    const [questionOn, setQuestionOn] = useState(0);
    const [responses, setResponses] = useState({});

    const TEMPANSWERLENGTH = 5;
    const QUESTIONLENGTH = 16;

    useEffect(() => {
        setAnswers([
            [
                "A1",
                "A2",
                "A3",
                "A4",
                "A5"
            ],
            [
                "B1",
                "B2",
                "B3",
                "B4",
                "B5"
            ],
            [
                "C1",
                "C2",
                "C3",
                "C4",
                "C5"
            ],
            [
                "D1",
                "D2",
                "D3",
                "D4",
                "D5"
            ],
            [
                "E1",
                "E2",
                "E3",
                "E4",
                "E5"
            ],
            [
                "F1",
                "F2",
                "F3",
                "F4",
                "F5"
            ],
            [
                "G1",
                "G2",
                "G3",
                "G4",
                "G5"
            ],
            [
                "H1",
                "H2",
                "H3",
                "H4",
                "H5"
            ],
            [
                "I1",
                "I2",
                "I3",
                "I4",
                "I5"
            ],
            [
                "J1",
                "J2",
                "J3",
                "J4",
                "J5"
            ],
            [
                "K1",
                "K2",
                "K3",
                "K4",
                "K5"
            ],
            [
                "L1",
                "L2",
                "L3",
                "L4",
                "L5"
            ],
            [
                "M1",
                "M2",
                "M3",
                "M4",
                "M5"
            ],
            [
                "N1",
                "N2",
                "N3",
                "N4",
                "N5"
            ],
            [
                "O1",
                "O2",
                "O3",
                "O4",
                "O5"
            ],
            [
                "P1",
                "P2",
                "P3",
                "P4",
                "P5"
            ]
        ])

        setQuestions([
            "What type of things are MSDSs used for?",
            "What is the unabbreviated form of PPE?",
            "In what situations do you need proper ventilation?",
            "In what situations do you need to wear a filter mask?",
            "What are the most important attributes for safety?",
            "Which of the following should always be available?",
            "What is the unabbreviated form of MSDS?",
            "When do you have to be wearing safety glasses?",
            "What are inherit risks of lead-acid batteries?",
            "What is the job of the Safety Captain?",
            "When do you NOT use a potentially dangerous tool?",
            "Which of the following are proper PPE for usage of an angle grinder?",
            "Which of the following are adequate PPE for normal robot assembly?",
            "What items should go in the Safety Binder?",
            "What SHOULDN'T be done for proper electricity use?",
            "What do you do if a battery explodes?"
        ])
    }, []);

    const handleClick = (id) => {
        setActiveOptions((prevActiveOptions) => {
            if (prevActiveOptions.includes(id)) {
                setResponses((prevResponses) => ({
                    ...prevResponses,
                    [questionOn]: prevActiveOptions.filter((option) => option !== id)
                }));
                return prevActiveOptions.filter((option) => option !== id);
            } else {
                setResponses((prevResponses) => ({
                    ...prevResponses,
                    [questionOn]: [...prevActiveOptions, id]
                }));
                return [...prevActiveOptions, id];
            }
        });
    };

    const nextQuestion = () => {
        if (questionOn < QUESTIONLENGTH - 1) {
            setResponses((prevResponses) => ({
                ...prevResponses,
                [questionOn]: activeOptions
            }));
            setQuestionOn((prevQuestionOn) => prevQuestionOn + 1);
            // Set answers for next question if answers are available
            setActiveOptions(responses[questionOn + 1] || []);
        } else if (questionOn === QUESTIONLENGTH - 1) {
            setResponses((prevResponses) => ({
                ...prevResponses,
                [questionOn]: activeOptions
            }));
            console.log(responses);
        }
    };

    const previousQuestion = () => {
        if (questionOn > 0) {
            setQuestionOn((prevQuestionOn) => prevQuestionOn - 1);
            setActiveOptions(responses[questionOn - 1] || []);
        } else if (questionOn === 0) {
            document.getElementsByClassName("QuestionContent")[0].classList.add("hidden");
            document.getElementsByClassName("QuestionSelections")[0].classList.add("hidden");
            setTimeout(() => {
                window.location.href = '/selection';
            }, 1000);
        }
    };


    const createQuestion = () => {
        return (
            <span className="testmain">
                <img alt="4079" id="image"></img>
                <div className="QuestionContent">
                    <div className="QuestionContainer"></div>
                    <div className="QuestionContainer">
                        <div id="ContentDiv">
                            <span id="QuestionDetails">
                                <h1 id="QuestionTitle">Question {questionOn + 1} / {QUESTIONLENGTH}</h1>
                                <span id="Switch">
                                    <img alt="4079" id="Switch1" src="4079-transparent.png"></img>
                                    <img alt="4079" id="Switch2" src="4079-transparent.png"></img>
                                </span>
                            </span>
                            <br />
                            <div id="QuestionContainerContent">
                                <p id="QuestionLabel">{questions[questionOn]}</p>
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
                            {
                                answers.map((answer, aindex) => {
                                    if (aindex === questionOn) {
                                        return answer.map((answeri, index) => (
                                            <div
                                                className={`choice ${activeOptions.includes(answeri) ? 'active' : ''}`}
                                                key={index}
                                                id={answeri}
                                                onClick={() => handleClick(answeri)}
                                            >
                                                <div
                                                    id={`QuestionOption${index}`}
                                                    className={`QuestionOption ${activeOptions.includes(`QuestionOption${index}`) ? 'active' : ''}`}
                                                    onClick={() => handleClick(`QuestionOption${index}`)}
                                                >
                                                    <h1 id="QuestionOptionLabel">{answeri}</h1>
                                                </div>
                                            </div>
                                        ));
                                    }
                                    return null; // Return null for other indices if needed
                                })

                            }

                        </div>
                        <span className="ProgressionButtons">
                            {
                                <button id="PreviousQuestion" className="Progression" onClick={previousQuestion}>
                                    {questionOn > 0 ? 'Previous' : 'Back'}
                                </button>
                            }
                            {
                                <button id="NextQuestion" className="Progression" onClick={nextQuestion}>
                                    {questionOn < QUESTIONLENGTH - 1 ? 'Next' : 'Done'}
                                </button>
                            }
                        </span>
                    </div>
                </div>
            </span>
        )
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>OA Robotics - Safety Test</title>
                <link rel="icon" href="4079-transparent.png" alt="4079"></link>
            </Helmet>
            <center>
                {createQuestion()}
            </center>
        </HelmetProvider>
    )
}

export default TestPage;
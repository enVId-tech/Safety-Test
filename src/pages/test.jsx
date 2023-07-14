import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const TestPage = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [responses, setResponses] = useState([]);
    const [qLength, setQLength] = useState(0);
    const [questionOn, setQuestionOn] = useState(0);
    const [score, setScore] = useState(0);
    const [settings, setSettings] = useState({});
    const [currentUI, setCurrentUI] = useState("default");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDataFromServer();

            setQuestions(data[0]);
            setAnswers(data[1]);
            setQLength(data[2]);

            //console.log(data[0]);
            //console.log(data[1]);

            const initialResponses = Array.from({ length: data[2] }, () => Array(data[1][0].length).fill(false));

            await setResponses(initialResponses);
        };

        fetchData();
    }, []);

    const getDataFromServer = async () => {
        const response = await fetch("/test/get/data");
        const data = await response.json();

        if (data.error) {
            window.location.href = "/";
        }

        //console.log(data);

        return [data.questions, data.answers, data.QUESTION_LENGTH];
    };

    const handleClick = (elementindex) => {
        if (responses[questionOn][elementindex] === false) {
            setResponses((prevResponses) => {
                const updatedResponses = [...prevResponses];
                updatedResponses[questionOn][elementindex] = true;
                return updatedResponses;
            });
        } else {
            setResponses((prevResponses) => {
                const updatedResponses = [...prevResponses];
                updatedResponses[questionOn][elementindex] = false;
                return updatedResponses;
            });
        }
    };

    const nextQuestion = () => {
        if (questionOn < qLength - 1) {
            setQuestionOn((questionOn) => questionOn + 1);
        } else if (questionOn === qLength - 1) {
            // Send responses to server
            const sendResponses = async () => {
                const newResponses = [...responses];

                console.log(newResponses);

                const response = await fetch("/test/post/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ responses: newResponses })
                });
                const data = await response.json();

                if (data.error) {
                    window.location.href = "/";
                }

                console.log(data);
                setScore(data.score);
                //setScore(16)

                if (data.score.toString() === qLength.toString()) {
                //if (score.toString() === qLength.toString()) {
                    document.getElementsByClassName("QuestionContent")[0].classList.add("hidden");
                    document.getElementsByClassName("QuestionSelections")[0].classList.add("hidden");
                    document.getElementsByClassName("ScoreContent")[0].classList.add("active");
                }
            };

            sendResponses();
        }
    };

    const previousQuestion = () => {
        if (questionOn > 0) {
            setQuestionOn((questionOn) => questionOn - 1)
        } else if (questionOn === 0) {
            document.getElementsByClassName("BackConfirmation")[0].classList.add("active");
            document.getElementsByClassName("BackConfirmationContent")[0].classList.add("active");

            const button = document.getElementById("BackConfirmationYes");

            button.addEventListener("click", () => {
                document.getElementsByClassName("BackConfirmation")[0].classList.remove("active");
                document.getElementsByClassName("BackConfirmationContent")[0].classList.remove("active");
                document.getElementsByClassName("QuestionContent")[0].classList.add("hidden");
                document.getElementsByClassName("QuestionSelections")[0].classList.add("hidden");
                setTimeout(() => {
                    window.location.href = "/selection";
                }, 1000);
            });

            const button2 = document.getElementById("BackConfirmationNo");

            button2.addEventListener("click", () => {
                document.getElementsByClassName("BackConfirmation")[0].classList.remove("active");
            });
        }
    };

    const createQuestions = (num) => {
        if (num === 1) {
            setCurrentUI('default');
            setLoaded(true);
        } else if (num === 2) {
            if (document.getElementById("QuestionLabel")) {
                document.getElementById("QuestionLabel").style.animation = "disappearOutOfFrame 1s forwards";
                document.getElementById("QuestionTitle").style.animation = "disappearOutOfFrame 1s forwards";
            }
            setTimeout(() => {
                setCurrentUI('alternate1');
                setLoaded(true);
            }, 1000);
        }
    }

    const createQuestion = () => {
        return (
            <span className="testmain">
                <img alt="4079" id="image"></img>
                <div className="BackConfirmation">
                    <div className="BackConfirmationContent">
                        <h1 id="BackConfirmationTitle">Are you sure you want to go back?</h1>
                        <br />
                        <div className="BackConfirmationButtons">
                            <button id="BackConfirmationYes" className="BackConfirmationButton">Yes</button>
                            <button id="BackConfirmationNo" className="BackConfirmationButton">No</button>
                        </div>
                    </div>
                </div>
                {currentUI === 'default' ? (
                    <div className={`QuestionContent ${!loaded ? 'active' : loaded ? 'passive' : ''}`}>
                        <div className="QuestionContainer">
                            <div id="ContentDiv">
                                <span id="QuestionDetails">
                                    <h1 id="QuestionTitle">Question {questionOn + 1} / {qLength}</h1>
                                    <span id="Switch">
                                        <img alt="4079" id="Switch1" src="4079-transparent.png" onClick={() => createQuestions(1)} />
                                        <img alt="4079" id="Switch2" src="4079-transparent.png" onClick={() => createQuestions(2)} />
                                    </span>
                                </span>
                                <br />
                                <div id="QuestionContainerContent">
                                    <p id="QuestionLabel">{questions[questionOn]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : "alternate1" ? (
                    <div className={`QuestionContent2 whole`}>
                        <div className="QuestionContainer2 whole">
                            <div id="ContentDiv">
                                <span id="QuestionDetails">
                                    <span id="Switch">
                                        <img alt="4079" id="Switch1" src="4079-transparent.png" onClick={() => createQuestions(1)} />
                                        <img alt="4079" id="Switch2" src="4079-transparent.png" onClick={() => createQuestions(2)} />
                                    </span>
                                </span>
                                <div id="QuestionContainerContent">
                                    {
                                        questions.map((question, index) => {
                                            return (
                                                <span className={`QuestionContent2 ${questionOn === index ? 'active' : score === questions.length ? 'finished' : ''}}`} key={index}>
                                                    <p id="QuestionLabel">{index + 1 + ". " + question}</p>
                                                    {
                                                        answers.map((answer, aindex) => {
                                                            if (aindex === index) {
                                                                return answer.map((answeri, index) => (
                                                                    <div
                                                                        className={`QuestionOptions ${responses[index][index] ? 'active' : ''}`}
                                                                        key={index}
                                                                        id={answeri}
                                                                        onClick={() => handleClick(index)}
                                                                    >
                                                                        <div
                                                                            id={`QuestionOptions${index}`}
                                                                            className={`QuestionOptions2 ${responses[index][index] ? 'active' : ''}`}
                                                                            onClick={() => handleClick(index)}
                                                                        >
                                                                            <h1 id="QuestionOptionLabel">{answeri}</h1>
                                                                        </div>
                                                                    </div>
                                                                ));
                                                            }
                                                            return null; // Return null for other indices if needed
                                                        })
                                                    }
                                                </span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
                }
                {currentUI === 'default' ? (
                    <div className={`QuestionSelections ${!loaded ? 'active' : loaded ? 'passive' : score === questions.length ? 'finished' : ''}`}>
                        <h1 className="Apply">Choose <strong className="Apply"><em className="Apply">all</em></strong> that apply</h1>
                        <br />
                        <div className="QuestionOptions">
                            <div className="choices">
                                {answers.map((answer, aindex) => {
                                    if (aindex === questionOn) {
                                        return answer.map((answeri, index) => (
                                            <div
                                                className={`QuestionOption ${responses[questionOn][index] ? 'active' : ''}`}
                                                key={index}
                                                id={answeri}
                                                onClick={() => handleClick(index)}
                                            >
                                                <div
                                                    id={`QuestionOption${index}`}
                                                    className={`QuestionOption ${responses[questionOn][index] ? 'active' : ''}`}
                                                    onClick={() => handleClick(index)}
                                                >
                                                    <h1 id="QuestionOptionLabel">{answeri}</h1>
                                                </div>
                                            </div>
                                        ));
                                    }
                                    return null; // Return null for other indices if needed
                                })}
                            </div>
                            <span className="ProgressionButtons">
                                {questionOn > 0 ? (
                                    <button id="PreviousQuestion" className="Progression" onClick={previousQuestion}>
                                        Previous
                                    </button>
                                ) : (
                                    <button id="PreviousQuestion" className="Progression" onClick={previousQuestion}>
                                        Back
                                    </button>
                                )}
                                {
                                    <h1 id="Score" className="ScoreContent">Score: {
                                        score
                                    } / {
                                            qLength
                                        }
                                        <br/>
                                        Taken at: {
                                            new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
                                        }
                                    </h1>
                                }
                                {questionOn < qLength - 1 ? (
                                    <button id="NextQuestion" className="Progression" onClick={nextQuestion}>
                                        Next
                                    </button>
                                ) : (
                                    <button id="NextQuestion" className="Progression" onClick={nextQuestion}>
                                        Done
                                    </button>
                                )}
                            </span>
                        </div>
                    </div>
                ) : "alternate1" ? (
                    <nav id="QuestionPages"></nav>
                ) : null}
            </span>
        );
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>OA Robotics - Safety Test</title>
                <link rel="icon" href="4079-transparent.png" alt="4079"></link>
            </Helmet>
            <center>{createQuestion()}</center>
        </HelmetProvider>
    );
};

export default TestPage;
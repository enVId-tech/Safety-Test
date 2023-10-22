import React from "react";
import '../Assets/scss/test.scss';

interface Settings {
    maxQuestions: number;
    answersPerQuestion: number;
    questions: string[];
    answers: string[][];
}


const Test: React.FC = (): React.JSX.Element => {
    const [questionNumber, setQuestionNumber] = React.useState<number>(0);
    const [settings, setSettings] = React.useState<Settings>();
    const [selectedAnswers, setSelectedAnswers] = React.useState<boolean[][]>();
    const [score, setScore] = React.useState<number>(0);

    window.onload = async (): Promise<void> => {
        try {
            const typeOfTest: string | null = localStorage.getItem("typeOfTest");

            if (typeOfTest === null) {
                window.location.href = "/";
                return;
            }

            const dataPost: object = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ typeOfTest })
            }

            const data: Response = await fetch("/test/post/settings", dataPost);
            const settingsJSON: Settings = await data.json();

            setSettings(settingsJSON);
            console.log(settingsJSON);

            setSelectedAnswers(new Array(settingsJSON!.maxQuestions).fill(new Array(settingsJSON!.answersPerQuestion).fill(false)));
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    const previousQuestion: () => void = (): void => {
        if (questionNumber < 1) {
            setQuestionNumber(0);
            window.location.href = "/selection";
        } else {
            setQuestionNumber(questionNumber - 1);
        }
    }

    const sendResponses = async (): Promise<void> => {
        try {
            console.log("Sending responses");

            const dataPost: object = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    selectedAnswers: selectedAnswers,
                    typeOfTest: localStorage.getItem("typeOfTest"),
                    answers: settings!.answers,
                    maxQuestions: settings!.maxQuestions,
                    questions: settings!.questions
                })
            }

            type JSONRes = {
                score: number;
            }

            const data: Response = await fetch("/test/post/answers", dataPost);
            const result: JSONRes = await data.json();

            const writeData: object = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Name: localStorage.getItem("username"),
                    Team: localStorage.getItem("selectedCategory")!.split(" ")[0],
                    Category: localStorage.getItem("selectedCategory")!.split(" ")[1],
                    Score: result.score,
                    Type: localStorage.getItem("typeOfTest")!.replace(" ", ""),
                })
            }

            await fetch("/test/post/write", writeData);

            setScore(result.score);
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    const nextQuestion: () => void = (): void => {
        if (questionNumber >= settings!.maxQuestions - 1) {
            sendResponses();
        } else {
            setQuestionNumber(questionNumber + 1);
        }
    }

    const handleAnswer = (id: string, questionNum: number): void => {
        try {
            console.log(settings?.answers[questionNum]);

            const index: number = parseInt(id.slice(id.length - 1));
            const newSelectedAnswers: boolean[][] = [...selectedAnswers!];
            const questionAnswers: boolean[] = [...newSelectedAnswers[questionNum]];

            questionAnswers[index] = !questionAnswers[index];
            newSelectedAnswers[questionNum] = questionAnswers;

            setSelectedAnswers(newSelectedAnswers);

            console.log(newSelectedAnswers);
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    return (
        <div id="Test">
            {settings ? (
                <>
                    <img alt="4079" id="backgroundImage" />
                    <div className='QuestionContent active'>
                        <div id="QuestionContainer">
                            <div id="ContentDiv">
                                <div id="QuestionDetails">
                                    <h1 id="QuestionTitle">Question {questionNumber + 1}</h1>
                                </div>
                                <div id="QuestionContainerContent">
                                    <p id="QuestionDescription">{settings?.questions[questionNumber]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='SelectionContent active'>
                        <h1 className="SelectQuestionTitle">Choose <strong className="SelectQuestionTitle"><em className="SelectQuestionTitle">all</em></strong> that apply</h1>
                        <div id="QuestionOptionsDivContainer">
                            <div id="QuestionChoices">
                                {
                                    settings?.answers[questionNumber].map((answer: string, index: number) => {
                                        return (
                                            <p
                                                id={`QuestionAnswer${index}`}
                                                className={`Answer ${selectedAnswers && selectedAnswers[questionNumber][index] ? 'selected' : ''}`}
                                                key={index}
                                                onClick={(): void => handleAnswer(`QuestionAnswer${index}`, questionNumber)}
                                            >
                                                {answer}
                                            </p>
                                        )
                                    })
                                }
                            </div>
                            <span id="ProgressionButtons">
                                <button id="PreviousQuestion" className="Progression" onClick={previousQuestion}>
                                    {
                                        questionNumber === 0 ? "Back" : "Previous"
                                    }
                                </button>
                                {
                                    questionNumber !== settings!.maxQuestions - 1 ? (
                                        <button id="SubmitQuestion" className="Progression" onClick={sendResponses}>
                                            Submit
                                        </button>
                                    ) : (
                                        <></>
                                    )
                                }
                                <button id="NextQuestion" className="Progression" onClick={nextQuestion}>
                                    {
                                        settings!.maxQuestions ? questionNumber === settings!.maxQuestions - 1 ? "Submit" : "Next" : "Next"
                                    }
                                </button>
                            </span>
                            <h1 id="Score">
                                Current score: {score}
                            </h1>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    )
}

export default Test;
import React from 'react';
import styles from '../styles/test.module.scss';
import Image from 'next/image';
import PageTitle from '@/styles/Assets/PageTitle';

interface Settings {
    maxQuestions: number;
    answersPerQuestion: number;
    questions: string[];
    answers: string[][];
}

interface adminResponse {
    adminNames: string[];
}

const Test: React.FC = (): React.JSX.Element => {
    const [questionNumber, setQuestionNumber] = React.useState<number>(0);
    const [settings, setSettings] = React.useState<Settings>();
    const [selectedAnswers, setSelectedAnswers] = React.useState<boolean[][]>();
    const [score, setScore] = React.useState<number>(0);
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

    React.useEffect((): void => {
        try {
            getSettings();
        } catch (error: unknown) {
            console.error(error as string);
        }
    }, []);

    React.useEffect((): void => {
        try {
            autoScore();
        } catch (error: unknown) {
            console.error(error as string);
        }
    }, [selectedAnswers]);

    React.useEffect((): void => {
        try {
            if (isAdmin === true) {
                alert("You are an admin! You now have special features enabled, including auto-scoring.");
            }
        } catch (error: unknown) {
            console.error(error as string);
        }
    }, [isAdmin]);

    const autoScore = async (): Promise<void> => {
        try {
            const fetchNames: Response = await fetch("http://localhost:19640/admin/get/names");
            const namesJSON: adminResponse = await fetchNames.json();

            const adminNames: string[] = namesJSON.adminNames;

            for (const admin of adminNames) {
                if (admin === localStorage.getItem("username")!) {
                    setIsAdmin(true);
                    sendResponses();
                }
            }
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    const getSettings = async (): Promise<void> => {
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

            const data: Response = await fetch("http://localhost:19640/test/post/settings", dataPost);
            const settingsJSON: Settings = await data.json();

            setSettings(settingsJSON);

            setSelectedAnswers(new Array(settingsJSON!.maxQuestions).fill(new Array(settingsJSON!.answersPerQuestion).fill(false)));
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    const previousQuestion: () => void = (): void => {
        try {
            if (questionNumber < 1) {
                setQuestionNumber(0);
                window.location.href = "/selection";
            } else {
                setQuestionNumber(questionNumber - 1);
            }
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    const sendResponses = async (): Promise<void> => {
        try {
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

            type JSONRes = { score: number; pass: boolean; };

            const data: Response = await fetch("http://localhost:19640/test/post/answers", dataPost);
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
                    Pass: result.pass,
                    Type: localStorage.getItem("typeOfTest")!.replace(" ", ""),
                })
            }

            await fetch("http://localhost:19640/test/post/write", writeData);

            setScore(result.score);
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    const nextQuestion: () => void = (): void => {
        try {
            if (questionNumber >= settings!.maxQuestions - 1) {
                sendResponses();
            } else {
                setQuestionNumber(questionNumber + 1);
            }
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    const handleAnswer = (id: string, questionNum: number): void => {
        try {
            const index: number = parseInt(id.slice(id.length - 1));
            const newSelectedAnswers: boolean[][] = [...selectedAnswers!];
            const questionAnswers: boolean[] = [...newSelectedAnswers[questionNum]];

            questionAnswers[index] = !questionAnswers[index];
            newSelectedAnswers[questionNum] = questionAnswers;

            setSelectedAnswers(newSelectedAnswers);
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    return (
        <div className={styles.testPage}>
            <PageTitle title="Test" />
            {settings ? (
                <>
                    <Image alt="4079" className={styles.backgroundImage} src="" />
                    <div className={styles.questionContent}>
                        <div className={styles.questionContainer}>
                            <div className={styles.contentDiv}>
                                <div className={styles.questionDetails}>
                                    <h1 id="QuestionTitle">Question {questionNumber + 1}</h1>
                                </div>
                                <div className={styles.questionContainerContent}>
                                    <p className={styles.questionDescription}>{settings?.questions[questionNumber]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.selectionContent}>
                        <h1 className={styles.selectQuestionTitle}>Choose <strong className={styles.selectQuestionTitle}><em className={styles.selectQuestionTitle}>all</em></strong> that apply</h1>
                        <div className={styles.questionOptionsDivContainer}>
                            <div className={styles.questionChoices}>
                                {
                                    settings?.answers[questionNumber].map((answer: string, index: number) => {
                                        return (
                                            <p
                                                id={`QuestionAnswer${index}`}
                                                className={`${styles.answerChoice} ${selectedAnswers && selectedAnswers[questionNumber][index] ? `${styles.selected}` : ''}`}
                                                key={index}
                                                onClick={(): void => handleAnswer(`QuestionAnswer${index}`, questionNumber)}
                                            >
                                                {answer}
                                            </p>
                                        )
                                    })
                                }
                            </div>
                            <span className={styles.progressionButtons}>
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
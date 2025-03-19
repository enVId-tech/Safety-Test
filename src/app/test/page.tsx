'use client';

import React from 'react';
import styles from '@/styles/test.module.scss';
import { Work_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';

const Work_Sans300 = Work_Sans({
    weight: "300",
    style: 'normal',
    subsets: ['latin']
});

const Work_Sans500 = Work_Sans({
    weight: "500",
    style: 'normal',
    subsets: ['latin']
});

interface Settings {
    maxQuestions: number;
    answersPerQuestion: number;
    questions: string[];
    answers: string[][];
}

interface AdminResponse {
    adminNames: string[];
}

export default function Test() {
    const router = useRouter();
    const [questionNumber, setQuestionNumber] = React.useState<number>(0);
    const [settings, setSettings] = React.useState<Settings>();
    const [selectedAnswers, setSelectedAnswers] = React.useState<boolean[][]>();
    const [score, setScore] = React.useState<number>(0);
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
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
            if (isAdmin) {
                setTimeout((): void => {
                    alert("You are an admin! You now have special features enabled, including auto-scoring.");
                }, 2750);
            }
        } catch (error: unknown) {
            console.error(error as string);
        }
    }, [isAdmin]);

    const autoScore = async (): Promise<void> => {
        try {
            const fetchNames: Response = await fetch("/admin/get/names");
            const namesJSON: AdminResponse = await fetchNames.json();

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
                router.push("/");
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

            setSelectedAnswers(new Array(settingsJSON!.maxQuestions).fill(new Array(settingsJSON!.answersPerQuestion).fill(false)));
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    const previousQuestion = (): void => {
        try {
            if (questionNumber < 1) {
                setQuestionNumber(0);
                router.push("/selection");
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
                    questions: settings!.questions,
                    name: localStorage.getItem("username"),
                })
            }

            type JSONRes = { score: number; pass: boolean; };

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
                    Pass: result.pass,
                    Type: localStorage.getItem("typeOfTest")!.replace(" ", ""),
                })
            }

            await fetch("/test/post/write", writeData);

            setScore(result.score);
            setIsSubmitted(true);
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    const nextQuestion = (): void => {
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
            {settings ? (
                <>
                    {/* Using div instead of next/image since src is blank */}
                    <div className={styles.backgroundImage} />
                    <div className={styles.questionContent}>
                        <div className={styles.questionContainer}>
                            <div className={styles.contentDiv}>
                                <div className={styles.questionDetails}>
                                    <h1 id="QuestionTitle" className={Work_Sans500.className}>Question {questionNumber + 1}</h1>
                                </div>
                                <div className={`${styles.questionContainerContent} ${Work_Sans300.className}`}>
                                    <p className={styles.questionDescription}>{settings?.questions[questionNumber]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.selectionContent}>
                        <h1 className={`${styles.selectQuestionTitle} ${Work_Sans500.className}`}>Choose <strong className={styles.selectQuestionTitle}><em className={styles.selectQuestionTitle}>all</em></strong> that apply</h1>
                        <div className={styles.questionOptionsDivContainer}>
                            <div className={styles.questionChoices}>
                                {settings?.answers[questionNumber].map((answer: string, index: number) => (
                                    <p
                                        id={`QuestionAnswer${index}`}
                                        className={`${styles.answerChoice} ${selectedAnswers && selectedAnswers[questionNumber][index] ? `${styles.selected}` : ''} ${Work_Sans300.className}`}
                                        key={index}
                                        onClick={(): void => handleAnswer(`QuestionAnswer${index}`, questionNumber)}
                                    >
                                        {answer}
                                    </p>
                                ))}
                                <div className={styles.submissionDiv}>
                                    <span className={styles.progressionButtons}>
                                        <button id="PreviousQuestion" className={`${Work_Sans300.className}`} onClick={previousQuestion}>
                                            {questionNumber === 0 ? "Back" : "Previous"}
                                        </button>
                                        {questionNumber !== settings!.maxQuestions - 1 && (
                                            <button id="SubmitQuestion" className={`${Work_Sans300.className}`} onClick={sendResponses}>
                                                Submit
                                            </button>
                                        )}
                                        <button id="NextQuestion" className={`${Work_Sans300.className}`} onClick={nextQuestion}>
                                            {settings!.maxQuestions ? questionNumber === settings!.maxQuestions - 1 ? "Submit" : "Next" : "Next"}
                                        </button>
                                    </span>
                                    <h1 id="Score" className={`${styles.score} ${Work_Sans500.className}`}>
                                        Current score: {score}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    )
}
"use server";
import React from "react";
import { Work_Sans } from 'next/font/google';
import styles from "@/styles/test.module.scss";
import Head from "next/head";
import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";

const Work_Sans300: NextFont = Work_Sans({
    weight: "300",
    style: 'normal',
    subsets: ['latin']
});


const Work_Sans500: NextFont = Work_Sans({
    weight: "500",
    style: 'normal',
    subsets: ['latin']
});

let errorMessage: string = "";

export async function setErrorMessage(error: string, time: number): Promise<void> {
    try {
        errorMessage = error;
        setTimeout((): void => {
            errorMessage = "";
        }, time);
    } catch (error: unknown) {
        console.error("Lines 123-126");
        console.error(error as string);
    }
}

export default async function Test(): Promise<React.ReactElement> {
    return (
        <div className={styles.testPage}>
            <Head>Test - OA Robotics</Head>
            {settings ? (
                <>
                    <Image alt="4079" className={styles.backgroundImage} src="" />
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
                            {
                                // isSubmitted === false ? (
                                <div className={styles.questionChoices}>
                                    {
                                        settings?.answers[questionNumber].map((answer: string, index: number) => {
                                            return (
                                                <p
                                                    id={`QuestionAnswer${index}`}
                                                    className={`${styles.answerChoice} ${selectedAnswers && selectedAnswers[questionNumber][index] ? `${styles.selected}` : ''} ${Work_Sans300.className}`}
                                                    key={index}
                                                    onClick={(): void => handleAnswer(`QuestionAnswer${index}`, questionNumber)}
                                                >
                                                    {answer}
                                                </p>
                                            )
                                        })
                                    }
                                    {/*<div className={styles.submissionDiv}>*/}
                                    {/*    <span className={styles.progressionButtons}>*/}
                                    {/*        <button id="PreviousQuestion" className={`${Work_Sans300.className}`} onClick={previousQuestion}>*/}
                                    {/*            {*/}
                                    {/*                questionNumber === 0 ? "Back" : "Previous"*/}
                                    {/*            }*/}
                                    {/*        </button>*/}
                                    {/*        {*/}
                                    {/*            // isSubmitted === false ? (*/}
                                    {/*            questionNumber !== settings!.maxQuestions - 1 ? (*/}
                                    {/*                <button id="SubmitQuestion" className={`${Work_Sans300.className}`} onClick={sendResponses}>*/}
                                    {/*                    Submit*/}
                                    {/*                </button>*/}
                                    {/*            ) : (*/}
                                    {/*                <></>*/}
                                    {/*            )*/}
                                    {/*            // ) : (*/}
                                    {/*            // <></>*/}
                                    {/*            // )*/}
                                    {/*        }*/}
                                    {/*        <button id="NextQuestion" className={`${Work_Sans300.className}`} onClick={nextQuestion}>*/}
                                    {/*            {*/}
                                    {/*                settings!.maxQuestions ? questionNumber === settings!.maxQuestions - 1 ? "Submit" : "Next" : "Next"*/}
                                    {/*            }*/}
                                    {/*        </button>*/}
                                    {/*    </span>*/}
                                    {/*    <h1 id="Score" className={`${styles.score} ${Work_Sans500.className}`}>*/}
                                    {/*        Current score: {score}*/}
                                    {/*    </h1>*/}
                                    {/*</div>*/}
                                </div>
                            }
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    )
}
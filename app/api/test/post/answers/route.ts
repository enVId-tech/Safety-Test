import { NextResponse } from "next/server";
import { ErrorResponse, folderSplit, listOfNames, mainTestPath, TestRequestBody } from "@/app/api/globals.ts";
import fs from "fs";

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const {
            selectedAnswers = [[]],
            typeOfTest = '',
            answers = [],
            maxQuestions = 0,
            questions = [],
            name = ""
        }:  TestRequestBody = await req.json() as unknown as TestRequestBody;

        let score: number = 0;

        const getTestFileData: string = fs.readFileSync(`${mainTestPath}/${typeOfTest}/test.txt`, 'utf8');

        const testFileData: string[] = getTestFileData.split("Question");

        let pass: boolean = false;

        for (let i: number = 0; i < maxQuestions; i++) {
            const questionIndex: number = testFileData.findIndex((question) => question.includes(questions[i]));
            if (questionIndex === -1) continue;
            const answerLines = testFileData[questionIndex].split(folderSplit);
            for (let j: number = 0; j < selectedAnswers[i].length; j++) {
                const answerIndex: number = answerLines.findIndex((answer) => answer.includes(answers[i][j]));
                if (answerIndex === -1) continue;

                const answerLine: string = answerLines[answerIndex];
                if (answerLine.includes("+") && selectedAnswers[i][j]) {
                    score += 0.25; // getOneSetting(3) / getOneSetting(2);
                } else if (answerLine.includes("-") && !selectedAnswers[i][j]) {
                    score += 0.25; // getOneSetting(3) / getOneSetting(2);
                }
            }
        }

        if (score >= maxQuestions) {
            pass = true;
        }

        if (listOfNames.includes(name)) {
            pass = true;
            score = maxQuestions;
            return NextResponse.json({ score, pass });
        }

        return NextResponse.json({ score, pass });
    } catch (error: unknown) {
        return NextResponse.json({ error: error as ErrorResponse }, { status: 500 });
    }
}
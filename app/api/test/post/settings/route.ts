import { NextResponse } from "next/server";
import fs from "fs";
import { ErrorResponse, folderSplit, mainTestPath } from "@/app/api/globals.ts";
import { shuffleItems } from "@/app/api/funcs.ts";

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const answers: string[][] = [];
        const questions: string[] = [];

        const typeOfTest: string = await req.json() as unknown as string;

        const maxQuestions: number = 16; // getOneSetting(2) as unknown as number;
        const answersPerQuestion: number = 4; // getOneSetting(3) as unknown as number;

        const getTestFileData: string = fs.readFileSync(`${mainTestPath}/${typeOfTest}/test.txt`, 'utf8');

        const testFileData: string[] = getTestFileData.split("Question");

        const shuffleTestFileData: string[] = shuffleItems(testFileData);

        shuffleTestFileData.forEach((question: string, index: number) => {
            if (shuffleTestFileData[index] !== "" && index <= maxQuestions) {
                const question: string = shuffleTestFileData[index].split(":")[1].trim().split(folderSplit)[0].trim();

                questions.push(question);

                const answersPreShuffle: string[] = [];

                shuffleTestFileData[index].split(folderSplit).splice(1).forEach((answer: string) => {
                    if (answer !== "") {
                        answersPreShuffle.push(answer.trim().replace(/[-+]/g, "").trim());
                    }
                });

                answers.push(shuffleItems(answersPreShuffle).splice(0, answersPerQuestion));
            } else {
                shuffleTestFileData.splice(index, 1);
            }
        });
        return NextResponse.json({ questions, answers, maxQuestions, answersPerQuestion });
    } catch (error: unknown) {
        return NextResponse.json({ error: error as ErrorResponse }, { status: 500 });
    }
}
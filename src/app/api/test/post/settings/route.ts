import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { shuffleItems } from '@/lib/utils';

const mainTestPath = path.join(process.cwd(), "Tests");
const folderSplit = "\r\n" || "\n";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        let answers: string[][] = [];
        let questions: string[] = [];

        const typeOfTest: string = body.typeOfTest;
        const testFilePath = path.join(mainTestPath, typeOfTest, 'test.txt');

        // These would ideally come from settings
        const maxQuestions: number = 16;
        const answersPerQuestion: number = 4;

        const getTestFileData: string = fs.readFileSync(testFilePath, 'utf8');
        const testFileData: string[] = getTestFileData.split("Question");
        const shuffleTestFileData: string[] = shuffleItems([...testFileData]);

        shuffleTestFileData.forEach((question: string, index: number) => {
            if (shuffleTestFileData[index] !== "" && index <= maxQuestions) {
                const questionParts = shuffleTestFileData[index].split(":");

                if (questionParts.length > 1) {
                    const questionText = questionParts[1].trim().split(folderSplit)[0].trim();
                    questions.push(questionText);

                    let answersPreShuffle: string[] = [];
                    shuffleTestFileData[index].split(folderSplit).splice(1).forEach((answer: string) => {
                        if (answer !== "") {
                            answersPreShuffle.push(answer.trim().replace(/[-+]/g, "").trim());
                        }
                    });

                    answers.push(shuffleItems([...answersPreShuffle]).slice(0, answersPerQuestion));
                }
            }
        });

        return NextResponse.json({
            questions,
            answers,
            maxQuestions,
            answersPerQuestion
        });
    } catch (error) {
        console.error("Error processing test settings:", error);
        return NextResponse.json({ error: "Error processing test settings" }, { status: 500 });
    }
}
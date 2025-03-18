import { settingsList } from "@/app/api/home/post/folders/dir/route.ts";

export const settings: string[] = settingsList;
export const mainTestPath: string = "Tests";
export const folderSplit: string = "\r\n";
export const listOfNames: string[] = ["Erick Tran", "Aaron Truong"];

export interface TestRequestBody {
    selectedAnswers: boolean[][];
    typeOfTest: string;
    answers: string[][];
    maxQuestions: number;
    questions: string[];
    name: string;
}

export interface WriteData {
    Name: string;
    Team: string;
    Category: string;
    Score: string;
    Type: string;
    Pass: boolean;
}

export type ErrorResponse = {
    error: string;
}
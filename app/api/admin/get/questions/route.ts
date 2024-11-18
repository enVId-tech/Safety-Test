import { NextResponse } from "next/server";
import fs from "fs";
import { ErrorResponse, mainTestPath } from "@/app/api/globals.ts";

export async function GET(): Promise<NextResponse> {
    try {
        const getNumOfItemsInTestDir: string[] = fs.readdirSync(mainTestPath);

        let testFileData: string = "";

        for (let i: number = 0; i < getNumOfItemsInTestDir.length; i++) {
            testFileData = fs.readFileSync(`${mainTestPath
            }/${getNumOfItemsInTestDir[i]
            }/test.txt`, 'utf8');
        }
        return NextResponse.json({ testFileData });
    } catch (error: unknown) {
        return NextResponse.json({ error: error as ErrorResponse }, { status: 500 });
    }
}
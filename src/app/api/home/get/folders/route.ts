import { NextResponse } from 'next/server';
import {mainTestPath} from "@/src/lib/settings";
import fs from "fs";

export async function GET() {
    try {
        const files: string[] = fs.readdirSync(mainTestPath);

        const fileNames: string[] = [];

        files.forEach((file: string) => {
            const fileStats: fs.Stats = fs.statSync(`${mainTestPath}/${file}`);

            if (fileStats.isDirectory() && !file.includes("#")) {
                fileNames.push(file.replace('-', ' '));
            }
        })

        return NextResponse.json({ send: fileNames });
    } catch (error) {
        console.error("Error processing folder:", error);
        return NextResponse.json({ error: "Error processing folder" }, { status: 500 });
    }
}
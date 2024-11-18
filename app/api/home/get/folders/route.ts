import { NextResponse } from 'next/server';
import fs from 'fs';
import { ErrorResponse, mainTestPath } from '@/app/api/globals.ts';


export async function GET(): Promise<NextResponse> {
    try {
        const files: string[] = fs.readdirSync(mainTestPath);

        const filesNames: string[] = [];

        files.forEach((file: string) => {
            const fileStats: fs.Stats = fs.statSync(`${mainTestPath}/${file}`);
            if (fileStats.isDirectory() && !file.includes("#")) {
                filesNames.push(file.replace("-", " "));
            }
        });

        return NextResponse.json(filesNames);
    } catch (error: unknown) {
        return NextResponse.json({error: error as ErrorResponse}, {status: 500});
    }
}
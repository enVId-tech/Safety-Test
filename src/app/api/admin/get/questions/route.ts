import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const mainTestPath = path.join(process.cwd(), "Tests");

export async function GET() {
    try {
        const directories = fs.readdirSync(mainTestPath);

        let testFileData = [];

        for (const dir of directories) {
            const filePath = path.join(mainTestPath, dir, 'test.txt');
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf8');
                testFileData.push({ directory: dir, content });
            }
        }

        return NextResponse.json({ testFileData });
    } catch (error) {
        console.error("Error fetching questions:", error);
        return NextResponse.json({ error: "Error fetching test questions" }, { status: 500 });
    }
}
import { NextResponse } from 'next/server';
import fs from 'fs';
import { ErrorResponse, folderSplit, mainTestPath } from '@/app/api/globals.ts';


export async function POST(req: Request): Promise<NextResponse> {
    try {
        const sentData: string = await req.text();
        const folderGet: string = sentData.replace(" ", "-");
        console.log(folderGet);

        const settingsYML: string = fs.readFileSync(`${mainTestPath}/${folderGet}/settings.yml`, 'utf8')

        const settings: string[] = settingsYML.split(folderSplit);

        return NextResponse.json({ "send": folderGet, "settings": settings });
    } catch (error: unknown) {
        return NextResponse.json({error: error as ErrorResponse}, {status: 500});
    }
}
import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/settings';
import path from 'path';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const sentData: string = body.folder;
        const folderGet: string = sentData.replace(" ", "-");

        // Load settings into cache
        getSettings(folderGet);

        return NextResponse.json({ send: folderGet });
    } catch (error) {
        console.error("Error processing folder:", error);
        return NextResponse.json({ error: "Error processing folder" }, { status: 500 });
    }
}
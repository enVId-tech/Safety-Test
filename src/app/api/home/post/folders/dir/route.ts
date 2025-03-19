import { NextResponse } from 'next/server';
import fs from "fs";
import {mainTestPath} from "@/src/lib/settings";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const sentData: string = body.folder;
        const folderGet: string = sentData.replace(" ", "-");

        const settings = fs.readFileSync(`${mainTestPath}/${folderGet}/settings.yml`, "utf8");

        return NextResponse.json({ send: folderGet, settings: settings });
    } catch (error) {
        console.error("Error processing folder:", error);
        return NextResponse.json({ error: "Error processing folder" }, { status: 500 });
    }
}
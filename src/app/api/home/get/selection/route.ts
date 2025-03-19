import { NextResponse } from "next/server";
import {mainTestPath} from "@/src/lib/settings";
import fs from "fs";

const getOneSetting = (folderName: string, settingIndex: number, splitIndex?: string): string | null | string[] => {
    try {
        const settings = fs.readFileSync(`${mainTestPath}/${folderName}/settings.yml`, "utf8");
        const settingString = settings.slice(2)[settingIndex - 1];

        if (settingString) {
            const settingValue = settingString.split(':')[1].trim().split("#")[0].trim();
            if (splitIndex) {
                return settingValue.split(splitIndex);
            }
            return settingValue;
        }
        return null;
    } catch (error: unknown) {
        console.error(`Error getting setting ${settingIndex} for ${folderName}:`, error);
        return null;
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const sentData: string = body.folder;
        const folderGet: string = sentData.replace(" ", "-");

        const settings = getOneSetting(folderGet, 1);

    } catch (err: unknown) {
        console.log(err as string);
        return NextResponse.json({error: "Error processing folder"});
    }
}
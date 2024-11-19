import { NextResponse } from 'next/server';
import { ErrorResponse, settings } from "@/app/api/globals.ts";
import { getOneSetting } from "@/app/api/funcs.ts";

export async function GET(): Promise<NextResponse> {
    try {
        const ACCESSIBLE: string = getOneSetting(settings, 1) as string;
        const SELECTION_AVAILABLE: string = getOneSetting(settings, 4) as string;
        const TEAM_SELECTION_REQUIRED: string = getOneSetting(settings, 5) as string;
        const SAFETY_TEST_GUIDES: string = getOneSetting(settings, 7) as string;
        const CATEGORIES_AVAILABLE: string[] = getOneSetting(settings, 10, "; ") as string[]
        const TEAMS_AVAILABLE: string[] = getOneSetting(settings, 11, "; ") as string[]

        const selectionSettings: (string[] | string)[] = [];

        if (!ACCESSIBLE as boolean) {
            return NextResponse.json({ error: "Error" });
        }

        if (!SELECTION_AVAILABLE as boolean) {
            return NextResponse.json({ error: "Error" });
        }

        switch (TEAM_SELECTION_REQUIRED) {
            case "true": selectionSettings.push("TS"); break;
            case "false": selectionSettings.push("NTS"); break;
            default: return NextResponse.json({ error: "Error" });
        }

        switch (SAFETY_TEST_GUIDES) {
            case "true": selectionSettings.push("STG"); break;
            case "false": selectionSettings.push("NSTG"); break;
            default: return NextResponse.json({ error: "Error" });
        }

        selectionSettings.push(TEAMS_AVAILABLE);
        selectionSettings.push(CATEGORIES_AVAILABLE);

        return NextResponse.json(selectionSettings);
    } catch (error: unknown) {
        return NextResponse.json({ error: error as ErrorResponse }, { status: 500 });
    }
}
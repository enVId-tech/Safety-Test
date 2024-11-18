import { NextResponse } from "next/server";
import { ErrorResponse, listOfNames } from "@/app/api/globals.ts";

export async function GET(): Promise<NextResponse> {
    try {
        return NextResponse.json({ adminNames: listOfNames });
    } catch (error: unknown) {
        return NextResponse.json({ error: error as ErrorResponse }, { status: 500 });
    }
}
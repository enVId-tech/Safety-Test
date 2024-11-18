import { NextResponse } from "next/server";
import fs from "fs";
import { ErrorResponse } from "@/app/api/globals.ts";

export async function GET(): Promise<NextResponse> {
    try {
        const fileData: JSON = JSON.parse(fs.readFileSync("pages/admin/responses.json", "utf8"));

        return NextResponse.json(fileData);
    } catch (error: unknown) {
        return NextResponse.json({ error: error as ErrorResponse }, { status: 500 });
    }
}
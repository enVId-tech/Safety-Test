import { NextResponse } from "next/server";
import { ErrorResponse } from "@/app/api/globals.ts";
import fs from "fs";

export async function GET(): Promise<NextResponse> {
    try {
        const fileData: JSON = JSON.parse(fs.readFileSync("pages/admin/passed.json", "utf8"));

        return NextResponse.json(fileData);
    } catch (error: unknown) {
        return NextResponse.json({error: error as ErrorResponse}, {status: 500});
    }
}
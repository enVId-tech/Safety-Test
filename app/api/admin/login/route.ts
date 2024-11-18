import { NextResponse } from "next/server";
import { ErrorResponse } from "@/app/api/globals.ts";

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const username: string = await req.json();

        const validUsernames: string[] = ["erick", "cabinet", "aaron"];

        for (let i: number = 0; i < validUsernames.length; i++) {
            if (username.toUpperCase().trim() === validUsernames[i].toUpperCase().trim()) {
                return NextResponse.json({ send: "Success" });
            }
        }

        return NextResponse.json({ error: "Error" });
    } catch (error: unknown) {
        return NextResponse.json({ error: error as ErrorResponse }, { status: 500 });
    }
}
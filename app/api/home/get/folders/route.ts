'use server';
import { NextResponse } from 'next/server';

type ErrorResponse = {
    error: string;
}

export async function POST(req: Request, res: NextResponse) {
    try {
        return NextResponse.json({0: 0});
    } catch (error: unknown) {
        return NextResponse.json({error: error as ErrorResponse}, {status: 500});
    }
}
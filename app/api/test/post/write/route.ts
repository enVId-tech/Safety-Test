import { NextResponse } from "next/server";
import { ErrorResponse, listOfNames, settings, WriteData } from "@/app/api/globals.ts";
import fs from "fs";
import { getOneSetting } from "@/app/api/funcs.ts";

export async function POST(req: Request): Promise<NextResponse> {
    try {
        let { Name, Team, Category, Score, Type, Pass }: WriteData = await req.json() as unknown as WriteData;

        const UnStrTime: Date = new Date();
        const Time: string = UnStrTime.toLocaleString("en-US", {
            timeZone: "America/Los_Angeles"
        })

        Score = `${Score} / ${getOneSetting(settings, 2)}`;

        const main: object = { Name, Team, Category, Score, Type, Pass, Time };

        if (!listOfNames.includes(Name)) {
            const data: object[] = JSON.parse(fs.readFileSync("pages/admin/responses.json", "utf8"));

            data.push(main);

            fs.writeFileSync("pages/admin/responses.json", JSON.stringify(data));
        }

        if (Pass) {
            const data2: object[] = JSON.parse(fs.readFileSync("pages/admin/passed.json", "utf8"));
            const data3: object[] = JSON.parse(fs.readFileSync("pages/admin/responses.json", "utf8"));

            data2.push(main);
            data3.push(main);

            fs.writeFileSync("pages/admin/passed.json", JSON.stringify(data2));
            fs.writeFileSync("pages/admin/responses.json", JSON.stringify(data3));
        }

        return NextResponse.json({ send: "Success" });
    } catch (error: unknown) {
        return NextResponse.json({ error: error as ErrorResponse }, { status: 500 });
    }
}
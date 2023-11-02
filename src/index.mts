// Libraries
import express, { Express } from 'express';
import next from 'next';
import cors from 'cors';
import fs from 'fs';

// Express Init
const app: Express = express();

// CORS
app.use(cors({
    origin: '*',
}));

//Limiting the size of json data (1mb) and parsing JSON data
app.use(express.json({ limit: '5mb' }));

// Next Init
const dev: boolean = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

// Globals
let settings: string[] = [];
const mainTestPath: string = "Tests";
const folderSplit: string = "\r\n" || "\n";

// Interface
interface TestRequestBody {
    selectedAnswers: boolean[][];
    typeOfTest: string;
    answers: string[][];
    maxQuestions: number;
    questions: string[];
}

// Functions
const shuffleItems = (array: any[]): any[] => {
    try {
        let currentIndex: number = array.length, randomIndex: number;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    } catch (error: unknown) {
        console.error(error as string)
        return array;
    }
}

const getOneSetting = (settingIndex: number, splitIndex?: string): string | null | string[] => {
    try {
        const settingString: string = settings.slice(2)[settingIndex - 1]
        if (settingString) {
            const settingValue: string = settingString.split(':')[1].trim().split("#")[0].trim()
            if (splitIndex) {
                return settingValue.split(splitIndex);
            }
            return settingValue;
        }
        return null;
    } catch (error: unknown) {
        console.error(error as string)
        return null;
    }
}

// API Routes

app.get('/home/get/folders', async (req: any, res: any): Promise<void> => {
    try {
        const files: string[] = fs.readdirSync(mainTestPath);

        let filesNames: string[] = [];

        files.forEach((file: string) => {
            const fileStats: fs.Stats = fs.statSync(`${mainTestPath}/${file}`);
            if (fileStats.isDirectory() && !file.includes("#")) {
                filesNames.push(file.replace("-", " "));
            }
        });

        res.send(filesNames);
    } catch (error: unknown) {
        console.error(error as string)
    }
});

app.get('/home/get/selection', async (req: any, res: any): Promise<void> => {
    try {
        const ACCESSABLE: string = getOneSetting(1) as string;
        const SELECTION_AVAILABLE: string = getOneSetting(4) as string;
        const TEAM_SELECTION_REQUIRED: string = getOneSetting(5) as string;
        const SAFETY_TEST_GUIDES: string = getOneSetting(7) as string;
        const CATEGORIES_AVAILABLE: string[] = getOneSetting(10, "; ") as string[]
        const TEAMS_AVAILABLE: string[] = getOneSetting(11, "; ") as string[]

        let selectionSettings: (string[] | string)[] = [];

        if (!ACCESSABLE as boolean) {
            res.send({ error: "Error" });
            return;
        }

        if (!SELECTION_AVAILABLE as boolean) {
            res.send({ send: "Test" });
            return;
        }

        switch (TEAM_SELECTION_REQUIRED) {
            case "true": selectionSettings.push("TS"); break;
            case "false": selectionSettings.push("NTS"); break;
            default: res.send({ error: "Error" }); return;
        }

        switch (SAFETY_TEST_GUIDES) {
            case "true": selectionSettings.push("STG"); break;
            case "false": selectionSettings.push("NSTG"); break;
            default: res.send({ error: "Error" }); return;
        }

        selectionSettings.push(TEAMS_AVAILABLE);
        selectionSettings.push(CATEGORIES_AVAILABLE);

        res.send(selectionSettings);
    } catch (error: unknown) {
        console.error(error as string);
    }
});

app.post('/home/post/folders/dir', async (req: NodeJS.Dict<any>, res: NodeJS.Dict<any>): Promise<void> => {
    try {
        const sentData: string = req.body.folder;
        const folderGet: string = sentData.replace(" ", "-");
        console.log(folderGet);

        const settingsYML: string = fs.readFileSync(`${mainTestPath}/${folderGet}/settings.yml`, 'utf8')

        settings = settingsYML.split(folderSplit);

        res.send({ send: folderGet });
    } catch (error: unknown) {
        console.error(error as string)
    }
});

app.post('/test/post/settings', async (req: NodeJS.Dict<any>, res: NodeJS.Dict<any>): Promise<void> => {
    try {
        let answers: string[][] = [];
        let questions: string[] = [];

        const typeOfTest: string = req.body.typeOfTest;

        const maxQuestions: number = 16; // getOneSetting(2) as unknown as number;
        const answersPerQuestion: number = 4; // getOneSetting(3) as unknown as number;

        const getTestFileData: string = await fs.readFileSync(`${mainTestPath}/${typeOfTest}/test.txt`, 'utf8');

        const testFileData: string[] = getTestFileData.split("Question");

        const shuffleTestFileData: string[] = shuffleItems(testFileData);

        shuffleTestFileData.forEach((question: string, index: number) => {
            if (shuffleTestFileData[index] !== "" && index <= maxQuestions) {
                const question: string = shuffleTestFileData[index].split(":")[1].trim().split(folderSplit)[0].trim();

                questions.push(question);

                let answersPreShuffle: string[] = [];

                shuffleTestFileData[index].split(folderSplit).splice(1).forEach((answer: string) => {
                    if (answer !== "") {
                        answersPreShuffle.push(answer.trim().replace(/[-+]/g, "").trim());
                    }
                });

                answers.push(shuffleItems(answersPreShuffle).splice(0, answersPerQuestion));

            } else {
                shuffleTestFileData.splice(index, 1);
            }
        });

        res.send({ questions, answers, maxQuestions, answersPerQuestion });
    } catch (error: unknown) {
        console.error(error as string)
    }
});

app.post('/test/post/answers', async (req: NodeJS.Dict<TestRequestBody>, res: NodeJS.Dict<any>): Promise<void> => {
    try {
        const { selectedAnswers = [], typeOfTest = '', answers = [], maxQuestions = 0, questions = [] } = req.body || {};

        let score: number = 0;

        const getTestFileData: string = await fs.readFileSync(`${mainTestPath}/${typeOfTest}/test.txt`, 'utf8');

        const testFileData: string[] = getTestFileData.split("Question");

        let pass: boolean = false;

        for (let i = 0; i < maxQuestions; i++) {
            const questionIndex: number = testFileData.findIndex((question) => question.includes(questions[i]));
            if (questionIndex === -1) continue;
            const answerLines = testFileData[questionIndex].split(folderSplit);
            for (let j = 0; j < selectedAnswers[i].length; j++) {
                const answerIndex: number = answerLines.findIndex((answer) => answer.includes(answers[i][j]));
                if (answerIndex === -1) continue;

                const answerLine = answerLines[answerIndex];
                if (answerLine.includes("+") && selectedAnswers[i][j] === true) {
                    score += 0.25; // getOneSetting(3) / getOneSetting(2);
                } else if (answerLine.includes("-") && selectedAnswers[i][j] === false) {
                    score += 0.25; // getOneSetting(3) / getOneSetting(2);
                }
            }
        }

        if (score >= maxQuestions) {
            pass = true;
        }

        res.send({ score, pass });
    } catch (error: unknown) {
        console.error(error as string);
    }
});

app.post('/test/post/write', async (req: NodeJS.Dict<any>, res: NodeJS.Dict<any>): Promise<void> => {
    try {
        const { Name, Team, Category, Score, Type, Pass } = req.body;

        const UnStrTime: Date = new Date();
        const Time: string = UnStrTime.toLocaleString("en-US", {
            timeZone: "America/Los_Angeles"
        })

        const main: object = { Name, Team, Category, Score, Type, Pass, Time };

        const validAdminNames: string[] = ["Erick Tran", "Aaron Truong"];

        if (!validAdminNames.includes(Name)) {
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

        res.send({ send: "Success" });
    } catch (error: unknown) {
        console.error(error as string);
    }
});

app.post('/admin/login', (req: NodeJS.Dict<any>, res: NodeJS.Dict<any>): void => {
    try {
        const username: string = req.body.username;

        const validUsernames: string[] = ["erick", "cabinet", "aaron"];

        for (let i = 0; i < validUsernames.length; i++) {
            if (username.toUpperCase().trim() === validUsernames[i].toUpperCase().trim()) {
                res.send({ send: "Success" });
                return;
            }
        }

        res.send({ send: "Error" });
    } catch (error: unknown) {
        console.error(error as string);
    }
});

app.get('/admin/get/responses', (req: NodeJS.Dict<any>, res: NodeJS.Dict<any>): void => {
    try {
        const fileData: JSON = JSON.parse(fs.readFileSync("pages/admin/responses.json", "utf8"));

        res.send({ fileData });
    } catch (error: unknown) {
        console.error(error as string);
    }
});

app.get('/admin/get/names', (req: NodeJS.Dict<any>, res: NodeJS.Dict<any>): void => {
    try {
        const validAdminNames: string[] = ["Erick Tran", "Aaron Truong"];

        res.send({ adminNames: validAdminNames });
    } catch (error: unknown) {
        console.error(error as string)
    }
});

app.get('/admin/get/responses/passed', (req: NodeJS.Dict<any>, res: NodeJS.Dict<any>): void => {
    try {
        const fileData: JSON = JSON.parse(fs.readFileSync("pages/admin/passed.json", "utf8"));

        res.send({ fileData });
    } catch (error: unknown) {
        console.error(error as string);
    }
});

// Next Routes
nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
        return nextHandler(req, res);
    });

    // Server
    const PORT: number = process.env.PORT as unknown as number || 19640 as number;
    app.listen(PORT, () => console.error(`Listening on port ${PORT}`));
    console.error('Server Started');
});
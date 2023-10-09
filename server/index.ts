// Libraries
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Express Init
const app = express();

// CORS
app.use(cors({
    origin: '*',
}));

//Limiting the size of json data (1mb) and parsing JSON data
app.use(express.json({ limit: '5mb' }));

// Globals

let settings: string[] = [];
const mainTestPath: string = "Tests";
const folderSplit: string = "\r\n" || "\n";
let folderGet: string = "";

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
        console.log(error as string)
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
            return settingValue
        }
        return null;
    } catch (error: unknown) {
        console.log(error as string)
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
        console.log(error as string)
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

        let selectionSettings: string[] = [];

        if (ACCESSABLE === 'false') {
            res.send({ error: "Error" });
            return;
        }

        if (SELECTION_AVAILABLE === 'false') {
            res.send({ send: "Test" });
            return;
        }

        if (TEAM_SELECTION_REQUIRED === 'true') {
            selectionSettings.push("TS");
        } else {
            selectionSettings.push("NTS");
        }

        if (SAFETY_TEST_GUIDES === 'true') {
            selectionSettings.push("STG");
        } else {
            selectionSettings.push("NSTG");
        }

        selectionSettings.push(...TEAMS_AVAILABLE);
        selectionSettings.push(...CATEGORIES_AVAILABLE);

        res.send(selectionSettings);
    } catch (error: unknown) {
        console.log(error as string);
    }
});

app.post('/home/post/folders/dir', async (req: NodeJS.Dict<any>, res: NodeJS.Dict<any>): Promise<void> => {
    try {
        folderGet = req.body.folder.replace(" ", "-");

        const settingsYML: string = fs.readFileSync(`${mainTestPath}/${folderGet}/settings.yml`, 'utf8')

        settings = settingsYML.split(folderSplit);

        res.send({ send: folderGet });
    } catch (error: unknown) {
        console.log(error as string)
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the build directory
app.use(express.static(join(__dirname, '..', 'build')));

// Serve the index.html file for all routes
app.get('/*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'build', 'index.html'));
});

// Server
const port = process.env.PORT || 19640;
app.listen(port, () => console.log(`Listening on port ${port}`));
console.log('Server Started');

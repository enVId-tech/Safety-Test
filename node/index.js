// Libraries
import express from 'express';
import google from 'googleapis';
import cors from 'cors';
import fs from 'fs';

// Express Init
const app = express();

// CORS
app.use(cors());

// Server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
console.log('Server Started');

//Limiting the size of json data (1mb) and parsing JSON data
app.use(express.json({ limit: '5mb' }));

// Globals
let settings;
const folderSplit = '\r\n';
let folderGet = "";
let selection = [];
let User;
let questions = [];
let answers = [];
let answersPush = [];

// Shuffle
const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

// Get Settings
const getOneSetting = (settingIndex, splitIndex) => {
    const settingString = settings.slice(2)[settingIndex - 1];
    if (settingString) {
        const settingValue = settingString.split(":")[1].trim().split("#")[0].trim();
        const settingSplit = settingValue.split(splitIndex);
        return settingSplit;
    }
    return null; // Return null if the setting index is out of range
};


// Send Valid Folder Responses
app.get('/home/get/folders', async (req, res) => {
    const folderPath = 'node/Tests';

    try {
        const files = await fs.promises.readdir(folderPath);

        let fileNames = [];

        for (let i = 0; i < files.length; i++) {
            if (!files[i].includes('#')) {
                fileNames.push(files[i]);
            }
        }

        res.json(fileNames);
    } catch (err) {
        console.error(err);
    }
});

app.get('/home/get/selection', async (req, res) => {
    const ACCESSABLE = getOneSetting(1);
    const SELECTION_AVAILABLE = getOneSetting(4);
    const TEAM_SELECTION_REQUIRED = getOneSetting(5);
    const SAFETY_TEST_GUIDES = getOneSetting(7);
    const CATEGORIES_AVAILABLE = getOneSetting(10, "; ");
    const TEAMS_AVAILABLE = getOneSetting(11, "; ");

    let selectionSettings = [];

    if (ACCESSABLE == 'false') {
        res.send({ error: "Error" });
        return;
    }

    if (SELECTION_AVAILABLE == 'false') {
        res.send({ send: "Test" });
        return;
    }

    if (TEAM_SELECTION_REQUIRED == 'true') {
        selectionSettings.push("TS");
    } else {
        selectionSettings.push("NTS");
    }

    if (SAFETY_TEST_GUIDES == 'true') {
        selectionSettings.push("STG");
    } else {
        selectionSettings.push("NSTG");
    }

    selectionSettings.push(TEAMS_AVAILABLE);
    selectionSettings.push(CATEGORIES_AVAILABLE);

    res.send({ folderGet, User, selectionSettings });
})

app.post('/home/post/folders/dir', async (req, res) => {
    folderGet = req.body.SelectedValue;
    User = req.body.User;

    fs.promises.readFile(`node/Tests/${folderGet}/settings.yml`, 'utf8')
        .then(data => {
            console.log(data)
            settings = data.split(folderSplit);
        })
        .catch(err => console.error(err));

    res.json({ folderGet, User });
});

app.put('/test/put/selection', async (req, res) => {
    selection = req.body.cate;
    res.send(selection);
});

app.get('/test/get/data', async (req, res) => {
    try {
        if (folderGet === "" || User === "") {
            res.send({ error: "Error" });
            return;
        }

        answersPush = [];
        answers = [];
        questions = [];

        const ANSWER_LENGTH = getOneSetting(3);
        const QUESTION_LENGTH = getOneSetting(2);

        console.log(ANSWER_LENGTH, QUESTION_LENGTH);

        const getTestFileData = await fs.promises.readFile(`node/Tests/${folderGet}/test.txt`, 'utf8');

        const testFileData = getTestFileData.split("Question");

        const getTestFileDataSplitQuestion = shuffle(testFileData);
        let counter = 0;

        for (let i = 0; i < getTestFileDataSplitQuestion.length && counter < QUESTION_LENGTH; i++) {
            if (getTestFileDataSplitQuestion[i] !== "") {
                const question = getTestFileDataSplitQuestion[i].split(":")[1].split(folderSplit);

                questions.push(question.shift());

                let trimmedAns = shuffle(question
                    .slice(0, ANSWER_LENGTH))
                    .filter(ans => ans !== "");

                answersPush.push(trimmedAns.map(ans => ans.trim().startsWith('+')));

                trimmedAns = trimmedAns.map(ans => ans.trimStart().slice(1).trimStart());

                answers.push(trimmedAns);
            }
        }

        for (let i = 0; i < getTestFileDataSplitQuestion.length; i++) {
            if (answers.length > QUESTION_LENGTH) {
                answers.pop();
            }
        }

        res.json({ questions, answers, QUESTION_LENGTH });
    } catch (err) {
        console.error(err);
        res.send(err);
    }
});


app.post('/test/post/submit', async (req, res) => {
    const RES = req.body.responses;

    let score = 0;

    for (let i = 0; i < RES.length; i++) {
        for (let j = 0; j < RES[i].length; j++) {
            if (RES[i][j] === answersPush[i][j]) {
                score += getOneSetting(3) / getOneSetting(2)
            } else {
                score = score;
            }
        }
    }

    console.log(score);
    res.send({ score });
});

//The authentication for the google API
const authentication = async () => {
    //The credentials for the google API
    const auth = new google.auth.GoogleAuth({
        keyFile: "src/credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })
    //The client for the google API, waiting for the authentication to get the credentials
    const client = await auth.getClient();
    //The google API
    const googleAPI = google.sheets({
        version: "v4",
        auth: client
    });
    //Returning the google API
    return { googleAPI };
}

//Sheets ID
const id = "1WyTjyGrxWOyzYaWiOUkYICdnMXZvJJAZgS5P5tUd6dk";

//The function that will be called to add the data to the google sheet
app.get("/api", async (request, res1) => {
    try {
        //Waiting for the authentication to get the credentials
        const { googleAPI } = await authentication();

        //The data that will be added to the google sheet
        const response = await googleAPI.spreadsheets.values.append({
            spreadsheetId: id,
            range: "Sheet1!A1:F1",
        });
        res1.send({ status: "ok" });
        //If there is an error, it will be logged in the console
    } catch (error) {
        console.log(error);
        res1.status(500).send(error.message);
    }
});


//Sending data to the sheet
app.post("/api", async (request, response1) => {
    try {
        //destructure 'newName' and 'newValue' from request.body
        const { Name, Team, Category, Pass, Score, Type, Abbreviated } = request.body;

        let UnStrTime = new Date();
        let Time = UnStrTime.toLocaleString("en-US", {
            timeZone: "America/Los_Angeles"
        })

        const { googleAPI } = await authentication();
        //add the new name and value to the sheet
        const response = await googleAPI.spreadsheets.values.append({
            spreadsheetId: id,
            range: "Sheet1!A1:F1",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [Name, Team, Category, Pass, Score, Type, Abbreviated, Time]
                ]
            }
        });

        response1.send({ status: response.status });

    } catch (error) {
        console.log(error, "There was an error updating the spreadsheet", error.message);
        response1.status(500).send();
    }
});
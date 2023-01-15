//Packages
const express = require('express');

//Accessing the library/module for usage
const app = express();
//Google API
const { google } = require('googleapis');

//Server
const port = process.env.PORT || 3000;
//File System
const fs = require("fs");

//Port hosted on, as well as logging the status of the server, if it is running or not
app.listen(port, () => console.log('Server started on port ' + port));
console.log("Listening..")

app.use(express.static('public'));

//Limiting the size of json data (1mb) and parsing JSON data
app.use(express.json({ limit: '5mb' }));

let settingsOut;
let folderSplit = "\r\n" || "\n";
let tempURL;

//POST Request for settings
app.post("/settings", async (request, response) => {
    try {
        const url = JSON.stringify(request.body);

        tempURL = url.split(",")[0].split(":")[1].split('"')[1];

        //Reading the settings file
        fs.readFile('public' + tempURL + '/settings.yml', "utf8", (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            //Splitting the settings into an array
            const settings = data.split(folderSplit);
            const settingsMain = settings.map(setting => setting.split(": ")[1]);

            //Set the settings to the global variable
            settingsOut = settingsMain;
            response.send(settingsMain);
        });
    } catch (err) {
        console.log(err);
    }
});

//Response from await function in client
app.get("/settings", async (request, response) => {
    try {
        response.send(settingsOut);
    } catch (err) {
        console.log(err);
    }
});

app.get("/folderdata", async (request, response) => {
    try {
        let folderData = [];
        //The folder path
        const folderPath = "public/Tests";

        //Getting the folders in the folder
        const files = await new Promise((resolve, reject) => {
            fs.readdir(folderPath, (err, files) => {
                if (err) {
                    reject(err);
                }
                resolve(files);
            });
        });

        for (const file of files) {
            //If the file is a folder
            if (fs.lstatSync(folderPath + "/" + file).isDirectory()) {
                //Add the folder to the array
                let filePath = folderPath + "/" + file;
                const subFiles = await new Promise((resolve, reject) => {
                    fs.readdir(filePath, (err, subFiles) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(subFiles);
                    });
                });

                //Checks for the files in the folder
                let setinclude = false;
                let txtinclude = false;
                let htmlinclude = false;

                let typeoftxt = "";

                if (fs.existsSync(filePath + "/settings.yml")) {
                    typeoftxt = fs.readFileSync(filePath + "/" + subFiles[0], "utf8").split(folderSplit)[6].split(": ")[1];
                    setinclude = true;
                }

                if (fs.existsSync(filePath + "/" + subFiles[0])) {
                    txtinclude = true;
                }

                if (fs.existsSync(filePath + "/index.html")) {
                    htmlinclude = true;
                }

                console.log("setinclude: " + setinclude + " txtinclude: " + txtinclude + " htmlinclude: " + htmlinclude)

                //If the folder has all the files, add it to the array
                if (setinclude == true && txtinclude == true && htmlinclude == true) {
                    //If the folder is not hidden, add it to the array
                    if (!file.includes("#", 0) || !fs.readFileSync(filePath + "/" + subFiles[0], "utf8").split(folderSplit)[7].split(": ")[1] == "false") {
                        folderData.push(file);
                        //If the folder is the safety test, remove it from the array
                        if (folderData.includes("Safety-Test")) {
                            folderData.splice(folderData.indexOf("Safety-Test"), 1);
                        }
                    //If the folder is hidden, log it to the console
                    } else if (file.includes("#", 0)) {
                        console.log("Folder " + file + " is a hidden folder and will not be shown. If this is in error, please remove the # from the start of the folder name.");
                    }
                //If the folder is missing a file, log it to the console
                } else if (setinclude == false || txtinclude == false || htmlinclude == false) {
                    if (typeoftxt == undefined) {
                    } else {
                        console.log("Folder " + file + " is missing a file and will not be shown. It is missing file(s): " + (setinclude == false ? "settings.yml, " : "") + (txtinclude == false ? "Missing Answers File" + ", " : "") + (htmlinclude == false ? "index.html, " : ""));
                    }
                }
            }
        }

        if (folderData.includes("Safety-Test")) {
            folderData.splice(folderData.indexOf("Safety-Test"), 1);
        }
        //Send the folder data to the client
        response.send(folderData);

    } catch (err) {
        console.log(err);
    }
});

//POST Request for questions
app.post("/questions", async (request, response) => {
    try {
        //Getting the questions from the file
        const questions = await fs.promises.readFile("public" + tempURL + "/" + settingsOut[6], "utf8");

        //Splitting the questions
        const questionList = questions.split(":").slice(1);

        //Data to be sent to the client
        const data = { PossibleQuestions: [] };

        for (let i = 0; i < questionList.length; i++) {

            //Splitting the question and answers
            const [question, ...answers] = questionList[i].split(folderSplit);
            //If the question has a # at the start, skip it
            if (question.startsWith("#")) {
                continue;
            }
            const questionData = {
                id: `Q${i + 1}`,
                Question: question,
                Answers: []
            };

            for (let j = 0; j < answers.length; j++) {
                if (answers[j].startsWith("#")) {
                    continue;
                }
                
                //If the answer has a + at the start, it is correct
                const isCorrect = /\+/.test(answers[j]) ? true : false;

                //Answers variables
                const answer = answers[j].split(/[+-]/)[1];
                
                //If the answer is empty, skip it
                if (answer === "" || answer === "undefined" || answer === undefined || answer === null) {
                    continue;
                }

                //Push the answer to the question
                questionData.Answers.push({
                    id: `Q${i + 1}_a${j + 1}`,
                    Answer: answer,
                    IsCorrect: isCorrect
                });
            }

            data.PossibleQuestions.push(questionData);
        }
        response.send(JSON.stringify(data));
    } catch (err) {
        console.log(err);
        response.status(500).send("Error occured while processing the data");
    }
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
        const { Name, Team, Category, Pass, Score, Type } = request.body;

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
                    [Name, Team, Category, Pass, Score, Type, Time]
                ]
            }
        });

        response1.send({ status: response.status });

    } catch (error) {
        console.log(error, "There was an error updating the spreadsheet", error.message);
        response1.status(500).send();
    }
});
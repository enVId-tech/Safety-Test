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
let folderSplit = "\n";

app.post("/settings", async (request, response) => {
    try {
        const url = JSON.stringify(request.body);

        let tempURL = url.split(",")[0].split(":")[1].split('"')[1];

        fs.readFile('public' + tempURL + '/settings.yml', "utf8", (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            const settings = data.split(folderSplit);
            const settingsMain = settings.map(setting => setting.split(": ")[1]);

            settingsOut = settingsMain;
            response.send(settingsMain);
        });
    } catch (err) {
        console.log(err);
    }
});

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
                if (setinclude == true && txtinclude == true && htmlinclude == true) {
                    if (!file.includes("#", 0) || !fs.readFileSync(filePath + "/" + subFiles[0], "utf8").split(folderSplit)[7].split(": ")[1] == "false") {
                        folderData.push(file);
                        if (folderData.includes("Safety-Test")) {
                            folderData.splice(folderData.indexOf("Safety-Test"), 1);
                        }
                    } else if (file.includes("#", 0)) {
                        console.log("Folder " + file + " is a hidden folder and will not be shown. If this is in error, please remove the # from the start of the folder name.");
                    }
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
        //console.log(folderData);
        response.send(folderData);

    } catch (err) {
        console.log(err);
    }
});


app.post("/questions", async (request, response) => {
    //console.log("Questions requested: " + request.body);
    try {

        const tempURL = JSON.stringify(request.body);
        //console.log(tempURL);

        const url = tempURL.split(",")[0].split(":")[1].split('"')[1];


        let datajson = {};
        datajson.PossibleQuestions = [];

        //console.log("public" + url + "/" + settingsOut[6]);
        fs.readFile("public" + url + "/" + settingsOut[6], "utf8", async (err, data2) => {
            //console.log(data2);

            const tempQuestions = data2.toString();
            //If there is a toString error, there is mostly an issue with the file path or the async function

            //For loop for sending each question to the variable
            for (let i = 0; i < tempQuestions.split("Question ").length - 1; i++) {
                let data1 = {
                    "id": "Q" + (i + 1),
                    "Question": tempQuestions.split("Question ")[i + 1].split(folderSplit)[0].split(": ")[1],
                    "Answers": []
                }
                //console.log(datajson.PossibleQuestions);

                //if (tempQuestions.split("Question ")[i + 1].split(folderSplit)[0].includes("#")) {
                //data1.Question = undefined;
                //console.log("Question " + (i + 1) + " is a hidden question and will not be shown");
                //} else if (!tempQuestions.split("Question ")[i + 1].split(folderSplit)[0].includes("#")){
                //Send data to the variable
                datajson.PossibleQuestions.push(data1);


                let Answers = tempQuestions.split("Question ")[i + 1].split(": ")[1].split(folderSplit);
                Answers.shift();
                //console.log(Answers);
                let AnswersData = [];


                let removeAmount = 0;
                if (Answers[Answers.length - 1] == "") {
                    Answers.pop();
                    removeAmount++;
                }

                for (let j = 0; j < Answers.length - removeAmount; j++) {
                    let bool = false;
                    if (Answers[j].includes("+")) {
                        bool = true;
                        Answers[j] = Answers[j].split("+")[1];
                    } else if (Answers[j].includes("-")) {
                        bool = false;
                        Answers[j] = Answers[j].split("-")[1];
                    }

                    AnswersData.push({
                        "id": "Q" + (i + 1) + "_a" + (j + 1),
                        "Answer": Answers[j],
                        "IsCorrect": bool
                    });

                    //console.log(data1.Answers + " --data1.answers");
                }
                //console.log(JSON.stringify(AnswersData) + " --AnswersData");
                data1.Answers = AnswersData;
                //console.log(JSON.stringify(data1) + " --data1.answers");
                //} else {

                //}
                if (response.statusCode == 200) {
                    //console.log("Questions sent to client");
                } else {
                    console.log(err)
                }
            }

            //for (let i=0; i<Answers.length; i++) {

            //}
            //console.log(JSON.stringify(datajson) + " --datajson");

            //console.log(datajson)
            response.send(JSON.stringify(datajson));
        });

    } catch (err) {
        console.log(err);
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

        //Checks the current status of the server and sends a success/fail response
        response1.send({ status: response.status });
        /*
        if (response1.status === 200) {
            
        } else {
            return response1.status(500).send("Error writing to sheet");
        }*/

    } catch (error) {
        console.log(error, "There was an error updating the spreadsheet", error.message);
        response1.status(500).send();
    }
});
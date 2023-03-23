/*
LICENSED UNDER THE MIT LICENSE
Erick Tran
Language: Javascript
Current FRC 4079 Team Member and Cabinet Member/Use the README.md file for more information :)
Array Counts
*/

//Global Variables
const br = document.createElement("br"); //Creates a break (global)
let PossibleQuestions = new Array(); //Array of questions
let url; //URL for the test getting from localstorage
let Score = 0; //Score
let questiondata; //Global variable for the question data
let Pass = false; //Pass or fail
let answerhistory = new Array(); //Array for the answers
let answernum = [];

//Settings
let possibleSettings;


//Fetching data from server function
async function getContents() {
    //URL
    let urlData = [
        { url }
    ];

    //Sends a post request
    let urlSend = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(urlData)
    };

    //Fetches the data from the server
    await fetch('/settings', urlSend)
        .then(response => response.text())
        .then(data => {
            possibleSettings = JSON.parse(data);

            GeneralSettings();
        });
}

//Checks if testPath exists, else defaults to safety test
if (localStorage.getItem("testPath")) {
    url = localStorage.getItem("testPath");
    getContents();
} else {
    url = "/Tests/Safety-Test";
    getContents();
}


//SETTINGS FUNCTIONS
async function GeneralSettings() {

    /* Structure:
    function a(){
        //Put in code here
    }
    if (possibleSettings[##] == "true") {
        a();
    } else if (possibleSettings[##] == "false") {
        //Do nothing
    }
    */

    //Waits for the settings to load

    //Checks if user is on home page
    if (window.location.pathname == "/") {
        //Do nothing
    } else {
        //Team Selection
        function TeamChoose() {
            //Main Span Tag
            const main = document.getElementById("RoboticsSelection");

            //Team Div Selection
            const team = document.createElement("div");
            team.id = "TeamChoose";
            main.appendChild(team);

            //Question
            const teamh1 = document.createElement("h1");
            teamh1.innerHTML = "What team are you on?";
            teamh1.style = "font-size:x-large;letter-spacing:2px;";
            team.appendChild(teamh1);

            //Spacing
            team.appendChild(br);
            team.appendChild(br);

            //FRC Button
            const FRCbutton = document.createElement("button");
            FRCbutton.innerHTML = "FRC";
            FRCbutton.onclick = FRC;
            FRCbutton.id = "FRC";
            team.appendChild(FRCbutton);

            //FTC Button
            const FTCButton = document.createElement("button");
            FTCButton.innerHTML = "FTC";
            FTCButton.onclick = FTC;
            FTCButton.id = "FTC";
            team.appendChild(FTCButton);

            //Spacing
            team.appendChild(br);
            team.appendChild(br);
        }



        //Category Selection
        function CategoryChoose() {
            //Main Span Tag
            const main = document.getElementById("RoboticsSelection");

            //Category Div Selection
            const category = document.createElement("div");
            category.id = "PathChoose";
            main.appendChild(category);

            //Question
            const categoryh1 = document.createElement("h1");
            categoryh1.innerHTML = "What category are you in?";
            categoryh1.style = "font-size:x-large;letter-spacing:2px;";
            category.appendChild(categoryh1);

            //Spacing
            category.appendChild(br);
            category.appendChild(br);

            //Mechanical Button
            const MechanicalButton = document.createElement("button");
            MechanicalButton.innerHTML = "Mechanical";
            MechanicalButton.onclick = Mechanical;
            MechanicalButton.id = "Mechanical";
            category.appendChild(MechanicalButton);

            //Electrical Button
            const ElectricalButton = document.createElement("button");
            ElectricalButton.innerHTML = "Electrical";
            ElectricalButton.onclick = Electrical;
            ElectricalButton.id = "Electrical";
            category.appendChild(ElectricalButton);

            //Software Button
            const SoftwareButton = document.createElement("button");
            SoftwareButton.innerHTML = "Software";
            SoftwareButton.onclick = Software;
            SoftwareButton.id = "Software";
            category.appendChild(SoftwareButton);

            //Leadership Button
            const LeadershipButton = document.createElement("button");
            LeadershipButton.innerHTML = "Leadership";
            LeadershipButton.onclick = Leadership;
            LeadershipButton.id = "Leadership";
            category.appendChild(LeadershipButton);

            //Spacing
            category.appendChild(br);
            category.appendChild(br);
        }

        //Links for guidance
        function SafetyLinks() {
            //Safety Links
            const safety = document.getElementById("SafetyLinks");

            let link1 = document.createElement("a");
            link1.href = "https://docs.google.com/presentation/d/1fQ98hhuO8KD8b8ZOy71ZRj2cuW5fbBJ8/edit#slide=id.p1";
            link1.target = "_blank";
            link1.style = "color:rgba(29,185,202,0.75); font-family:Arial,Helvetica,sans-serif;";
            safety.appendChild(link1);

            //Inner text for the first link
            let link1h1 = document.createElement("h1");
            link1h1.innerHTML = "Click here to view the safety presentation";
            link1h1.style = "font-size:x-large; letter-spacing:2px;";
            link1.appendChild(link1h1);

            //Spacing
            safety.appendChild(br);
            safety.appendChild(br);
            safety.appendChild(br);

            //Second link
            let link2 = document.createElement("a");
            link2.href = "https://docs.google.com/document/d/10V0XJ5hpwAzRJV55c4fkTmZtw_brwUsQKo5n-rWnwog/edit?usp=sharing";
            link2.target = "_blank";
            link2.style = "color:rgba(29,185,202,0.75); font-family:Arial,Helvetica,sans-serif;";
            safety.appendChild(link2);

            //Inner text for the second link
            let link2h1 = document.createElement("h1");
            link2h1.innerHTML = "If you need help with choosing categories, click here.";
            link2h1.style = "font-size:x-large; letter-spacing:2px;";
            link2.appendChild(link2h1);
        }

        //Set category
        function CategorySet() {
            //Set the localStorage category (this requires Category Choose to be false)
            localStorage.setItem("Category", possibleSettings[10]);
        }

        //Accessibility function
        function Accessable() {
            window.location = "/";
        }

        //Username check function
        function RequireUsername() {
            if (!localStorage.getItem("username")) {
                window.location = "/";
            } else {
                //Do nothing
                return;
            }
        }

        //Checks team setting in settings.yml
        if (possibleSettings[4] == "true") {
            TeamChoose();
        } else if (possibleSettings[4] == "false") {
            if (document.getElementById("TeamChoose")) {
                document.getElementById("TeamChoose").remove();
            }
        }

        //Checks category setting in settings.yml
        if (possibleSettings[5] == "true") {
            CategoryChoose();
        } else if (possibleSettings[5] == "false") {
            if (document.getElementById("PathChoose")) {
                document.getElementById("PathChoose").remove();
            }
        }

        //Checks accessable setting in settings.yml
        if (possibleSettings[7] == "false") {
            Accessable();
        }


        //Checks safety links setting in settings.yml
        if (possibleSettings[8] == "true") {
            SafetyLinks();
        } else if (possibleSettings[8] == "false") {
            if (document.getElementById("SafetyLinks")) {
                document.getElementById("SafetyLinks").remove();
            }
        }

        //Checks username setting in settings.yml
        if (possibleSettings[9] == "true") {
            RequireUsername();
        }

        //Forced category setting
        if (possibleSettings[11] == "true") {
            CategorySet();
        } else if (possibleSettings[11] == "false") {
            if (localStorage.getItem("Category")) {
                localStorage.removeItem("Category");
            }
        }

    }

    //Place any universal page functions here
    function TypeofTest() {
        //Type of test at the top
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i)) {
            document.getElementById("TitleBar").innerHTML = "OA Robotics " + possibleSettings[10] + " Test";
        } else {
            document.getElementById("TitleBar").innerHTML = "OA Robotics: " + possibleSettings[10] + " Test";
        }


        document.getElementById("TopName").innerHTML = "Robotics " + possibleSettings[10] + " Test";
        //document.getElementById("myRange").max = possibleSettings[2] - 1;

        //Use this variable to determine if the browser is compatible with the test
        let browserName = (function(agent) {
            switch (true) {
                case agent.indexOf("edge") > -1:
                    return "MS Edge";
                case agent.indexOf("edg/") > -1:
                    return "Chromium (Edge)";
                case agent.indexOf("opr") > -1 && !!window.opr:
                    alert("Opera may not function properly with this test. Please use a different browser for a better experience.");
                    return "Opera";
                case agent.indexOf("chrome") > -1 && !!window.chrome:
                    return "Chrome";
                case agent.indexOf("trident") > -1:
                    alert("Internet Explorer may not function properly with this test. Please use a different browser for a better experience.");
                    return "Internet Explorer";
                case agent.indexOf("firefox") > -1:
                    return "Mozilla Firefox";
                case agent.indexOf("safari") > -1:
                    return "Safari";
                default:
                    alert("Your browser may not function properly with this test. Please use a different browser for a better experience.")
                    return "other";
            }
        })
        return browserName;
    }
    //Checks type of test setting in settings.yml
    TypeofTest();
}



//Pass values to Google Sheets

async function PassValues() {

    let NameLocal = localStorage.getItem("username");
    let TeamLocal = localStorage.getItem("Team");
    let CategoryLocal = localStorage.getItem("Category");
    let TypeofTestLocal = localStorage.getItem("Test") + " Test";
    let AbbreviatedLocal = localStorage.getItem("Abbreviated");

    //Checks if some of the values are null
    if (localStorage.getItem("username") == null) {
        NameLocal = "No Name";
    }
    if (localStorage.getItem("Team") == null) {
        TeamLocal = "No Team Chosen/General OA Robotics";
    }
    if (localStorage.getItem("Category") == null) {
        CategoryLocal = "No Division Chosen";
    }

    //Data to send
    let data = {
        "Name": NameLocal,
        "Team": TeamLocal,
        "Category": CategoryLocal,
        "Pass": Pass,
        "Score": Score,
        "Type": TypeofTestLocal,
        "Abbreviated": AbbreviatedLocal
    };


    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const reponse = await fetch("/api", options);
    return reponse;
}



//Sets team and category
//FRC Function
function FRC() {
    if (document.getElementById("h1team")) {
        document.getElementById("h1team").remove();
    }
    const a = document.getElementById("TeamChoose");
    let h1team = document.createElement("h1");
    h1team.id = "h1team";
    h1team.innerHTML = "You have chosen FRC as your team";
    h1team.style = "font-family:Arial,Helvetica,sans-serif";
    a.appendChild(h1team);
    localStorage.setItem("Team", "FRC");
}

//FTC Function  
function FTC() {
    if (document.getElementById("h1team")) {
        document.getElementById("h1team").remove();
    }
    const a = document.getElementById("TeamChoose");
    let h1team = document.createElement("h1");
    h1team.id = "h1team";
    h1team.innerHTML = "You have chosen FTC as your team";
    h1team.style = "font-family:Arial,Helvetica,sans-serif";
    a.appendChild(h1team);
    localStorage.setItem("Team", "FTC");
}

//Mechanical Function
function Mechanical() {
    if (document.getElementById("h1category")) {
        document.getElementById("h1category").remove();
    }
    const a = document.getElementById("PathChoose");
    let h1mechanical = document.createElement("h1");
    h1mechanical.id = "h1category";
    h1mechanical.innerHTML = "You have chosen Mechanical as your category";
    h1mechanical.style = "font-family:Arial,Helvetica,sans-serif";
    a.appendChild(h1mechanical);
    localStorage.setItem("Category", "Mechanical");
}

//Electrical Function
function Electrical() {
    if (document.getElementById("h1category")) {
        document.getElementById("h1category").remove();
    }
    const a = document.getElementById("PathChoose");
    let h1electrical = document.createElement("h1");
    h1electrical.id = "h1category";
    h1electrical.innerHTML = "You have chosen Electrical as your category";
    h1electrical.style = "font-family:Arial,Helvetica,sans-serif";
    a.appendChild(h1electrical);
    localStorage.setItem("Category", "Electrical");
}

//Software Function
function Software() {
    if (document.getElementById("h1category")) {
        document.getElementById("h1category").remove();
    }
    const a = document.getElementById("PathChoose");
    let h1software = document.createElement("h1");
    h1software.id = "h1category";
    h1software.innerHTML = "You have chosen Software as your category";
    h1software.style = "font-family:Arial,Helvetica,sans-serif";
    a.appendChild(h1software);
    localStorage.setItem("Category", "Software");
}

//Leadership Function
function Leadership() {
    if (document.getElementById("h1category")) {
        document.getElementById("h1category").remove();
    }
    const a = document.getElementById("PathChoose");
    let h1leadership = document.createElement("h1");
    h1leadership.id = "h1category";
    h1leadership.innerHTML = "You have chosen Leadership as your category";
    h1leadership.style = "font-family:Arial,Helvetica,sans-serif";
    a.appendChild(h1leadership);
    localStorage.setItem("Category", "Leadership");
}

//Question Creation Function
async function QuestionCreate() {

    //Random Questions Function
    function QuestionRan(array) {
        let currentIndex = array.length,
            randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }

        return array;
    }


    await fetch("/settings");

    async function possibleQuestionsGet() {
        //URL
        let urlData = [
            { url }
        ];

        //Sends a post request
        let urlSend = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(urlData)
        };

        //Fetches the data from the server
        await fetch("/questions", urlSend)
            .then(response => response.json())
            .then(data => {
                questiondata = data.PossibleQuestions;


                //Splits the data into an array
                for (let i = 0; i < questiondata.length; i++) {
                    if (questiondata[i].id == ("Q" + (i + 1))) {
                        PossibleQuestions[i] = questiondata[i].Question;
                    } else {
                        //If the question is not in the correct format or is missing, it will be skipped and the user will be notified
                        window.alert("Question " + (i + 1) + " is not in the correct format or is missing. Reloading...");
                        location.reload();
                    }
                }
                //Randomizes questions, then creates the questions

                QuestionRan(PossibleQuestions);
                asyncisannoying();

            });

    }

    //Wait for data to be fetched

    localStorage.setItem("Test", possibleSettings[10]);

    if (document.getElementsByClassName("navbar1")) {
        let year = 2022;
        let thisyear = year - 2000;
        let nextyear = year - 1999;
        let typeofcompendium = localStorage.getItem("Test").toLowerCase();

        document.getElementById("Compendium1").innerHTML = "A " + typeofcompendium + " compendium for the " + thisyear + "-" + nextyear + " school year";
    }

    const AddQuestions = document.getElementById("Questions1");

    //for loop to create questions answers
    async function asyncisannoying() {

        let QuestionArrayAt = 0;

        for (let i = 0; i < possibleSettings[2]; i++) {

            const divid = "Question_" + i + 1;

            //Creates a new div for each question
            let AddQuestionsDiv = document.createElement("div");
            AddQuestionsDiv.className = "form-group col-lg-4 col-md-3 col-sm-4 col-xs-1 q_div";
            AddQuestionsDiv.id = divid;

            AddQuestions.appendChild(AddQuestionsDiv);


            //Get the id from "AddQuestionsDiv1"
            let AddQuestionsDiv1 = document.getElementById(AddQuestionsDiv.id);

            //Spacing
            AddQuestions.appendChild(br);
            AddQuestions.appendChild(br);

            let H1Num = document.createElement("h1");
            H1Num.innerHTML = i + 1 + ". " + PossibleQuestions[i + 1];
            H1Num.style = "color: black; font-size: 20px; font-weight: 300; text-align: left;";
            AddQuestionsDiv1.appendChild(H1Num);


            //Creates a new spacing for each question
            AddQuestionsDiv1.appendChild(br);

            //Resets the array before each loop
            answernum = [];

            //Runs a for loop to create the answer choices
            for (let k = 0; k < possibleSettings[3]; k++) {

                answernum.push(Math.floor(Math.random() * Object.keys(questiondata.find(x => x.Question === PossibleQuestions[i + 1]).Answers).length));
            }



            //Making sure of no repeats each question

            //If false, there will be times where there are no answers
            //if (possibleSettings[12] == "false") {
            while (answernum.some((e, i, arr) => arr.indexOf(e) !== i)) {
                answernum = [];
                for (let k = 0; k < possibleSettings[3]; k++) {
                    answernum.push(Math.floor(Math.random() * Object.keys(questiondata.find(x => x.Question === PossibleQuestions[i + 1]).Answers).length));

                    //answernum.push(Math.floor(Math.random() * Object.keys(questiondata.find(x => x.Question === PossibleQuestions[i + 1]).Answers).length));
                }
            }


            for (let l = 0; l < possibleSettings[3]; l++) {
                answerhistory.push(answernum[l]);
            }

            //Adding value of answers to array

            //Inputs
            for (let j = 0; j < possibleSettings[3]; j++) {
                //Creates a new span for each answer

                let AddSpan = document.createElement("span");
                AddSpan.id = "Answer_" + QuestionArrayAt + "_" + j;

                AddQuestionsDiv1.appendChild(AddSpan);

                AddSpanId = document.getElementById(AddSpan.id);

                //Creates a new label for each answer
                let AddLabel = document.createElement("label");
                AddLabel.id = "Label_" + QuestionArrayAt + "_" + j;
                AddLabel.className = "form-check-label";
                AddLabel.for = "PQ" + QuestionArrayAt + "_" + j;
                AddLabel.style = "color: black; font-weight: 300; text-align: center;";
                AddSpanId.appendChild(AddLabel);

                //Checkboxes
                let Checkboxes = document.createElement('input');
                Checkboxes.id = "AnsInp" + QuestionArrayAt + "_" + j;
                Checkboxes.type = "checkbox";
                Checkboxes.style = "float: left;";
                Checkboxes.value = "yes";

                AddLabel.appendChild(Checkboxes);

                let h1a = document.createElement("h1");
                if (questiondata.find(x => x.Question === PossibleQuestions[i + 1]).Answers[answernum[j]]) {
                    h1a.id = questiondata.find(x => x.Question === PossibleQuestions[i + 1]).Answers[answernum[j]].id;
                    //For Answers[]: Answers[Math.floor(Math.random()*answerslength)]
                    h1a.innerHTML = questiondata.find(x => x.Question === PossibleQuestions[i + 1]).Answers[answernum[j]].Answer;
                    h1a.style = "color:black;"
                    AddLabel.appendChild(h1a);
                } else {
                    h1a.id = "NoQId";
                    h1a.innerHTML = "No Question Response Available";
                    h1a.style = "color:black;"
                    AddLabel.appendChild(h1a);
                }


                Checkboxesid = Checkboxes.id;

                //Input Labels

            }
            QuestionArrayAt = QuestionArrayAt + 1;
        }

        //The div that holds the submit button
        const SubmitDiv = document.getElementById("SubmitDiv1");

        //Creates a submit button
        let SubmitButton = document.createElement("button");
        SubmitButton.id = "Submit";
        SubmitButton.type = "submit";
        SubmitButton.onmousedown = QuestionCor;
        SubmitButton.textContent = "Submit";
        SubmitButton.className = "btn btn-primary";
        SubmitDiv.appendChild(SubmitButton);

        //The div the holds the clear button
        const ClearDiv = document.getElementById("ClearDiv1");

        //Creats a clear button
        let ClearButton = document.createElement("button");
        ClearButton.id = "Clear";
        ClearButton.onmousedown = Clear;
        ClearButton.textContent = "Clear";
        ClearButton.className = "btn btn-primary";
        ClearDiv.appendChild(ClearButton);
    }
    possibleQuestionsGet();
}

//Clear all inputs

function Clear() {
    document.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);
}


//Calculating the total score
function QuestionCor() {
    const AddQuestions = document.getElementById("Questions1");

    //The answer number to access
    let ansHistoryNum = 0;

    //Resets the score for each time the function is called, do not remove
    Score = 0;

    //Checks if the answer is correct
    for (let Q = 0; Q < possibleSettings[2]; Q++) {
        for (let a = 0; a < possibleSettings[3]; a++) {
            const checkanschecked = document.getElementById("AnsInp" + Q + "_" + a);
            //Checks if the answer is correct
            const IsCor = questiondata.find(x => x.Question == PossibleQuestions[Q + 1]).Answers[answerhistory[ansHistoryNum]].IsCorrect;
            ansHistoryNum++;
            //If the answer is correct
            if (checkanschecked.checked == IsCor) {
                Score += Math.round(100 / possibleSettings[3]);
                //If the answer is incorrect, do nothing
            } else if (checkanschecked.checked != IsCor) {
                Score = Score;
                //If a score cannot be calculated, do nothing
            } else {
                console.log("A possible score could not be determined");
            }
        }
    }

    //Replaces the scoreboard
    if (document.getElementById("scoringdiv")) {
        document.getElementById("scoringdiv").remove();
    }

    switch (true) {
        case (Score / 100) > possibleSettings[2]:
            Score = possibleSettings[2];
            break;
        default:
            Score /= 100;
            break;
    }


    //Username
    let user = localStorage.getItem("username");

    //Score Div
    let scorediv = document.createElement("div");
    scorediv.id = "scoringdiv";
    scorediv.style = "font-size: 20px; color: white; text-align: center; margin-top: 20px;";
    AddQuestions.appendChild(scorediv);
    const scoredivid = document.getElementById(scorediv.id);

    //Username in Test
    const name = document.createElement("h1");
    name.style = "font-size: 40px; color: black; text-align: center; position: relative; top: 2%;"
    name.innerHTML = user + "'s Score is:";
    scoredivid.appendChild(name);

    //Score H1
    const scoreh1 = document.createElement("h1");
    scoreh1.id = "scoreh1";
    scoreh1.innerHTML = "Score: " + Score + " / " + possibleSettings[2];
    scoreh1.style = "font-size: 65px; color: black; text-align: center; position: absolute; top: 10%; left: 5%; @media (max-width: 719px) {font-size: 40px;}";
    scoredivid.appendChild(scoreh1);

    //Spacing
    scoredivid.appendChild(br);

    //Pass or Fail H1
    const didpass = document.createElement("h1");
    didpass.style = "font-size: 25px; color: black; text-align: center; position: absolute; top: 60%; left: 15%;"

    //Spacing
    scoredivid.appendChild(br);
    scoredivid.appendChild(br);

    //Checks if score is equal to possible settings passing rating and sets the status of passing
    if (Score == possibleSettings[2]) {
        Pass = true;
        didpass.innerHTML = "You Passed!      Date of Test: " + Date();
        scoredivid.appendChild(didpass);
        PassValues();

        localStorage.removeItem("Team");
        localStorage.removeItem("Category");
        localStorage.removeItem("username");
        document.getElementById("Clear").remove();
        document.getElementById("Submit").remove();
    } else {
        Pass = false;
        didpass.innerHTML = "You did not pass, please try again.       Date of Test: " + Date();
        scoredivid.appendChild(didpass);
        PassValues();
    }

}
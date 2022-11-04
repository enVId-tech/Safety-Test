//LICENSED UNDER THE MIT LICENSE
//Erick Tran
//Language: Javascript
//Current FRC 4079 Team Member and Cabinet Member
//Use the README.md file for more information :)

//Array Counts

let PossibleQuestionsCount = 16;

let PossibleQuestions = new Array();
let answer = new Array();
let anschoices = 4;

let lng = [];

//Answers to each question held

let Pass = false;



//Pass values to Google Sheets
window.addEventListener("load", function() {
    const form = document.getElementById('QForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
      
    //Data to send
    let data = new FormData();
    let dateLocal = new Date();
    let NameLocal = localStorage.getItem("username");
    let TeamLocal = localStorage.getItem("Team");
    let CategoryLocal = localStorage.getItem("Category");

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

    //Sends data to Google Sheets
    if((data.get('Name') == localStorage.getItem("username")) && (data.get('Team') == localStorage.getItem("Team")) && (data.get('Category') == localStorage.getItem("Category"))){
        data.set("Name", NameLocal);
        data.set("Team", TeamLocal);
        data.set("Category", CategoryLocal);
        data.set("Pass", Pass);
        data.set("Score", Score);
        data.set("Time", dateLocal);
        const action = e.target.action;

        fetch(action, {
            method: 'POST',
            body: data,
        })
    } else {

        data.append("Name", NameLocal);
        data.append("Team", TeamLocal);
        data.append("Category", CategoryLocal);
        data.append("Pass", Pass);
        data.append("Score", Score);
        data.append("Time", dateLocal);
        const action = e.target.action;

      
        //Fetch
        fetch(action, {
            method: 'POST',
            body: data,
        })

        }
    });
  });
let Score = 0;



//Save Username in index.html
function saveUser() {
    
    let usernameinput = document.getElementById("user").value;

    //Returns error if box is empty
    if(usernameinput == ""){
        document.getElementById("MainHeadingBox").innerHTML = "Please enter a valid username";
        setTimeout(function(){
            document.getElementById("MainHeadingBox").innerHTML = "Enter First and Last Names in Input Box";
        }, 3000);

        //Checks if the username contains a space
    }else if(usernameinput.includes(" ") == false) {
        document.getElementById("MainHeadingBox").innerHTML = "You must input both your first and last names in the box";
        setTimeout(function(){
            document.getElementById("MainHeadingBox").innerHTML = "Enter First and Last Names in Input Box";
        }, 3000);

        //If the username is valid
    }else{
    //Saves user in local storage for test firebase
    username = document.getElementById("user").value;
    localStorage.setItem("username", username);
    window.location = "SafetyTest.html";
    }
}


let LNGNum = 0;
//Calculating the total score
function QuestionCor() {
    const AddQuestions = document.getElementById("Questions1");
    Score = 0;

    //Checks if the answer is correct
    for(let Q = 0; Q < PossibleQuestionsCount; Q++){
        for(var a = 0; a < anschoices; a++) {
                var checkanschecked = document.getElementById("AnsInp"+Q+"_"+a);
                var IsCor = datavar.find(x => x.Question == PossibleQuestions[Q + 1]).Answers[lng[LNGNum]].IsCorrect;
                LNGNum++;
                if(checkanschecked.checked == IsCor){
                        Score = Score + 0.25;
                    }else if(checkanschecked.checked != IsCor){
                        Score = Score;
                    } else {
                        console.log("A possible score could not be determined");
                    }
                }
            }

    //Replaces the scoreboard
    if (document.getElementById("scoringdiv")) {
        document.getElementById("scoringdiv").remove();
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
    scoreh1.innerHTML = "Score: " + Score;
    scoreh1.style = "font-size: 80px; color: black; text-align: center; position: absolute; top: 10%; left: 5%; @media (max-width: 719px) {font-size: 40px;}";
    scoredivid.appendChild(scoreh1);

    //Brs
    const br = document.createElement("br");
    scoredivid.appendChild(br);

    //Pass or Fail H1
    const didpass = document.createElement("h1");
    didpass.style = "font-size: 25px; color: black; text-align: center; position: absolute; top: 60%; left: 15%;"
    
    //Brs
    const br2 = document.createElement("br");
    scoredivid.appendChild(br2);

    const br3 = document.createElement("br");
    scoredivid.appendChild(br3);

    const h12 = document.createElement("h1");
    h12.innerHTML = "Known bug: You have to press the submit button twice to submit your score.";
    h12.style = "font-size: 15px; color: black; text-align: center; position: absolute; top: 80%; left: 5%;"
    scoredivid.appendChild(h12);
    LNGNum = 0;
    if (Score == PossibleQuestionsCount) {
        Pass = true;
        didpass.innerHTML = "You Passed!";
        scoredivid.appendChild(didpass);
    } else {
        Pass = false;
        didpass.innerHTML = "You did not pass, please try again.";
        scoredivid.appendChild(didpass);
    }

}

//Clear all inputs
function Clear() {
    document.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);
}

//Sets team and category
    //FRC Function
    function FRC(){
        if(document.getElementById("h1team")){
            document.getElementById("h1team").remove();
        }
            const a=document.getElementById("TeamChoose");
            let h1team=document.createElement("h1");
            h1team.id="h1team";
            h1team.innerHTML="You have chosen FRC as your team";
            h1team.style="font-family:Arial,Helvetica,sans-serif";
            a.appendChild(h1team);
            localStorage.setItem("Team","FRC");
        }
    //FTC Function  
    function FTC(){
        if(document.getElementById("h1team")){
            document.getElementById("h1team").remove();
        }
            const a=document.getElementById("TeamChoose");
            let h1team=document.createElement("h1");
            h1team.id="h1team";
            h1team.innerHTML="You have chosen FTC as your team";
            h1team.style="font-family:Arial,Helvetica,sans-serif";
            a.appendChild(h1team);
            localStorage.setItem("Team","FTC");
        }
    //Mechanical Function
    function Mechanical() {
        if(document.getElementById("h1category")){
            document.getElementById("h1category").remove();
        }
            const a=document.getElementById("PathChoose");
            let h1mechanical=document.createElement("h1");
            h1mechanical.id="h1category";
            h1mechanical.innerHTML="You have chosen Mechanical as your category";
            h1mechanical.style="font-family:Arial,Helvetica,sans-serif";
            a.appendChild(h1mechanical);
            localStorage.setItem("Category","Mechanical");
        }
    //Electrical Function
    function Electrical() {
        if(document.getElementById("h1category")){
            document.getElementById("h1category").remove();
        }
            const a=document.getElementById("PathChoose");
            let h1electrical=document.createElement("h1");
            h1electrical.id="h1category";
            h1electrical.innerHTML="You have chosen Electrical as your category";
            h1electrical.style="font-family:Arial,Helvetica,sans-serif";
            a.appendChild(h1electrical);
            localStorage.setItem("Category","Electrical");
        }
    //Software Function
    function Software() {
        if(document.getElementById("h1category")){
            document.getElementById("h1category").remove();
        }
            const a=document.getElementById("PathChoose");
            let h1software=document.createElement("h1");
            h1software.id="h1category";
            h1software.innerHTML="You have chosen Software as your category";
            h1software.style="font-family:Arial,Helvetica,sans-serif";
            a.appendChild(h1software);
            localStorage.setItem("Category","Software");
        }
    //Leadership Function
    function Leadership() {
        if(document.getElementById("h1category")){
            document.getElementById("h1category").remove();
        }
            const a=document.getElementById("PathChoose");
            let h1leadership=document.createElement("h1");
            h1leadership.id="h1category";
            h1leadership.innerHTML="You have chosen Leadership as your category";
            h1leadership.style="font-family:Arial,Helvetica,sans-serif";
            a.appendChild(h1leadership);
            localStorage.setItem("Category","Leadership");
        }

//Preset Variables

let ArrayAnsRan = Math.floor(Math.random() * 4);
let ArrayCount = 0;
let QuestionArrayAt = 0;
let PossibleQuestions1;
let AnswersData;
let datavar;

//let PossibleQuestions2;


//Question Creation Function
function QuestionCreate() {
            
            
            //Random Questions Function
            function QuestionRan(array) {
                let currentIndex = array.length, randomIndex;;

                // While there remain elements to shuffle.
                while (currentIndex != 0) {
      
                    // Pick a remaining element.
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;
    
                    // And swap it with the current element.
                    [array[currentIndex], array[randomIndex]] = [
                        array[randomIndex], array[currentIndex]];
                    }
                    
                return array;
            }
    
        //Redeclare function to run
        

        //Fetching questions.json file as promise to resolve
        fetch("/SafetyTest.js/data.json")
        .then(data => data.json())
        .then(data => {
            datavar = data.PossibleQuestions;

            for (var i = 0; i < datavar.length; i++){
                //Document for my thought process in calulating questions and answers
                //https://docs.google.com/document/d/1FgRlnSqRrApEkwcvM0OiQbvQhh-pAN_1nUfUGYhkVcg/edit?usp=sharing
                if(datavar[i].id == ("Q" + (i + 1))) {
                    PossibleQuestions[i] = datavar[i].Question;
                } else {
                    console.log("Question "+i+1+" not found");
                }
            }   
                
            QuestionRan(PossibleQuestions);
            asyncisannoying();
            });

        



    const AddQuestions = document.getElementById("Questions1");



    //for loop to create questions answers
    async function asyncisannoying() {

    if(PossibleQuestionsCount < 0){
        console.log("EC: Q-1");
        const abortController = new AbortController();
        abortController.abort();
        return;
    }

    for (let i = 0; i < PossibleQuestionsCount; i++) {
        var divid = "Question_" + i+1;
        
        //Creates a new div for each question
        let AddQuestionsDiv = document.createElement("div");
        AddQuestionsDiv.className = "form-group col-lg-4 col-md-3 col-sm-4 col-xs-1 q_div";
        AddQuestionsDiv.id = divid;

        AddQuestions.appendChild(AddQuestionsDiv);
        

        //Get the id from "AddQuestionsDiv1"
        let AddQuestionsDiv1 = document.getElementById(AddQuestionsDiv.id);

        //Br tags for spacing
        var br1 = document.createElement("br");
        var br2 = document.createElement("br");
        AddQuestions.appendChild(br1, br2);

        let H1Num = document.createElement("h1");
        H1Num.innerHTML = i+1 + ". " + PossibleQuestions[i + 1];
        H1Num.style = "color: black; font-size: 20px; font-weight: 300; text-align: left;";
        AddQuestionsDiv1.appendChild(H1Num);

        

        //Creates a new spacing for each question
        const br = document.createElement("br");

        AddQuestionsDiv1.appendChild(br);


        //Updating Variables
        ArrayCount = ArrayCount + 1;

        let answerslength1 = Math.floor(Math.random() * Object.keys(datavar.find(x => x.Question === PossibleQuestions[i + 1]).Answers).length);
        let answerslength2 = Math.floor(Math.random() * Object.keys(datavar.find(x => x.Question === PossibleQuestions[i + 1]).Answers).length);
        let answerslength3 = Math.floor(Math.random() * Object.keys(datavar.find(x => x.Question === PossibleQuestions[i + 1]).Answers).length);
        let answerslength4 = Math.floor(Math.random() * Object.keys(datavar.find(x => x.Question === PossibleQuestions[i + 1]).Answers).length);
        
        //Making sure of no repeats
        while (answerslength1 == answerslength2 || answerslength1 == answerslength3 || answerslength1 == answerslength4 || answerslength2 == answerslength3 || answerslength2 == answerslength4 || answerslength3 == answerslength4) {
            answerslength1 = Math.floor(Math.random() * Object.keys(datavar.find(x => x.Question === PossibleQuestions[i + 1]).Answers).length);
            answerslength2 = Math.floor(Math.random() * Object.keys(datavar.find(x => x.Question === PossibleQuestions[i + 1]).Answers).length);
            answerslength3 = Math.floor(Math.random() * Object.keys(datavar.find(x => x.Question === PossibleQuestions[i + 1]).Answers).length);
            answerslength4 = Math.floor(Math.random() * Object.keys(datavar.find(x => x.Question === PossibleQuestions[i + 1]).Answers).length);
        }

        //Adding value of answers to array
        lng.push(answerslength1);
        lng.push(answerslength2);
        lng.push(answerslength3);
        lng.push(answerslength4);


            //Inputs
            for (let j = 0; j < anschoices; j++) {
 

                randomVal = [answerslength1, answerslength2, answerslength3, answerslength4];

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
                if (datavar.find(x => x.Question === PossibleQuestions[i + 1]).Answers[randomVal[j]].id) {
                    h1a.id = datavar.find(x => x.Question === PossibleQuestions[i + 1]).Answers[randomVal[j]].id;
                    //For Answers[]: Answers[Math.floor(Math.random()*answerslength)]
                    h1a.innerHTML = datavar.find(x => x.Question === PossibleQuestions[i + 1]).Answers[randomVal[j]].Answer;
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
        }
    }
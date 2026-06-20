import {
    ref,
    push,
    set,
    get
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

const registerBox = document.getElementById("registerBox");
const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("resultBox");

const usernameInput = document.getElementById("username");
const startBtn = document.getElementById("startBtn");

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("question");

const optionBtns = [
    document.getElementById("option0"),
    document.getElementById("option1"),
    document.getElementById("option2"),
    document.getElementById("option3")
];

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");

const finalScore = document.getElementById("finalScore");
const timerEl = document.getElementById("timer");

let userName = "";
let currentQuestion = 0;
let answers = [];

/* SAMPLE QUESTIONS
Replace with full 50 questions
*/

const questions = [
{
question:"What does CPU stand for?",
options:["Central Processing Unit","Computer Power Unit","Control Program Unit","Central Program Unit"],
answer:0
},
{
question:"What does RAM stand for?",
options:["Random Access Memory","Read Access Memory","Run Access Memory","Rapid Access Memory"],
answer:0
},
{
question:"Which language is used for web page structure?",
options:["HTML","Python","Java","C++"],
answer:0
},
{
question:"Which tag creates a hyperlink?",
options:["<a>","<img>","<div>","<p>"],
answer:0
},
{
question:"Which company developed Java?",
options:["Sun Microsystems","Google","Apple","IBM"],
answer:0
},
{
question:"Which symbol is used for comments in Python?",
options:["#","//","/*","--"],
answer:0
},
{
question:"What does URL stand for?",
options:["Uniform Resource Locator","Universal Resource Link","Uniform Read Locator","Universal Read Link"],
answer:0
},
{
question:"Which device is an output device?",
options:["Monitor","Keyboard","Mouse","Scanner"],
answer:0
},
{
question:"What does WWW stand for?",
options:["World Wide Web","World Web Wide","Wide World Web","Web World Wide"],
answer:0
},
{
question:"Which is a programming language?",
options:["Python","Chrome","Windows","Linux"],
answer:0
},
{
question:"What is the brain of the computer?",
options:["CPU","RAM","Hard Disk","Monitor"],
answer:0
},
{
question:"Which HTML tag inserts an image?",
options:["<img>","<image>","<src>","<pic>"],
answer:0
},
{
question:"Which CSS property changes text color?",
options:["color","font-color","text-color","style"],
answer:0
},
{
question:"Which company developed Windows?",
options:["Microsoft","Google","Apple","Intel"],
answer:0
},
{
question:"What is the full form of USB?",
options:["Universal Serial Bus","Universal System Bus","United Serial Bus","User Serial Bus"],
answer:0
},
{
question:"Which operator means AND in Python?",
options:["and","&&","&","AND"],
answer:0
},
{
question:"Which keyword creates a function in Python?",
options:["def","function","func","create"],
answer:0
},
{
question:"Which data type stores True or False?",
options:["Boolean","Integer","String","Float"],
answer:0
},
{
question:"Which loop executes while condition is true?",
options:["while","for","if","switch"],
answer:0
},
{
question:"Which symbol is used for assignment in Python?",
options:["=","==",":=","==="],
answer:0
},
{
question:"Which is not an operating system?",
options:["Python","Linux","Windows","Android"],
answer:0
},
{
question:"What does IP stand for?",
options:["Internet Protocol","Internal Protocol","Internet Program","Internal Program"],
answer:0
},
{
question:"Which device stores data permanently?",
options:["Hard Disk","RAM","Cache","Register"],
answer:0
},
{
question:"What is the extension of Java files?",
options:[".java",".js",".py",".html"],
answer:0
},
{
question:"Which HTML tag creates a paragraph?",
options:["<p>","<h1>","<div>","<span>"],
answer:0
},
{
question:"Which company owns Android?",
options:["Google","Apple","Microsoft","Samsung"],
answer:0
},
{
question:"Which network covers a small area?",
options:["LAN","WAN","MAN","PAN"],
answer:0
},
{
question:"What does AI stand for?",
options:["Artificial Intelligence","Automatic Intelligence","Advanced Internet","Artificial Internet"],
answer:0
},
{
question:"Which keyword is used for conditions in Python?",
options:["if","for","while","loop"],
answer:0
},
{
question:"What is the full form of DBMS?",
options:["Database Management System","Data Base Main System","Database Main Server","Data Backup Management System"],
answer:0
},
{
question:"Which symbol is used for multiplication in Python?",
options:["*","x","×","%"],
answer:0
},
{
question:"Which language runs in browsers?",
options:["JavaScript","Python","C","Java"],
answer:0
},
{
question:"What is the extension of HTML files?",
options:[".html",".ht",".web",".hml"],
answer:0
},
{
question:"Which is used to style web pages?",
options:["CSS","HTML","Python","C"],
answer:0
},
{
question:"Which keyword exits a loop?",
options:["break","exit","stop","quit"],
answer:0
},
{
question:"Which function displays output in Python?",
options:["print()","show()","display()","echo()"],
answer:0
},
{
question:"What does PDF stand for?",
options:["Portable Document Format","Public Document File","Personal Document Format","Portable Data Format"],
answer:0
},
{
question:"Which company created the iPhone?",
options:["Apple","Samsung","Google","Nokia"],
answer:0
},
{
question:"What is the default port of HTTP?",
options:["80","21","25","443"],
answer:0
},
{
question:"Which data structure stores key-value pairs?",
options:["Dictionary","List","Tuple","Set"],
answer:0
},
{
question:"Which HTML tag creates a heading?",
options:["<h1>","<head>","<title>","<p>"],
answer:0
},
{
question:"Which operator checks equality in Python?",
options:["==","=","!=","==="],
answer:0
},
{
question:"Which company developed Python?",
options:["Python Software Foundation","Microsoft","Google","Oracle"],
answer:0
},
{
question:"Which memory is fastest?",
options:["Cache","RAM","Hard Disk","DVD"],
answer:0
},
{
question:"Which protocol is secure HTTP?",
options:["HTTPS","FTP","SMTP","TCP"],
answer:0
},
{
question:"Which keyword skips current loop iteration?",
options:["continue","break","pass","exit"],
answer:0
},
{
question:"Which is a database software?",
options:["MySQL","Chrome","Windows","Photoshop"],
answer:0
},
{
question:"What is the full form of GUI?",
options:["Graphical User Interface","General User Interface","Graphic Utility Interface","Global User Interface"],
answer:0
},
{
question:"Which company created Firebase?",
options:["Google","Microsoft","Apple","Meta"],
answer:0
},
{
question:"Which symbol starts an ID selector in CSS?",
options:["#",".","@","$"],
answer:0
}
];

function loadQuestion() {

let q = questions[currentQuestion];

questionNumber.innerText =
`Question ${currentQuestion+1} / ${questions.length}`;

questionText.innerText = q.question;

optionBtns.forEach((btn,index)=>{

btn.innerText = q.options[index];

btn.classList.remove("selected");

if(answers[currentQuestion]===index){
btn.classList.add("selected");
}

btn.onclick=()=>{
answers[currentQuestion]=index;

optionBtns.forEach(b=>{
b.classList.remove("selected");
});

btn.classList.add("selected");
};

});
}

startBtn.addEventListener("click",()=>{

userName = usernameInput.value.trim();

if(userName===""){
alert("Enter your name");
return;
}

registerBox.classList.add("hidden");
quizBox.classList.remove("hidden");

loadQuestion();
startTimer();

});

nextBtn.addEventListener("click",()=>{

if(currentQuestion < questions.length-1){
currentQuestion++;
loadQuestion();
}

});

prevBtn.addEventListener("click",()=>{

if(currentQuestion > 0){
currentQuestion--;
loadQuestion();
}

});

submitBtn.addEventListener("click",submitQuiz);

function submitQuiz(){

let score = 0;

questions.forEach((q,index)=>{

if(answers[index]===q.answer){
score++;
}

});

quizBox.classList.add("hidden");
resultBox.classList.remove("hidden");

finalScore.innerText =
`${userName}, Your Score: ${score}/${questions.length}`;

saveScore(userName,score);

}

function saveScore(name,score){

const scoreRef =
push(ref(window.db,"leaderboard"));

set(scoreRef,{
name:name,
score:score,
date:new Date().toLocaleString()
});

}

let timeLeft = 900;

function startTimer(){

const timer = setInterval(()=>{

let minutes =
Math.floor(timeLeft/60);

let seconds =
timeLeft%60;

timerEl.innerText =
`${minutes}:${seconds.toString().padStart(2,"0")}`;

timeLeft--;

if(timeLeft < 0){

clearInterval(timer);

submitQuiz();

}

},1000);

}
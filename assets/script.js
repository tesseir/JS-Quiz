// * lb = leaderboard 
// * qn = question
// * ans = answer
// * sv = save
// * cnt = container

// ! f = flex (for css)  
// ! h = hide (for css)  

// ? p = play (for js) 
// ? r = restart (for js) 
// ? ini = initials (for js) 

// elements
const lbEl= document.querySelector(".lb-box")
const statsEl= document.querySelector(".stats-box")
const qnEl= document.querySelector(".qn-box")
const ansEl= document.querySelector(".ans-box")
const svEl= document.querySelector(".sv-box")
const btnEl= document.querySelector(".btn-box")

const scoreEl = document.querySelector("#score");
const timerEl = document.querySelector("#timer");
const playBtn = document.querySelector("#p-btn");
const saveBtn = document.querySelector("#sv-btn");
const restartBtn = document.querySelector("#r-btn");

//randomizer
const randomizer = (range) => {
  return range[Math.floor(Math.random() * range.length)];
};

//variables

let score = 0;
let timeLeft = 120;
let currentQn;
let shuffled_qnPool, currentQn_index;

// question pool
let qnPool =[
{qn: 'A is correct',
ans:[
{text: 'A', correct:true},
{text: 'B', correct:false},
{text: 'C', correct:false},
{text: 'D', correct:false},
]},

{qn: 'B is correct',
ans:[
{text: 'A', correct:false},
{text: 'B', correct:true},
{text: 'C', correct:false},
{text: 'D', correct:false},
]},

{qn: 'C is correct',
ans:[
{text: 'A', correct:false},
{text: 'B', correct:false},
{text: 'C', correct:true},
{text: 'D', correct:false},
]},

{qn: 'D is correct',
ans:[
{text: 'A', correct:false},
{text: 'B', correct:false},
{text: 'C', correct:false},
{text: 'D', correct:true},
]},
];

//play button listener
playBtn.addEventListener('click', startQuiz)

function startQuiz () {
  console.log("start")
  // userInterface();
  // timerStart();
  loadQn();
}

function loadQn () {
  shuffled_qnPool= randomizer(qnPool)
  console.log(shuffled_qnPool)
  console.log("Question Loaded")

}

function userInterface () {
  statsEl.classList.remove('h');
  qnEl.classList.remove('h');
  ansEl.classList.remove('h');
  btnEl.classList.add('h');
  lbEl.classList.add('h')
  }
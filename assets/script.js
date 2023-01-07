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
let shuffled_qnPool, currentQn_index = 0;

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

//
function startQuiz () {
  console.log("start")
  shuffled_qnPool=[]
  for (let i = 0; i < 10; i++) {
    shuffled_qnPool.push(randomizer(qnPool))
  } 
  // userInterface();
  // timerStart();
  shuffled_qnPool = [...new Set(shuffled_qnPool)];
  loadQn();
}

function loadQn () {
  if (currentQn_index < shuffled_qnPool.length){
  console.log(shuffled_qnPool[currentQn_index])
  console.log("Question Loaded")
  injectQn(shuffled_qnPool[currentQn_index].qn)
  injectAns(shuffled_qnPool[currentQn_index].ans)
  } 
}

function injectQn (text) {
  qnEl.innerHTML = text
}

function injectAns (answers) {
  ansEl.innerHTML = answers.map(
    a => `<button onclick="onbuttonclick(${a.correct})">${a.text} </button>`).join('')
}

window.onbuttonclick = (e) => {
  console.log(e)
  if (e === true && (currentQn_index < shuffled_qnPool.length-1)) {
    score++
    scoreEl.innerHTML = score
  } if (currentQn_index < shuffled_qnPool.length) {
    currentQn_index++
    loadQn ()
  } else {
    alert("youredone")
  }
}


function userInterface () {
  statsEl.classList.remove('h');
  qnEl.classList.remove('h');
  ansEl.classList.remove('h');
  btnEl.classList.add('h');
  lbEl.classList.add('h')
  }
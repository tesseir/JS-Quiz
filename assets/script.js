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

//question pool
let qnPool = [
  {
    qn: 'A is correct',
    ans: [
      { text: 'A', correct: true },
      { text: 'B', correct: false },
      { text: 'C', correct: false },
      { text: 'D', correct: false },
    ]
  },

  {
    qn: 'B is correct',
    ans: [
      { text: 'A', correct: false },
      { text: 'B', correct: true },
      { text: 'C', correct: false },
      { text: 'D', correct: false },
    ]
  },

  {
    qn: 'C is correct',
    ans: [
      { text: 'A', correct: false },
      { text: 'B', correct: false },
      { text: 'C', correct: true },
      { text: 'D', correct: false },
    ]
  },

  {
    qn: 'D is correct',
    ans: [
      { text: 'A', correct: false },
      { text: 'B', correct: false },
      { text: 'C', correct: false },
      { text: 'D', correct: true },
    ]
  },
]

// elements
const lbEl = document.querySelector(".lb-box")
const statsEl = document.querySelector(".stats-box")
const qnEl = document.querySelector(".qn-box")
const ansEl = document.querySelector(".ans-box")
const svEl = document.querySelector(".sv-box")
const btnEl = document.querySelector(".btn-box")

const scoreEl = document.querySelector("#score")
const timerEl = document.querySelector("#timer")
const playBtn = document.querySelector("#p-btn")
const saveBtn = document.querySelector("#sv-btn")
const restartBtn = document.querySelector("#r-btn")

//variables


let score = 0

let timeLeft = 120

let currentQn = {}
let availableQn = []
let qnIndex = 0

const MAXQN = 4

//quiz area

//play button listener
playBtn.addEventListener('click', startQuiz)


//shuffles question pool and does the math for how many questions are left.
 function startQuiz() {

  console.log("start")

  questionCounter = 0
  score = 0
  availableQn = [...qnPool]

  ui_startquiz()
  timerStart()
  loadqn()
  
}

function loadqn() {

  if(availableQn.length === 0 || questionCounter > MAXQN || timer === 0){
    localStorage.setItem('mostRecentScore', score)
  }

  const qnIndex = Math.floor(Math.random() * availableQn.length)
  currentQn = availableQn[qnIndex]

  injectQn()
  injectAns()
}

function injectQn() {

  console.log("question injected")
  qnEl.innerHTML = currentQn.qn

}

const injectAns = () => {

  console.log("answers injected")
  ansEl.innerHTML = currentQn.ans.map(
    a => `<button onclick="onbuttonclick(${a.correct})">${a.text} </button>`).join('')

}

//timer area
function timerStart() {

  var timer = setInterval(function() {
    timeLeft--
    timerEl.textContent = timeLeft + " secs"

    if(timeLeft === 0) {
      clearInterval(timer)
      ui_endquiz()
    }

  }, 1000)
}  


//ui area
function ui_startquiz() {
  
  qnEl.classList.remove('h')
  ansEl.classList.remove('h')
  statsEl.classList.remove('h')

  // buttons

  playBtn.classList.add('h')

}

function ui_endquiz() {

  qnEl.classList.add('h')
  ansEl.classList.add('h')

  // buttons

  saveBtn.classList.remove('h')
  restartBtn.classList.remove('h')

}

function ui_leaderboard() {
  
  lbEl.classList.remove('h')

  statsEl.classList.add('h')
  qnEl.classList.add('h')
  ansEl.classList.add('h')

  // buttons

  playBtn.classList.add('h')
  saveBtn.classList.add('h')
  restartBtn.classList.add('h')

}

function ui_restart() {

  lbEl.classList.add('h')
  
  qnEl.classList.remove('h')
  ansEl.classList.remove('h')

  // buttons

  playBtn.classList.remove('h')

}


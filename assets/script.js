// * lb = leaderboard 
// * qn = question
// * ans = answer
// * vlb = view leaderboard
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
const useriniEl = document.querySelector(".user-ini")
const btnEl = document.querySelector(".btn-box")

const scoreEl = document.querySelector("#score")
const timerEl = document.querySelector("#timer")
const playBtn = document.querySelector("#p-btn")
const vlbBtn = document.querySelector("#vlb-btn")
const restartBtn = document.querySelector("#r-btn")

//variables
let timer 

let score = 0 

let timeLeft = 120

let currentQn = {}
let availableQn = []
let qnIndex = 0

const MAXQN = 4

//storage area
const most_recent_score = localStorage.getItem ( 'mostRecentScore' );
const lbscores = JSON.parse ( localStorage.getItem ( "highScores" ))||[];

lbEl.innerHTML = lbscores.map ( userData => {
  return `<li class="high-score f-column">
  ${userData.name} - ${userData.score}</li>`;} ).join ( "" );

//quiz area

//play button listener
playBtn.addEventListener('click', startQuiz)
vlbBtn.addEventListener('click', ui_leaderboard)

//makes it so questions never repeat
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

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

//its the start and houses the shuffler
function startQuiz() {

  console.log("start")

  questionCounter = 0
  score = 0
  availableQn = shuffle([...qnPool])

  ui_startquiz()
  timerStart()
  loadQn()

}
//shuffles question pool and does the math for how many questions are left.
function loadQn() {

  if (availableQn.length === 0 || questionCounter > MAXQN -1 || timeLeft < 0) {
    localStorage.setItem('mostRecentScore', score)

    endquiz()

    clearInterval(timer)
    ui_endquiz()
  }

  const qnIndex = Math.floor(Math.random() * availableQn.length)
  currentQn = availableQn[qnIndex]

  injectQn()
  injectAns()
}
// injects question
function injectQn() {

  console.log("question injected")
  qnEl.innerHTML = currentQn.qn

}
//injects answers and creates buttons
const injectAns = () => {

  console.log("answers injected")
  ansEl.innerHTML = currentQn.ans.map(
    answer => `<button class="btn" onclick="onbuttonclick(${answer.correct})">${answer.text} </button>`).join('')
}
//does the correct or not statement and the coresponding values
function onbuttonclick(iscorrect) {

  console.log("test")
  if (iscorrect) {
    score++
    scoreEl.textContent = score + "/4"
  }

  if (!iscorrect) {
    timeLeft = timeLeft - 10
    timerEl.textContent = timeLeft + " secs"
    if (timeLeft <= 0) {
      clearInterval(timer)
      ui_endquiz()
    }
  }
  questionCounter++
  loadQn()
}

// saves recent score and changes ui
function endquiz () {

  localStorage.setItem('mostRecentScore', score)

  clearInterval(timer)
  saveScore()
  ui_endquiz()
  ui_leaderboard()

}

//prompts user to save initials and combines score with their initials. pushes data to leaderboard.
function saveScore () {
  let username = prompt ( "Your score = " + score + "\nEnter initials and click OK to save score" );
  const userData = {name: username,score: score};
  lbscores.push ( userData );
  localStorage.setItem ( 'highScores', JSON.stringify ( lbscores ) );
}

//allows the generated buttons in the generate answer buttons to have functionality
window.onbuttonclick = onbuttonclick;

//timer area
function timerStart() {

  timer = setInterval(function () {
    timeLeft--
    timerEl.textContent = timeLeft + " secs"

    if (timeLeft <= 0) {
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

  vlbBtn.classList.remove('h')
  restartBtn.classList.remove('h')

}

function ui_leaderboard() {

  lbEl.classList.remove('h')

  statsEl.classList.add('h')
  qnEl.classList.add('h')
  ansEl.classList.add('h')

  // buttons

  playBtn.classList.add('h')
  vlbBtn.classList.add('h')
  // restartBtn.classList.add('h')

}

// function ui_restart() {

//   lbEl.classList.add('h')

//   qnEl.classList.remove('h')
//   ansEl.classList.remove('h')

//   // buttons

//   playBtn.classList.remove('h')

// }


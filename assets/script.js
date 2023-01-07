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
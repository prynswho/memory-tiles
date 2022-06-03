const audio = new Audio();
const game_end = new Audio();
let SCORE_COUNTER = 0;
let trials = 0;
let TIME = 0;
let highScore = 0;
let start_highscore = 0;
let intervalID;
game_end.src = "endgame.WAV";
audio.src = "click_.mp3";
const audio2 = new Audio();
audio2.src = "autosound.mp3";
const inputs = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
];
const updated = [];
const BLINK = [];
function high_score() {
  let storedValue = localStorage.getItem("highscore");
  if (storedValue != undefined) start_highscore = storedValue;
  var element2 = document.getElementById("high-counter");
  element2.innerHTML = start_highscore;
}

function calls() {
  trials += 1;
  if (trials == 1) {
    main();
    timer();
    high_score();
  }
}
function onclicking(i) {
  audio.play();
  var box = document.getElementsByClassName("blocks")[i];
  box.style.backgroundColor = "#d90429";
  setTimeout(() => (box.style.backgroundColor = "#2b2d42"), 100);
  check(i);
}
function lightup(i) {
  var box = document.getElementsByClassName("blocks")[i];
  console.log(box);
  box.style.backgroundColor = "#780000";
  setTimeout(() => (box.style.backgroundColor = "#2b2d42"), 200);
}
function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
function blinker(n) {
  let i = 0;
  let intervalID;
  intervalID = setInterval(function () {
    if (i == BLINK.length) clearInterval(intervalID);
    lightup(BLINK[i]);
    audio2.play();
    i = i + 1;
  }, 1000);
}

function main() {
  var random_index = Math.floor((Math.random() * 1000) % inputs.length);
  BLINK.push(inputs[random_index]);
  removeItemOnce(inputs, inputs[random_index]);
  blinker(BLINK);
  for (let i = 0; i < BLINK.length; i++) {
    updated.push(BLINK[i]);
  }
}
function check(i) {
  if (!(i == updated[0])) {
    game_end.play();
    alert(`SCORE : ${SCORE_COUNTER}`);
    endgame();
  }
  removeItemOnce(updated, i);
  if (updated.length == 0) {
    SCORE_COUNTER += 1;
    highScore += 1;
    score_update(SCORE_COUNTER);
    main();
  }
}
function score_update(n) {
  var element = document.getElementById("counter");
  element.innerHTML = n;
  if (n >= highScore && highScore >= start_highscore) {
    var element2 = document.getElementById("high-counter");
    element2.innerHTML = n;
    localStorage.setItem("highscore", n);
  }
}
function endgame() {
  trials = 0;
  SCORE_COUNTER = 0;
  score_update(SCORE_COUNTER);
  var element = document.getElementById("time");
  element.innerHTML = 0;
  clearInterval(intervalID);
  setTimeout(() => (window.location = "start.html"), 1000);
}
function timer() {
  intervalID = setInterval(function () {
    TIME += 1;
    var element = document.getElementById("time");
    element.innerHTML = TIME;
  }, 1000);
}

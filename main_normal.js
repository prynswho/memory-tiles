const audio = new Audio();
const game_end = new Audio();
let SCORE_COUNTER = 0;
let TIME = 0;
let trials = 0;
let intervalID;
game_end.src = "endgame.WAV";
audio.src = "click_.mp3";
const audio2 = new Audio();
audio2.src = "autosound.mp3";
const inputs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const updated = [];
const BLINK = [];

function calls() {
  trials += 1;
  if (trials == 1) {
    main();
    timer();
  }
}
function onclicking(i) {
  audio.play();
  var box = document.getElementsByClassName("blocks")[i];
  box.style.backgroundColor = "#003049";
  setTimeout(() => (box.style.backgroundColor = "#C1121F"), 100);
  check(i);
}
function lightup(i) {
  var box = document.getElementsByClassName("blocks")[i];
  box.style.backgroundColor = "#669BBC";
  setTimeout(() => (box.style.backgroundColor = "#C1121F"), 200);
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
  if(SCORE_COUNTER == 16){
    endgame();
  }
  var random_index = Math.floor((Math.random() * 1000) % inputs.length);
  BLINK.push(inputs[random_index]);
  removeItemOnce(inputs, inputs[random_index]);
  blinker(BLINK);
  for (let i = 0; i < BLINK.length; i++) {
    updated.push(BLINK[i]);
  }
}
function check(i) {
  if (!updated.includes(i)) {
    game_end.play();
    alert(`SCORE : ${SCORE_COUNTER}`);
    endgame();
  }
  removeItemOnce(updated, i);
  if (updated.length == 0) {
    main();
    SCORE_COUNTER += 1;
    score_update(SCORE_COUNTER);
  }
}
function score_update(n) {
  var element = document.getElementById("counter");
  element.innerHTML = n;
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

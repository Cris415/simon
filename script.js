const gameBtns = document.getElementById("gameBtns");
const buttons = ["g", "r", "y", "b"];
var sequence = [];
var userSequence = [];
var count = 0;
var simonOnOff = false;

function tileClick(event) {
  var clickedBtn = event.target.id;
  userSequence.push(clickedBtn);
  //toggleBtn(clickedBtn);
  console.log(userSequence, "user");
  //Check if sequences do not match, show the last sequence again
  if (!compareArrays(userSequence, sequence, false)) {
    userSequence = [];
    playSequence();
    return console.log(sequence);
  }

  if (compareArrays(userSequence, sequence, true)) {
    userSequence = [];
    addToSequence();
    playSequence();
  }
}

//Will return true if arrays match, false if not
function compareArrays(arr1, arr2, fllChk) {
  if (fllChk) {
    if (arr1.length !== arr2.length) {
      return false;
    }
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

//Random number fn from MDN
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//Adds a random button to the sequence
function addToSequence() {
  var randNum = getRandomInt(0, 4);
  sequence.push(buttons[randNum]);
  console.log(sequence);
}

//Start the game
function init() {
  gameBtns.disabled = false;
  gameBtns.addEventListener("click", tileClick);
  simonOnOff = true;
  restart(false);
  addToSequence();
  playSequence();
}
function shutOff() {
  simonOnOff = false;
  restart(false);
  //Remove "light on" class, so the device stops blinking when off
  // for (let i = 0; i < buttons.length; i++) {
  //   document.getElementById(buttons[i]).classList.remove(buttons[i] + "On");
  // }
  gameBtns.disabled = true;
  gameBtns.removeEventListener("click", tileClick);
}

function restart(shut) {
  if (simonOnOff) {
    sequence = [];
    userSequence = [];
    count = 0;
    if (shut) {
      console.log("called init");
      init();
    }
  }
}

document.getElementById("onOff").addEventListener("click", onOff);
function onOff() {
  if (simonOnOff) {
    shutOff();
    document.getElementById("onOff").classList.toggle("onButton");
    simonOnOff = false;
  } else {
    init();
    document.getElementById("onOff").classList.toggle("onButton");
    simonOnOff = true;
  }
}

document.getElementById("restart").addEventListener("click", restart);

function playSequence() {
  for (let i = 0; i < sequence.length; i++) {
    setTimeout(function() {
      lightButton(sequence[i]);
    }, 1500 * i);
  }
  setTimeout(function() {}, 2000 * sequence.length);
}

function lightButton(id) {
  document.getElementById(id).classList.toggle(id + "On");
  setTimeout(function() {
    document.getElementById(id).classList.toggle(id + "On");
  }, 1000);
}
// var array1 = [1, 2, 5, 7];
// var array2 = [1, 2, 5, 7];
// var array3 = [1, 2, 5, 7, 8];
// var array4 = [1, 2, 4, 7];
// console.log(compareArrays(array1, array2), " should be true");
// console.log(compareArrays(array1, array3), " should be false");
// console.log(compareArrays(array1, array4), " should be false");

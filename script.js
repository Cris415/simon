const gameBtns = document.getElementById("gameBtns");
const display = document.getElementById("display");
const buttons = ["g", "r", "y", "b"];
var sequence = [];
var userSequence = [];
var count = 1;
var simonOnOff = false;
var simonStrict = false;
const vicSteps = 20;

//True will pause, false will play.
function playAudio(btn, bool) {
  const audioLib = {
    r: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    g: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    b: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    y: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
  };
  bool = bool || false;

  if (!bool) {
    audioLib[btn].play();
  } else {
    audioLib[btn].pause();
  }
}
function pauseFn(event) {
  var clickedBtn = event.target.id;
  playAudio(clickedBtn, true);
}
function tileClick(event) {
  var clickedBtn = event.target.id;
  playAudio(clickedBtn);
  //If user presses outside of the buttons but within the click event area just outside of the curved edges
  if (clickedBtn.length === 0) {
    return;
  }
  //Add the button to sequence
  userSequence.push(clickedBtn);

  console.log(userSequence, "user");

  //Check if sequences do not match, show the last sequence again
  if (!compareArrays(userSequence, sequence, false)) {
    if (!simonStrict) {
      userSequence = [];
      playSequence();
      return console.log(sequence);
    } else {
      //If strict game will restart
      //Add display msg "lose or X"
      display.innerHTML = "X";
      //reset game
      setTimeout(function() {
        restart(true);
      }, 1000);
    }
  }

  if (compareArrays(userSequence, sequence, true)) {
    if (sequence.length === vicSteps) {
      //Add display msg "win or W "
      display.innerHTML = "W";
      //reset game
      setTimeout(function() {
        restart(true);
      }, 1000);
    } else {
      userSequence = [];
      addToSequence();
      count = sequence.length;
      display.innerHTML = count;
      setTimeout(function() {
        playSequence();
      }, 1500);
    }
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
  document.getElementById("restart").addEventListener("click", restart);
  document.getElementById("strict").addEventListener("click", simonStrictFn);
  gameBtns.addEventListener("mousedown", tileClick);
  gameBtns.addEventListener("mouseup", pauseFn);
  simonOnOff = true;
  restart(false);
  addToSequence();
  playSequence();
}
function shutOff() {
  simonOnOff = false;
  display.innerHTML = "";
  restart(false);
  // Remove "light on" class, so the device stops blinking when off
  // for (let i = 0; i < buttons.length; i++) {
  //   document.getElementById(buttons[i]).classList.remove(buttons[i] + "On");
  // }

  for (let i = 0; i < buttons.length; i++) {
    playAudio(buttons[i], true);
  }
  gameBtns.removeEventListener("mousedown", tileClick);
  gameBtns.removeEventListener("mouseup", pauseFn);
}

function restart(shut) {
  if (simonOnOff) {
    sequence = [];
    userSequence = [];
    count = 1;
    display.innerHTML = count;
    if (shut) {
      init();
    }
  }
}

function simonStrictFn() {
  if (simonOnOff) {
    if (simonStrict) {
      document.getElementById("strict").classList.toggle("strictOn");
      simonStrict = false;
    } else {
      document.getElementById("strict").classList.toggle("strictOn");
      simonStrict = true;
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

//Lights up buttons based on sequence array
function playSequence() {
  for (let i = 0; i < sequence.length; i++) {
    setTimeout(function() {
      if (simonOnOff) {
        playAudio(sequence[i]);
        lightButton(sequence[i]);
      }
    }, 1500 * i);
  }
}

//Lights up the chosen button
function lightButton(id) {
  if (simonOnOff) {
    document.getElementById(id).classList.toggle(id + "On");
    setTimeout(function() {
      document.getElementById(id).classList.toggle(id + "On");
    }, 1000);
  }
}

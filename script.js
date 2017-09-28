var gameBtns = document.getElementById("gameBtns");
gameBtns.addEventListener("click", tileClick);
var buttons = ["g", "r", "y", "b"];
var sequence = [];
var userSequence = [];

function tileClick(event) {
  var clickedBtn = event.target.id;
  userSequence.push(clickedBtn);
  //toggleBtn(clickedBtn);
  console.log(userSequence, "user");
  //Check if sequences do not match, show the last sequence again
  if (!compareArrays(userSequence, sequence, false)) {
    userSequence = [];
    return console.log(sequence);
  }

  if (compareArrays(userSequence, sequence, true)) {
    userSequence = [];
    addToSequence();
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

//Lights up chosen button
// function toggleBtn(button) {
//   //untoggle .5sec later
//   document.getElementById(button).classList.toggle("btnOn");
//   //setTimeout(document.getElementById(button).classList.toggle("btnOn"), 0.3);
// }

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
  addToSequence();
}

init();
// var array1 = [1, 2, 5, 7];
// var array2 = [1, 2, 5, 7];
// var array3 = [1, 2, 5, 7, 8];
// var array4 = [1, 2, 4, 7];
// console.log(compareArrays(array1, array2), " should be true");
// console.log(compareArrays(array1, array3), " should be false");
// console.log(compareArrays(array1, array4), " should be false");

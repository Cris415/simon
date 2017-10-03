//Simon Game By Cristian Sept 2017
const gameBtns = document.getElementById("gameBtns");
const display = document.getElementById("display");
const buttons = ["g", "r", "y", "b"];

var audio = {
  toggle: function(btn, play) {
    const audioLib = {
      r: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
      g: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
      b: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
      y: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
    };
    if (play) {
      audioLib[btn].play();
    } else {
      audioLib[btn].pause();
    }
  },
  pauseToggle: function(event) {
    var clickedBtn = event.target.id;
    audio.toggle(clickedBtn, false);
  }
};

var util = {
  compareArrays: function(arr1, arr2, fllChk) {
    //fllChk true will compare array length, to get full comparison
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
  },
  getRandomInt: function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
};
var simon = {
  state: {
    sequence: [],
    userSequence: [],
    count: 1,
    simonOn: false,
    strict: false
  },
  checkSequence: function(check) {
    const stepsToWin = 20;
    switch (check) {
      case "partial":
        if (
          !util.compareArrays(
            simon.state.userSequence,
            simon.state.sequence,
            false
          )
        ) {
          if (!simon.state.strict) {
            simon.state.userSequence = [];
            display.innerHTML = "X";
            simon.playSequence();
          } else {
            //If strict game will restart
            display.innerHTML = "XX";
            setTimeout(function() {
              simon.reset(true);
            }, 2000);
          }
        }
        break;
      case "full":
        //If user has entered correct sequence, add another step or declare win if reached vicStep
        if (
          util.compareArrays(
            simon.state.userSequence,
            simon.state.sequence,
            true
          )
        ) {
          if (simon.state.sequence.length === stepsToWin) {
            display.innerHTML = "W";
            setTimeout(function() {
              reset(true);
            }, 1800);
          } else {
            simon.state.userSequence = [];
            simon.addToSequence();
            simon.playSequence();
          }
        }
        break;
    }
  },
  addToSequence: function() {
    let randNum = util.getRandomInt(0, 4);
    simon.state.count = simon.state.sequence.length + 1;
    display.innerHTML = simon.state.count;
    simon.state.sequence.push(buttons[randNum]);
  },
  lightButton: function(id) {
    if (simon.state.simonOn) {
      document.getElementById(id).classList.toggle(id + "On");
      setTimeout(function() {
        document.getElementById(id).classList.toggle(id + "On");
      }, 1000);
    }
  },
  playSequence: function() {
    setTimeout(function() {
      display.innerHTML = simon.state.count;
      for (let i = 0; i < simon.state.sequence.length; i++) {
        setTimeout(function() {
          if (simon.state.simonOn) {
            audio.toggle(simon.state.sequence[i], true);
            simon.lightButton(simon.state.sequence[i]);
          }
        }, 1500 * i);
      }
    }, 1500);
  },
  startGame: function() {
    gameBtns.disabled = false;
    document.getElementById("restart").addEventListener("click", simon.reset);
    document
      .getElementById("strict")
      .addEventListener("click", simon.simonStrictToggle);
    gameBtns.addEventListener("mousedown", simon.clickOnGameButton);
    gameBtns.addEventListener("mouseup", audio.pauseToggle);
    simon.state.simonOn = true;
    simon.reset(false);
    simon.addToSequence();
    simon.playSequence();
  },
  turnOff: function() {
    simon.state.simonOn = false;
    display.innerHTML = "";
    simon.reset(false);
    gameBtns.removeEventListener("mousedown", simon.clickOnGameButton);
    gameBtns.removeEventListener("mouseup", audio.pauseToggle);
  },
  reset: function(restart) {
    if (simon.state.simonOn) {
      simon.state.sequence = [];
      simon.state.userSequence = [];
      simon.state.count = 1;
      display.innerHTML = simon.state.count;
      if (restart) {
        simon.startGame();
      }
    }
  },
  simonStrictToggle: function() {
    if (simon.state.simonOn) {
      if (simon.state.strict) {
        document.getElementById("strict").classList.toggle("strictOn");
        simon.state.strict = false;
      } else {
        document.getElementById("strict").classList.toggle("strictOn");
        simon.state.strict = true;
      }
    }
  },
  powerToggle: function() {
    if (simon.state.simonOn) {
      simon.turnOff();
      document.getElementById("onOff").classList.toggle("onButton");
      simon.state.simonOn = false;
    } else {
      simon.startGame();
      document.getElementById("onOff").classList.toggle("onButton");
      simon.state.simonOn = true;
    }
  },
  clickOnGameButton: function(event) {
    var clickedBtn = event.target.id;
    //Ignore outside clicks
    if (clickedBtn.length === 0) {
      return;
    }
    audio.toggle(clickedBtn, true);
    simon.state.userSequence.push(clickedBtn);
    simon.checkSequence("partial");
    simon.checkSequence("full");
  }
};

document.getElementById("onOff").addEventListener("click", simon.powerToggle);

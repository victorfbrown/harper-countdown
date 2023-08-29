function write(input) {
  document.getElementById("demo").innerHTML += input;
}

function clearInputs() {
  document.getElementById("form1").reset();
  const button = document.querySelector("button");
  button.disabled = true;
}

function reset() {
  clearHTML();
  clearInputs();
  enableButton();
  var theme = document.getElementsByTagName("link")[0];
  theme.setAttribute("href", "memphis.css");
}

function clearHTML() {
  document.getElementById("demo").innerHTML = "";
}

function addEventListeners() {
  const hundred = document.getElementById("hundred");
  hundred.addEventListener("input", enableButton);
  const fifty = document.getElementById("fifty");
  fifty.addEventListener("input", enableButton);
  const twenty = document.getElementById("twenty");
  twenty.addEventListener("input", enableButton);
  const ten = document.getElementById("ten");
  ten.addEventListener("input", enableButton);
  const five = document.getElementById("five");
  five.addEventListener("input", enableButton);
  const two = document.getElementById("two");
  two.addEventListener("input", enableButton);
  const one = document.getElementById("one");
  one.addEventListener("input", enableButton);
  const quarter = document.getElementById("quarter");
  quarter.addEventListener("input", enableButton);
  const dime = document.getElementById("dime");
  dime.addEventListener("input", enableButton);
  const nickel = document.getElementById("nickel");
  nickel.addEventListener("input", enableButton);
  const penny = document.getElementById("penny");
  penny.addEventListener("input", enableButton);
}

function enableButton() {
  const info = document.getElementById("form1");
  const numHundred = parseInt(info.elements["numHundred"].value);
  const numFifty = parseInt(info.elements["numFifty"].value);
  const numTwenty = parseInt(info.elements["numTwenty"].value);
  const numTen = parseInt(info.elements["numTen"].value);
  const numFive = parseInt(info.elements["numFive"].value);
  const numTwo = parseInt(info.elements["numTwo"].value);
  const numOne = parseInt(info.elements["numOne"].value);
  const numQuarters = (
    parseFloat(info.elements["valQuarters"].value) / 0.25
  ).toFixed(0);
  const numDimes = (parseFloat(info.elements["valDimes"].value) / 0.1).toFixed(
    0
  );
  const numNickels = (
    parseFloat(info.elements["valNickels"].value) / 0.05
  ).toFixed(0);
  const numPennies = (
    parseFloat(info.elements["valPennies"].value) / 0.01
  ).toFixed(0);

  const inputArray = [
    numHundred,
    numFifty,
    numTwenty,
    numTen,
    numFive,
    numTwo,
    numOne,
    numQuarters,
    numDimes,
    numNickels,
    numPennies,
  ];

  let allValid = true;
  for (item in inputArray) {
    if (isNaN(inputArray[item])) {
      allValid = false;
    }
  }

  if (allValid == true) {
    const button = document.querySelector("button");
    button.disabled = false;
  }
}

var validate = function (e) {
  var t = e.value;
  e.value =
    t.indexOf(".") >= 0
      ? t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)
      : t;
};

function toggleTheme() {
  var theme = document.getElementsByTagName("link")[0];
  switch (theme.getAttribute("href")) {
    case "memphis.css":
      theme.setAttribute("href", "victor.css");
      break;
    case "victor.css":
      theme.setAttribute("href", "madeline.css");
      break;
    case "madeline.css":
      theme.setAttribute("href", "style1.css");
      break;
    case "style1.css":
      theme.setAttribute("href", "style2.css");
      break;
    case "style2.css":
      theme.setAttribute("href", "style3.css");
      break;
    case "style3.css":
      theme.setAttribute("href", "style4.css");
      break;
    case "style4.css":
      theme.setAttribute("href", "victor.css");
      break;
  }
}

addEventListeners();

function harper() {
  document.getElementById("demo").innerHTML = "";
  const info = document.getElementById("form1");
  const numHundred = parseInt(info.elements["numHundred"].value);
  const numFifty = parseInt(info.elements["numFifty"].value);
  const numTwenty = parseInt(info.elements["numTwenty"].value);
  const numTen = parseInt(info.elements["numTen"].value);
  const numFive = parseInt(info.elements["numFive"].value);
  const numTwo = parseInt(info.elements["numTwo"].value);
  const numOne = parseInt(info.elements["numOne"].value);
  const numQuarters = (
    parseFloat(info.elements["valQuarters"].value) / 0.25
  ).toFixed(0);
  const numDimes = (parseFloat(info.elements["valDimes"].value) / 0.1).toFixed(
    0
  );
  const numNickels = (
    parseFloat(info.elements["valNickels"].value) / 0.05
  ).toFixed(0);
  const numPennies = (
    parseFloat(info.elements["valPennies"].value) / 0.01
  ).toFixed(0);
  let pullHundred = 0;
  let pullFifty = 0;
  let pullTwenty = 0;
  let pullTen = 0;
  let pullFive = 0;
  let pullTwo = 0;
  let pullOne = 0;
  let pullQuarters = 0;
  let pullDimes = 0;
  let pullNickels = 0;
  let pullPennies = 0;
  let total = (
    numHundred * 100 +
    numFifty * 50 +
    numTwenty * 20 +
    numTen * 10 +
    numFive * 5 +
    numTwo * 2 +
    numOne +
    numQuarters * 0.25 +
    numDimes * 0.1 +
    numNickels * 0.05 +
    numPennies * 0.01
  ).toFixed(2);

  let desired = total - 250;
  let track_desired = 0;

  for (let i = 0; i < numHundred; i++) {
    if ((desired - track_desired).toFixed(2) >= 100) {
      pullHundred += 1;
      track_desired += 100;
    }
  }
  for (let i = 0; i < numFifty; i++) {
    if ((desired - track_desired).toFixed(2) >= 50) {
      pullFifty += 1;
      track_desired += 50;
    }
  }
  for (let i = 0; i < numTwenty; i++) {
    if ((desired - track_desired).toFixed(2) >= 20) {
      pullTwenty += 1;
      track_desired += 20;
    }
  }
  for (let i = 0; i < numTen; i++) {
    if ((desired - track_desired).toFixed(2) >= 10) {
      pullTen += 1;
      track_desired += 10;
    }
  }
  for (let i = 0; i < numFive; i++) {
    if ((desired - track_desired).toFixed(2) >= 5) {
      pullFive += 1;
      track_desired += 5;
    }
  }
  for (let i = 0; i < numTwo; i++) {
    if ((desired - track_desired).toFixed(2) >= 2) {
      pullTwo += 1;
      track_desired += 2;
    }
  }
  for (let i = 0; i < numOne; i++) {
    if ((desired - track_desired).toFixed(2) >= 1) {
      pullOne += 1;
      track_desired += 1;
    }
  }
  for (let i = 0; i < numQuarters; i++) {
    if ((desired - track_desired).toFixed(2) >= 0.25) {
      pullQuarters += 1;
      track_desired += 0.25;
    }
  }
  for (let i = 0; i < numDimes; i++) {
    if ((desired - track_desired).toFixed(2) >= 0.1) {
      pullDimes += 1;
      track_desired += 0.1;
    }
  }

  for (let i = 0; i < numNickels; i++) {
    if ((desired - track_desired).toFixed(2) >= 0.05) {
      pullNickels += 1;
      track_desired += 0.05;
    }
  }
  for (let i = 0; i < numPennies; i++) {
    if ((desired - track_desired).toFixed(2) >= 0.01) {
      pullPennies += 1;
      track_desired += 0.01;
    }
  }
  track_desired = track_desired.toFixed(2);
  desired = desired.toFixed(2);
  write("<br>");
  write("Total: ");
  write(total);
  write("<br>");
  write("Desired: ");
  write(desired);
  write("<br>");
  write("<br>");

  if (desired != track_desired) {
    write(
      "It is impossible for you to get the right combination! \
      Please check your inputs and make sure they're all correct, I'm not even sure \
      if this is mathematically possible, I haven't thought about it too hard. \
       -Victor <br>"
    );
  }

  const pullArray = [
    pullHundred,
    pullFifty,
    pullTwenty,
    pullTen,
    pullFive,
    pullTwo,
    pullOne,
    pullQuarters,
    pullDimes,
    pullNickels,
    pullPennies,
  ];

  if (desired > 0) {
    write("Pull out the following:");
    write("<br>");
  }

  for (let i = 0; i < 11; i++) {
    if (pullArray[i] != 0) {
      if (i == 0) {
        write(pullArray[i]);
        if (pullArray[i] == 1) {
          write(" $100 bill<br>");
        } else {
          write(" $100 bills<br>");
        }
      }
      if (i == 1) {
        write(pullArray[i]);
        if (pullArray[i] == 1) {
          write(" $50 bill<br>");
        } else {
          write(" $50 bills<br>");
        }
      }
      if (i == 2) {
        write(pullArray[i]);
        if (pullArray[i] == 1) {
          write(" $20 bill<br>");
        } else {
          write(" $20 bills<br>");
        }
      }
      if (i == 3) {
        write(pullArray[i]);
        write(" $10 bills<br>");
      }
      if (i == 4) {
        write(pullArray[i]);
        if (pullArray[i] == 1) {
          write(" $5 bill<br>");
        } else {
          write(" $5 bills<br>");
        }
      }
      if (i == 5) {
        write(pullArray[i]);
        if (pullArray[i] == 1) {
          write(" $2 bill<br>");
        } else {
          write(" $2 bills<br>");
        }
      }
      if (i == 6) {
        write(pullArray[i]);
        if (pullArray[i] == 1) {
          write(" $1 bill or $1 coin<br>");
        } else {
          write(" $1 bills or $1 coins<br>");
        }
      }
      if (i == 7) {
        write(pullArray[i]);
        if (pullArray[i] == 1) {
          write(" quarter<br>");
        } else {
          write(" quarters<br>");
        }
      }
      if (i == 8) {
        write(pullArray[i]);
        if (pullArray[i] == 1) {
          write(" dime<br>");
        } else {
          write(" dimes<br>");
        }
      }
      if (i == 9) {
        write(pullArray[i]);
        if (pullArray[i] == 1) {
          write(" nickel<br>");
        } else {
          write(" nickels<br>");
        }
      }
      if (i == 10) {
        write(pullArray[i]);
        if (pullArray[i] == 1) {
          write(" penny<br>");
        } else {
          write(" pennies<br>");
        }
      }
    }
  }

  const countdownObject = {"revenue": {}, "tips": {}}

  const pullArrayKeys = [
    "pullHundred",
    "pullFifty",
    "pullTwenty",
    "pullTen",
    "pullFive",
    "pullTwo",
    "pullOne",
    "pullQuarters",
    "pullDimes",
    "pullNickels",
    "pullPennies",
  ];


  for (let i = 0; i < pullArrayKeys.length; i++) {
    countdownObject["revenue"][pullArrayKeys[i]] = pullArray[i];
  }


  const copyObject = info.elements["copyObject"].checked
  if (copyObject) {
    navigator.clipboard.writeText(JSON.stringify(countdownObject))
    write("<br>")
    write("Copied to Clipboard!")
    // write("Copy and Paste the following object in the google form <br><br>")
    // write(JSON.stringify(countdownObject))
  }


}


// {"pullHundred":8,"pullFifty":8,"pullTwenty":4,"pullTen":0,"pullFive":1,"pullTwo":0,"pullOne":1,"pullQuarters":0,"pullDimes":0,"pullNickels":0,"pullPennies":0}
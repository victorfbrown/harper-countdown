function write(input) {
  document.getElementById("demo").innerHTML += input;
}

function clearInputs() {
  previousCopy =
    document.getElementById("form1").elements["copyObject"].checked;
  document.getElementById("form1").reset();
  document.getElementById("form1").elements["copyObject"].checked =
    previousCopy;
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
  const relevantStrings = [
    "hundred",
    "fifty",
    "twenty",
    "ten",
    "five",
    "two",
    "one",
    "quarter",
    "dime",
    "nickel",
    "penny",
  ];

  for (let i = 0; i < relevantStrings.length; i++) {
    document
      .getElementById(relevantStrings[i])
      .addEventListener("input", enableButton);
  }
}

function getRevenueInputInformation() {
  const info = document.getElementById("form1");
  const numHundred = parseInt(info.elements["numHundred"].value);
  const numFifty = parseInt(info.elements["numFifty"].value);
  const numTwenty = parseInt(info.elements["numTwenty"].value);
  const numTen = parseInt(info.elements["numTen"].value);
  const numFive = parseInt(info.elements["numFive"].value);
  const numTwo = parseInt(info.elements["numTwo"].value);
  const numOne = parseInt(info.elements["numOne"].value);
  const numQuarters = parseInt(
    (parseFloat(info.elements["valQuarters"].value) / 0.25).toFixed(0)
  );
  const numDimes = parseInt(
    (parseFloat(info.elements["valDimes"].value) / 0.1).toFixed(0)
  );
  const numNickels = parseInt(
    (parseFloat(info.elements["valNickels"].value) / 0.05).toFixed(0)
  );
  const numPennies = parseInt(
    (parseFloat(info.elements["valPennies"].value) / 0.01).toFixed(0)
  );

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

  return inputArray;
}

function getTipInputInformation() {
  // TODO
  return;
}

function enableButton() {
  const revenueInputArray = getRevenueInputInformation();
  for (item in revenueInputArray) {
    if (isNaN(revenueInputArray[item])) {
      return;
    }
  }
  const button = document.querySelector("button");
  button.disabled = false;
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
  clearHTML();
  const pullArray = new Array(11).fill(0);

  const multiplierArray = [100, 50, 20, 10, 5, 2, 1, 0.25, 0.1, 0.05, 0.01];
  const revenueInputArray = getRevenueInputInformation();
  let total = 0;
  for (let i = 0; i < multiplierArray.length; i++) {
    total += revenueInputArray[i] * multiplierArray[i];
  }

  total = parseFloat(total.toFixed(2));

  let desired = total - 250;
  let track_desired = 0;

  for (let i = 0; i < revenueInputArray.length; i++) {
    let currencyAmount = revenueInputArray[i];
    let currencyValue = multiplierArray[i];
    for (let j = 0; j < currencyAmount; j++) {
      if ((desired - track_desired).toFixed(2) >= currencyValue) {
        pullArray[i] += 1;
        track_desired += currencyValue;
      }
    }
  }

  track_desired = parseFloat(track_desired.toFixed(2));
  desired = parseFloat(desired.toFixed(2));
  write("<br>Total: ");
  write(total);
  write("<br>Desired: ");
  write(desired);
  write("<br><br>");

  if (desired == 0) {
    write(
      "There is exactly $250 in the register. This is incredibly unlikely, please text or email me if you've double checked the fields and this is is still the case<br>"
    );
    write("-Victor");
    return;
  } else if (desired < 0) {
    write(
      "There is less than $250 in the register. This is borderline impossible, please text or email me if you've double checked the fields and this is is still the case<br>"
    );
    write("-Victor");
    return;
  } else if (desired != track_desired) {
    write(
      "It is either impossible for you to get the right combination or one of the fields is empty! \
      Please check the fields and make sure they're all filled in, it's mathematically possible for there\
      to be no combination of money to remove, but the odds are super low. \
      Shoot me a text or email if you can't figure out any problems!<br> \
       -Victor <br>"
    );
    return;
  }

  write("Pull out the following:");
  write("<br>");

  const pullArrayStrings = [
    " $100 bill",
    " $50 bill",
    " $20 bill",
    " $10 bill",
    " $5 bill",
    " $2 bills or coins @@@@",
    " $1 bills or coins @@@@",
    " quarter",
    " dime",
    " nickel",
    " penny @@@@@@",
  ];

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

  const countdownObject = { revenue: {}, tips: {} };

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

  const copyObject = info.elements["copyObject"].checked;
  if (copyObject) {
    navigator.clipboard.writeText(JSON.stringify(countdownObject));
    write("<br>");
    write("Copied to Clipboard!");
  }
}

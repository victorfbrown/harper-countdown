function write(input) {
  document.getElementById("demo").innerHTML += input;
}

function clearInputs(reset) {
  previousCopy =
    document.getElementById("form1").elements["copyObject"].checked;
  document.getElementById("form1").reset();
  if (!reset) {
    document.getElementById("form1").elements["copyObject"].checked =
      previousCopy;
  }
  const button = document.querySelector("button");
  button.disabled = true;
}

function reset() {
  clearHTML();
  clearInputs(true);
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

function createAndCopyObject(pullArray) {
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

  //TIPS GOES HERE!!!

  const copyObject =
    document.getElementById("form1").elements["copyObject"].checked;
  if (copyObject) {
    navigator.clipboard.writeText(JSON.stringify(countdownObject));
    write("<br>");
    write("Copied to Clipboard!");
  }
}

function writePullAmount(pullArray) {
  write("Pull out the following:");
  write("<br>");
  const pullArrayStrings = [
    " $100 bill",
    " $50 bill",
    " $20 bill",
    " $10 bill",
    " $5 bill",
    " $2 bill or coin",
    " $1 bill or coin",
    " quarter",
    " dime",
    " nickel",
    " penny",
  ];
  for (let i = 0; i < pullArray.length; i++) {
    let currencyAmount = pullArray[i];

    if (currencyAmount == 0) {
      continue;
    }

    let currencyString = "";
    let standardEnglish = false;
    if (i == 5 && currencyAmount > 1) {
      currencyString = " $2 bills or coins ";
    } else if (i == 6 && currencyAmount > 1) {
      currencyString = " $1 bills or coins ";
    } else if (i == 10 && currencyAmount > 1) {
      currencyString = " pennies";
    } else {
      currencyString = pullArrayStrings[i];
      standardEnglish = true;
    }

    write(currencyAmount);
    write(" ");
    write(currencyString);

    if (currencyAmount > 1 && standardEnglish) {
      write("s");
    }

    write("<br>");
  }
}

function errorCheck(desired, trackDesired) {
  let error = true;
  if (desired == 0) {
    write(
      "There is exactly $250 in the register. This is incredibly unlikely, please text or email me if you've double checked the fields and this is is still the case<br>"
    );
    write("-Victor");
  } else if (desired < 0) {
    write(
      "There is less than $250 in the register. This is borderline impossible, please text or email me if you've double checked the fields and this is is still the case<br>"
    );
    write("-Victor");
  } else if (desired != trackDesired) {
    write(
      "It is either impossible for you to get the right combination or one of the fields is empty! \
      Please check the fields and make sure they're all filled in, it's mathematically possible for there\
      to be no combination of money to remove, but the odds are super low. \
      Shoot me a text or email if you can't figure out any problems!<br> \
       -Victor <br>"
    );
  } else {
    error = false;
  }
  return error;
}

function getTotal(revenueInputArray, multiplierArray) {
  let total = 0;
  for (let i = 0; i < multiplierArray.length; i++) {
    total += revenueInputArray[i] * multiplierArray[i];
  }
  total = parseFloat(total.toFixed(2));
  return total;
}

addEventListeners();

function harper() {
  clearHTML();
  const revenueInputArray = getRevenueInputInformation();
  const pullArray = new Array(11).fill(0);
  const multiplierArray = [100, 50, 20, 10, 5, 2, 1, 0.25, 0.1, 0.05, 0.01];

  let total = getTotal(revenueInputArray, multiplierArray);
  let desired = total - 250;
  let trackDesired = 0;

  for (let i = 0; i < revenueInputArray.length; i++) {
    let currencyAmount = revenueInputArray[i];
    let currencyValue = multiplierArray[i];
    for (let j = 0; j < currencyAmount; j++) {
      if ((desired - trackDesired).toFixed(2) >= currencyValue) {
        pullArray[i] += 1;
        trackDesired += currencyValue;
      }
    }
  }

  trackDesired = parseFloat(trackDesired.toFixed(2));
  desired = parseFloat(desired.toFixed(2));

  write("<br>Total: ");
  write(total);
  write("<br>Desired: ");
  write(desired);
  write("<br><br>");

  let errorExists = errorCheck(desired, trackDesired);
  if (errorExists) {
    return;
  }

  writePullAmount(pullArray);
  createAndCopyObject(pullArray);
}

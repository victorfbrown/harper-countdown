function write(input) {
  document.getElementById("demo").innerHTML += input;
}

function newline(amount) {
  amount = typeof amount !== "undefined" ? amount : 1;
  for (let i = 0; i < amount; i++) {
    write("<br>");
  }
}

function clearInputs(reset) {
  // previousCopy =
  //   document.getElementById("form1").elements["copyObject"].checked;
  document.getElementById("form1").reset();
  // if (!reset) {
  //   document.getElementById("form1").elements["copyObject"].checked =
  //     previousCopy;
  // }
  const button = document.querySelector("button");
  button.disabled = true;
}

function reset() {
  //do I want the reset button to reset the radio button?
  //Also do I want to have this copy button even available??
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

  document.getElementById("tips").addEventListener("input", setInnerText);
  document.getElementById("revenue").addEventListener("input", setInnerText);
}

function setInnerText() {
  const isTip = document.getElementById("tips").checked;
  const coinTextStrings = [
    "quarterText",
    "dimeText",
    "nickelText",
    "pennyText",
  ];
  const coinStrings = [
    " of Quarters?",
    " of Dimes?",
    " of Nickels?",
    " of Pennies?",
  ];

  for (let i = 0; i < coinTextStrings.length; i++) {
    const coinName = coinTextStrings[i];
    let relevantText = isTip
      ? "Number" + coinStrings[i]
      : "Value" + coinStrings[i];

    document.getElementById(coinName).innerText = relevantText;
  }

  document.getElementById("submitButton").innerText = isTip
    ? "Submit Tips"
    : "Submit Revenue";
}

function getInputInformation(isTip) {
  const info = document.getElementById("form1");
  const inputArray = [];

  const inputBillStrings = [
    "numHundred",
    "numFifty",
    "numTwenty",
    "numTen",
    "numFive",
    "numTwo",
    "numOne",
  ];

  const inputCoinStrings = [
    "valQuarters",
    "valDimes",
    "valNickels",
    "valPennies",
  ];

  const coinValuesObject = {
    valQuarters: 0.25,
    valDimes: 0.1,
    valNickels: 0.05,
    valPennies: 0.01,
  };

  for (let i = 0; i < inputBillStrings.length; i++) {
    let revenueName = inputBillStrings[i];
    let revenueValue = parseInt(info.elements[revenueName].value);
    inputArray.push(revenueValue);
  }

  for (let i = 0; i < inputCoinStrings.length; i++) {
    let revenueName = inputCoinStrings[i];
    let coinValue = coinValuesObject[revenueName];
    let revenueValue = 0;

    if (!isTip) {
      if (info.elements[revenueName].value == "") {
        revenueValue = NaN;
      } else {
        revenueValue = Math.round(info.elements[revenueName].value / coinValue);
      }
    } else {
      revenueValue = parseInt(info.elements[revenueName].value);
    }
    inputArray.push(revenueValue);
  }

  return inputArray;
}

function enableButton() {
  const isTip = document.getElementById("tips").checked;
  const inputArray = getInputInformation(isTip);
  for (item in inputArray) {
    if (isNaN(inputArray[item])) {
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

function createAndCopyObject(pullArray, isTip) {
  let countdownObject = isTip ? { tips: {} } : { revenue: {} };
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

  const typeObject = isTip ? "tips" : "revenue";
  for (let i = 0; i < pullArrayKeys.length; i++) {
    countdownObject[typeObject][pullArrayKeys[i]] = pullArray[i];
  }

  const copyObject = true;
  // const copyObject =
  //   document.getElementById("form1").elements["copyObject"].checked;
  // I commented out the option to unclick the checkbox because I don't want anyone to ever manually submit things while I'm FM
  // I'll update it whenever I transfer ownership over to the FM
  if (copyObject) {
    navigator.clipboard.writeText(JSON.stringify(countdownObject));
    write("Copied to Clipboard!");
  }
}

function writePullAmount(pullArray, isTip) {
  if (!pullArray.some((item) => item !== 0)) {
    return;
  }

  if (isTip) {
    write("Put the following in the tip envelope:");
  } else {
    write("Pull out the following:");
  }
  newline();
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
    newline();
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
       -Victor"
    );
    newline();
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

function createCoinInputObject(coinInputArray) {
  const inputCoinStrings = [
    "numQuarters",
    "numDimes",
    "numNickels",
    "numPennies",
  ];
  const coinInputObject = {};
  for (let i = 0; i < inputCoinStrings.length; i++) {
    coinInputObject[inputCoinStrings[i]] = coinInputArray[i];
  }
  return coinInputObject;
}

function subtractCoinInputObjects(object1, object2) {
  const subtractedObject = {
    numQuarters: object1["numQuarters"] - object2["numQuarters"],
    numDimes: object1["numDimes"] - object2["numDimes"],
    numNickels: object1["numNickels"] - object2["numNickels"],
    numPennies: object1["numPennies"] - object2["numPennies"],
  };
  return subtractedObject;
}

function harper() {
  clearHTML();
  let pullArray = new Array(11).fill(0);
  const isTip = document.getElementById("tips").checked;
  newline();
  if (!isTip) {
    const revenueInputArray = getInputInformation(isTip);
    // write(revenueInputArray);
    const billInputArray = revenueInputArray.slice(0, 7);
    const coinInputArray = revenueInputArray.slice(-4);

    // newline();
    // write("-------------");
    // newline();
    // write(billInputArray);
    // newline();
    // write("-------------");
    // newline();
    // write(coinInputArray);
    // newline();
    // write("-------------");

    const multiplierArray = [100, 50, 20, 10, 5, 2, 1, 0.25, 0.1, 0.05, 0.01];

    let total = getTotal(revenueInputArray, multiplierArray);
    let desired = total - 250;
    let trackDesired = 0;

    for (let i = 0; i < billInputArray.length; i++) {
      let currencyAmount = billInputArray[i];
      let currencyValue = multiplierArray[i];
      for (let j = 0; j < currencyAmount; j++) {
        if (parseInt(desired - trackDesired) >= currencyValue) {
          pullArray[i] += 1;
          trackDesired += currencyValue;
        }
      }
    }

    // refactor this so we prioritize pennies, nickels, dimes, quarters
    // need to figure out flowchart of how to do this

    // Commented for Push
    // const remainingCoinDifference = parseFloat(
    //   (desired - trackDesired).toFixed(2)
    // );
    // write("coin difference: ");
    // write(remainingCoinDifference);
    // newline();

    const priorIndex = billInputArray.length;

    // big coin prioritized when pulling out
    for (let i = 0; i < coinInputArray.length; i++) {
      let currencyAmount = coinInputArray[i];
      let currencyValue = multiplierArray[priorIndex + i];
      for (let j = 0; j < currencyAmount; j++) {
        if ((desired - trackDesired).toFixed(2) >= currencyValue) {
          pullArray[priorIndex + i] += 1;
          trackDesired += currencyValue;
        }
      }
    }

    //PROBLEM!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Commented for Push
    // little coin prioritized when pulling out
    // for (let i = 3; i > 0; i--) {
    //   let currencyAmount = coinInputArray[i];
    //   let currencyValue = multiplierArray[priorIndex + i];
    //   write((desired - trackDesired).toFixed(2));
    //   newline();
    //   for (let j = 0; j < currencyAmount; j++) {
    //     if ((desired - trackDesired).toFixed(2) >= currencyValue) {
    //       pullArray[priorIndex + i] += 1;
    //       trackDesired += currencyValue;
    //     }
    //   }
    // }

    const coinInputObject = createCoinInputObject(coinInputArray);
    const idealCoinObject = createCoinInputObject(pullArray.slice(-4));
    const remainingCoinsObject = subtractCoinInputObjects(
      coinInputObject,
      idealCoinObject
    );

    //here we rearrange the coins
    // AHHHHHHHHHHHHHHHHHHHHHHHHHH
    // remainingCoinsObject
    // idealCoinObject['numPennies'] =
    // AHHHHHHHHHHHHHHHHHHHHHHHHHH

    // Commented for Push
    // write("all coins:");
    // write(JSON.stringify(coinInputObject));
    // newline();
    // write("prioritizing big:");
    // write(JSON.stringify(idealCoinObject));
    // newline();
    // write("remaining coins:");
    // write(JSON.stringify(remainingCoinsObject));
    // newline();

    trackDesired = parseFloat(trackDesired.toFixed(2));
    desired = parseFloat(desired.toFixed(2));
    write("Total: " + String(total));
    newline();
    write("Desired: " + String(desired));
    newline(2);

    let errorExists = errorCheck(desired, trackDesired);
    if (errorExists) {
      return;
    }
  } else {
    const tipInputArray = getInputInformation(isTip);
    pullArray = tipInputArray;
  }
  writePullAmount(pullArray, isTip);
  createAndCopyObject(pullArray, isTip);
}

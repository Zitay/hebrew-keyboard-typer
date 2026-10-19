const wordsAmount = 10;

async function readTxtFile(filename) {
  const response = await fetch(filename);
  return await response.text();
}

function splitTxtLines(txt) {
  splitedLines = txt.split('\n');
  for (let i = 0; i < splitedLines.length; i++) {
    splitedLines[i] = splitedLines[i].trim();
    if (splitedLines[i].length < 1) {
      splitedLines.splice(i, 1);
      i--;
    }
  }
  return splitedLines;

}

function chooseRandomAmountOfWords(wordsArray, amount) {
  finalWord = "";

  for (let i = 0; i < amount; i++) {
    const randomWords = Math.floor(Math.random() * wordsArray.length);
    chosenWord = wordsArray[randomWords];
    finalWord += chosenWord + " ";
  }

  return finalWord;
}

// Creates a random sentence from the splitedHberewWords and displays it in the sentence element, and clear all elements
function createRandomSentence(splitedHberewWords, amount) {
  // Choose x random words
  randomSentence = chooseRandomAmountOfWords(splitedHberewWords, wordsAmount);
  console.log(randomSentence);

  let sentenceElement = document.getElementById('sentence');
  sentenceElement.textContent = randomSentence;

  // clear user input element
  let userInputElement = document.getElementById('userInput');
  userInputElement.textContent = "";

  // clear sentence correction element
  let sentenceCorrectionElement = document.getElementById('sentenceCorrection');
  sentenceCorrectionElement.textContent = "";

  return randomSentence;
}


async function main() {
  // Load the random Hebrew words
  const randomHebrewWordsConnected = await readTxtFile('1000-most-common-hebrew.txt');
  const splitedHberewWords = splitTxtLines(randomHebrewWordsConnected);

  // Choose x random words
  randomSentence = createRandomSentence(splitedHberewWords, wordsAmount);

  // create user input element and sentence correction element
  let userInputElement = document.getElementById('userInput');
  let sentenceCorrectionElement = document.getElementById('sentenceCorrection');

  // Listen for keypress events
  document.addEventListener('keypress', function (event) {
    console.log('Key pressed: ' + event.key);
    // If input is in List then ignore
    if (["Enter", "Delete"].includes(event.key)) {

    }
    else {
      // add input key to user input element
      userInputElement.textContent += event.key;
      userInputElement.textContent.trim();

      // if user input matches the random sentence up to the length of the user input, add the key to the sentence correction element
      if (userInputElement.textContent.trim() == randomSentence.slice(0, userInputElement.textContent.length).trim()) {
        sentenceCorrectionElement.textContent += event.key;
      }
    }

    console.log("User input: " + userInputElement.textContent);

    // if user input mmatches random sentence, then clear all and start from begining
    if (userInputElement.textContent.trim() == randomSentence.trim()) {
      console.log("User has finished typing the sentence!");
      createRandomSentence(splitedHberewWords, wordsAmount);
    }

  });

  // Listen for keydown events
  document.addEventListener('keydown', function (event) {

    // if Backspace is pressed (delete), remove last chracter from elements
    if (event.key === 'Backspace') {

      // if user input matches the random sentence up to the length of the user input, remove last character from sentence correction element
      if (userInputElement.textContent == sentenceCorrectionElement.textContent) {
        sentenceCorrectionElement.textContent = sentenceCorrectionElement.textContent.slice(0, -1);

      }

      // simply remove last character from user input element
      userInputElement.textContent = userInputElement.textContent.slice(0, -1);


    }
  });


}

main();
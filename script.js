async function readTxtFile(filename) {
  const response = await fetch(filename);
  return await response.text();
}

function splitTxtLines(txt) {
  splitedLines = txt.split('\n');
  return splitedLines;

}

function chooseRandomAmountOfWords(wordsArray, amount) {
    finalWord = "";


    for (let i = 0; i < amount; i++)
    {
      const randomWords = Math.floor(Math.random() * wordsArray.length);
      chosenWord = wordsArray[randomWords];
      finalWord += chosenWord + " ";
    }

    return finalWord; 
}


async function main() {
  // Load the random Hebrew words
  const randomHebrewWordsConnected = await readTxtFile('all_no_fatverb.txt');
  const splitedHberewWords = splitTxtLines(randomHebrewWordsConnected);
  console.log(splitedHberewWords);

  // Choose 5 random words
  randomSentence = chooseRandomAmountOfWords(splitedHberewWords, 5);
  console.log(randomSentence);

  let title = document.getElementById('title');
  title.textContent = randomSentence;
}

main();
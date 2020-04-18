function wordsInRow(mdString) {
  // regex returning an array
  // index 0 will be the full html string
  // index 1 will be the group with out tag'
  const stingGroup = />(.*)</.exec(mdString);
  const wordCount = stingGroup[1].trim().split(" ");
  return wordCount;
}

function reduceNumberCount(list) {
  const sumOfNumber = list.reduce((total, current) => {
    return total + current;
  });
  return sumOfNumber;
}

function wordsPerDoc(mdInput) {
  let numWordsPerRow = mdInput.map((x) => {
    return x.length;
  });
  const totalNumbWordCount = reduceNumberCount(numWordsPerRow);
  return totalNumbWordCount;
}

function letterPerDoc(mdInput) {
  const letterPerRow = mdInput.map((x) => x.join("").length);
  const letterTotal = reduceNumberCount(letterPerRow);
  return letterTotal;
}

function docStats(mdStrings) {
  const htmlInputString = mdStrings.map((x) => {
    // array of words,
    return wordsInRow(x);
  });

  // Number of Word in Document
  const numbOfDocWords = wordsPerDoc(htmlInputString);

  //Number of Letter in Document
  const numbOfLetters = letterPerDoc(htmlInputString);

  const GOAL = {
    row: mdStrings.length,
    word: numbOfDocWords,
    letter: numbOfLetters,
  };
  return GOAL;
}

export default docStats;

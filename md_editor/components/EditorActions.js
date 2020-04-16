import React, { useState, useEffect } from "react";
export default function EditorActions(props) {
  const [documentRowCount, updateDocRowCount] = useState(0);
  const [documentWordCount, updateDocWordCount] = useState(0);
  const [documentLetterCount, updateLetterCount] = useState(0);

  function htmlTagCount(mdString) {
    const htmlTag = /<(\w)>/.exec(mdString);
    return htmlTag[1];
  }

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
      wordCount: numbOfDocWords,
      letterCount: numbOfLetters,
    };
    return GOAL;
  }

  useEffect(() => {
    const cleanDocString = props.FullMkList.filter((string) => {
      return string != "";
    });

    const docCounts = docStats(cleanDocString);
    updateDocRowCount(props.FullMkList.length);
    updateDocWordCount(docCounts.wordCount);
    updateLetterCount(docCounts.letterCount);
  });

  return (
    <div className="editor__actions">
      <div className="editor__actionButton">
        <button> Clear </button>
        <button> ENTER </button>
      </div>
      <div className="editor__stats">
        <p>
          Row Count:<span>{documentRowCount}</span>
        </p>
        <p>
          Word Count: <span>{documentWordCount}</span>
        </p>
        <p>
          Letter Count: <span>{documentLetterCount}</span>
        </p>
      </div>

      <style jsx>{`
        .sheet__actions {
          background-color: #f3f8f8;
          display: flex;
          flex-flow: column;
          justify-content: space-evenly;
        }
        .editor__stats {
          display: flex;
          flex-flow: column;
        }
        .editor__actionButton {
          display: flex;
          justify-content: space-evenly;
        }
      `}</style>
    </div>
  );
}

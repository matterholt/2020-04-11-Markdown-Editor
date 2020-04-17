import React, { useState, useEffect } from "react";
import DocCounterCard from "./DocCounterCard";

export default function EditorActions(props) {
  const [documentRowCount, updateDocRowCount] = useState(0);
  const [documentWordCount, updateDocWordCount] = useState(0);
  const [documentLetterCount, updateLetterCount] = useState(0);
  const [documentTags, updateDocTags] = useState([]);

  function htmlTags(mdString) {
    const htmlTag = /<(\w+)/.exec(mdString);
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

  function tagOBject() {
    // make the tag
  }

  useEffect(() => {
    console.log(props.FullMkList);
    if (props.FullMkList.length != 0 && props.FullMkList[0] != undefined) {
      const removeEmptyIndex = props.FullMkList.filter((string) => {
        return string != "";
      });
      const replaceNewLine = removeEmptyIndex.map((x) =>
        x.replace(/(\r\n|\n|\r)/gm, " ")
      );
      const htmlTagslist = replaceNewLine.map((htmlString) => {
        return htmlTags(htmlString);
      });
      console.log(htmlTagslist);

      const docCounts = docStats(replaceNewLine);
      updateDocRowCount(props.FullMkList.length);
      updateDocWordCount(docCounts.wordCount);
      updateLetterCount(docCounts.letterCount);
    } else {
      updateDocRowCount(0);
      updateDocWordCount(0);
      updateLetterCount(0);
    }
  });

  return (
    <div className="editor__stats">
      <DocCounterCard countName="Rows #" countAmount={documentRowCount} />
      <DocCounterCard countName="Word #" countAmount={documentWordCount} />
      <DocCounterCard countName="Letter #" countAmount={documentLetterCount} />
      <div>
        <DocCounterCard countName="Tags #" countAmount="T.B.D" />
      </div>
      <style jsx>{`
        .editor__stats {
          min-height: 200px;
          margin-top: 50px;
          background: linear-gradient(#f3f8f8, #243233);
          background: #f3f8f8;

          display: flex;
          justify-content: space-evenly;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}

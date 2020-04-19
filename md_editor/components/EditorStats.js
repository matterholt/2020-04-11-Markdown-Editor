import React, { useState, useEffect } from "react";
import DocCounterCard from "../components/DocCounterCard";

import docStats from "../logic/mdDocWordCount";
import docTagCounter from "../logic/mdDocTagCount";
import mdCleanUpList from "../logic/mdCleanUpList";

function CounterSection(props) {
  const tagValues = Object.keys(props.htmlTagGroup);
  if (tagValues.length != 0) {
    return (
      <div>
        <h3>{props.title}</h3>
        <div>
          {tagValues.map((tagName, ListID) => {
            return (
              <DocCounterCard
                key={ListID}
                countName={tagName}
                countAmount={props.htmlTagGroup[tagName]}
              />
            );
          })}
        </div>
        <style jsx>{`
          div {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
          }
        `}</style>
      </div>
    );
  } else {
    return <p>No Content</p>;
  }
}

export default function EditorActions(props) {
  // what if we put the clean list up here
  const [docCheckedList, updateDocCheckList] = useState([]);
  const [documentTags, updateDocTags] = useState({});
  const [documentCountInput, updateDocCountInput] = useState({});
  // for visuals would it be better for useReducer or custom Hook??
  const [isShown, setIsShown] = useState({
    wordCount: false,
    tagCount: false,
  });

  function setVisuals(e) {
    const currentComp = e.target.name;
    const testisShown = !isShown[currentComp];
    setIsShown({ ...isShown, [currentComp]: testisShown });
  }

  useEffect(() => {
    if (props.FullMkList.length != 0) {
      const mkDocListClean = mdCleanUpList(props.FullMkList);
      updateDocCheckList(mkDocListClean);
    } else {
      updateDocTags({});
      updateDocCountInput({});
    }
  }, [props.FullMkList]);

  useEffect(() => {
    if (docCheckedList.length != 0) {
      const tagCounter = docTagCounter(docCheckedList);
      const docCounts = docStats(docCheckedList);

      updateDocTags(tagCounter);
      updateDocCountInput(docCounts);

      // updateDocRowCount(props.FullMkList.length);
      // updateDocWordCount(docCounts.wordCount);
      // updateLetterCount(docCounts.letterCount);
    }
  }, [docCheckedList]);
  useEffect(() => {
    console.log(isShown);
  });

  return (
    <div className="editor__stats">
      <button name="wordCount" onClick={(e) => setVisuals(e)}>
        Word Count
      </button>
      {isShown.wordCount ? (
        <CounterSection title="Doc Counter" htmlTagGroup={documentCountInput} />
      ) : null}
      <button name="tagCount" onClick={(e) => setVisuals(e)}>
        HTMl Tag Count
      </button>
      {isShown.tagCount ? (
        <CounterSection title="Tags Counter" htmlTagGroup={documentTags} />
      ) : null}
      <style jsx>{`
        .editor__stats {
          min-height: 200px;
          margin-top: 50px;
          background: linear-gradient(#f3f8f8, #243233);
          background: #f3f8f8;
          display: flex;
          flex-flow: column;
        }
      `}</style>
    </div>
  );
}

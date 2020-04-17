import React, { useState, useEffect } from "react";

import docStats from "../logic/mdDocWordCount";
import docTagCounter from "../logic/mdDocTagCount";
import mdCleanUpList from "../logic/mdCleanUpList";

function DocCounterCard(props) {
  if (props.countAmount != 0) {
    return (
      <div className="counter__Card">
        <h4>{props.countName}</h4>
        <p>{props.countAmount}</p>
        <style jsx>{`
        h4 {
          background-color: #596465;
          color: #f0f5f5;
          margin: 0;
          padding: 10px 5px 0px 5px;
          height: 30px;
          width: 100%;
          text-align: center;
          letter
        }
        .counter__Card {
          background-color: #f0f5f5;
          box-shadow: 5px 5px 9px #5e6566;
          overflow: hidden;
          border-radius: 5px;
          height: 100px;
          display: flex;
          flex-flow: column;
          align-items: center;
          min-width: 70px;
          max-width: 100px;
          color: #243233;
          font-weight: 900;
          margin: 5px;
        }
      `}</style>
      </div>
    );
  } else {
    return null;
  }
}

function TagsInDocument(props) {
  const [isTagInfoShown, SwitchIsTagInfoShown] = useState(false);
  const tagValues = Object.keys(props.htmlTagGroup);

  if (tagValues != 0) {
    return (
      <div>
        <h3>{props.title}</h3>
        {tagValues.map((tagName, ListID) => {
          return (
            <DocCounterCard
              key={ListID}
              countName={tagName}
              countAmount={props.htmlTagGroup[tagName]}
            />
          );
        })}
        <style jsx>{`
          div {
            width: 100%;
            border: black solid 1px;
            display: flex;
            flex-wrap: wrap;
          }
        `}</style>
      </div>
    );
  } else {
    return <p>No Data</p>;
  }
}
function CharsInDocument(props) {}

export default function EditorActions(props) {
  // what if we put the clean list up here
  const [docCheckedList, updateDocCheckList] = useState([]);
  // const [documentRowCount, updateDocRowCount] = useState(0);
  // const [documentWordCount, updateDocWordCount] = useState(0);
  // const [documentLetterCount, updateLetterCount] = useState(0);
  const [documentTags, updateDocTags] = useState({});
  const [documentUserInput, updateDocUserInput] = useState({});

  useEffect(() => {
    if (props.FullMkList.length != 0) {
      const mkDocListClean = mdCleanUpList(props.FullMkList);
      updateDocCheckList(mkDocListClean);
    } else {
      updateDocRowCount(0);
      updateDocWordCount(0);
      updateLetterCount(0);
      updateDocTags({});
    }
  }, [props.FullMkList]);

  useEffect(() => {
    if (docCheckedList.length != 0) {
      const tagCounter = docTagCounter(docCheckedList);
      const docCounts = docStats(docCheckedList);

      updateDocTags(tagCounter);
      updateDocUserInput(docCounts);

      updateDocRowCount(props.FullMkList.length);
      updateDocWordCount(docCounts.wordCount);
      updateLetterCount(docCounts.letterCount);
    }
  }, [docCheckedList]);

  return (
    <div className="editor__stats">
      {/* <DocCounterCard countName="Rows #" countAmount={documentRowCount} />
      <DocCounterCard countName="Word #" countAmount={documentWordCount} />
      <DocCounterCard countName="Letter #" countAmount={documentLetterCount} /> */}
      <documentUserInput title="" docCharCount={docCounts} />
      <TagsInDocument title="Tags #" htmlTagGroup={documentTags} />

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

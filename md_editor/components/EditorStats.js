import React, { useState, useEffect } from "react";
import DocCounterCard from "./DocCounterCard";

import docStats from "../logic/mdDocWordCount";
import docTagCounter from "../logic/mdDocTagCount";
import mdCleanUpList from "../logic/mdCleanUpList";

function TagsInDocument(props) {
  const tagValues = Object.keys(props.htmlTagGroup);

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
        }
      `}</style>
    </div>
  );
}

export default function EditorActions(props) {
  // what if we put the clean list up here
  const [docCheckedList, updateDocCheckList] = useState([]);
  const [documentRowCount, updateDocRowCount] = useState(0);
  const [documentWordCount, updateDocWordCount] = useState(0);
  const [documentLetterCount, updateLetterCount] = useState(0);
  const [documentTags, updateDocTags] = useState({});

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
      updateDocRowCount(props.FullMkList.length);
      updateDocWordCount(docCounts.wordCount);
      updateLetterCount(docCounts.letterCount);
    }
  }, [docCheckedList]);

  return (
    <div className="editor__stats">
      <DocCounterCard countName="Rows #" countAmount={documentRowCount} />
      <DocCounterCard countName="Word #" countAmount={documentWordCount} />
      <DocCounterCard countName="Letter #" countAmount={documentLetterCount} />
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

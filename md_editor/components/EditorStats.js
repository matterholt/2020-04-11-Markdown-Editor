import React, { useState, useEffect } from "react";
import DocCounterCard from "../components/DocCounterCard";

import docStats from "../logic/mdDocWordCount";
import docTagCounter from "../logic/mdDocTagCount";
import mdCleanUpList from "../logic/mdCleanUpList";

function CounterSection(props) {
  const [isTagInfoShown, SwitchIsTagInfoShown] = useState(false);
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
          display: flex;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}

export default function EditorActions(props) {
  // what if we put the clean list up here
  const [docCheckedList, updateDocCheckList] = useState([]);
  const [documentTags, updateDocTags] = useState({});
  const [documentCountInput, updateDocCountInput] = useState({});

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

  return (
    <div className="editor__stats">
      <CounterSection title="Doc Counter" htmlTagGroup={documentCountInput} />
      <CounterSection title="Tags Counter" htmlTagGroup={documentTags} />
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

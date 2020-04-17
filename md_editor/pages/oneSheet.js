import React, { useState } from "react";
let showdown = require("showdown");

import Header from "../components/Header";
import Footer from "../components/Footer";
import EditorActions from "../components/EditorActions";
import EditorStats from "../components/EditorStats";
import MdCompileLine from "../components/MdCompileLine";
import NewEmptyDoc from "../components/NewEmptyDoc";

function MkdownInput(props) {
  const [userInput, setUserInput] = useState();
  const refInput = React.createRef();
  function handleSubmit(event) {
    event.preventDefault();
    props.sendToMain(userInput);
    refInput.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setUserInput("");
  }

  return (
    <form onSubmit={handleSubmit} className="userInput__container">
      <label htmlFor="userEntryInput" className="userInput__helper">
        Text Input Below
      </label>
      <input
        type="text"
        name="userEntryInput"
        spellcheck="true"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        ref={refInput}
        className="userInput__entryInput"
        placeholder="Add Content"
      />

      <input type="submit" value="Submit" />

      <style jsx>{`
        .userInput__container {
          display: flex;
          flex-flow: column;
          margin-top: 10px;
        }
        .userInput__entryInput {
          width: auto;
          margin: 10px 0;
          padding: 10px;
          border: none;
          font-size: 12px;
          transition: all 0.2s ease-in-out;
          resize: none;
          color: black;
        }
        .userInput__entryInput:hover {
          background: #838d8d;
          border-radius: 2px;
          transition: all 0.2s ease-in-out;
          transform: scale(1.05);
        }
        .userInput__entryInput:focus {
          background: #ecf1f1;
          color: black;
          box-shadow: 3px 4px 5px #1d2929;
          z-index: 10;
          border-radius: 2px;
          border: none;
          outline: none;
          transition: all 0.2s ease-in-out;
          transform: scale(1.05);
          overflow-wrap: break-word;
        }
        .userInput__helper {
          font-size: 12px;
          text-align: center;
          padding: 5px 0;
          background-color: #adb4b4;
          color: white;
        }
      `}</style>
    </form>
  );
}

function MkdownOutput(props) {
  const userMarkdowns = props.saveMdlines;
  if (userMarkdowns != 0) {
    return (
      <ol>
        {userMarkdowns.map((mdUserLine, mdLineNum) => (
          <MdCompileLine
            key={mdLineNum}
            mdUserLine={mdUserLine}
            mdLineNum={mdLineNum}
          />
        ))}
        <style jsx>{`
          ol {
            margin: 0;
            padding: 10px;
            list-style: none;
            background: #f3f8f8;
          }
        `}</style>
        <style global jsx>{`
          .mdLine__rowList {
            display: flex;
            margin: 2px 0;
            overflow-wrap: break-word;
            border-bottom: solid 2px #b9cccc30;
            min-height: 35px;
          }
          .mdLine__string {
            align-self: center;
            padding-left: 10px;
            padding-right: 10px;
          }
          .mdLine__string * {
            padding-top: 0;
            padding-bottom: 0;
            margin: 0;
          }
        `}</style>
      </ol>
    );
  } else {
    return <NewEmptyDoc />;
  }
}

function OneSheet() {
  const [mdInputList, updateMdInputList] = useState([]);

  const upateMdList = (userMd) => {
    function convertInput(userMd) {
      let converter = new showdown.Converter(),
        html = converter.makeHtml(userMd);
      return html;
    }
    let convertedHtml = convertInput(userMd);
    updateMdInputList([...mdInputList, convertedHtml]);
  };

  const clearMkDownList = () => {
    updateMdInputList([]);
  };

  return (
    <div>
      <Header />
      <main className="sheet__container">
        <div className="sheet">
          <MkdownOutput saveMdlines={mdInputList} />
          <EditorActions clearList={clearMkDownList} />
          <MkdownInput sendToMain={upateMdList} />
          <EditorStats FullMkList={mdInputList} />
        </div>
      </main>

      <Footer />
      <style jsx>
        {`
          .sheet__container {
            background: #243233;
            min-height: 100vh;
            max-width: 100vw;
            display: flex;
            justify-content: center;
          }
          .sheet {
            background: #f3f8f8;
            width: 70%;
            height: max-content;
            margin-top: 20px;
          }
        `}
      </style>
      <style global jsx>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
}

export default OneSheet;

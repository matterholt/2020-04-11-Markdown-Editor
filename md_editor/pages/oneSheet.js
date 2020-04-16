import React, { useState } from "react";
let showdown = require("showdown");

import Header from "../components/Header";
import Footer from "../components/Footer";
import EditorActions from "../components/EditorActions";

function MkdownInput(props) {
  const [userInput, setUserInput] = useState("");
  const refInput = React.createRef();

  function enterKeyEvent() {
    // if enter key is hit then will clear state of input
    //  and send string to the out put
    let keyCode = event.keyCode;
    if (keyCode === 13) {
      props.sendToMain(userInput);
      setUserInput("");
      refInput.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }
  return (
    <div className="userInput__container">
      <input
        ref={refInput}
        className="userInput__entryInput"
        placeholder="Add Content"
        onKeyPress={enterKeyEvent}
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
      />

      <style jsx>{`
        .userInput__container {
          display: flex;
          flex-flow: column;
        }
        .userInput__entryInput {
          background: gray;
          width: auto;
          margin: 35px 0;
          padding: 10px 2px;
          border: none;
          font-size: 10px;
          transition: all 0.2s ease-in-out;
        }

        .userInput__entryInput:hover {
          background: #838d8d;
          border-radius: 2px;
          transition: all 0.2s ease-in-out;
          transform: scale(1.2);
        }
        .userInput__entryInput:focus {
          background: #ecf1f1;
          box-shadow: 3px 4px 5px #1d2929;
          z-index: 10;
          border-radius: 2px;
          transition: all 0.2s ease-in-out;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}

function MdLine(props) {
  var stringToHTML = props.mdUserLine;
  function createInnerHtml() {
    return {
      __html: stringToHTML,
    };
  }

  return (
    <li className="mdLine__row" key={props.mdLineNum}>
      <div
        className="mdLine__string"
        dangerouslySetInnerHTML={createInnerHtml()}
      ></div>
      <style jsx>{`
        .mdLine__row {
          display: flex;
          margin: 2px 0;
          overflow-wrap: break-word;
          border-bottom: solid 2px #b9cccc30;
          min-height: 51px;
        }
        .mdLine__indicator {
          padding: 5px;
          color: #4a7677;
          min-width: 16px;
          margin-right: 5px;
          background-color: #d2dfdf;
          text-align: center;
          height: 100%;
          align-self: center;
        }
        .mdLine__string {
          align-self: center;
          padding-left: 10px;
          padding-right: 10px;
          padding-top: 0;
          padding-bottom: 0;
          margin: 0;
        }
      `}</style>
    </li>
  );
}

function MkdownOutput(props) {
  const userMarkdowns = props.saveMdlines;

  return (
    <ol>
      {userMarkdowns.map((mdUserLine, mdLineNum) => (
        <MdLine mdUserLine={mdUserLine} mdLineNum={mdLineNum} />
      ))}
      <style jsx>{`
        ol {
          margin: 0;
          padding: 0;
          list-style: none;
          background: #f3f8f8;
        }
      `}</style>
    </ol>
  );
}

function OneSheet() {
  const [mdInputList, updateMdInputList] = useState([
    "<h1> row one is here </h1>",
    "<p> row two is here </p>",
    "",
    "<p>A</p>",
    "<p>9</p>",
  ]);

  const upateMdList = (userMd) => {
    function convertInput(userInput) {
      let converter = new showdown.Converter(),
        html = converter.makeHtml(userInput);
      return html;
    }
    let convertedHtml = convertInput(userMd);

    updateMdInputList([...mdInputList, convertedHtml]);
  };
  return (
    <div>
      <Header />
      <main className="sheet__container">
        <div className="sheet">
          <MkdownOutput saveMdlines={mdInputList} />
          <MkdownInput sendToMain={upateMdList} />
          <EditorActions FullMkList={mdInputList} />
          {/** Not don't like this but it design-> should be a better way */}
          <div className="sheet__pre"></div>
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
          .sheet__pre {
            height: 200px;
            background: linear-gradient(#f3f8f8, #243233);
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

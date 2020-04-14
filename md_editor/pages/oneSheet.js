import React, { useState } from "react";
import Header from "../components/Header";

function MkdownInput(props) {
  const [userInput, setUserInput] = useState("");

  function enterKeyEvent() {
    // if enter key is hit then will clear state of input
    //  and send string to the out put
    let keyCode = event.keyCode;
    if (keyCode === 13) {
      props.sendToMain(userInput);
      setUserInput("");
    }
  }
  return (
    <div>
      <input
        className="input__container"
        placeholder="Add Content"
        onKeyPress={enterKeyEvent}
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
      />
      <style jsx>{`
        .input__container {
          display: flex;
          justify-content: center;
          align-items: center;
          background: gray;
          height: 30px;
          width: 100%;
          margin-top: 25px;
          padding: 10px 2px;
          box-shadow: none;
          border: none;
          font-size: 15px;
          font-weight: bold;
        }
        .input__container:focus {
          background: lightgray;
        }
      `}</style>
    </div>
  );
}
function MdLine(props) {
  return (
    <li className="mdLine__row" key={props.mdLineNum}>
      <div className="mdLine__indicator">{props.mdLineNum}</div>
      <span className="mdLine__string">{props.mdUserLine}</span>
      <style jsx>{`
        .mdLine__row {
          display: flex;
          margin: 2px 0;
          overflow-wrap: break-word;
          background-color: #b9cccc;
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
    "row one is here",
    "row two is here",
  ]);

  const upateMdList = (userMd) => {
    updateMdInputList([...mdInputList, userMd]);
  };
  return (
    <div>
      <Header />
      <div className="sheet__container">
        <div className="sheet">
          <MkdownOutput saveMdlines={mdInputList} />
          <MkdownInput sendToMain={upateMdList} />
          <div className="sheet__pre">
            <button> Save</button>
            <button> New </button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .sheet__container {
            background: #a2c6c8;
            min-height: 100vh;
            max-width: 100vw;
            display: flex;
            justify-content: center;
          }
          .sheet {
            background: #f3f8f8;
            width: 375px;
            height: max-content;
            overflow: hidden;
          }
          .sheet__pre {
            background: #f3f8f8;
            width: 375px;
            height: 150px;
            background: linear-gradient(#f3f8f8, #a2c6c8);
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

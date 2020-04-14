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
    <div className="userInput__container">
      <input
        className="userInput__entryInput"
        placeholder="Add Content"
        onKeyPress={enterKeyEvent}
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
      />
      <Presheet />
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

function Presheet() {
  return (
    <div className="sheet__pre">
      <button> Save</button>
      <button> New </button>
      <button> Clear </button>
      <button> ENTER </button>
      <style jsx>{`
        .sheet__pre {
          height: 450px;
          background: linear-gradient(#f3f8f8, #243233);
        }
      `}</style>
    </div>
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
        </div>
      </div>
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

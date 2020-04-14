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
        placeHolder="Add Content"
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
          margin-top: 20px;
        }
        .input__container.focus {
          background: lightgray;
        }
      `}</style>
    </div>
  );
}
function MkdownOutput(props) {
  const userMarkdowns = props.saveMdlines;
  const mkDownList = userMarkdowns.map((x, y) => <li key={y}>{x}</li>);
  return <ol>{mkDownList}</ol>;
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
            background: #a2c6c8;
            min-height: 100vh;
            max-width: 100vw;
            display: flex;
            justify-content: center;
          }
          .sheet {
            border: solid black 1px;
            background: #f3f8f8;
            min-width: 375px;
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

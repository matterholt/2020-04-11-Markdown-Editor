import react, { useState, useEffect } from "react";
let showdown = require("showdown");

import LinkButton from "../components/LinkButton";

const Header = () => {
  return (
    <header>
      <LinkButton linkName="Home" linkPath="/" />
      <h1>Getting the Mark on</h1>
      <div className="header__features">
        <button> New</button>
        <button> Print</button>
      </div>
      <style jsx>{`
        header {
          border-bottom: solid black 2px;
          display: flex;
          font-size: 10px;
          justify-content: space-between;
          padding: 2px;
        }
        .header__features {
          display: flex;
        }
      `}</style>
    </header>
  );
};
const MkLayout = (props) => {
  return (
    <div>
      {props.children}
      <style jsx>{`
        div {
          min-width: 49vw;
          min-height: 60vh;
          margin: 0;
        }
      `}</style>
    </div>
  );
};
const MkdownInput = (props) => {
  const [userMdInput, updateUserMdInput] = useState("NO CHANGE");

  // React Ref allowing to get text from the pre tags
  // React Ref allowing to get text from the pre tags
  const mkInputDomRef = React.createRef();

  function changeState() {
    let userMkdownText = mkInputDomRef.current.innerText;
    props.mkdownConvert(userMkdownText);
  }

  return (
    <MkLayout>
      <h2>Mark Down Input</h2>
      <pre
        ref={mkInputDomRef}
        onKeyUp={changeState}
        contentEditable="true"
      ></pre>

      <style jsx>{`
        pre {
          padding: 20px;
          background-color: #e1e7f0;
          height: 100%;
        }
        pre:focus {
          background-color: #bfcde0;
        }
      `}</style>
    </MkLayout>
  );
};
const MkdownOut = (props) => {
  function createMarkup() {
    return { __html: props.mkDwonText };
  }
  return (
    <MkLayout>
      <h2>Mark Down out</h2>
      <pre dangerouslySetInnerHTML={createMarkup()} />
      <style jsx>{`
        pre {
          height: 100%;
          color: #f7f7f7;
          padding: 20px;
          background-color: #333745;
        }
      `}</style>
    </MkLayout>
  );
};
const Editor = () => {
  const [mkdownInput, updateMkdownInput] = useState("");
  function convertInput(userInput) {
    let converter = new showdown.Converter(),
      html = converter.makeHtml(userInput);
    updateMkdownInput(html);
  }

  return (
    <div>
      <Header />
      <div className="editor">
        <MkdownInput mkdownConvert={convertInput} />
        <MkdownOut mkDwonText={mkdownInput} />
      </div>
      <style jsx>
        {`
          div {
            max-width: 100vw;
            display: flex;
            flex-flow: column;
          }
          .editor {
            display: flex;
            flex-flow: row;
          }
        `}
      </style>
    </div>
  );
};
export default Editor;

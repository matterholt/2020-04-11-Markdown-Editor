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
          margin: 0;
          width: 50%;
          min-height: inherit;
        }
      `}</style>
    </div>
  );
};

const EditorHeader = (props) => {
  return (
    <h2 style={props.headerStyle}>
      {props.editorTitle}
      <style jsx>{`
        h2 {
          text-align: center;

          margin: 0;
          padding: 10px 0;
        }
      `}</style>
    </h2>
  );
};

const MkdownInput = (props) => {
  const mkInputHeader = {
    color: "rgb(27, 29, 36)",
    backgroundColor: "rgb(157, 174, 198)",
  };

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
      <EditorHeader headerStyle={mkInputHeader} editorTitle="Mark Down In" />
      <pre
        ref={mkInputDomRef}
        onKeyUp={changeState}
        contentEditable="true"
      ></pre>

      <style jsx>{`
        pre {
          padding: 20px;
          margin: 0;
          background-color: rgb(135, 139, 153);
          min-height: inherit;
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
  const mkOutputHeader = {
    color: "rgb(157, 174, 198)",
    backgroundColor: "rgb(27, 29, 36)",
  };

  return (
    <MkLayout>
      <EditorHeader headerStyle={mkOutputHeader} editorTitle="Mark Down out" />
      <pre dangerouslySetInnerHTML={createMarkup()} />
      <style jsx>{`
        pre {
          color: rgb(157, 174, 198);
          margin: 0;
          padding: 20px;
          min-height: inherit;
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
    <div className="container__editor">
      <Header />
      <div className="editor">
        <MkdownInput mkdownConvert={convertInput} />
        <MkdownOut mkDwonText={mkdownInput} />
      </div>
      <style jsx>
        {`
          .container__editor {
            max-width: 100vw;
            min-height: 60vh;
            display: flex;
            flex-flow: column;
            background-color: #a2c6c8;
          }
          .editor {
            display: flex;
            flex-flow: row;
            min-height: inherit;
          }
        `}
      </style>
      <style global jsx>{`
        body {
          background: black;
          margin: 0;
          padding: 0;
          min-width: 100vw;
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
};
export default Editor;

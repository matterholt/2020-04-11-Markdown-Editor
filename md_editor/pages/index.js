import react, { useState } from "react";
const MkLayout = (props) => {
  return (
    <div>
      {props.children}
      <style jsx>{`
        div {
          max-width: 50vw;
          min-width: 720px;
          border: solid black 1px;
        }
      `}</style>
    </div>
  );
};

const MkdownInput = () => {
  const [userMdInput, updateUserMdInput] = useState("NO CHANGE");

  // HOW TO CONVERT THE TEXT TO MARKDOWN
  const [mdConvertedText, setMdConveredText] = useState();

  const myRef = React.createRef();

  function changeState() {
    let userMkdownText = myRef.current.innerText;
  }

  return (
    <MkLayout>
      <h2>Mark Down Input</h2>
      <pre ref={myRef} onKeyUp={changeState} contentEditable="true"></pre>

      <style jsx>{`
        pre {
          padding: 50px;
          background-color: #bfcde0;
        }
      `}</style>
    </MkLayout>
  );
};

const MkdownOut = () => {
  return (
    <MkLayout>
      <h2>Mark Down out</h2>
      <pre>
        <span>TEST</span>
      </pre>
      <style jsx>{`
        pre {
          color: #f7f7f7;
          background-color: #333745;
        }
      `}</style>
    </MkLayout>
  );
};

const Editor = () => {
  const [mkdownInput, updateMkdownInput] = useState("");
  return (
    <div>
      <MkdownInput />
      <MkdownOut />
      <style jsx>
        {`
          div {
            max-width: 100vw;
            height: 100vh;
            display: flex;
          }
        `}
      </style>
    </div>
  );
};

export default Editor;

import React, { useState, useEffect } from "react";
export default function EditorActions(props) {
  return (
    <div className="editor__actions">
      <div className="editor__actionButton">
        <button onClick={props.clearList}> Clear </button>
        <button> ENTER </button>
      </div>

      <style jsx>{`
        .sheet__actions {
          background-color: #f3f8f8;
          display: flex;
          flex-flow: column;
          justify-content: space-evenly;
        }

        .editor__actionButton {
          display: flex;
          justify-content: space-evenly;
        }
      `}</style>
    </div>
  );
}

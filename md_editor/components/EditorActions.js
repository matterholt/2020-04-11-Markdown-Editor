import React, { useState, useEffect } from "react";
export default function EditorActions(props) {
  return (
    <div className="editor__actions">
      <button onClick={props.clearList}> CLEAR </button>
      <button onClick={props.enterAction}> ENTER </button>

      <style jsx>{`
        .editor__actions {
          background-color: #f3f8f8;
          display: flex;
          justify-content: end;
        }
      `}</style>
    </div>
  );
}

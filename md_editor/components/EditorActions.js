export default function EditorActions(props) {
  const mdList = props.FullMkList;

  const tagCount = {};

  function htmlTagCount(mdString) {
    // example of what should be
    const think = { h1: 2, h2: 1, p: 10 };
    const htmlTag = /<(\w)>/.exec(mdString);
    console.log(htmlTag[1]);
    const tagString = />(.*)</.exec(mdString);
    console.log(tagString[1]);
  }

  function letterCount(charList) {
    // add the number of chars in string,
    const TEST = "<p> row one is here </p><p> row two is here </p>";
  }
  return (
    <div className="editor__actions">
      <div className="editor__stats">
        <p>
          Row Count:<span>{mdList.length}</span>
        </p>
        <p>
          Word Count: <span>{mdList}</span>
        </p>
        <p>
          Letter Count: <span>{mdList.length}</span>
        </p>
      </div>
      <div className="editor__actionButton">
        <button> New </button>
        <button> Clear </button>
        <button> ENTER </button>
      </div>

      <style jsx>{`
        .sheet__actions {
          background-color: #f3f8f8;
          display: flex;
          flex-flow: column;
          justify-content: space-evenly;
        }
        .editor__stats {
          display: flex;
          flex-flow: column;
        }
        .editor__actionButton {
          display: flex;
          justify-content: space-evenly;
        }
      `}</style>
    </div>
  );
}

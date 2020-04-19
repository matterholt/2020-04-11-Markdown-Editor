export default function MdCompileLine(props) {
  var stringToHTML = props.mdUserLine;
  function createInnerHtml() {
    return {
      __html: stringToHTML,
    };
  }

  return (
    <li className="mdLine__rowList" key={props.mdLineNum}>
      <div
        className="mdLine__string"
        dangerouslySetInnerHTML={createInnerHtml()}
      ></div>
    </li>
  );
}

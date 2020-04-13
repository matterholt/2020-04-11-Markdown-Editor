import Link from "next/link";
// add a prop that would as if large or small?
const LinkButton = (props) => {
  return (
    <>
      <Link href={props.linkPath}>
        <div className="landing__editorLink">
          <a>{props.linkName}</a>
        </div>
      </Link>
      <style jsx>{`
        .landing__editorLink {
          background: #4a7677;
          color: #eaf2f3;
          font-size: 1.5em;
          text-align: center;
          padding: 12px 20px;
          border-radius: 5px;
          transition: all 0.2s ease-in-out;
        }
        .landing__editorLink:hover {
          cursor: pointer;
          transform: scale(1.1);
          box-shadow: 8px 5px 10px #cdcdcd;
        }
      `}</style>
    </>
  );
};

export default LinkButton;

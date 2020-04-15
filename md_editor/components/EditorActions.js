export default function EditorActions() {
  return (
    <div className="sheet__actions">
      <button> New </button>
      <button> Clear </button>
      <button> ENTER </button>
      <style jsx>{`
        .sheet__actions {
          height: 150px;
          background-color: #f3f8f8;
        }
      `}</style>
    </div>
  );
}

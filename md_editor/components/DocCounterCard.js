export default function DocCounterCard(props) {
  return (
    <div className="counter__Card">
      <h4>{props.countName}</h4>
      <p>{props.countAmount}</p>
      <style jsx>{`
        h4 {
          background-color: #596465;
          color: #f0f5f5;
          margin: 0;
          padding: 10px 5px 0px 5px;
          height: 30px;
          width: 100%;
          text-align: center;
          letter
        }
        .counter__Card {
          background-color: #f0f5f5;
          box-shadow: 5px 5px 9px #5e6566;
          overflow: hidden;
          border-radius: 5px;
          height: 100px;
          display: flex;
          flex-flow: column;
          align-items: center;
          min-width: 70px;
          color: #243233;
          font-weight: 900;
        }
      `}</style>
    </div>
  );
}

import LinkButton from "./LinkButton";

const Header = () => {
  return (
    <header>
      <LinkButton linkName="Home" linkPath="/" />
      <h1>Getting the Mark on</h1>
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

export default Header;

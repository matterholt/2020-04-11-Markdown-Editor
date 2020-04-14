import LinkButton from "../components/LinkButton";

function Index() {
  return (
    <header>
      <div className="landing__header">
        <h1 className="landing__heading">
          Simple and Basic <br /> Markdown Converter
        </h1>
        <p className="landing__subheading">Let's GO!</p>
        <div>
          <LinkButton linkName="side by side" linkPath="/editor" />
          <LinkButton linkName="single page" linkPath="/oneSheet" />
        </div>
      </div>
      <style jsx>{`
          header {
            min-height: 100vh;
            max-width: 100vw;
            background-color: #a2c6c8;
            display: flex;
            flex-flow: column;
            justify-content: center;
            color: #4a4a4a;
            margin: 0;
          }
          .landing__header {
            width: 90%;
            min:height: 50vh;
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            align-self: center;
            background-color: #f3f8f8;
            padding: 20px;    
            text-align: center;
            border-radius: 5px;
            font-size: 15px;
          }
          .landing__heading {
            font-size: 2em;
            margin: 0;
          }
          .landing__subheading {
            font-size: 1em;
            margin: 20px;
          }

        `}</style>
      <style global jsx>{`
        body {
          background: black;
          margin: 0;
          padding: 0;
          min-width: 100vw;
          min-height: 100vh;
        }
      `}</style>
    </header>
  );
}

export default Index;

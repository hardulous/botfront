import { Collapse, Fade, IconButton } from "@material-ui/core";
import { useContext, useEffect } from "react";
import "./App.css";
import { FaRobot } from "react-icons/fa";
import { BotContext } from "./Util/BotContext";
import Bot from "./Component/Bot";

function App() {
  const { openBot, setopenBot } = useContext(BotContext);

  return (
    <div className="App">
      {openBot ? (
        <Bot />
      ) : (
        <IconButton
          className="botBtn"
          size="medium"
          color="primary"
          onClick={() => setopenBot(true)}
        >
          <FaRobot />
        </IconButton>
      )}
    </div>
  );
}

export default App;

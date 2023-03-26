import React, { useContext } from "react";
import { BotContext } from "../Util/BotContext";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";

const BotBody = () => {
  const { messages } = useContext(BotContext);
  return (
    <div>
      {messages.map((item, index) => {
       return item.component
      })}
    </div>
  );
};

export default BotBody;

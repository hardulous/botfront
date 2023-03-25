import React, { createContext, useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import BotMessage from "../Component/BotMessage";
import UserMessage from "../Component/UserMessage";

export const BotContext = createContext();

export const BotProvider = ({ children }) => {
  let uuid = uuidv4();

  const [openBot, setopenBot] = useState(false);
  const [messages, setmessages] = useState([
    {
      uuid,
      isBot: true,
      component: (
        <BotMessage
          key={uuid}
          uuid={uuid}
          message="Hello What Can I Do For You"
        />
      ),
    },
  ]);

  const [track, settrack] = useState([])

  return (
    <BotContext.Provider
      value={{
        openBot,
        setopenBot,
        messages,
        setmessages,
        track,
        settrack
      }}
    >
      {children}
    </BotContext.Provider>
  );
};

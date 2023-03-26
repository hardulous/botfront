import React, { createContext, useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import BotMessage from "../Component/BotMessage";

export const BotContext = createContext();

export const BotProvider = ({ children }) => {
  let uuid = uuidv4();

  const [openBot, setopenBot] = useState(false);
  const [socket, setsocket] = useState("");
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

  useEffect(() => {
    if (openBot) {
      setTimeout(() => {
        setsocket(io("http://localhost:3002"));
      }, 2000);
    }
    if(socket && !openBot){
      socket.emit("kill-jar");
      setsocket("")
    }
  }, [openBot]);

  return (
    <BotContext.Provider
      value={{
        openBot,
        setopenBot,
        messages,
        setmessages,
        socket,
      }}
    >
      {children}
    </BotContext.Provider>
  );
};

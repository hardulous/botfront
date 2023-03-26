import { IconButton, TextField } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { BotContext } from "../Util/BotContext";
import { v4 as uuidv4 } from "uuid";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";

const BotInput = () => {

  const { messages, setmessages,socket } = useContext(BotContext);
  const [res, setres] = useState();

  useEffect(() => {
    if (socket) {
      socket.emit("start-jar");
      socket.on("to-chatbot-front", (res) => {
        setres({
          type: "bot",
          message: res,
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (res) {
      let uuid = uuidv4();
      let newMessage;
      if (res.type == "bot") {
        newMessage = {
          isBot: true,
          component: (
            <BotMessage key={uuid} uuid={uuid} message={res.message} />
          ),
        };
      } else {
        newMessage = {
          isUser: true,
          component: (
            <UserMessage key={uuid} uuid={uuid} message={res.message} />
          ),
        };
      }
      setmessages([...messages, newMessage]);
    }
  }, [res]);

  const validationSchema = Yup.object({
    userQuery: Yup.string().trim().required("Enter A Valid Query"),
  });

  const initialValues = {
    userQuery: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: askChatGpt,
  });

  function askChatGpt(data, action) {
    setres({
      type: "user",
      message: data.userQuery,
    });
    handleJarFile(data.userQuery);
    action.resetForm();
  }

  const handleJarFile = (query) => {
    socket.emit("to-chatbot-back", query);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        name="userQuery"
        size="small"
        className="bot-user-input"
        id="userQuery"
        placeholder="Enter Your Message Here"
        variant="outlined"
        value={formik.values.userQuery}
        onChange={formik.handleChange}
      />
      <IconButton
        className="bot-input-send-btn"
        type="submit"
        color="primary"
        size="small"
        disabled={!Boolean(formik.values.userQuery)}
      >
        <Send />
      </IconButton>
    </form>
  );
};

export default BotInput;

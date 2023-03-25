import { IconButton, TextField } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { BotContext } from "../Util/BotContext";
import { v4 as uuidv4 } from "uuid";
import { io } from "socket.io-client";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";

const BotInput = () => {
  const { messages, setmessages, track, settrack } = useContext(BotContext);
  const [socket, setsocket] = useState("");
  const [datas, setdatas] = useState([]);
  const [res, setres] = useState();

  useEffect(() => {
    setTimeout(() => {
      setsocket(io("http://localhost:3002"));
    }, 2000);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log(`connected with ${socket.id}`);
      });

      socket.on("receive-message", (res) => {
        // const botMessage = {
        //   isBot: true,
        //   component: <BotMessage key={uuid} uuid={uuid} message={res} />,
        // };
        // setmessages([...messages, botMessage]);
        setres({
          type: "bot",
          message: res,
        });
        // setdatas(datas=>[...datas,res])
        // setQuotes(oldQuotes => [...oldQuotes, msg]);
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
          component: <BotMessage key={uuid} uuid={uuid} message={res.message} />,
        };
      }
      else{
         newMessage = {
          isUser:true,
          component: <UserMessage key={uuid} uuid={uuid} message={res.message}/>
        }
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
    const userMessage = {
      uuid: uuidv4(),
      isUser: true,
      message: data.userQuery,
    };
    setres({
      type:"user",
      message:data.userQuery
    })
    handleJarFile(data.userQuery);
    action.resetForm();
  }

  const handleJarFile = (query) => {
    socket.emit("custom-event", query);
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

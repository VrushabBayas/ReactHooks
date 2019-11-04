import React, { useReducer, useEffect } from "react";
import { reducer, initialState } from "../state/reducer";
import Context from ".././context";
import PublishMessage from "./PublishMessage";
import MessageBoard from "./MessageBoard";
import PubSub from "../pubsub";
import SetUsername from "./SetUsername";

const pubsub = new PubSub();

setTimeout(() => {
  pubsub.publish({ type: "foo", value: "bar" });
}, 1000);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("state: ", state);

  useEffect(() => {
    pubsub.addListener({
      message: messageObject => {
        const { channel, message } = messageObject;
        dispatch(message);
      }
    });
    return () => {};
  }, []);

  return (
    <Context.Provider value={{ state, dispatch, pubsub }}>
      <h2>Reaction</h2>
      <hr />
      <SetUsername />
      <hr />
      <PublishMessage />
      <hr />
      <MessageBoard />
    </Context.Provider>
  );
}

export default App;

import React, { useState } from "react";

import { newMessage } from "../state/actions";
import { useAppContext } from "./hooks";

export default function PublishMessage() {
  const {
    pubsub: { publish },
    state: { userName }
  } = useAppContext();

  const [text, setText] = useState("");
  const onUpdateText = e => {
    setText(e.target.value);
  };
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      publishMessage();
    }
  };
  const publishMessage = () => {
    publish(newMessage({ text, userName }));
  };
  return (
    <div>
      <h3>Got Something to say?</h3>
      <input value={text} onChange={onUpdateText} onKeyPress={handleKeyPress} />
      <button onClick={publishMessage}>Publish it</button>
    </div>
  );
}

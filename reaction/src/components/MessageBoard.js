import React from "react";

import { useAppContext } from "./hooks";
import CreateReaction from "./CreateReaction";
import MessageReactions from "./MessageReactions";
export default function MessageBoard() {
  const {
    state: { messages, reactionsMap }
  } = useAppContext();
  return (
    <div>
      {messages.map(message => {
        let { text, id, timeStamp, userName } = message;
        return (
          <div key={id}>
            <h4>{new Date(timeStamp).toLocaleString()}</h4>
            <p>{text}</p>
            <h4>-{userName}</h4>
            <CreateReaction messageId={id} />
            <MessageReactions messageReactions={reactionsMap[id]} />
          </div>
        );
      })}
    </div>
  );
}

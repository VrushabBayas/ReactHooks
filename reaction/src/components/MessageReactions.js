import React from "react";

function MessageReactions({ messageReactions }) {
  if (!messageReactions) return null;

  return messageReactions.map((reaction, index) => {
    const { id, emoji, userName } = reaction;

    return (
      <span key={id}>
        <em>{userName}: </em>
        {emoji}
        {index !== messageReactions.length - 1 ? ", " : null}
      </span>
    );
  });
}

export default MessageReactions;

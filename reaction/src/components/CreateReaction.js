import React from "react";
import { REACTION_OBJECTS } from "../state/types";
import { useAppContext } from "./hooks";
import { createReaction } from "../state/actions";

export default function CreateReaction(props) {
  const { messageId } = props;
  const {
    state: { userName },
    pubsub: { publish }
  } = useAppContext();
  const publishReaction = ({ type, emoji }) => () => {
    publish(createReaction({ type, emoji, userName, messageId }));
  };
  return (
    <div className="CreateReaction">
      {REACTION_OBJECTS.map(reaction => {
        const { type, emoji } = reaction;

        return (
          <span key={type} onClick={publishReaction({ type, emoji })}>
            {emoji}
          </span>
        );
      })}
    </div>
  );
}

import { NEW_MESSAGE, SET_USERNAME } from "./types";
import uuid from "uuid/v4";

export const newMessage = ({ text, userName }) => ({
  type: NEW_MESSAGE,
  item: { id: uuid(), text, userName, timeStamp: Date.now() }
});
export const setUsername = userName => ({
  type: SET_USERNAME,
  userName
});
export const createReaction = ({ type, emoji, userName, messageId }) => ({
  type,
  item: { id: uuid(), timestamp: Date.now(), emoji, userName, messageId }
});

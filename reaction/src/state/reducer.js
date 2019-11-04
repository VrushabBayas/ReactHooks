import { NEW_MESSAGE, SET_USERNAME, REACTION_OBJECTS } from "./types";

export const initialState = {
  reactionsMap: {},
  messages: [],
  userName: "anonymous"
};

const REACTION_TYPES = REACTION_OBJECTS.map(reaction => reaction.type);

export const reducer = (state = initialState, action) => {
  if (REACTION_TYPES.includes(action.type)) {
    let reactionsMap;
    const { messageId } = action.item;
    const messageReactions = state.reactionsMap[messageId];

    if (messageReactions) {
      reactionsMap = {
        ...state.reactionsMap,
        [messageId]: [...messageReactions, action.item]
      };
    } else {
      reactionsMap = {
        ...state.reactionsMap,
        [messageId]: [action.item]
      };
    }

    return { ...state, reactionsMap };
  }
  switch (action.type) {
    case NEW_MESSAGE:
      return { ...state, messages: [...state.messages, action.item] };
    case SET_USERNAME:
      return { ...state, userName: action.userName };

    default:
      return state;
  }
};

import React from "react";

import { useAppContext } from "./hooks";
import { setUsername } from "../state/actions";

export default function SetUsername() {
  const {
    dispatch,
    state: { userName }
  } = useAppContext();

  const updateUserName = e => {
    dispatch(setUsername(e.target.value));
  };
  return (
    <div>
      <h3>User Name</h3>
      <input onChange={updateUserName} value={userName}></input>
    </div>
  );
}

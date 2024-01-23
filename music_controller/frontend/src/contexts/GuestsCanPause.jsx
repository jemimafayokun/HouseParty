import React, { createContext, useState } from "react";

export const GuestCanPauseContext = createContext();

export const GuestCanPauseProvider = (props) => {
  const [guestCanPause, setGuestCanPause] = useState(false);
  return (
    <GuestCanPauseContext.Provider value={{ guestCanPause, setGuestCanPause }}>
      {props.children}
    </GuestCanPauseContext.Provider>
  );
};

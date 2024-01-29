import React, { createContext, useState } from "react";

export const VotesToSkipContext = createContext();

export const VotesToSkipProvider = (props) => {
  const [votesToSkip, setVotesToSkip] = useState(2);
  return (
    <VotesToSkipContext.Provider value={{ votesToSkip, setVotesToSkip }}>
      {props.children}
    </VotesToSkipContext.Provider>
  );
};

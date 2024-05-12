"use client";
import { createContext, useContext, useState } from "react";

export const RadioContext = createContext(null);

export default function RadioProvider({ children }) {
  const [radioValue, setRadioValue] = useState("INCOME");

  return (
    <RadioContext.Provider value={{ radioValue, setRadioValue }}>
      {children}
    </RadioContext.Provider>
  );
}

export const useRadioContext = () => {
  const context = useContext(RadioContext);

  if (!context) {
    throw new Error("useContext must use in");
  }
  return context;
};

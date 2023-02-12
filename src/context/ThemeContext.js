import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [res, setRes] = useState(localStorage.getItem('theme') == 'light' ? true : false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (res === true) {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }else if(res === false) {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [res]);


  return (
    <ThemeContext.Provider value={{ theme, res, setRes }}>
      {children}
    </ThemeContext.Provider>
  );
};

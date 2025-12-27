import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const MainContext = createContext();

// ---o---o---o---o--- server urls ---o---o---o---o--- //
// const base_url = "http://localhost:5000";
const base_url = import.meta.env.VITE_BASE_URL;

const urls = {
  ping: `${base_url}/ping`,
  ruby: `${base_url}/ruby`,
  python: `${base_url}/python`,
  javascript: `${base_url}/javascript`,
};
// ---x---x---x---x--- server urls ---x---x---x---x--- //

// custom hooks.
const useMainContext = () => {
  return useContext(MainContext);
};

// initial codes state.
const codesState = {
  ruby: "",
  python: "",
  javascript: "",
};

// context provider.
const MainContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [live, setLive] = useState(false);
  const [output, setOutput] = useState("");
  const [codes, setCodes] = useState(codesState);
  const [isRunning, setIsRunning] = useState(false);
  const [language, setLanguage] = useState("javascript");

  // ---o---o---o---o---o--- run the code ---o---o---o---o---o--- //
  const playCode = async () => {
    try {
      setOutput("");
      setIsRunning(true);

      const response = await axios.post(urls[language], {
        input,
        code: codes[language],
      });
      const { output } = await response?.data;

      setOutput(output);
      setIsRunning(false);
    } catch (error) {
      console.log(error);
      setIsRunning(false);
    }
  };
  // ---x---x---x---x---x--- run the code ------x---x---x---x--- //

  // ---o---o---o---o--- update local storage ---o---o---o---o--- //
  const updateLocalStorage = ({ name, value }) => {
    const data = { language, codes, input };

    data[name] = value;

    localStorage.setItem("data", JSON.stringify(data));
  };
  // ---x---x---x---x--- update local storage ---x---x---x---x--- //

  // ---o---o---o---o--- initialize states ---o---o---o---o--- //
  const initializeStates = () => {
    const data = localStorage.getItem("data");

    if (data) {
      const { language, codes, input } = JSON.parse(data);

      setCodes(codes);
      setInput(input);
      setLanguage(language);
    }
  };
  // ---x---x---x---x--- initialize states ---x---x---x---x--- //

  // ---o---o---o---o--- start the server ---o---o---o---o--- //
  const startServer = async () => {
    try {
      const { status } = await axios.get(urls["ping"]);

      if (status === 200) setLive(true);
      else setTimeout(() => setLive(true), 30000);
    } catch ({ code }) {
      setLive(true);
    }
  };
  // ---x---x---x---x--- start the server ---x---x---x---x--- //

  useEffect(() => {
    startServer();
  }, []);

  useEffect(initializeStates, []);

  const states = {
    live,
    codes,
    input,
    output,
    language,
    isRunning,

    setCodes,
    setInput,
    playCode,
    setLanguage,
    updateLocalStorage,
  };

  return <MainContext.Provider value={states}>{children}</MainContext.Provider>;
};

export { MainContextProvider, useMainContext };

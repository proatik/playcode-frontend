import { MainContextProvider, useMainContext } from "./contexts/MainContext";

import Input from "./components/Input";
import Output from "./components/Output";
import Editor from "./components/AceEditor";
import BackDrop from "./components/BackDrop";

const ConditionalRender = () => {
  const { live } = useMainContext() || { live: false };

  if (window.location.pathname !== "/") {
    window.location.replace("/");
  }

  return live ? (
    <div className="container lg:h-[750px]">
      <div className="flex flex-col w-full h-full px-2 py-2 space-y-2 lg:py-8 lg:space-y-0 lg:space-x-2 lg:flex-row">
        <Editor />
        <div className="flex flex-col w-full space-y-2 lg:w-1/3">
          <Output />
          <Input />
        </div>
      </div>
    </div>
  ) : (
    <BackDrop />
  );
};

function App() {
  return (
    <MainContextProvider>
      <ConditionalRender />
    </MainContextProvider>
  );
}

export default App;

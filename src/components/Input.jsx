import AceEditor from "react-ace";

import { useMainContext } from "../contexts/MainContext";

const Input = () => {
  const { input, setInput, updateLocalStorage } = useMainContext();

  const changeInput = (value) => {
    setInput(value);

    updateLocalStorage({ name: "input", value });
  };

  return (
    <div className="flex flex-col w-full h-[150px]  lg:h-1/3 border-2 border-stone-700  font-['Fira Code']   bg-[#272822]">
      <div className="px-3 py-1 font-medium border-b-2 border-stone-700 text-emerald-400 bg-stone-700">
        Input
      </div>
      <AceEditor
        mode="text"
        name="input"
        width="100%"
        fontSize={18}
        value={input}
        theme="monokai"
        showGutter={false}
        onChange={changeInput}
        showPrintMargin={false}
        highlightActiveLine={false}
        highlightGutterLine={false}
        className="flex-1 text-neutral-300"
      />
    </div>
  );
};

export default Input;

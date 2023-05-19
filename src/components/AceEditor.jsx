// ---o---o---o---o---o--- ace editor ---o---o---o---o---o--- //
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/keybinding-sublime";

ace.config.set("basePath", "ace-builds/src-min-noconflict");
// ---x---x---x---x---x--- ace editor ---x---x---x---x---x--- //

// main context.
import { useMainContext } from "../contexts/MainContext";

// react components.
import Select from "./Select";

export default function Editor() {
  const {
    codes,
    setCodes,
    language,
    playCode,
    isRunning,
    setLanguage,
    updateLocalStorage,
  } = useMainContext();

  const changeLanguage = (event) => {
    const { value } = event.target;

    setLanguage(value);
    updateLocalStorage({ name: "language", value });
  };

  const changeCode = (value) => {
    const updatedCodes = { ...codes, [language]: value };

    setCodes(updatedCodes);
    updateLocalStorage({ name: "codes", value: updatedCodes });
  };

  return (
    <div className="flex flex-col w-full h-[85vh] border-2  lg:w-2/3 lg:h-full border-stone-700">
      <div className="flex flex-row items-center justify-between w-full px-3 border-b-2 border-stone-700 bg-stone-700">
        <div className="py-1 font-medium text-emerald-400 bg-stone-700">
          Editor
        </div>

        <div>
          <Select
            selected={language}
            isDisabled={isRunning}
            changeHandler={changeLanguage}
            options={["javascript", "python", "ruby"]}
          />

          <button
            onClick={playCode}
            disabled={isRunning}
            className="px-5 transition-all rounded-sm h-min bg-emerald-400 hover:bg-green-400 active:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-400"
          >
            Run
          </button>
        </div>
      </div>

      <AceEditor
        width="100%"
        name="editor"
        fontSize={18}
        theme="monokai"
        mode={language}
        className="flex-1"
        onChange={changeCode}
        value={codes[language]}
        showPrintMargin={false}
        keyboardHandler="sublime"
        highlightActiveLine={false}
        setOptions={{
          useWorker: false,
          highlightGutterLine: false,
          displayIndentGuides: true,
        }}
      />
    </div>
  );
}

import AceEditor from "react-ace";

import { useMainContext } from "../contexts/MainContext";

const Output = () => {
  const { output } = useMainContext();
  return (
    <div className="flex flex-col w-full h-[200px] lg:h-2/3 border-2 border-stone-700  font-['Fira Code']   bg-[#272822]">
      <div className="px-3 py-1 font-medium border-b-2 border-stone-700 text-emerald-400 bg-stone-700">
        Output
      </div>
      <AceEditor
        mode="text"
        name="output"
        width="100%"
        fontSize={18}
        value={output}
        theme="monokai"
        readOnly={true}
        showGutter={false}
        showPrintMargin={false}
        highlightActiveLine={false}
        highlightGutterLine={false}
        className="flex-1 text-neutral-300"
      />
    </div>
  );
};

export default Output;

import { Fragment } from "react";
import { useMainContext } from "../contexts/MainContext";

const Backdrop = () => {
  const { live } = useMainContext();

  return (
    <Fragment>
      {!live ? (
        <div className="absolute top-0 left-0 z-20 flex flex-col items-center justify-center w-screen h-screen bg-slate-900">
          <div className="w-16 h-16 border-8 rounded-full animate-spin border-y-sky-500 border-x-slate-800"></div>
          <h5 className="mt-5 text-center text-cyan-500">
            Please wait. <br /> Application is starting.
          </h5>
        </div>
      ) : (
        <span></span>
      )}
    </Fragment>
  );
};

export default Backdrop;

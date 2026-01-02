import React from "react";
import { Loader } from "lucide-react";
function PageLoader() {
  return (
    <div className=" w-screen h-screen flex items-center justify-center">
      <div className="flex-col   ">
        <div className=" flex items-center justify-center">
          <Loader className="  animate-spin  " />
        </div>
        <div className="flex items-center justify-center">
          {" "}
          <p className="animate-bounce   duration-75">.</p>
          <p className="animate-bounce  duration-150 delay-75">.</p>
          {/* <p className="animate-bounce  delay-200">.</p> */}
          {/* <p className="animate-bounce duration-75">.</p> */}
        </div>
      </div>
    </div>
  );
}

export default PageLoader;

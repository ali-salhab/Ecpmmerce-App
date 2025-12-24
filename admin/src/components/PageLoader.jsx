import React from "react";
import { Loader } from "lucide-react";
function PageLoader() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Loader className="w-20 h-20 animate-spin text-blue-500" />
    </div>
  );
}

export default PageLoader;

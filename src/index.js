import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {CONTEXT} from "@content-generators/ui-components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CONTEXT.UiComponentContext.Provider value={{
    staticFilePath: "assets",
    tts_url_buillder: (text)=>{
        return `http://localhost:8600/polly?text=${text}&voice=Aditi`
    }
  }}>
    {" "}
    <App />
  </CONTEXT.UiComponentContext.Provider>
);

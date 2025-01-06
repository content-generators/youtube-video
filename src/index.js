import { CONTEXT } from "@content-generators/ui-components";
import React from "react";
import ReactDOM from "react-dom/client";
import _ from 'underscore';
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CONTEXT.UiComponentContext.Provider value={{
    staticFilePath: "assets",
    tts_url_buillder: (text, voice) => {
      console.log(_.unescape(text));
      console.log(process.env.NODE_ENV);
      console.log(process.env.REACT_APP_TTS_UR);

      return `${process.env.REACT_APP_TTS_UR}?voice=${voice}&text=${unEscape(_.unescape(text))}`
    }
  }}>
    {" "}
    <App />
  </CONTEXT.UiComponentContext.Provider>
);

function unEscape(htmlStr) {
  htmlStr = htmlStr.replace(/&lt;/g, "<");
  htmlStr = htmlStr.replace(/&gt;/g, ">");
  htmlStr = htmlStr.replace(/&quot;/g, "\"");
  htmlStr = htmlStr.replace(/&#39;/g, "\'");
  htmlStr = htmlStr.replace(/&#039;/g, "\'");
  htmlStr = htmlStr.replace(/&amp;/g, "&");
  return htmlStr;
}

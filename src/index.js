import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {CONTEXT} from "@content-generators/ui-components";
import _ from 'underscore';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CONTEXT.UiComponentContext.Provider value={{
    staticFilePath: "assets",
    tts_url_buillder: (text, voice)=>{
      console.log(_.unescape(text));
        return `http://voice_generator:8600/polly-neural?voice=${voice}&text=${unEscape(_.unescape(text))}`
    }
  }}>
    {" "}
    <App />
  </CONTEXT.UiComponentContext.Provider>
);

function unEscape(htmlStr) {
  htmlStr = htmlStr.replace(/&lt;/g , "<");	 
  htmlStr = htmlStr.replace(/&gt;/g , ">");     
  htmlStr = htmlStr.replace(/&quot;/g , "\"");  
  htmlStr = htmlStr.replace(/&#39;/g , "\'");   
  htmlStr = htmlStr.replace(/&#039;/g , "\'");   
  htmlStr = htmlStr.replace(/&amp;/g , "&");
  return htmlStr;
}

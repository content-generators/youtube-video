import { CONTEXT } from "@content-generators/ui-components";
import { createRoot } from "react-dom/client";
import _ from 'underscore';
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const isTtsServiceHealthy = async () => {
  try {
    const healthCheck = await fetch(`${process.env.REACT_APP_VOICE_GENERATOR}/health-check`);
    const healthStatus = await healthCheck.json();
    return healthStatus && healthStatus.status === "ok";
  } catch (e) {
    console.error("TTS Service Health Check Failed", e);
    return false;
  }

};

root.render(
  <CONTEXT.UiComponentContext.Provider value={{
    staticFilePath: "assets",
    tts_url_buillder: process.env.REACT_APP_VOICE_GENERATOR && await isTtsServiceHealthy() ? (text, voice) => {
      console.log(_.unescape(text));
      console.log(process.env.NODE_ENV);
      console.log(process.env.REACT_APP_VOICE_GENERATOR);

      const ttsEngine = window.tts_engine || 'piper'
      const ttsVoice = window.tts_voice || voice

      return `${process.env.REACT_APP_VOICE_GENERATOR}/generate?engine=${ttsEngine}&voice=${ttsVoice}&text=${unEscape(_.unescape(text))}`

    } : () => {
      console.error("Unable to load TTS Service");
      return null
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

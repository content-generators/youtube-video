import React from 'react';
import { CONTEXT } from "@content-generators/ui-components";
import { createRoot } from "react-dom/client";
import _ from 'underscore';
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const isTtsServiceHealthy = async () => {
  try {
    const healthCheck = await fetch(`${import.meta.env.VITE_VOICE_GENERATOR}/health-check`);
    return healthCheck && healthCheck.status == 200;
  } catch (e) {
    console.error("TTS Service Health Check Failed", e);
    return false;
  }

};

const initApp = async () => {
  const isHealthy = await isTtsServiceHealthy();
  
  root.render(
    <CONTEXT.UiComponentContext.Provider value={{
      staticFilePath: "assets",
      tts_url_buillder: import.meta.env.VITE_VOICE_GENERATOR && isHealthy ? async (text, voice) => {
        console.log(_.unescape(text));
        console.log(import.meta.env.MODE);
        console.log(import.meta.env.VITE_VOICE_GENERATOR);

        const ttsEngine = window.tts_engine || 'kokoro'
        const ttsVoice = window.tts_voice || 'af_bella'

        const response = await fetch(import.meta.env.VITE_VOICE_GENERATOR + '/v1/audio/speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "model": "local_tts/kokoro",
                "input": text,
                "voice": ttsVoice,
                "response_format": "wav"
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`TTS Server Error (${response.status}): ${errorText}`);
        }
        const audioBlob = await response.blob();
        const wavBlob = new Blob([audioBlob], { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(wavBlob);
        console.log("Audio generated successfully:", audioUrl);

        return audioUrl;
        // return `${import.meta.env.VITE_VOICE_GENERATOR}/generate?engine=${ttsEngine}&voice=${ttsVoice}&text=${unEscape(_.unescape(text))}`

      } : () => {
        console.error("Unable to load TTS Service");
        return null
      }
    }}>
      {" "}
      <App />
    </CONTEXT.UiComponentContext.Provider>
  );
};

initApp();

function unEscape(htmlStr) {
  htmlStr = htmlStr.replace(/&lt;/g, "<");
  htmlStr = htmlStr.replace(/&gt;/g, ">");
  htmlStr = htmlStr.replace(/&quot;/g, "\"");
  htmlStr = htmlStr.replace(/&#39;/g, "\'");
  htmlStr = htmlStr.replace(/&#039;/g, "\'");
  htmlStr = htmlStr.replace(/&amp;/g, "&");
  return htmlStr;
}

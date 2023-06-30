import React, { useEffect, useState } from "react";
import { VIDEO, BITS, VIDEO_INTRO } from "@content-generators/ui-components";
import { useRef } from "react";

function App() {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  const [showView, setShowView] = useState("INTRO");
  let vidRef = useRef();
  const textRef = useRef(null);

  const getComponent = (data) => {
    if (!data) {
      return null;
    }
    if (showView !== "CONTENT") {
      return null;
    }
    return React.createElement(VIDEO[data.component], {
      ...data.pages[pageNum],
      handleEvent: () => {
        if (pageNum < data.pages.length - 1) {
          setPageNum(pageNum + 1);
        } else {
          vidRef.current.stopRecording();
        }
      },
    });
  };

  const getIntro = (data) => {
    if (!data) {
      return null;
    }
    if (showView !== "INTRO") {
      return null;
    }
    return React.createElement(VIDEO_INTRO[`Intro_${data.intro}`], {
      ...data,
      videoSrc: "videos/artifacts_-_23761 (1080p).mp4",
      handleEvent: () => {
        setShowView("CONTENT")
      },
    });
  };

  useEffect(() => {
    if (vidRef && vidRef.current) {
      vidRef.current.startRecording();
    }
    return () => {
      vidRef.current = null;
    };
  }, []);

  return data ? (
    <>
      <BITS.VideoRecorder recorderRef={vidRef} waitAfter={2} />
      {getIntro(data)}
      {getComponent(data)}
    </>
  ) : (
    <div className="p-8">
      <textarea
        ref={textRef}
        id="message"
        rows="20"
        className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      ></textarea>
      <button
        type="button"
        onClick={() => {
          setData(JSON.parse(textRef.current.value));
        }}
        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </div>
  );
}

export default App;

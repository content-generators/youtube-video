import { BITS, VIDEO } from "@content-generators/ui-components";
import React, { useRef, useState } from "react";
import DataBuilderComponent from "./DataBuilderComponent";

function App() {
  const [data, setData] = useState(null);
  const [componentReady, setComponentReady] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  let vidRef = useRef();

  const getComponent = (data) => {
    if (!data) {
      return null;
    }

    return React.createElement(VIDEO[data.pages[pageNum].component], {
      ...data.pages[pageNum],
      handleEvent: (event) => {
        if (event === "DONE") {
          if (pageNum < data.pages.length - 1) {
            setPageNum(pageNum + 1);
          } else {
            if (vidRef && vidRef.current) {
              vidRef.current.stopRecording();
            }
          }
        }

        if (event === "START" && pageNum === 0) {
          if (vidRef && vidRef.current) {
            vidRef.current.startRecording();
          }
        }
      },
    });
  };

  return (
    <div
      id="video_container" className="h-screen" style={{overflow: 'hidden'}}
    >
      <BITS.VideoRecorder recorderRef={vidRef} waitAfter={2} />
      {data && componentReady ? (
        <>{getComponent(data)}</>
      ) : data ? (
        <div></div>
      ) : (
        <DataBuilderComponent
          handleData={(data) => {
            setData(data);
            setComponentReady(false);
            setTimeout(() => setComponentReady(true), 5000);
          }}
        />
      )}
    </div>
  );
}

export default App;

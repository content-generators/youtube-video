import React, { useEffect, useState } from "react";
import { VIDEO, BITS } from "@content-generators/ui-components";
import { useRef } from "react";
import DataBuilderComponent from "./DataBuilderComponent";

function App() {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  let vidRef = useRef();

  const getComponent = (data) => {
    if (!data) {
      return null;
    }
    return React.createElement(VIDEO[data.pages[pageNum].component], {
      ...data.pages[pageNum],
      handleEvent: () => {
        if (pageNum < data.pages.length - 1) {
          setPageNum(pageNum + 1);
        } else {
          if (vidRef && vidRef.current) {
            vidRef.current.stopRecording();
          }
        }
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
      {getComponent(data)}
    </>
  ) : (
    <DataBuilderComponent
      handleData={(data) => {
        setData(data);
      }}
    />
  );
}

export default App;

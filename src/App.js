import React, { useEffect, useState } from "react";
import { VIDEO, BITS, VIDEO_INTRO } from "@content-generators/ui-components";
import { useRef } from "react";

function App() {
  const [data, setData] = useState({
    "title": "Tablet Video",
    "component": "MobileDetails",
    "intro":"02",
    "pages": [
      {
        "title": "Apple iPad Air 5th Gen 5G Tablet (256GB)",
        "image": "https://cdn1.smartprix.com/rx-iM3VA3pOH-w420-h420/apple-ipad-air-5th-g.webp",
        "points": [
          "A sleek and powerful tablet with a 10.9-inch Liquid Retina IPS LCD display and a 12 MP rear camera that can record 4K videos.",
          "A single SIM device that supports 5G, VoLTE, wifi-hotspot, USB-C and USB on-the-go features for fast and seamless connectivity.",
          "A side-mounted fingerprint sensor and face unlock for enhanced security and convenience.",
          "An octa-core Apple M1 processor and an Apple GPU (8-core graphics) for smooth performance and stunning graphics.",
          "A 256 GB internal storage that can store all your photos, videos, music and documents without a card slot.",
          "A non-removable Li-Po battery that can last up to 10 hours of talk time and supports 20W fast charging with a USB-C power adapter.",
          "An iOS v15 operating system that offers a user-friendly interface and access to a variety of apps and services."
        ]
      }
    ]
  });
  const [pageNum, setPageNum] = useState(0);
  const [showView, setShowView] = useState("INTRO");
  let vidRef = useRef();


  const getComponent = (data) => {
    if (!data) {
      return null;
    }
    if(showView!=="CONTENT"){
      return null
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
    if(showView!=="INTRO"){
      return null
    }
    return React.createElement(VIDEO_INTRO[`Intro_${data.intro}`], {
      ...data,
      videoSrc: "videos/artifacts_-_23761 (1080p).mp4",
      handleEvent: () => {
        // setShowView("CONTENT")
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

  return (
    <>
      <BITS.VideoRecorder recorderRef={vidRef} waitAfter={2} />
      {getIntro(data)}
      {getComponent(data)}
    </>
  );
}

export default App;

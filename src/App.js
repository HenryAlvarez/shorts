import React, { useState } from "react";
import VideoSection from "./components/video/VideoSection";
import VideoSectionInitial from "./components/video/VideoSectionCopy";
import { videoData } from "./data/videoData";

const App = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    const maxScroll = scrollHeight - clientHeight;
    const scrollPercentage = scrollTop / maxScroll;

    // Ajusta la velocidad de desplazamiento (0.5 es una velocidad más lenta)
    const scrollAmount = scrollPercentage * 0.5;

    // Ajusta la cantidad de desplazamiento (20 es una cantidad más pequeña)
    const newPosition = Math.round(scrollAmount * maxScroll / 20) * 20;

    setScrollPosition(newPosition);
  };


  console.log(setCurrentVideoIndex)

  return (
    <div className="App" onScroll={handleScroll} style={{ "--scroll-position": `${scrollPosition}px` }}>
      <div className="header">
        <p>Shorts Videos Tests</p>
      </div>
      <div className="scroll-container">
        <VideoSectionInitial
          key={0}
          id={0}
          videoUrl={'https://cdn.travelisimo.com/3f3ea73233384054a0f05e4c78bd9402_3e767cc90c'}
          videoDescription={'Primer Video'}
          isActive={0}
        />
        {videoData.map((video, index) => (
          <VideoSection
            key={video.id}
            id={video.id}
            videoUrl={video.url}
            videoDescription={video.description}
            isActive={currentVideoIndex === index}
          />
        ))}
      </div>
      <div className="navMobile">
      </div>
    </div>
  );
};

export default App;


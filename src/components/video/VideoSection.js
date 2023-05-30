import React, { useState, useRef, useEffect } from "react";
import "./videoSection.css";
import { useInView } from "react-intersection-observer";
import { BsFillPlayFill } from "react-icons/bs";
import { Modal } from 'antd'

const VideoSection = ({ videoUrl, videoDescription, isActive, id }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isMuted, setIsMuted] = useState(true)
  
  // const [showAnimation, setShowAnimation] = useState(true);
  
  const [videoInViewRef, videoInView, videoInViewEntry] = useInView({
    threshold: 0.5,
  });
  
  const [videoPosition, setVideoPosition] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Nuevo estado
  

  useEffect(() => {
    const video = videoRef.current;

    if (videoInView && !isInitialLoad) {
      video.currentTime = videoPosition;
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
      setVideoPosition(video.currentTime);
    }

    video.addEventListener("play", () => {
      video.currentTime = 0;
    });

    video.addEventListener("loadedmetadata", handleVideoLoad);

    if (videoInViewEntry) {
      console.log("Posición del elemento de video:", videoInViewEntry.boundingClientRect);
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleVideoLoad);
    };
  }, [videoInView, videoRef, videoInViewEntry, videoPosition, isLoaded, isInitialLoad]);


  useEffect(() => {
    const timeout = setTimeout(() => {
        if (isMuted && id === 1) {
            Modal.info({
                open: isMuted,
                centered: true,
                title: "Activar Sonido",
                okText: "Activar Sonido",
                content:'Activa el sonido para escuchar el audio del video',
                onOk() {
                    setIsMuted(false);
                },
            });
        }
    }, 1000);
    return () => clearTimeout(timeout);
}, [id, isMuted]); // Este useEffect solo se ejecuta una vez, cuando se monta el componente


  const handleVideoClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
    setIsLoaded(true);
    setIsInitialLoad(false); // Actualizar el estado isInitialLoad
  };


  // const handleAnimation = () => {
  //   setShowAnimation(false)
  // }


  console.log(id)

  return (
    <div ref={videoInViewRef} className={`video-section-container ${isActive ? "active" : ""}`}>
      {!isPlaying && !isLoading && <div className="paused"><BsFillPlayFill className='icon' /></div>}
      {isLoading && <div className="loading">Cargando...</div>}
      <video
        className="video-section__video"
        autoPlay
        loop
        muted={id === 1 ? isMuted : false}
        controls={false}
        playsInline
        onClick={handleVideoClick}
        ref={videoRef}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      {/* {showAnimation ? <div className="overlayDark">
        <div className="slide-animation-content">
          <div className="slide-animation">
            <p onClick={handleAnimation}>Desliza para navegar</p>
          </div>
        </div>
      </div> : null} */}
      <div className="videoBottomOverlay" onClick={handleVideoClick}>
        <div className="container">
          <h2>{videoDescription}</h2>
          <p className="location">Antigua Guatemala</p>
          <div className="line"></div>
          <div className="feature">
            <p>Capacidad 16</p>
            <p>Baños 5</p>
            <p>Habitaciones 8</p>
          </div>
          <div className="btn">
            <p>Boton</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;

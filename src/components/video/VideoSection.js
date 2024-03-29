import React, { useState, useRef, useEffect } from "react";
import "./videoSection.css";
import { useInView } from "react-intersection-observer";
import { BsFillPlayFill } from "react-icons/bs";

const VideoSection = ({ videoUrl, videoDescription, isActive, posterUrl }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [videoInViewRef, videoInView] = useInView({
    threshold: 0.5,
  });

  const [videoPosition, setVideoPosition] = useState(0);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (video && isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else if (video) {
      video.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    if (videoInView) {
      video.currentTime = videoPosition;
      setIsPlaying(false); // Comienza en pausa
      setVideoPosition(video.currentTime);
    } else if (video) {
      video.pause();
      setIsPlaying(false);
      setVideoPosition(video.currentTime);
    }

    video.addEventListener("play", () => {
      video.currentTime = 0;
    });

    return () => {
      if (video) {
        video.removeEventListener("play", () => {
          video.currentTime = 0;
        });
      }
    };
  }, [videoInView, videoRef, videoPosition]);

  return (
    <div ref={videoInViewRef} className={`video-section-container ${isActive ? "active" : ""}`}>
      {isPlaying ? null : (
        <div className="paused" onClick={handleVideoClick}>
          <BsFillPlayFill className='icon' />
        </div>
      )}

      <video
        className="video-section__video"
        loop
        autoPlay={isPlaying}
        muted={false}
        controls={false}
        playsInline
        onClick={handleVideoClick}
        ref={videoRef}
        poster={posterUrl} // Utiliza la URL de la imagen de portada proporcionada
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      {isPlaying ? null :
        <img className="video-section__poster" src={'https://s3.us-south.cloud-object-storage.appdomain.cloud/bucket-travelisimo/Reel_13010d798f'} alt={videoDescription} />
      }

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
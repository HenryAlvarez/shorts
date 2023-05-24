import React, { useState, useRef, useEffect } from "react";
import "./videoSection.css";
import { useInView } from "react-intersection-observer";


const VideoSection = ({ videoUrl, videoDescription, isActive }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoInViewRef, videoInView, videoInViewEntry] = useInView({
        threshold: 0.5,
    });

    const [videoPosition, setVideoPosition] = useState(0);

    useEffect(() => {
        const video = videoRef.current;

        if (videoInView) {
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

        if (videoInViewEntry) {
            console.log("Posición del elemento de video:", videoInViewEntry.boundingClientRect);
        }
    }, [videoInView, videoRef, videoInViewEntry, videoPosition]);


    const handleVideoClick = () => {
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };


    console.log(isActive)


    return (
        <div className={`video-section`} ref={videoInViewRef}>
            {!isPlaying && <div className="paused">Pausado</div>}
            <video
                className="video-section__video"
                autoPlay
                loop
                muted={false}
                playsInline
                onClick={handleVideoClick}
                ref={videoRef}
            >
                <source src={videoUrl} type="video/mp4" />
            </video>
            <div className="videoBottomOverlay">
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

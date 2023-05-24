import React, { useRef, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';


const FeedVideos = ({ videos }) => {
    const videoRefs = useRef([]);
    const observer = useRef(null);
    const currentIndex = useRef(0); // Variable para realizar el seguimiento del índice actual
    const isIntersecting = useRef(true); // Variable para controlar si hay intersección activa
  
    useEffect(() => {
      observer.current = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: '0px',
        threshold: 0.8, // Ajusta este valor según tus necesidades
      });
  
      videoRefs.current.forEach((videoRef) => {
        if (videoRef) {
          observer.current.observe(videoRef);
        }
      });
  
      return () => {
        if (observer.current) {
          observer.current.disconnect();
        }
      };
    }, []);
  
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isIntersecting.current) {
          // Lógica para reproducir el video cuando entra en el viewport
          const currentIndexValue = currentIndex.current;
          const targetIndex = videoRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          if (targetIndex === currentIndexValue + 1) {
            entry.target.play();
            currentIndex.current = targetIndex;
            isIntersecting.current = true;
          }
        } else {
          // Lógica para pausar el video cuando sale del viewport
          entry.target.pause();
          isIntersecting.current = false;
        }
      });
    };
  
    return (
      <div>
        {videos.map((video, index) => (
          <VideoPlayer
            key={index}
            src={video}
            ref={(el) => (videoRefs.current[index] = el)}
          />
        ))}
      </div>
    );
  };

  export default FeedVideos
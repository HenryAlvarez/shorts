import React, { useState, useRef } from 'react';
import VideoCard from './VideoCard';

const VideoFeed = () => {
    // Datos de ejemplo para los videos
    const videos = [
        { id: 1, url: 'https://cdn.travelisimo.com/b682551f78d542e79cf80803bdc6e2d9_a4e897fe0a' },
        { id: 2, url: 'https://cdn.travelisimo.com/a9eabc14f59f44869920a9a033b69651_71b663d616' },
        { id: 3, url: 'https://cdn.travelisimo.com/454efbbdfba246db97c3b1bfa41326a2_794d10878f' },
        // Agrega más videos aquí
    ];


    const [selectedVideo, setSelectedVideo] = useState(null);
    const feedRef = useRef(null);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    const handleScroll = () => {
        const feed = feedRef.current;
        const scrollTop = feed.scrollTop;
        const videoHeight = feed.offsetHeight;
        const selectedIndex = Math.round(scrollTop / videoHeight);

        setSelectedVideo(videos[selectedIndex]);
    };


    return (
        <div className="video-feed" ref={feedRef} onScroll={handleScroll}>
            {videos.map((video) => (
                <VideoCard
                    key={video.id}
                    url={video.url}
                    isSelected={video === selectedVideo}
                    onClick={() => handleVideoClick(video)}
                />
            ))}
        </div>
    );
};

export default VideoFeed;

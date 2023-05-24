import React from 'react';

const VideoCard = ({ url, isSelected, onClick }) => {
  return (
    <div className={`video-card ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      <video src={url} className="video" autoPlay loop muted />
    </div>
  );
};

export default VideoCard;

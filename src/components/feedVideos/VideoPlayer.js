import React from 'react'

function VideoPlayer({src}) {

    return (
        <video src={src} controls />
    )
}

export default VideoPlayer
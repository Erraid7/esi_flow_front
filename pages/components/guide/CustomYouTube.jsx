import React from 'react';
import YouTube from 'react-youtube';

const CustomYouTube = ({ videoId, className = '' }) => {
  const options = {
    width: '100%',
    height: '100%',
    playerVars: {
      modestbranding: 1, // Removes YouTube logo
      rel: 0, // Disables related videos
    },
  };

  const onReady = (event) => {
    console.log("Video is ready", event);
  };

  return (
    <div className={`relative w-full aspect-video  ${className}`}>
      <div className="absolute top-0 left-0 w-full h-full ">
        <YouTube 
          videoId={videoId} 
          opts={options} 
          onReady={onReady}
          className="w-full h-full "
        />
      </div>
    </div>
  );
};

export default CustomYouTube;
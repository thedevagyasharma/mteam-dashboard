import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import React, { useState, useRef, useEffect } from 'react';
import FormRange from 'react-bootstrap/FormRange'

const VideoPlayer = ({fbApp, currentTime, setCurrentTime, duration, setDuration, isPlaying, setIsPlaying}) => {

  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(()=>{
    const fetchVideoUrl = async () => {
      const storage = getStorage(fbApp)
      // const videoRef = null;
      const videoRef = ref(storage, 'gs://mteam-dashboard.appspot.com/Data_Sample2/video/video.mp4')
      try{
        const url = await getDownloadURL(videoRef);
        setVideoUrl(url);
      } catch (error) {
        console.error('Error fetching video from Firebase: ', error)
      }
      
    };
    fetchVideoUrl();
  }, [fbApp]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      const currentTime = videoRef.current.currentTime;
      setCurrentTime(currentTime);
    };
    videoRef.current.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [])


  const handleSeek = (event) => {
    const seekTime = parseFloat(event.target.value);
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handlePlayPause = () => {
    if(isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleLoadedMetadata = () => {
    const duration = videoRef.current.duration;
    setDuration(duration);
  };
    
    return (
      <>
        <div style={{ maxWidth: '800px', maxHeight: '600px', margin: '0 auto' }}>
          <video
            ref={videoRef}
            src={videoUrl}
            onLoadedMetadata={handleLoadedMetadata}
            style={{ width: '100%', height: 'auto' }}
          ></video>
          <FormRange
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />
          <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
          <p>Current Time: {currentTime}</p>
          <p>Duration: {duration}</p>
        </div>
      </>
      );

}

export default VideoPlayer;
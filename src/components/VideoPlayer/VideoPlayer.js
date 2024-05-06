import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Slider from '../Slider/Slider';

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
        <div style={{ margin:'  '}}>
          <video
            ref={videoRef}
            src={videoUrl}
            onLoadedMetadata={handleLoadedMetadata}
            style={{ width: '100%', height: 'auto' }}
          ></video>
          <Slider duration={duration?duration:0} handleSeek={handleSeek} currentTime={currentTime?currentTime:0}/>
          <Button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</Button>
        </div>
      </>
      );

}

export default VideoPlayer;
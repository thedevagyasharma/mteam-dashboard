import React, { useEffect, useState } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import CPR from '../Charts/CPR/CPR';
import CognitiveLoad from '../Charts/CognitiveLoad/CognitiveLoad';
import Actions from '../Charts/Actions/Actions';
import { getActionData, getCPRData, getData, getDuration, getVitalData } from '../../services/dataService';

const Dashboard = ({fbApp}) => {
    const [vitalData, setVitalData] = useState([]);
    const [actionData, setActionData] = useState([]);
    const [cprData, setCprData] = useState([]);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            console.log(await getData());
            setVitalData(getVitalData());
            setActionData(getActionData);
            setCprData(getCPRData);
            console.log('Duration of Simulation:', getDuration());
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (vitalData.length > 0) {
          console.log('Vital Data has been stored:', vitalData);
          console.log('Action Data has been stored:', actionData);
          console.log('CPR Data has been stored:', cprData);
          
        }
      }, [vitalData, actionData, cprData]);

    return (
        <>
        <div>
            
            <h1>mTeam Dashboard</h1> 
            <VideoPlayer fbApp={fbApp} currentTime={currentTime} setCurrentTime={setCurrentTime} duration={duration} setDuration={setDuration} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
            <Actions actionsData={actionData} />
            <CPR cprData={cprData} currentTime={currentTime} />
            <CognitiveLoad currentTime={currentTime}/>
        </div>
        </>
    );
}

export default Dashboard;
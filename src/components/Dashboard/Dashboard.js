import React, { useEffect, useState } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import CPR from '../Charts/CPR/CPR';
import CognitiveLoad from '../Charts/CognitiveLoad/CognitiveLoad';
import Actions from '../Charts/Actions/Actions';
import { getActionData, getCPRData, getData, getDuration, getVitalData } from '../../services/dataService';

const Dashboard = () => {
    const [vitalData, setVitalData] = useState([]);
    const [actionData, setActionData] = useState([]);
    const [cprData, setCprData] = useState([]);

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
      }, [vitalData, actionData]);

    return (
        <>
        <div>
            
            <h1>mTeam Dashboard</h1> 
            <VideoPlayer />
            <Actions actionsData={actionData} />
            <CPR cprData={cprData} />
            <CognitiveLoad />
        </div>
        </>
    );
}

export default Dashboard;
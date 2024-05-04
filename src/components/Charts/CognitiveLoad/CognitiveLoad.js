import React, { useEffect, useState } from "react";
import Plot from 'react-plotly.js';

import sensor from '../../../Data_sample2/sensor/umich2/1703183551_1be99daa2ff8508df747e0da6ce673b93cf8865a/sensor_1703183551_1be99daa2ff8508df747e0da6ce673b93cf8865a.json'



const CognitiveLoad = ({currentTime, duration}) => {

    const [chartData, setChartData] = useState({timestamps: [], cogLoad: []})

    useEffect(() => {
        const data = sensor.data;
        console.log('Sensor data:', data);

        const cogLoadData = data.find(sensor => sensor.name==='CognitiveLoad');
        if(cogLoadData){
            const timestamps = cogLoadData.data.map(point => point[0])
            const cogLoad = cogLoadData.data.map(point => point[1]);

            const minTimestamp = Math.min(...timestamps);
            const normalizedTimestamps = timestamps.map(ts => ts - minTimestamp);
            setChartData({normalizedTimestamps, cogLoad})
        }
    }, []);



    const currentTimeMarker = {
        type: "scatter",
        mode: "lines", 
        x: [currentTime, currentTime],
        y: [0,1],
        line: {color: "red", width: 2}
    }

    return (
        <>
         <h3>Cognitive Load </h3>
         {/* <div>
            <input type = 'checkbox' label='User 1'></input>
            <label>User 1</label>

            <input type = 'checkbox' label='User 1'></input>
            <label>User 2</label>

            <input type = 'checkbox' label='User 1'></input>
            <label>User 3</label>

            <input type = 'checkbox' label='User 1'></input>
            <label>User 4</label>
         </div> */}
         <Plot 
            data={[
                {   x: chartData.timestamps,
                    y: chartData.cogLoad,
                    type: 'scatter',
                    mode: 'lines', 
                    marker: {color: 'blue'},
                }, currentTimeMarker
            ]}
            layout={{
                xaxis: { title: 'Time (seconds)', range:[0, duration] },
                yaxis: { visible: false },
                showlegend: false,
                height: 300,
                width: '100%'
            }}
         
         />
        </>
    );
}

export default CognitiveLoad;
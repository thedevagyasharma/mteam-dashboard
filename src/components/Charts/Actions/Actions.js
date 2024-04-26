import React from "react";
import Plot from 'react-plotly.js'

const Actions = ({actionsData}) => {
    
    const dataByType = {};
    actionsData.forEach(item => {
        const {type, "SubAction Name": subAction, timestamp_seconds} = item;
        if(!dataByType[type]){
            dataByType[type] = {x: [], y: [], type: 'scatter', mode:'markers', name: type};
        }
        dataByType[type].x.push(timestamp_seconds);
        dataByType[type].y.push(subAction)
    });

    const plotData = Object.values(dataByType);

    return (
        <>
        <h3>Actions Chart</h3>
        <Plot
            data={plotData}
            layout={{
                title: 'Actions Timeline',
                xaxis: { title: 'Time (seconds)' },
                yaxis: { title: 'SubAction Name' },
                showlegend: true,
            }}
        />
        </>
    );
}

export default Actions;
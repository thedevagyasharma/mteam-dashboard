import React from "react";
import Plot from "react-plotly.js";

const CPR = ({cprData, currentTime, duration}) => {

    const lines = cprData.map(cycle => ({
        type: 'scatter',
        mode: "lines",
        x: [cycle.startCpr, cycle.endCpr],
        y: [1,1],
        line: {color: 'blue', width: 10}
    }));

    const currentTimeMarker = {
        type: "scatter",
        mode: "lines", 
        x: [currentTime, currentTime],
        y: [0, 2],
        line: {color: "red", width: 2, dash: "dash"}
    }

    return (
        <>
            <h3>Compressions</h3>
            <Plot 
                data={[...lines, currentTimeMarker]}
                layout={{
                    xaxis: { title: 'Time (seconds)', range:[0, duration] },
                    yaxis: { visible: false },
                    showlegend: false,
                    height: 200,
                    width: '100%'
                }}
            />
        </>
    );
}

export default CPR;
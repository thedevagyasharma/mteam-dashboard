import React from "react";
import Plot from "react-plotly.js";
import { getCPRData } from "../../../services/dataService";

const CPR = (props) => {
    const cprData = props.cprData;

    const lines = cprData.map(cycle => ({
        type: 'scatter',
        mode: "lines",
        x: [cycle.startCpr, cycle.endCpr],
        y: [1,1],
        line: {color: 'blue', width: 10}
    }));

    return (
        <>
            <h3>Compressions</h3>
            <Plot 
                data={lines}
                layout={{
                    xaxis: { title: 'Time (seconds)' },
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
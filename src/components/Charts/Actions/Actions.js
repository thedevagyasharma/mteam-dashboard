import React, { useEffect, useState } from "react";
import Plot from 'react-plotly.js';
import Form from 'react-bootstrap/Form';
import { Row } from "react-bootstrap";

const Actions = ({actionsData, duration}) => {

    const [selectedData, setSelectedData] = useState({
        'Medication': true,
        'Shock': true,
        'Pulse Check': true,
        'Order': true
    });
    const [filteredData, setFilteredData] = useState([]);
    const [phaseData, setPhaseData] = useState({
        phaseShapes: null,
        phaseNames: null
    });

    const colors = {
        'Medication': '#1f77b4', // Blue
        'Shock': '#ff7f0e', // Orange
        'Pulse Check': '#2ca02c', // Green
        'Order': '#9467bd' // Purple
    };

    const phaseColors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];


    const handleDataChange = (e) => {
        const {name, checked} = e.target;
        setSelectedData(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const getPhases = () => {
        const phaseMap = new Map();
        actionsData.forEach((item)=>{
            const {"Action/Vital Name": phaseName, timestamp_seconds} = item;
            if(!phaseMap.has(phaseName)){
                phaseMap.set(phaseName, {start: timestamp_seconds, end: timestamp_seconds})
            } else {
                const existingPhase = phaseMap.get(phaseName);
                existingPhase.end = timestamp_seconds;
                phaseMap.set(phaseName, existingPhase);
            }
        });
    
        const phaseArray = Array.from(phaseMap, ([phaseName, {start, end}])=> ({phaseName, start, end}));
        return phaseArray;
    }

    useEffect(() => {
        const dataByType = {};
        actionsData.forEach(item => {
            const { type, 'SubAction Name': subAction, timestamp_seconds } = item;
            if(selectedData[type]){
                if(!dataByType[type]){
                    dataByType[type] = { x: [], y: [], type: 'scatter', mode: 'markers', name: type, marker:{color: colors[type]} };
                }
                dataByType[type].x.push(timestamp_seconds);
                dataByType[type].y.push(subAction);
            }
        });

        const phaseArray = getPhases();
        const phaseShapes = phaseArray.map((phase, index) => ({
            type: 'rect',
            xref: 'x',
            yref: 'paper',
            x0: phase.start,
            y0: 0,
            x1: phase.end,
            y1: 1,
            fillcolor: phaseColors[index % phaseColors.length] + '33',
            line: { width: 0 },
            name: phase.phaseName
        }));

        const annotations = phaseArray.map((phase,index) => ({
            x: (phase.start+1),
            y: 1,
            xref: 'x',
            yref: 'paper',
            text: phase.phaseName.replace('(action)', ''),
            showarrow: false,
            font: {
                size: 8,
                color: phaseColors[index % phaseColors.length],
            },
            textangle: 270
        }));

        setPhaseData({phaseShapes: phaseShapes, phaseNames: annotations});
        setFilteredData([...Object.values(dataByType), ...phaseShapes]);
    },[selectedData, actionsData])

    return (
        <>
        <Plot
            data={filteredData}
            layout={{
                shapes: phaseData.phaseShapes,
                annotations: phaseData.phaseNames,
                xaxis: { title: 'Time (seconds)', range: [0, duration] },
                yaxis: { visible: false },
                showlegend: false,
                autosize: true,
                margin: 0
            }}
        />
        <Row className="mx-2">
                <Form.Check className='col'
                    inline
                    label='Medication'
                    name='Medication'
                    checked={selectedData['Medication']}
                    onChange={handleDataChange}
                    style={{ color: colors['Medication'] }}
                />
                <Form.Check className='col'
                    inline
                    label='Shock'
                    name='Shock'
                    checked={selectedData['Shock']}
                    onChange={handleDataChange}
                    style={{ color: colors['Shock'] }}
                />
                <Form.Check className='col'
                    inline
                    label='Pulse Check'
                    name='Pulse Check'
                    checked={selectedData['Pulse Check']}
                    onChange={handleDataChange}
                    style={{ color: colors['Pulse Check'] }}
                />
                <Form.Check className='col'
                    inline
                    label='Order'
                    name='Order'
                    checked={selectedData['Order']}
                    onChange={handleDataChange}
                    style={{ color: colors['Order'] }}
                />
        </Row>
        
        
        </>
    );
}

export default Actions;
import React, { useEffect, useState } from "react";
import Plot from 'react-plotly.js';
import Form from 'react-bootstrap/Form';

const Actions = ({actionsData, duration}) => {

    const [selectedData, setSelectedData] = useState({
        'Medication': true,
        'Shock': true,
        'Pulse Check': true,
        'Order': true
    });
    const [filteredData, setFilteredData] = useState([]);

    const colors = {
        'Medication': '#1f77b4', // Blue
        'Shock': '#ff7f0e', // Orange
        'Pulse Check': '#2ca02c', // Green
        'Order': '#9467bd' // Purple
    };

    const handleDataChange = (e) => {
        const {name, checked} = e.target;
        setSelectedData(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const formatTime = (seconds) => {
        const date = new Date(null);
        date.setSeconds(seconds);
        return date.toISOString().substr(11, 8); // Extract hh:mm:ss
    };

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
        setFilteredData(Object.values(dataByType));
    },[selectedData, actionsData])

    return (
        <>
        <h3>Actions Chart</h3>
        <Form>
            <Form.Check
                inline
                label='Medication'
                name='Medication'
                checked={selectedData['Medication']}
                onChange={handleDataChange}
                style={{ color: colors['Medication'] }}
            />
            <Form.Check
                inline
                label='Shock'
                name='Shock'
                checked={selectedData['Shock']}
                onChange={handleDataChange}
                style={{ color: colors['Shock'] }}
            />
            <Form.Check
                inline
                label='Pulse Check'
                name='Pulse Check'
                checked={selectedData['Pulse Check']}
                onChange={handleDataChange}
                style={{ color: colors['Pulse Check'] }}
            />
            <Form.Check
                inline
                label='Order'
                name='Order'
                checked={selectedData['Order']}
                onChange={handleDataChange}
                style={{ color: colors['Order'] }}
            />
        </Form>
        <Plot
            data={filteredData}
            layout={{
                xaxis: { title: 'Time (seconds)', range: [0, duration] },
                yaxis: { visible: false },
                showlegend: false,
            }}
        />
        </>
    );
}

export default Actions;
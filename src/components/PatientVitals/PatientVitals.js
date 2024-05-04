import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { hydrateRoot } from "react-dom/client";

const PatientVitals = ({currentTime, vitalData}) => {

    const [currentVitals, setCurrentVitals] = useState({
        'HR Waveform': 'NaN',
        'Heart Rate': 'NaN',
        'Temperature': 'NaN',
        'Systolic': 'NaN',
        'Diastolic': 'NaN',
    });

    const updateVitals = (time) => {
        // Find vital data at the specified time
        const curVit = vitalData.filter(vital => vital["timestamp_seconds"] === Math.floor(time));
    
        if (curVit.length > 0) {
            // Initialize variables to store extracted values
            let hrWaveform = 'NaN';
            let heartRate = 'NaN';
            let temperature = 'NaN';
            let systolic = 'NaN';
            let diastolic = 'NaN';
    
            // Iterate through each object in curVit array
            curVit.forEach(vital => {
                switch (vital["Action/Vital Name"]) {
                    case 'HR_Waveform(vital)':
                        hrWaveform = vital['New Value'];
                        break;
                    case 'HR(vital)':
                        heartRate = vital['New Value'];
                        break;
                    case 'Temperature(vital)':
                        temperature = vital['New Value'];
                        break;
                    case 'Systolic(vital)': // Adjust the Action/Vital Name
                        systolic = vital['New Value'];
                        break;
                    case 'Diastolic(vital)': // Adjust the Action/Vital Name
                        diastolic = vital['New Value'];
                        break;
                    default:
                        break;
                }
            });
    
            // Update currentVitals with extracted values
            setCurrentVitals({
                'HR Waveform': hrWaveform,
                'Heart Rate': heartRate,
                'Temperature': temperature,
                'Systolic': systolic,
                'Diastolic': diastolic,
            });
        }
    };
    useEffect(() => {
        updateVitals(currentTime);
    }, [currentTime, vitalData])

    return(
        <>
        <h3>Patient Vitals</h3>
        <Row>
            <Col>
            <Row>
                <strong>HR Waveform</strong>
            </Row>
            <Row>
                <p>{currentVitals['HR Waveform']}
            </p>
            </Row>
            </Col>
            <Col>
            <Row>
                <strong>Heart Rate</strong>
            </Row>
            <Row>
                <p>{currentVitals['Heart Rate']}</p>
            </Row>
            </Col>
            <Col>
            <Row>
                <strong>Temperature</strong>
            </Row>
            <Row>
                <p>{currentVitals['Temperature']}</p>
            </Row>
            </Col>
            <Col>
            <Row>
                <strong>Blood Pressure</strong>
            </Row>
            <Row>
                <p>{currentVitals['Systolic'] + '/' + currentVitals['Diastolic']}</p>
            </Row>
            </Col>
        </Row>
        </>
    );
}

export default PatientVitals;
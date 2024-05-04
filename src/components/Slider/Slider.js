import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const Slider = ({ duration, currentTime, handleSeek}) => {

const secondsToTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

    return(
        <Form.Group>
            <Row className='align-items-center'>
                <Col xs={12}>
                <Form.Range
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                />
                </Col>
                <Col xs={6} className="text-start">
                    <Form.Label>{secondsToTime(currentTime)}</Form.Label>
                </Col>
                <Col xs={6} className="text-end">
                    <Form.Label>{secondsToTime(duration)}</Form.Label>
                </Col>
            </Row>
        </Form.Group>
    );
}

export default Slider;
import { useState } from 'react';
import { Row, Col, Form, FloatingLabel, Alert, Container } from 'react-bootstrap';
import api from '../lib/api';
import { PointMap } from '.';
import services from '../lib/services';
import { GeoFill, CheckCircle, XCircle } from 'react-bootstrap-icons'
import ServerReply from "./serverReply";
import React from 'react';

function AddParkingLot() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [totalSlots, setTotalSlots] = useState("");
    const [geographicalArea, setGeographicalArea] = useState('');
    const [openArea, setOpenArea] = useState(false);
    const [coord, setCoord] = useState();
    const [error, setError] = useState();
    const [success, setSuccess] = useState(false);
    const [waiting, setWaiting] = useState(false);

    const resetFields = () => {
        setName("");
        setDescription("");
        setTotalSlots("");
        setCoord();
        setGeographicalArea("");
    }

    const handleSubmit = async () => {
        try {
            let err = "";
            if (!name) err += "No name was provided. ";
            if (!description) err += "No difficulty was selected. "
            if (!coord) err += "The position was not provided. ";
            if (!geographicalArea) err += "The geographical area was not provided. ";
            if (err !== "") throw err;
            
            const pk = {
                "name": name,
                "desc": description,
                "slots": totalSlots,
                "coordinates": coord,
                "geographicalArea": geographicalArea
            };
            setWaiting(true);
            await api.addParking(pk);
            setWaiting(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            resetFields();

        } catch (err) {
            setWaiting(false);
            setSuccess(false);
            setError(true);
            setTimeout(() => setError(false), 3000);
        }
    }


    const setCoordinateAndGetAddress = (coordinate) => {
        setCoord(coordinate);
        services.GetAddressFromPoint(coordinate[0], coordinate[1]).then(x => setGeographicalArea(`${x.address.city}, ${x.address.state}, ${x.address.country}`.replace('undefined,', '')));
    }

    return (<>
        <div style={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: "url(/images/DSC_0089.jpg)",
            minHeight: "100%"
        }}>
            <Container fluid >
                <div className="d-flex align-items-center justify-content-center text-center not-found-container">
                    <h3 className="mt-3"
                        style={{
                            fontFamily: "Montserrat,Helvetica,Arial,Lucida,sans-serif",
                            fontWeight: "800",
                            fontSize: "49px",
                            color: "#0d0d0d",
                            textShadow: "2px 2px 4px #cccccc"
                        }}>Add a new parking lot</h3>
                </div>
                <Row>
                    <div className="d-flex align-items-center justify-content-center not-found-container mt-4"
                        style={{ opacity: "90%" }}>
                        <Col md={5} xs={12} sm={10} >

                            {openArea && <PointMap openArea={openArea} setOpenArea={setOpenArea} setCoord={setCoordinateAndGetAddress} coord={coord} />}
                            <Form className="shadow-lg p-3 mb-5 bg-white rounded">
                                <FloatingLabel className="mb-3" controlId="floatingInput" label="Parking name">
                                    <Form.Control type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder="Name" />
                                </FloatingLabel>
                                <FloatingLabel className="mb-3" controlId="floatingTextarea" label="Parking description">
                                    <Form.Control as="textarea" value={description} onChange={ev => setDescription(ev.target.value)} placeholder="Description" style={{ height: "120px" }} />
                                </FloatingLabel>
                                <FloatingLabel className="mb-3" controlId="floatingInput" label="Total slots">
                                    <Form.Control type="number" data-test="total-cost" value={totalSlots} onChange={ev => setTotalSlots(ev.target.value)} min={0} placeholder="Total slots" />
                                </FloatingLabel>
                                <Alert role="button" variant="light"
                                    style={
                                        {
                                            backgroundColor: "#FFFFFF",
                                            border: "1px solid #ced4da",
                                            color: "#000000"
                                        }
                                    } onClick={() => setOpenArea(true)}>
                                    <GeoFill className="me-3 mb-1" />
                                    {coord !== undefined ? "Position selected!" : "Position"}
                                </Alert>


                                {/* ERROR HANDLING */}
                                <ServerReply error={error} success={success} waiting={waiting} errorMessage={"Error while adding a new parking"} successMessage={"New parking lot added correctly!"} />

                                {/* ICONS */}
                                <div className="d-flex flex-row-reverse">
                                    <CheckCircle role="button" className="me-3" onClick={e => {
                                        if (!waiting) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleSubmit();
                                        }
                                    }} type="submit" size="20px" />
                                    <XCircle role="button" className="me-3 " onClick={resetFields} variant="outline-secondary" size="20px" />
                                </div>
                            </Form>
                        </Col  >
                    </div>
                </Row>
            </Container>
        </div>
    </>);
}

export default AddParkingLot;
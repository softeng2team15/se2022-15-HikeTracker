import { Row, Col, Form, FloatingLabel, Button, Alert, Container } from 'react-bootstrap';
import { PointMap } from '../components';
import services from '../lib/services';
import { CheckCircle, GeoFill, XCircle, ArrowLeft } from 'react-bootstrap-icons'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServerReply from "../components/serverReply";

function AddHutForm(props) {
    const [openArea, setOpenArea] = useState(false);
    const [name, setName] = useState("");
    const [numBeds, setNumBeds] = useState("");
    const [coord, setCoord] = useState();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState(null);
    const [message, setMessage] = useState("");
    const [err, setErr] = useState(false);
    const [done, setDone] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            if (validateInfo(name, description, numBeds, coord, phoneNumber, email, website, setMessage)) {
                setWaiting(true);
                props.newHut(name, description, numBeds, coord, phoneNumber, email, website);
                setWaiting(false);
                setDone(true);
                setTimeout(() => setDone(false), 3000);
                resetFields();
            }
            else {
                setErr(message);
                setTimeout(() => setErr(false), 3000);
            }
        } catch {
            setWaiting(false);
            setDone(false);
            setErr(err);
            setTimeout(() => setErr(false), 3000);
        }

    }
    
    const resetFields = () => {
        setName("");
        setDescription("");
        setNumBeds("");
        setCoord();
        setEmail("");
        setPhoneNumber("");
        setWebsite("");

    }

    const setCoordinateAndGetCountry = (coordinate) => {
        setCoord(coordinate);
        services.GetAddressFromPoint(coordinate[0], coordinate[1]).then(x => setCountry(`${x.address.country}`.replace('undefined','')));
    }

    return (<>
        <div style={{
            backgroundImage: "url(/images/pexels-arianna-tavaglione-5771589.jpg)",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
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
                        }}>Add a new hut</h3>
                </div>
                <Row>
                    <div className="d-flex align-items-center justify-content-center not-found-container mt-4"
                        style={{
                            opacity: "90%"
                        }}>
                        {/* MAP */}
                        {openArea ? (<PointMap openArea={openArea} setOpenArea={setOpenArea} setCoord={setCoordinateAndGetCountry} coord={coord} />) : <></>}


                        {/* FORM */}
                        <Form className="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: "40%" }}>

                            {/* Hut name */}
                            <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
                                <Form.Control type="text" placeholder="Name" value={name} onClick={() => setErr(false)} onChange={(event) => setName(event.target.value)} />
                            </FloatingLabel>

                            {/* Description */}
                            <FloatingLabel controlId="floatingInput" label="Description" className="mb-3">
                                <Form.Control type="text" placeholder="NumOfBeds" value={description} onClick={() => setErr(false)} onChange={(event) => setDescription(event.target.value)} />
                            </FloatingLabel>

                            {/* Number of beds */}
                            <FloatingLabel controlId="floatingInput" label="Number of beds" className="mb-3">
                                <Form.Control type="number" min={0} placeholder="NumOfBeds" value={numBeds} onClick={() => setErr(false)} onChange={(event) => setNumBeds(event.target.value)} />
                            </FloatingLabel>
                            
                            {/* Phone */}
                            <FloatingLabel controlId="floatingInput" label="Phone number" className="mb-3">
                                <Form.Control type="text" min={0} placeholder="PhoneNumber" value={phoneNumber} onClick={() => setErr(false)} onChange={(event) => setPhoneNumber(event.target.value)} />
                            </FloatingLabel>

                            {/* Email */}
                            <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
                                <Form.Control type="text" min={0} placeholder="Email" value={email} onClick={() => setErr(false)} onChange={(event) => setEmail(event.target.value)} />
                            </FloatingLabel>

                            {/* Website */}
                            <FloatingLabel controlId="floatingInput" label="Website" className="mb-3">
                                <Form.Control type="text" min={0} placeholder="Website" value={website} onClick={() => setErr(false)} onChange={(event) => setWebsite(event.target.value)} />
                            </FloatingLabel>



                            <Alert role="button" variant="light" style={{ backgroundColor: "#FFFFFF", border: "1px solid #ced4da", color: "#000000" }} onClick={() => setOpenArea(true)}>
                                <GeoFill className="me-3" />
                                Position
                            </Alert>

                            {/* Country */}
                            <FloatingLabel controlId="floatingInput" label="Country" className="mb-3">
                                <Form.Control disabled={true} type="text" placeholder="Country" value={country} onClick={() => setErr(false)} onChange={(event) => setCountry(event.target.value)} />
                            </FloatingLabel>


                            {/* ERROR HANDLING */}
                            <ServerReply error={err} success={done} waiting={waiting} errorMessage={"Error while adding a new hut"} successMessage={"New hut added correctly!"} />

                            
                            {/* BUTTONS */}
                            <div className="d-flex flex-row-reverse">
                                <CheckCircle role="button" className="me-3" onClick={(handleSubmit)} type="submit" size="20px" />
                                <XCircle role="button" className="me-3 " onClick={resetFields} variant="outline-secondary" size="20px" />
                                <ArrowLeft role="button" className="me-3" onClick={() => navigate("/hut")}  size="20px" />
                            </div>
                        </Form>
                    </div>
                </Row>
            </Container>
        </div>
    </>);
}

const validateInfo = (name, description, numberOfBeds, coordinate, phone, email, website, setMessage) => {
    var emailValidator = require("node-email-validation");

    if ([name, description, numberOfBeds, coordinate, phone, email, setMessage].some(t => t.length === 0)) {
        setMessage("All fields should be filled");
        return false;
    }
    if (name.match(/^\s+$/)) {
        setMessage("Invalid hut name.");
        return false;
    }
    // if (!country.match(/^[a-zA-Z]+[a-zA-Z]+$/)) {
    //     setMessage("Invalid country name.");
    //     return false;
    // }
    
    if (!emailValidator.is_email_valid(email)) {
        setMessage("Invalid email.");
        return false;
    }


    /*
    if (!(coordinate.split(",").length === 2 && coordinate.split(",").every(t => t.match(/^([0-9]*[.])?[0-9]+$/)))) {
        setMessage("The coordinates should be two numbers separated by comma");
        return false;
    }*/

    return true;
};

export default AddHutForm;
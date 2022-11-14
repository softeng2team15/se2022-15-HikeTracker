import { Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap';
import { PointMap } from '../components';

import { useState } from 'react';

function Hut(props) {
    const [openArea, setOpenArea] = useState(false);
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [numGuests, setNumGuests] = useState("");
    const [numBeds, setNumBeds] = useState("");
    const [coord, setCoord] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        props.newHut(name, country, numGuests, numBeds, coord);
    
    }

    return(<>{openArea ? (<PointMap openArea={openArea} setOpenArea={setOpenArea} setCoord={setCoord}/>) : <></>}
        <Row className="mt-4">
            <h1>Add a new hut</h1>
        </Row>
        <Row><Col xs={6}>
            <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
                <Form.Control type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}/>
            </FloatingLabel>
            </Col>
            <Col xs={6}>
            <FloatingLabel controlId="floatingInput" label="Country" className="mb-3">
                <Form.Control type="text" placeholder="Country" value={country} onChange={(event) => setCountry(event.target.value)}/>
            </FloatingLabel>
            </Col>
        </Row>    
        <Row><Col xs={4}>
            <FloatingLabel controlId="floatingInput" label="Number of guest" className="mb-3">
                <Form.Control type="number" min={0} placeholder="NumOfGuest" 
                value={numGuests} onChange={(event) => setNumGuests(event.target.value)}/>
            </FloatingLabel>
            </Col>
            <Col xs={4}>
            <FloatingLabel controlId="floatingInput" label="Number of bedrooms" className="mb-3">
            <Form.Control type="number" min={0} placeholder="NumOfRooms" value={numBeds} onChange={(event) => setNumBeds(event.target.value)}/>
            </FloatingLabel>
            </Col>
            <Col xs={4}><div className="d-grid gap-2"> 
            <Button variant="outline-dark" style={{height: "58px"}} onClick={() => setOpenArea(true)}>Select point</Button>
            </div>
            </Col>
        </Row>
        <Form onSubmit={(handleSubmit)}><Button type="submit">Save</Button></Form>
    </>);
}

export default Hut;
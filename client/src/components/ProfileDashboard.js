import { useState, useEffect } from 'react';
import { Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../lib/api';

function Dashboard() {

    useEffect(() => {
    },[]);
    
    const iconProfile = (<p>
        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
    </p>);

    return(<>
        {iconProfile}
        <Form className="my-2">
            <Form.Group className="mb-3" controlId="InputName">
                <Form.Label><b>Username</b></Form.Label>
                <Form.Control disabled type="text" value="MyUsername"/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label><b>Full name</b></Form.Label>
                <Form.Control disabled type="text" value="MyFullName"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="InputName">
                <Form.Label><b>Password</b></Form.Label>
                <Form.Control disabled type="text" value="MyPasswordInClear"/>
                <Link style={{"font-size":"80%"}}>Change password</Link>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label><b>I'm joking</b></Form.Label>
                <Form.Control disabled type="text" value="ImJokingGuys"/>
            </Form.Group>
        </Form>
    </>);
}

export default Dashboard;
import { useState, useEffect } from 'react';
import { Row, Col, Form, ListGroup } from 'react-bootstrap';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import api from '../lib/api';
import { ProfileDashboard, ProfilePreferences } from '../components';

function Sidebar() {

    const location = useLocation();
    const path = location.pathname;

    return(
        <ListGroup variant="flush">
            <ListGroup.Item action as={Link} to="/profile/dashboard" style={path==="/profile/dashboard" ? {"fontWeight":"bold"} : null}>Dashboard</ListGroup.Item>
            <ListGroup.Item action as={Link} to="/profile/preferences" style={path==="/profile/preferences" ? {"fontWeight":"bold"} : null}>Preferences</ListGroup.Item>
        </ListGroup>
    );
}

function Profile(props) {

    useEffect(() => {
    },[]);

    return(<>
        {/* <Row className="px-0 mx-0 ">
            <Col>
                <h1 className="mx-4 my-4">Profile settings</h1>
            </Col>
        </Row> */}
        <Row className="px-0 mx-0">
            <Col xs={2} style={{ height: "97vh", backgroundColor: "#e0e3e5" }} className="px-1 py-1">
                <Row>
                    <Col>
                        <h3 className="mx-2 my-4">Profile settings</h3>
                    </Col>
                </Row>
                <Sidebar/>
            </Col>
            <Col md={6} className="mx-auto mb-4">
                <Routes>
                    <Route path="/dashboard" element={<ProfileDashboard/>}/>
                    <Route path="/preferences" element={<ProfilePreferences/>}/>
                </Routes>
            </Col>
        </Row>
    </>);
}

export default Profile;
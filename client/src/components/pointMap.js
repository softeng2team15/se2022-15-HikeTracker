import 'leaflet/dist/leaflet.css';
import { divIcon } from "leaflet";
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet'
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import icons from "../lib/iconspoint";
import api from '../lib/api';
import getColor from '../lib/hikeColor';
import globalVariables from "../lib/globalVariables";

function GetPointAndNewHikes(props) {
    const [dragging, setDragging] = useState(false);
    const mapev = useMapEvents({

        dragstart: () => setDragging(true),
        dragend: () => {
            const bounds = mapev.getBounds();
            props.getHikes([[bounds._northEast.lat, bounds._northEast.lng], [bounds._southWest.lat, bounds._southWest.lng]]);
            setDragging(false);
        },
        click: e => {
            if (!dragging) props.setCoors([e.latlng.lat, e.latlng.lng]);
        },
        zoomend: () => {
            const bounds = mapev.getBounds();
            props.getHikes([[bounds._northEast.lat, bounds._northEast.lng], [bounds._southWest.lat, bounds._southWest.lng]]);
        }
    });
    return null;
}
function PointMap(props) {
    const [hikes, setHikes] = useState([]);
    const getHikes = async bounds => {
        try {
            const hikes = await api.getHikesInBounds(bounds);
            setHikes([...hikes]);
        } catch (error) {
            setHikes([]);
        }
    }
    const customMarkerIcon = divIcon({
        html: icons.iconsvg['selectedPoint'],
        iconSize: [30, 30],
        className: "map-point"
    });
    return (
        <>
            <Modal size="lg" className="my-5" show={props.openArea} onHide={e => props.setOpenArea(false)}>
                <Modal.Header closeButton>Select the desired area</Modal.Header>
                <Modal.Body>
                    <MapContainer whenReady={m => m.target.locate({ setView: true })} center={[0, 0]} zoom={13} style={{ height: "50vh", minHeight: "100%" }} scrollWheelZoom={true}>
                        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url={globalVariables.mapTiles} />
                        <GetPointAndNewHikes setCoors={props.setCoord} getHikes={getHikes} setHikes={setHikes} />
                        {props.coord !== undefined &&
                            <Marker icon={customMarkerIcon} position={props.coord} />
                        }
                        {
                            hikes.map(h => <Polyline key={h.id} pathOptions={{ color: getColor(h.id) }} positions={h.coordinates} />)
                        }
                    </MapContainer>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={props.coord === undefined} variant="outline-danger" onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        props.setCoord();
                    }}>Clear</Button>
                    <Button disabled={props.coord === undefined} variant="outline-success" onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        props.setOpenArea(false);
                        props.setCoord(props.coord);
                    }}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PointMap;
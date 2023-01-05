import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import { useEffect, useState } from "react";
import api from "../lib/api";
import { Spinner } from "react-bootstrap";
import getMarkerForPoint from "../lib/markerPoint";
import globalVariables from "../lib/globalVariables";
import React from 'react';

function HikeMapLink(props) {
    const [coordinates, setCoordinates] = useState([]);
    const [ , setCenter] = useState([0.05, 0.05]);
    
    useEffect((props) => {
        const getMapDetails = async () => {
            try {
                const mapdets = await api.getHikeMap(props.hike.id);
                props.setBounds(mapdets.bounds);
                setCoordinates(mapdets.coordinates);
                setCenter(mapdets.center);
            } catch (error) {
                props.setBounds([[0, 0], [0.1, 0.1]]);
                setCenter([0.05, 0.05]);
                setCoordinates([]);
            }
        }
        getMapDetails();
    }, []);
    const pathopts = { color: 'black', weigth: 5 }
    return (
        <>
            {props.bounds[0][0] === 0 ?
                <Spinner animation="grow" />
                :
                <MapContainer bounds={props.bounds} style={{ width: "auto", height: "93vh" }} scrollWheelZoom={true}>

                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url={globalVariables.mapTiles} />

                    <Polyline pathOptions={pathopts} positions={coordinates} />

                    {[...new Set([...props.linkableStartPoints, ...props.linkableEndPoints])]
                        .filter(p => ![...props.hike.referencePoints, ...props.hike.huts]
                            .map(h => h.id)
                            .includes(p.id)
                            && props.hike.endPoint.id !== p.id
                            && props.hike.startPoint.id !== p.id
                        )
                        .map(p => getMarkerForPoint(p,
                            p.id === props.hike.startPoint.id,
                            p.id === props.hike.endPoint.id,
                            props.selectedPoint === p.id,
                            true,
                            props.selectedPoint,
                            props.setSelectedPoint)
                        )
                    }

                    {[...props.hike.referencePoints, ...props.hike.huts]
                        .filter(p => p.id !== props.hike.startPoint.id
                            && p.id !== props.hike.endPoint.id)
                        .map(p => getMarkerForPoint(p,
                            p.id === props.hike.startPoint.id,
                            p.id === props.hike.endPoint.id,
                            props.selectedPoint === p.id,
                            true,
                            props.selectedPoint,
                            props.setSelectedPoint))}

                    {getMarkerForPoint(props.hike.startPoint,
                        true,
                        props.hike.startPoint.id === props.hike.endPoint.id,
                        props.selectedPoint === props.hike.startPoint.id,
                        true,
                        props.selectedPoint,
                        props.setSelectedPoint)}
                    {props.hike.startPoint.id !== props.hike.endPoint.id ?
                        getMarkerForPoint(props.hike.endPoint,
                            false,
                            true,
                            props.selectedPoint === props.hike.endPoint.id,
                            true,
                            props.selectedPoint,
                            props.setSelectedPoint)
                        :
                        <></>}
                </MapContainer>
            }
        </>
    )



}

export default HikeMapLink;
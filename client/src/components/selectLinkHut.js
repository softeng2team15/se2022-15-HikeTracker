import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import icons from "../lib/iconspoint";
import ServerReply from "./serverReply";

function SelectLinkHut(props){
    console.log("IN selectlinkhut WITH ",props.point,"and hike",props.hike);
    const isStart=props.point.id===props.startPoint.id;
    const isEnd=props.point.id===props.endPoint.id;
    const [link,setLink]=useState(props.hike.referencePoints.length>0?props.hike.referencePoints.map(p=>p.id).includes(props.point.id):false);
    const [error,setError]=useState();
    const [success,setSuccess]=useState(false);
    const [waiting,setWaiting]=useState(false);
    useEffect(()=>{
        setLink(props.hike.huts.map(p=>p.id).includes(props.point.id))
    },[props.point])
    const submitHandler=async ()=>{
        try {
            setWaiting(true);
            await props.linkHut();
            setWaiting(false);
            setSuccess(true);
            setError();
            setTimeout(()=>setSuccess(false),3000);
        } catch (error) {
            setWaiting(false);
            console.log("Error in link submit",error);
            setSuccess(false);
            setError(error);
            setTimeout(()=>setError(false),3000);
        }
    }
    return(
        <>
            <Form>
                <Form.Group className="my-3 text-center">
                    {icons.iconsvgelement[props.point.typeOfPoint]}
                    <Form.Label style={{width:"100%",fontWeight:"bolder"}}><p className="mt-3">{props.point.name}</p></Form.Label>
                </Form.Group>
                <Form.Group className="mx-5 my-3">
                    <div className="mx-auto text-center my-3">
                        <Button variant={link?"info":"outline-success"} disabled={link?true:false} onClick={e=>{
                            e.preventDefault();
                            e.stopPropagation();
                            submitHandler();
                        }}>{link?"This point is already linked to this hike":"Link this point to this hike"}</Button>
                    </div>
                </Form.Group>
            </Form>
            <ServerReply error={error} success={success} waiting={waiting} errorMessage={"Error while linking this hut to this hike"} successMessage={"Hut linked to this hike correctly!"} />
        </>
    )
}

export default SelectLinkHut;
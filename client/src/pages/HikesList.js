import { Col, Row, Form, Button, Card, Collapse, InputGroup, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import AreaMap from '../components/areaMap';
import HikeMap from '../components/hikeMap';
import MultiRangeSlider from '../components/MultiRangeSlider';
import {ChevronCompactDown, ChevronCompactUp} from 'react-bootstrap-icons'

function HikesList(props) {
  //console.log("Rerendering hikeslist with",props.hikes);
  const [center, setCenter] = useState();
  const [radius, setRadius] = useState(0);
  const [lenMin, setLenMin] = useState(null);
  const [lenMax, setLenMax] = useState(null);
  const [dif, setDif] = useState(null);
  const [ascMin, setAscMin] = useState(null);
  const [ascMax, setAscMax] = useState(null);
  const [timeMin, setTimeMin] = useState(null);
  const [timeMax, setTimeMax] = useState(null);
  const [openArea, setOpenArea] = useState(false);

  const icon = (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
  </svg>);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.filtering(center !== undefined ? { center: center, radius: radius } : undefined,
      lenMin !== '' ? lenMin : null,
      lenMax !== '' ? lenMax : null,
      dif !== '' ? dif : null,
      ascMin !== '' ? ascMin : null,
      ascMax !== '' ? ascMax : null,
      timeMin !== '' ? timeMin : null,
      timeMax !== '' ? timeMax : null);

  }

  //if we get again in this page no filter should be on and we should see again all hikes
  useEffect(() => {
    if (center === undefined && radius === 0 && lenMin === null && lenMax === null
      && dif === null && ascMin === null && ascMax === null && timeMin === null && timeMax === null) props.setAllHikesShow();
  }, [])


  return (
    <Container>
    <Row id="first-row">
      <Col sm={3}>

      {openArea && (<AreaMap center={center} setCenter={setCenter} radius={radius} setRadius={setRadius} drag={false} openArea={openArea} setOpenArea={setOpenArea} />)}

      {/***** Area filter *****/}
      <div className="mt-4">
        <div className="d-grid gap-2">
          <Button variant={center !== undefined ? "success" : "outline-dark"} onClick={() => setOpenArea(true)}>{center !== undefined ? "Area selected!" : "Select Area..."}</Button>
        </div>
      </div>
      
      {/***** Difficulty filter *****/}
      <div className="mt-4">
        <div className="d-grid gap-2">
          <Form.Select aria-label="Difficulty" onChange={(event) => setDif(event.target.value)}>
            <option value="" >Difficulty</option>
            <option value="TOURIST">Tourist</option>
            <option value="HIKER">Hiker</option>
            <option value="PROFESSIONAL HIKER">Professional hiker</option>
          </Form.Select>
        </div>
      </div>


      {/***** Length filter *****/}
      <Row>
        <div className="mt-4 flex" style={{display: 'flex', flexDirection: 'column'}}>
          <div className="d-grid gap-2" style ={{display:'block', width: '100%', height: '100%', position:'relative'}}>
            <strong>Length</strong>
              <InputGroup className="mb-3">
                <MultiRangeSlider
                  min={0}
                  max={40}
                  onChange={({ min, max }) => { setLenMin(min); setLenMax(max); }} />
              </InputGroup>
          </div>
        </div>
      </Row>

      {/***** Ascent filter *****/}
      <div className="mt-4">
        <div className="d-grid gap-2">
          <strong>Ascent</strong>
          <InputGroup className="mb-3">
            <MultiRangeSlider
              min={0}
              max={4000}
              onChange={({ min, max }) => { setAscMin(min); setAscMax(max); }} />
          </InputGroup>
        </div>
      </div>

      {/***** Time Expected filter *****/}
        <div className="mt-4">
        <div className="d-grid gap-2">
          <strong>Time Expected</strong>
          <InputGroup className="mb-3">
            <MultiRangeSlider
              min={0}
              max={15}
              onChange={({ min, max }) => { setTimeMin(min); setTimeMax(max); }} />
          </InputGroup>
        </div>
      </div>

      {/***** Submit button *****/}
      <div className="mt-4">
        <div className="d-grid gap-2">
        <Form onSubmit={(handleSubmit)}>
          <div className="d-grid gap-2">
            <Button variant="success" type='submit'><strong>Search</strong></Button>
          </div>
        </Form>
        </div>
      </div>
    </Col>

    {/***** Hikes List *****/}
    <Col sm={9}>
      <Row>
        {<Display logged={props.logged} displayedHikes={props.hikes} />}
      </Row>
    </Col>

    {/***** Button to go up to carousel ******/ }
    <div className="d-flex flex-row-reverse">
    <Row className="mb-5 mt-3">
      <Col xs={12}>
        <a href="#first-row" color='#009999'>{icon}</a>
      </Col>
    </Row>
    </div>

  </Row>
  </Container>
  )

}


function Display(props) {
  return props.displayedHikes.map((hike) => <HikeRow logged={props.logged} key={hike.id} hike={hike} />)
}


function HikeRow(props) {
  const auth = props.hike.author.substring(0, props.hike.author.indexOf('@'));
  const [open, setOpen] = useState(false);
  return (
    <><Col xs={12} sm={6} md={4} className="mt-2"><Card className="shadow mt-3">
      <Card.Header>
        <h4>{props.hike.name}</h4>
        <div className='text-secondary fst-italic'>{auth}</div>
      </Card.Header>
      <Card.Body>
        {props.logged && <HikeMap hike={props.hike} />}
        <Card.Text><strong>Length: </strong><span className='test-length'>{Math.ceil(props.hike.len)}</span> km<br></br>
          <strong>Difficulty: </strong><span className='test-difficulty'>{props.hike.difficulty}</span> <br></br>
          <strong>Ascent: </strong><span className='test-ascent'>{Math.ceil(props.hike.ascent)}</span> m<br></br>
          <strong>Expected Time: </strong><span className='test-time'>{Math.ceil(props.hike.expectedTime)}</span> h
        </Card.Text>
        <Card.Text >{!open ? (
          <div className="d-flex flex-row-reverse">

          < ChevronCompactDown role="button" className="text-decoration-none" style={{ fontSize: "20px"}}
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}/>
            </div>)
          :
          (<div className="d-flex flex-row-reverse">

          < ChevronCompactUp role="button" className="text-decoration-none" style={{ fontSize: "20px"}}
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}/>
            </div>)}
          <Collapse in={open}>
            <div id="example-collapse-text">
              <Card className="bg-light text-dark">
                <Card.Body><strong>Description: </strong>{props.hike.description}</Card.Body>
              </Card>
            </div>
          </Collapse>
        </Card.Text>
      </Card.Body>
    </Card>
    </Col></>);
}

export default HikesList;
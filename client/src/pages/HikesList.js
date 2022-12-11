import { Col, Row, Form, Button, Card, Collapse, InputGroup, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import AreaMap from '../components/areaMap';
import HikeMap from '../components/hikeMap';
// import MultiRangeSlider from '../components/MultiRangeSlider';
import MultiRangeSliderHooked from '../components/MultiRangeSliderHooked'
import { ChevronCompactDown, ChevronCompactUp, BookmarkHeartFill, Search, XLg } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'

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
  const [searchHover, setSearchHover] = useState(false);
  const [clearHover, setClearHover] = useState(false);

  const navigate = useNavigate();

  const icon = (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
  </svg>);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.filtering(center !== undefined ? { center: center, radius: radius / 1000 } : undefined,
      lenMin !== '' ? lenMin : null,
      lenMax !== '' ? lenMax : null,
      dif !== '' ? dif : null,
      ascMin !== '' ? ascMin : null,
      ascMax !== '' ? ascMax : null,
      timeMin !== '' ? timeMin : null,
      timeMax !== '' ? timeMax : null);

  }

  const resetFields = () => {
    setCenter();
    setRadius(0);
    setLenMin(null);
    setLenMax(null);
    setDif(null);
    setAscMin(null);
    setAscMax(null);
    setTimeMin(null);
    setTimeMax(null);
    setOpenArea(false);
    setSearchHover(false);
    setClearHover(false);
    props.setAllHikesShow();
  }


  //if we get again in this page no filter should be on and we should see again all hikes
  useEffect(() => {
    if (center === undefined && radius === 0 && lenMin === null && lenMax === null
      && dif === null && ascMin === null && ascMax === null && timeMin === null && timeMax === null) props.setAllHikesShow();
  }, [])

  function goToTop() {
    document.getElementById('hikes-container').scrollTo({ top: 0, behavior: 'smooth' });
  }


  return (
    <Container fluid style={{ height: "93vh" }}>
      <Row id="first-row" style={{ height: "93vh" }}>
        <Col sm={2} style={{ height: "93vh", backgroundColor: "#e0e3e5" }}>

          {openArea && (<AreaMap center={center} setCenter={setCenter} radius={radius} setRadius={setRadius} drag={false} openArea={openArea} setOpenArea={setOpenArea} />)}
          <div className="mt-4">
            <div className="d-grid gap-2">
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip> Your preferences</Tooltip>}
              >
                <BookmarkHeartFill className="ms-4" role="button" size={"20px"}
                  onClick={async (event) => {
                    event.preventDefault();
                    await api.getUserPerformance(props.user.username)
                      .then(usrPref => {
                        setLenMin(0);
                        setLenMax(usrPref.length);
                        setAscMin(0);
                        setAscMax(usrPref.ascent);
                        setTimeMin(0);
                        setTimeMax(usrPref.time);
                      }, err => {console.log(err)});
                  }} />
              </OverlayTrigger>
            </div>
          </div>
          {/***** Area filter *****/}
          <div className="mt-4">
            <div className="d-grid gap-2">
              <Button variant={center !== undefined ? "success" : "outline-dark"} onClick={() => setOpenArea(true)}>{center !== undefined ? "Area selected!" : "Select Area..."}</Button>
            </div>
          </div>

          {/***** Difficulty filter *****/}
          <div className="mt-4">
            <div className="d-grid gap-2">
              <Form.Select className="text-center" style={{ backgroundColor: "#e0e3e5", border: '1px solid #000000' }} aria-label="Difficulty" onChange={(event) => setDif(event.target.value)}>
                <option value="" >Difficulty</option>
                <option value="TOURIST">Tourist</option>
                <option value="HIKER">Hiker</option>
                <option value="PROFESSIONAL HIKER">Professional hiker</option>
              </Form.Select>
            </div>
          </div>


          {/***** Length filter *****/}
          <Row>
            <div className="mt-4 flex" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="d-grid gap-2" style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}>
                <strong>Length</strong>
                <InputGroup className="mb-3">
                  {/* <MultiRangeSlider
                    min={0}
                    max={40}
                    onChange={({ min, max }) => { setLenMin(min); setLenMax(max); }} /> */}
                  <MultiRangeSliderHooked
                    defaultMin={0}
                    defaultMax={40}
                    min={lenMin}
                    max={lenMax}
                    setMin={setLenMin}
                    setMax={setLenMax} />
                </InputGroup>
              </div>
            </div>
          </Row>

          {/***** Ascent filter *****/}
          <div className="mt-4">
            <div className="d-grid gap-2">
              <strong>Ascent</strong>
              <InputGroup className="mb-3">
                {/* <MultiRangeSlider
                  min={0}
                  max={4000}
                  onChange={({ min, max }) => { setAscMin(min); setAscMax(max); }} /> */}
                <MultiRangeSliderHooked
                  defaultMin={0}
                  defaultMax={4000}
                  min={ascMin}
                  max={ascMax}
                  setMin={setAscMin}
                  setMax={setAscMax} />
              </InputGroup>
            </div>
          </div>

          {/***** Time Expected filter *****/}
          <div className="mt-4">
            <div className="d-grid gap-2">
              <strong>Time Expected</strong>
              <InputGroup className="mb-3">
                {/* <MultiRangeSlider
                  min={0}
                  max={15}
                  onChange={({ min, max }) => { setTimeMin(min); setTimeMax(max); }} /> */}
                <MultiRangeSliderHooked
                  defaultMin={0}
                  defaultMax={24}
                  min={timeMin}
                  max={timeMax}
                  setMin={setTimeMin}
                  setMax={setTimeMax} />
              </InputGroup>
            </div>
          </div>

          {/***** Submit button *****/}
          <Row>
            <div className="mt-4">
              <Form>
                <div className="d-grid gap-2">
                  <Button className="rounded-pill mt-4" onClick={(handleSubmit)} type='submit'
                    style={{
                      backgroundColor: !searchHover ? '#006666' : '#009999',
                      borderColor: '#e0e3e5',
                      height: '70%',
                      // width: '80%'
                    }}
                    onMouseEnter={() => setSearchHover(true)}
                    onMouseLeave={() => setSearchHover(false)}><strong>Search</strong> <Search className='mb-1' size={"18px"} />
                  </Button>
                </div>
              </Form>
            </div>
          </Row>

          {/***** Clear filters *****/}
          <Row>
            <Form>
              <div className="d-grid gap-2">
                <Button className='rounded-pill mt-4'
                  // onClick={() => window.location.reload(false)}
                  onClick={resetFields}
                  style={{
                    backgroundColor: !clearHover ? '#800000' : '#cc0000',
                    borderColor: '#e0e3e5',
                    height: '70%',
                  }}
                  onMouseEnter={() => setClearHover(true)}
                  onMouseLeave={() => setClearHover(false)}><strong>Clear filters</strong> <XLg className='mb-1' size={'18px'} /></Button>
              </div>
            </Form>
          </Row>
        </Col>
        {/***** Hikes List *****/}
        <Col  id="hikes-container" sm={10} style={{ overflowY: 'scroll', height: '93vh' }}>
          <Row>
            {<Display logged={props.logged} displayedHikes={props.hikes} />}
          </Row>
        </Col>

      </Row>
      {/***** Button to go up to carousel ******/}
      <a onClick={() => goToTop()} href="#first-row" className='go-top-btn' color='#009999'>{icon}</a>
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
    <><Col xs={12} sm={8} md={6} lg={4} className="mt-2"><Card className="shadow mt-3 hikes-card">
      <Card.Header>
        {props.logged && <HikeMap hike={props.hike} />}
        <div className='m-3'>
          <h4>{props.hike.name}</h4>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>

          <Row>
            <Col>
              <strong>Length: </strong><div className='hike-desc'><span className='test-length'>{Math.ceil(props.hike.len)}</span> km<br></br></div>
              <strong>Difficulty: </strong><div className='hike-desc'><span className='test-difficulty'>{props.hike.difficulty}</span> <br></br></div>
            </Col>
            <Col>
              <strong>Ascent: </strong><div className='hike-desc'><span className='test-ascent'>{Math.ceil(props.hike.ascent)}</span> m<br></br></div>
              <strong>Expected Time: </strong><div className='hike-desc'><span className='test-time'>{Math.ceil(props.hike.expectedTime)}</span> h</div>
            </Col>
          </Row>
          <Row>
            <Col md={10}>
              <div className='text-secondary fst-italic card-author'><small>Author:</small> {auth}</div>
            </Col>
            <Col md={2}>
              {!open ? (
                <div className="hike-expandable">

                  < ChevronCompactDown role="button" className="text-decoration-none" style={{ fontSize: "20px" }}
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open} />
                </div>)
                :
                (<div className="hike-expandable">
                  < ChevronCompactUp role="button" className="text-decoration-none" style={{ fontSize: "20px" }}
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open} />
                </div>)}
            </Col>
          </Row>

        </Card.Text>
        <Collapse in={open}>
          <div id="hike-desc-text">
            <strong>Description: </strong>{props.hike.description}
          </div>
        </Collapse>
        <Card.Text >
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
    </>);
}

export default HikesList;
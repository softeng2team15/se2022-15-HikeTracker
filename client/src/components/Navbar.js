import { Navbar, Nav } from 'react-bootstrap';

function Header(props) {
    const icon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-image-alt" viewBox="0 0 16 16">
            <path d="M7 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm4.225 4.053a.5.5 0 0 0-.577.093l-3.71 4.71-2.66-2.772a.5.5 0 0 0-.63.062L.002 13v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4.5l-4.777-3.947z"/>
        </svg>
    );

    return(<>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/" className="px-4">{icon} HikeTracker</Navbar.Brand>
            {props.logged ? (<Nav>
                <Nav.Link href="/parking" className="px-4">Parking lots</Nav.Link>
                <Nav.Link href="/newhut" className="px-4">Add Hike</Nav.Link>
            
            </Nav>) : 
            (<Nav>
                <Nav.Link href="/login" className="px-4">Sign in</Nav.Link>
                <Nav.Link href="/signup" className="px-4">Sign up</Nav.Link>
            </Nav>)
            }
        </Navbar>
    </>);
}

export default Header;
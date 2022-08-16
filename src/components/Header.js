import { Nav, Navbar, Container } from 'react-bootstrap';

const Header = () => {
	const username = localStorage.getItem('username');

 	const is_logged_in = !!(localStorage.getItem('token') && localStorage.getItem('token') !== "");


	return (
		<Navbar bg="light" expand="lg">
	      <Container>
	        <Navbar.Brand href="#home">Forum App</Navbar.Brand>
	        <Navbar.Toggle aria-controls="basic-navbar-nav" />
	        <Navbar.Collapse id="basic-navbar-nav">
	          <Nav className="me-auto">
	            <Nav.Link href="/">Home</Nav.Link>
	            {(is_logged_in?<Nav.Link href="/forum">Forum</Nav.Link>:null)}
	            {(is_logged_in?<Nav.Link href="/forum-add">Add Post</Nav.Link>:null)}
	            {(!is_logged_in?<Nav.Link href="/login">Login</Nav.Link>:null)}
	            {(!is_logged_in?<Nav.Link href="/register">Register</Nav.Link>:null)}
	          </Nav>
	        </Navbar.Collapse>
	        {(username?
	        (<Navbar.Collapse className="justify-content-end">
	          <Navbar.Text>
	            Signed in as: {username}
	          </Navbar.Text>
	        </Navbar.Collapse>):
	        null)}
	        
	      </Container>
	    </Navbar>
	)
}

export default Header;
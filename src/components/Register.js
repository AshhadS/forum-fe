import React, {useState} from 'react';
import { useNavigate, Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import api from '../helpers/api';

import { toast } from 'react-toastify';

const Register=()=> {

  const [name, setName] = useState(0);
  const [email, setEmail] = useState(0);
  const [password, setPassword] = useState(0);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const nameChange = (event) => {
    console.log('nameChange');
    setName(event.target.value);
  }

  const emailChange = (event) => {
    setEmail(event.target.value);
  }

  const passwordChange = (event) => {
    setPassword(event.target.value);
  }

  // Register the user and redirect to login
  const buttonClick = () => {
    setLoading(true);

    const payload = {
      "name": name,
      "email": email,
      "password": password
    }

    api.post('/auth/register', payload)
    .then(function (response) {
      setLoading(false);

      if(!response.status) {
        // show error 
        toast.error("Email or password incorrect");
        return false;
      }

      // Registration Success
      toast.success("Registration Succefull");
      navigate('/login')

    })
    .catch(function (error) {
      setLoading(false);
      console.log(error);
      toast.error("Error connecting to server");
    });
  }

  const loading_markup = <div className="mb-2"><Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner></div>;

  // Main Page
  return (
  	<div className="page container">
  		<div className="d-flex justify-content-center">
        <div className="col-md-5">
          <h3>User Registration</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName1">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" onChange={nameChange}/>
              <Form.Text className="text-muted">
                Name used to show on profile.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={emailChange} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={passwordChange} />
            </Form.Group>

            {(loading?loading_markup:null)}

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Text className="text-muted">
                Already have an account? Login by going <Link to="/login">here</Link> 
              </Form.Text>
            </Form.Group>

            <Button variant="primary" disabled={loading} onClick={buttonClick}>
              Submit
            </Button>
          </Form>
    		</div>
      </div>
  	</div>
  );
}
 
export default Register;
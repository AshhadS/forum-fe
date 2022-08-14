import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import { useNavigate, Link } from "react-router-dom";
import api from '../helpers/api';

import { toast } from 'react-toastify';
 
const Login=()=> {
  const [email, setEmail] = useState(0);
  const [password, setPassword] = useState(0);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const emailChange = (event) => {
    setEmail(event.target.value);
  }

  const passwordChange = (event) => {
    setPassword(event.target.value);
  }

  const buttonClick = () => {
    setLoading(true);

    const payload = {
      "email": email,
      "password": password
    }

    api.post('/auth/login', payload)
    .then(function (response) {
      setLoading(false);

      if(!response.data.status) {
        // show error 
        toast.error("Email or password incorrect");
        return false;
      }

      // Login Success
      localStorage.setItem('token', response.data.token);
      toast.success("Login Succefull");
      window.location = '/forum';

    })
    .catch(function (error) {
      setLoading(false);
      console.log(error);
      toast.error("Error connecting to server");
    });
  }

  const loading_markup = <div className="mb-2"><Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner></div>;

  return (
  	<div className="page container">
      <div className="d-flex justify-content-center mt-4">
        <div className="col-md-5">
      	  <h3>User Login</h3>
      	  <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={emailChange}/>
              <Form.Text className="text-muted">
                Enter the email used when registering
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={passwordChange} />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Text className="text-muted">
                Dont have an account? Register by going <Link to="/register">here</Link>here 
              </Form.Text>
            </Form.Group>


            {(loading?loading_markup:null)}

            <Button variant="primary" onClick={buttonClick}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
  	</div>
  );
}
 
export default Login;
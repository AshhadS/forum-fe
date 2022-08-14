import React, { useState, useEffect } from 'react';

import api from '../helpers/api';
import { Form, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Post = () => {

	const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(false);

  const savePost = () => {
    setLoading(true);

    const payload = {
      "question": question
    };

    api.post('/posts', payload)
    .then(function (response) {
      setLoading(false);

      if(!!response.data.status) {
        toast.success("Post Approved Successfully");
      } else {
        toast.error("Failed Approving Post");
      }
    })
    .catch(function (error) {
      setLoading(false);
      toast.error("Error connecting to server");
    }); 
  }

  const loading_markup = <div className="mb-2"><Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner></div>;

	return (
		<div className="container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicQuestion">
          <Form.Label>Question</Form.Label>
          <Form.Control as="textarea" placeholder="Enter your question here" onChange={(e) => {setQuestion(e.target.value)}}/>
          <Form.Text className="text-muted">
            Please note created forum posts will only show once approved by admin
          </Form.Text>
        </Form.Group>
        <Button variant="primary" disabled={loading} onClick={savePost}>
          Add
        </Button>
      </Form>
    </div>    
	);
}

export default Post;
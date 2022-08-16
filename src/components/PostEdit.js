import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import api from '../helpers/api';
import { Form, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Post = () => {


	const [post, setPost] = useState([]);
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  let { post_id } = useParams();


  useEffect(() => {
    getPost();
  }, []);


  // Gets the data for the current pages post
  const getPost = () => {
    setLoading(true)
    api.get('/posts/'+post_id)
    .then(function (response) {
      setPost(response.data.post);
      setQuestion(response.data.post.question);
      setLoading(false);
    })
    .catch(function (error) {
      setLoading(false);
    });
  }

  // Handle updating the post
  const updatePost = () => {
    setLoading(true);

    const payload = {
      "question": question
    };

    // Handle saving the post
    api.put('/posts/'+post_id, payload)
    .then(function (response) {
      setLoading(false);

      if(!!response.data.status) {
        toast.success("Post updated Successfully");
        getPost();
      } else {
        toast.error("Failed creating post");
      }
    })
    .catch(function (error) {
      setLoading(false);
      toast.error("Error connecting to server");
    }); 
  }

  const loading_markup = <div className="mb-2"><Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner></div>;

  // Main Page
	return (
		<div className="container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicQuestion">
          <Form.Label>Question</Form.Label>
          <Form.Control as="textarea" defaultValue={post.question} required placeholder="Enter your question here" onChange={(e) => {setQuestion(e.target.value)}}/>
        </Form.Group>
        {loading?loading_markup:null}
        <Button variant="primary" disabled={loading} onClick={updatePost}>
          Update
        </Button>
      </Form>
    </div>    
	);
}

export default Post;
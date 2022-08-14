import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import api from '../helpers/api';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

const Post = () => {

	const [post, setPost] = useState([]);
  const [post_actions, setPostActions] = useState([]);
  const [loading, setLoading] = useState(false);

  let { id } = useParams();

  useEffect(() => {
      // call api or anything
      setLoading(true);
      getPost();
   }, []);

	const getPost = () => {
		api.get('/posts/'+id)
    .then(function (response) {
    	setPost(response.data.post);
      setPostActions(response.data.post_actions);
      setLoading(false);
    })
    .catch(function (error) {
      setLoading(false);
    });
	}

  const handlePostApproval = (post_id) => {
    api.post('/posts/1/approve')
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

  // Handle No Resutls
  let post_markup = null;
  if(!loading && post.length <= 0) {
    return (
      <div className="no-results-found">
        <p>Post Not Found</p>
      </div>
    );
  }

  // Loop and return the data recieved
  if(post.question) {
    post_markup = (
      <div className="post-card mb-3 card p-3">
        <p className="mb-0">{post.question}</p>
        {(!!post_actions.can_edit?<Link to={"/post/"+post.id+"/edit"}>Edit</Link>:null)}
        {(true?<div><Button variant="primary" onClick={() => handlePostApproval(post.id)}>Approve</Button></div>:null)}
        <h4 className="mt-3">Comments</h4>
      </div>
    );
  }

	return (
		<div className="container">
      <div className="col-md-6 m">
        <h3> Forum </h3>
        {(loading?loading_markup:null)}
        {post_markup}
  		</div>		
    </div>    
	);
}

export default Post;
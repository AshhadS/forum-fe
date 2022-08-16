import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import api from '../helpers/api';
import { Spinner, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Post = () => {

  // Handle data of current post
	const [post, setPost] = useState([]); 

  // Handle data of current posts comments
  const [comments, setComments] = useState([]);

  // Handle data new comment adding
  const [comment, setComment] = useState([]);

  // Handle data of user actions
  const [post_actions, setPostActions] = useState([]);

  // Handle loading of post and comments  
  const [loading, setLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);

  let { post_id } = useParams();

  useEffect(() => {
      // call api or anything
      setLoading(true);
      getPost();
   }, []);

  // Gets the data for the current pages post
	const getPost = () => {
		api.get('/posts/'+post_id)
    .then(function (response) {
    	setPost(response.data.post);
      setPostActions(response.data.post_actions);
      setLoading(false);
    })
    .catch(function (error) {
      setLoading(false);
    });
    getComments();
	}

  // Gets the comments for the current post
  const getComments = () => {
    setCommentsLoading(true);
    api.get('comments/post/'+post_id)
    .then(function (response) {
      setComments(response.data.comments);
      setCommentsLoading(false);

      // Reset input once data is loaded
      setComment('');
    })
    .catch(function (error) {
      setLoading(false);
    });
  }

  // handle saving user entered the comment
  const saveComment = () => {
    setCommentsLoading(true);
    let payload = {
      "body": comment
    };

    api.post('comments/post/'+post_id, payload)
    .then(function (response) {
      setCommentsLoading(false);
      getComments(); 
      toast.success("Comments Added");

    })
    .catch(function (error) {
      toast.error("Failed adding comment");
      setLoading(false);
    });
  }

  // Handle post approval for admins
  const handlePostApproval = (post_id) => {
    api.post('/posts/'+post_id+'/approve')
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
      <div className="no-results-found container">
        <h3>Post Not Found</h3>
        <p>We were not able to find a post with the id in the url</p>
      </div>
    );
  }

  // Return the Comments list
  let comments_markup = null;
  if(comments && comments.length >= 1) {
    comments_markup = comments.map( (ele) => {
      return (
        <div className="comment-item card mb-2 p-2" key={ele.id}>
          <p className="mb-0">{ele.body}</p>
        </div>
      );
    });
  }

  // Post Section
  if(post.question) {
    post_markup = (
      <div className="post-card mb-3 card p-3">
        <p className="mb-4">{post.question}</p>
        {(!!post_actions.can_edit?<Link to={"/post/"+post.id+"/edit"}>Edit</Link>:null)}
        {(!!(post_actions.can_approve && post.approved===0)?<div><Button variant="primary" onClick={() => handlePostApproval(post.id)}>Approve</Button></div>:null)}
        <div className="comments-wrapper">
          <h4 className="mt-3">Comments</h4>
          {(commentsLoading?loading_markup:null)}
          {comments_markup}

        </div>
      </div>
    );
  }

  // Main Page
	return (
		<div className="container">
      <div className="col-md-12">
        {(loading?loading_markup:null)}
        {post_markup}
        {(post.approved===0)?<p className="text-muted">This post is pending admin approval</p>:null}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicComment">
            <Form.Label>Comment</Form.Label>
            <Form.Control as="textarea" value={comment} required placeholder="Enter your comment here" onChange={(e) => {setComment(e.target.value)}}/>
          </Form.Group>
          {loading?loading_markup:null}
          <Button variant="primary" disabled={commentsLoading} onClick={saveComment}>
            Comment
          </Button>
        </Form>
  		</div>		
    </div>    
	);
}

export default Post;
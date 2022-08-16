import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../helpers/api';
import { Spinner, Button } from 'react-bootstrap';

const Posts = () => {

	const [post_list, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      setLoading(true);
      getPosts();
   }, []);

	const getPosts = () => {
		api.get('/posts')
    .then(function (response) {
    	setPostList(response.data.posts);
      setLoading(false);
    })
    .catch(function (error) {
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

  function truncate(str, n){
    return (str.length > n) ? str.slice(0, n-1) + '...' : str;
  };

  const loading_markup = <div className="mb-2"><Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner></div>;

  // Handle No Resutls
  let post_list_markup = null;
  if(!loading && post_list.length <= 0) {
    return (
      <div className="container">
        <div className="no-results-found">
          <h3>No Posts Found</h3>
          <p>You can add new posts to our forum by going <Link to={"/forum-add"}>here</Link></p>
        </div>
      </div>
    );
  }

  // Loop and return the data recieved
  if(post_list.length >= 1) {
    post_list_markup = post_list.map( (ele) => {

      return (
        <div className="post-card mb-3 card p-3" key={ele.id}>
          <p className="mb-0">{truncate(ele.question, 100)}</p>
          <div className='d-flex' >
            <Link className="mr-2" to={"/forum/"+ele.id}>View</Link>
            {(ele.approved==0)?(<Link style={{marginLeft: 10 + 'px'}} to="#" onClick={() => handlePostApproval(ele.id)}>Approve</Link>):null}
          </div>
        </div>
      )
    });
  }

  // Main Page
	return (
		<div className="container">
      <div className="col-md-12">
        <h3> Forum List </h3>
        {(loading?loading_markup:null)}
        {post_list_markup}
  		</div>		
    </div>    
	);
}

export default Posts;
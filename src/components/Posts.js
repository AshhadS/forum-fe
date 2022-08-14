import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../helpers/api';
import Spinner from 'react-bootstrap/Spinner';

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

  function truncate(str, n){
    return (str.length > n) ? str.slice(0, n-1) + '...' : str;
  };

  const loading_markup = <div className="mb-2"><Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner></div>;

  // Handle No Resutls
  let post_list_markup = null;
  if(!loading && post_list.length <= 0) {
    return (
      <div className="no-results-found">
        <p>No Posts Found</p>
      </div>
    );
  }

  // Loop and return the data recieved
  if(post_list.length >= 1) {
    post_list_markup = post_list.map( (ele) => {

      return (
        <div className="post-card mb-3 card p-3" key={ele.id}>
          <p className="mb-0">{truncate(ele.question, 100)}</p>
          <Link to={"/forum/"+ele.id}>View</Link>
        </div>
      )
    });
  }

	return (
		<div className="container">
      <div className="col-md-6 m">
        <h3> All Posts </h3>
        {(loading?loading_markup:null)}
        {post_list_markup}
  		</div>		
    </div>    
	);
}

export default Posts;
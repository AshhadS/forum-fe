import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Posts from './components/Posts';
import Post from './components/Post';
import PostCreate from './components/PostCreate';
import PostEdit from './components/PostEdit';
import Header from './components/Header';
import Protected from './helpers/Protected';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <main>
      <Header />
      <div className="mb-5"></div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forum/:post_id/edit' element={<Protected><PostEdit /></Protected>} />
        <Route path='/forum/:post_id' element={<Protected><Post /></Protected>} />
        <Route path='/forum-add' element={<Protected><PostCreate /></Protected>} />
        <Route path='/forum' element={<Protected><Posts /></Protected>} />
      </Routes>
    </main>
  );
}

export default App;

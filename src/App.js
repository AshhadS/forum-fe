import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Posts from './components/Posts';
import Post from './components/Post';
import PostCreate from './components/PostCreate';
import Protected from './helpers/Protected';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <main>
      {/*<Home />*/}
      <ToastContainer />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forum/:id' element={<Protected><Post /></Protected>} />
        <Route path='/forum-add' element={<Protected><PostCreate /></Protected>} />
        <Route path='/forum' element={<Protected><Posts /></Protected>} />
      </Routes>
    </main>
  );
}

export default App;

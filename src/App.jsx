
import React, { useEffect } from 'react'
// import {
//   createBrowserRouter,
//   RouterProvider,
//   BrowserRouter,
//   Route,
//   Routes,
//   Link,
//   HashRouter,
// } from "react-router-dom";

import { HashRouter as Router, Link, Route, Routes, useNavigate } from 'react-router-dom';

import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
// import Profile from './components/profile/Profile';


// const router = createBrowserRouter([
//   {
//     path:"/home/:id",
//     element:<Home />
//   },{
//     path:"/profile/:id",
//     element:<Home />
//   },{
//     path:"/",
//     element: <Login />
//   },{
//     path:"/register",
//     element:<Register />
//   },{
//     path:"/messager/:id",
//     element:<Home />
//   },{
//     path:"/login",
//     element: <Login />
//   }
// ])



function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  // const push = useNavigate()

return (
  // <RouterProvider router={router} />
  <>
    <Router>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/:id" element={<Home />} />
        <Route path="/profile/:id" element={<Home />} />
        <Route path="/messager/:id" element={<Home />} />
      </Routes>
    </Router>
  </>
)
}

export default App

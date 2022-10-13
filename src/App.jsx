
import React from 'react'
// import {
//   createBrowserRouter,
//   RouterProvider,
//   BrowserRouter,
//   Route,
//   Routes,
//   Link,
// } from "react-router-dom";

import {HashRouter as Router, Link, Route, Routes} from 'react-router-dom';

import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
// import Profile from './components/profile/Profile';

const user = JSON.parse(localStorage.getItem('user'));

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
  return (
    // <RouterProvider router={router} />
    <>
    {/* <Login /> */}
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route path="/home/:id" element={<Home />}></Route>
        <Route path="/profile/:id" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/messager/:id" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App

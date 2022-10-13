
import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
// import Profile from './components/profile/Profile';

const user = JSON.parse(localStorage.getItem('user'));

const router = createBrowserRouter([
  {
    path:"/home/:id",
    element:<Home />
  },{
    path:"/profile/:id",
    element:<Home />
  },{
    path:"/",
    element: <Login />
  },{
    path:"/register",
    element:<Register />
  },{
    path:"/messager/:id",
    element:<Home />
  },{
    path:"/login",
    element: <Login />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App

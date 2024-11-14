import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import Home from './Components/Home.jsx';
// import Login from './Components/Login.jsx';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import './index.css';

const router =createBrowserRouter ([
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/register',
        element:<Register></Register>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}>
  
  <App />
  </RouterProvider>
  </StrictMode>,
)

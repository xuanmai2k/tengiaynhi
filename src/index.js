import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import './index.css';
import reportWebVitals from './reportWebVitals';
import Dashboard from './pages/Dashboard';
import Welcome from './pages/Welcome';
import Users from './pages/Users';
import Products from './pages/Products';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute component={<Welcome/>}/>,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute component={<Dashboard/>}/>,
  },
  {
    path: "/users",
    element: <PrivateRoute component={<Users/>}/>,
  },
  {
    path: "/products",
    element: <PrivateRoute component={<Products/>}/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

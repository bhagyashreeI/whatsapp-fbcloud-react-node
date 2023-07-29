import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './components/layout/Header';
import Home from './components/Home';
import SendMessage from './components/SendMessage';
import ErrorBoundary from "./components/ErrorBoundary";
import AddContact from './components/AddContact';
import SendBulkMessage from './components/SendBulkMessage';

import { createBrowserRouter,RouterProvider,Outlet } from 'react-router-dom';
import SubNav from './components/layout/SubNav';
import Sidebar from './components/layout/Sidebar';
import Chat from './components/Chat';
import Footer from './components/layout/Footer';

const AppLayout = () =>{
  return (
    <>
      <Header/>
      <div className="sub-page-wrapper">
        <Sidebar/>
        
        <div className="sub-page-wrapper-content">
          <Outlet/>
          
        </div>
        <Footer/>
      </div>
      
    </>
  )
}

const routerConfig = createBrowserRouter([
  {
    path:"/",
    element: <AppLayout />,
    children:[
      {
        path:"/",
        element: <Home />
      },
      {
        path:"/create-contact",
        element: <AddContact />
      },
      {
        path:"/send-message",
        element: <SendMessage/>
      },
      {
        path:"/send-bulk-message",
        element: <SendBulkMessage />
      },
      {
        path:"/wa-chat",
        element: <Chat />
      }
    ],
    errorElement: <ErrorBoundary />
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routerConfig}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

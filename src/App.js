import React from "react";
import './App.css';
import {  Routes, Route } from "react-router";
import Home from "./components/Home/Home";
import AddUser from  "./components/AddUser/Auser";
import Userdetails from "./components/Userdetails/Userdetails";
import UpdateUser from "./components/UpdateUser/UpdateUser";
import OrderDetails from './components/OrdeDetails/OrderDetails'; 
import UpdateOrder from './components/UpdateOrder/UpdateOrder';
import AddOrder from './components/AddOrder/AddOrder';
import Nav from "./components/Nav/Nav";     


function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/mainhome" element={<Home/>}/>
          <Route path="/adduser" element={<AddUser/>}/>
          <Route path="/userdetails" element={<Userdetails/>}/>
           <Route path="/userdetails/:id" element={<UpdateUser/>}/>
           <Route path="/orderdetails" element={<OrderDetails />} /> {/* Orders display karanna route eka */}
          <Route path="/updateorder/:id" element={<UpdateOrder />} />
            <Route path="/addorder" element={<AddOrder />} />
            <Route path="/Nav" element={<Nav/>} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;

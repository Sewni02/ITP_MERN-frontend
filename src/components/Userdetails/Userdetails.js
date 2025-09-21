import React, { useState, useEffect, useRef } from 'react'
import Nav from '../Nav/Nav';
import axios from "axios";
import AddUser from '../User/AddUser';
import {useReactToPrint} from "react-to-print";

const  URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function Userdetails() {
  
  const [users, setUsers] =  useState([]);
  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users)); 
  },[]);

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
      contentRef: () => ComponentsRef.current,
      DocumentTitle:"Users Report",
      onafterprint:()=>alert("Users report successfully downloaded !"),
  })

const [searchQuery, setSearchQuery] = useState("");
const [noResults, setNoResults] = useState(false);

const handleSearch = () => {
  fetchHandler().then((data) => {
    const filteredUsers = data.users.filter((user) =>
      Object.values(user).some((field) =>
        field.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
    setUsers(filteredUsers);
    setNoResults(filteredUsers.length === 0);
  });
};


  return (
    <div>
      <Nav/>
       <h1>User Details Display Page</h1>
       
       <input onChange={(e) => setSearchQuery(e.target.value)} type= "text" name="search" placeholder = "Search Users Details"></input>
       <button onClick={handleSearch}>Search</button>

       {noResults? (
        <div> <p>No Users Found</p>
        </div>
       ): (

       <div ref={ComponentsRef}>
        {users && users.map((user, i) => (
          <div key = {i} > 
          <AddUser user = {user}/>
          </div>

        ))}
       </div>
       )}
       <button onClick={handlePrint}>Download Report</button>
    </div>
  );
}

export default Userdetails;

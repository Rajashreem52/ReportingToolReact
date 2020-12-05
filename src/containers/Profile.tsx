import React from "react";
import AuthService from "services/auth";
import Button from '@material-ui/core/Button';
import axios from "axios";
const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  
  let curuser=JSON.parse(localStorage.getItem("curuser") as string );
  console.log(curuser.email);

   
  
  
  

  return (
   
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{curuser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {curuser.email}
        </p>
        <p>
          <strong>First Name:</strong> {curuser.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {curuser.lastName}
        </p>
       
        
   
        <p>
        <a href="/EditProfile"> <Button style={{marginLeft:"15px"}} variant="contained" color="primary">Edit</Button></a>
        </p>
      </div>
  );
};

export default Profile;

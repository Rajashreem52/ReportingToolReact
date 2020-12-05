import React from "react";
import AuthService from "services/auth";
import Button from '@material-ui/core/Button';
import { ViewArray } from "@material-ui/icons";



const EditProfile = () => {

  
  let currentUser = AuthService.getCurrentUser();
  let curuser=JSON.parse(localStorage.getItem("curuser") as string );
  
  
  var email,fname,lname,password,username;
  function onchange(e) {
    
  
      if(e.target.id==='email')
      {
          email=e.target.value;

       
      }
      else if(e.target.id==='fname')
      {
       fname=e.target.value;
      }
      else if(e.target.id==='lname')
      {
       lname=e.target.value;
      }
      else if(e.target.id==='password')
      {
        password=e.target.value;
      }
      else if(e.target.id==='username')
      {
        username=e.target.value;
      }

  }
  function handlesubmit(e) {
   
   console.log(email);
   console.log(fname);
   console.log(lname);

  

   AuthService.editProfile(curuser.id,username,email,fname,lname,password).then(
    (response: any) => {
      console.log("response:", response);

      //response.setIntHeader("Refresh", 1); 
      
    
      alert("Successfully Updated");
      //window.location.reload(false);
    
    },
    (error) => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }
  );
  
    }
  
  return (

      <form style={{marginLeft:"600px",padding:"25px"}}>
          <p>
          <label>
              Id:
            <input type="text" id="id" value={curuser.id} style={{marginLeft:"50px"}}  />
          </label>
          </p>
          <p>
          <label>
             UserName:
            <input type="text" id="username"  onChange={onchange} defaultValue={curuser.username}  />
          </label>
          </p>
          <p>
          <label>
              Email:
            <input type="text" id="email" onChange={onchange}  defaultValue={curuser.email} style={{marginLeft:"30px"}}/>
          </label>
          </p>
          <p>
          <label>
              First Name:
            <input type="text" id="fname" onChange={onchange} defaultValue={curuser.firstName}/>
          </label>
          </p>
          <p>
          <label>
              Last Name:
            <input type="text" id="lname" onChange={onchange} defaultValue={curuser.lastName} />
          </label>
          </p>
          <p>
          <label>
             Password:
            <input type="password" id="password" onChange={onchange} style={{marginLeft:"5px"}}/>
          </label>
          </p>
          <p>
          <Button
        
        onClick={handlesubmit}
        
        variant="contained"
        color="primary"

      >
        Save
            </Button>
          </p>
      </form>
  );
};

export default EditProfile;

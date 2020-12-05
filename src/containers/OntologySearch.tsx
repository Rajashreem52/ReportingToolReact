import React from "react";
import AuthService from "services/auth";
import Button from '@material-ui/core/Button';
import { ViewArray } from "@material-ui/icons";
import { Dropdown } from 'semantic-ui-react';




const OntologySearch = () => {

  
  let currentUser = AuthService.getCurrentUser();
  let curuser=JSON.parse(localStorage.getItem("curuser") as string );
 
  
  
  var name,date;
  function onchange(e) {
    
  
      if(e.target.id==='name')
      {
          name=e.target.value;

       
      }
      else if(e.target.id==='date')
      {
         date=e.target.value;
      }

  }
  function handlesubmit(e) {
      console.log(name);
      console.log(date);
      console.log(curuser.id);
     AuthService.getontologies(curuser.id,name,date).then(
    (response: any) => {
      console.log("response:", response);
      if(response.data)
{
    console.log("response:", response.data);
      localStorage.setItem('ontologies',JSON.stringify(response.data));

      //window.history.pushState(response.data,'http://localhost:3005/ontology');
      window.location.href = "http://localhost:"+window.location.port+"/ontology";

}
else
{
    alert("Purchase license to see ontology");
}    
    
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
          <label style={{marginBottom:"100px",marginLeft:"50px"}}>
           SERACH ONTOLOGY
          </label>
          </p>
          <p>
          <label>
              Ontology Name:
              </label>
              <select id="name" onChange={onchange} style={{marginLeft:"20px"}} placeholder="Select Ontology">
                <option></option>
                  <option>Architects</option>
                  <option>Civil Engineering</option>
              </select>
          </p>
              
        
          <p>
          <label>
              Created Date:
            <input id="date" type="date"  onChange={onchange} placeholder="mm/dd/yy"  style={{marginLeft:"30px"}}/>
          </label>
          </p>
         
          <p>
          <Button
        
        onClick={handlesubmit}
        
        variant="contained"
        color="primary"

      >
        Search
            </Button>
          </p>
      </form>
  );
};

export default OntologySearch;

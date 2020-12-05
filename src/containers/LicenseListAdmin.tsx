import React, { useState } from 'react';
import AuthService from "services/auth";
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import HomeIcon from '@material-ui/icons/Home';
import { Hidden } from '@material-ui/core';
import { ViewArrayOutlined, ViewArrayTwoTone } from '@material-ui/icons';
import { useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';



const LicenseListAdmin = () => {
  const currentUser = AuthService.getCurrentUser();
  let curuser = JSON.parse(localStorage.getItem("curuser") as string);
  const licence_intialization = AuthService.fetchalllicense();
  
  let licenselist= JSON.parse(localStorage.getItem("alllicences") as string);
  console.log(licenselist);
 

  function handleUpdate(saleid) {
    console.log(saleid);
    AuthService.updatelicensestatus(saleid).then(
      (response: any) => {
        console.log("response:", response);

        alert("Successfully Updated !!")
        window.location.reload();
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
    <div className="container">
      <header className="jumbotron" style={{ padding: "15px" }}>
        <h3 >
          <strong></strong>
        </h3>
      </header>
     
      <div>
      <table style={{marginLeft:"350px",marginTop:"50px",marginBottom:"100px",border:"1px solid #ddd"}}>
      <thead>
        
          <th style={{border:"1px solid #ddd"}}>Name</th>
          <th style={{border:"1px solid #ddd"}}>License Type</th>
          <th style={{border:"1px solid #ddd"}}>License Type</th>
          <th style={{border:"1px solid #ddd"}}>Year</th>
          <th style={{border:"1px solid #ddd"}}>Purchase Date</th>
          <th style={{border:"1px solid #ddd"}}>Expiration Date</th>
          <th style={{border:"1px solid #ddd"}}>Action</th>
        </thead>
         <tbody>

         
    {licenselist && licenselist.map( cell => { 
      return(<tr>
       
        <td key={cell.id} style={{border:"1px solid #ddd"}}>{cell.username}</td>
        <td key={cell.id} style={{border:"1px solid #ddd"}}>{cell.type}</td>
        <td key={cell.id} style={{border:"1px solid #ddd"}}>{cell.price}</td>
        <td key={cell.id} style={{border:"1px solid #ddd"}}>{cell.year}</td>
        <td key={cell.id} style={{border:"1px solid #ddd"}}>{cell.purchaseDate}</td>
        <td key={cell.id} style={{border:"1px solid #ddd"}}>{cell.expiredDate}</td>
        <td key={cell.id} style={{border:"1px solid #ddd"}}><Button onClick={() => handleUpdate(cell.saleid)}>ACCEPT</Button></td>
        </tr>);
    })}
  

          
         </tbody>
       </table>

      </div>
    </div>
  );
};

export default LicenseListAdmin;

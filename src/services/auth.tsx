import axios from "axios";

const API_URL = "/api/auth/";


const register = (username: string, email: string, password: string, firstName: string, lastName: string) => {
  console.log("username"+username);
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    firstName,
    lastName,
  });
};

const purchaselicense = (username: string,typel: BigInteger, price:BigInteger) => {
  
  
  return axios.post(API_URL + "purchase", {
    username,
    typel,
    price
   
  });
};

const updatelicensestatus = (saleid: BigInteger) => {
  
  
  return axios.post(API_URL + "accept/"+saleid);
};

const paypalservicecall = (price:BigInteger) => {
  
  return axios.get("/api/test/pay/"+price);
};

const editProfile = (id: string, username: string, email: string,  firstName: string, lastName: string, password:string) => {
  
  return axios.post(API_URL + "edit", {
    id,
    username,
    email,
    firstName,
    lastName,
    password
   
  });
};

const getontologies = (userId: string, name: string, createTime:Date) => {
  
  return axios.post(API_URL + "find", {
    userId,
    name,
    createTime
   
  });
};

const login = (username: string, password: string) => {
  return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
};

const logout = () => {
  console.log("Log out");
  localStorage.removeItem("user");
  localStorage.removeItem("curuser");
};

 const getCurrentUser=()=>{

  if(localStorage.getItem("user")!=null)
  {
    var userid=JSON.parse(localStorage.getItem("user") as string ).id;

    axios
   .get(API_URL + "users/"+userid)
   .then((response) => {
     if (response.data) {
       localStorage.setItem("curuser", JSON.stringify(response.data));
     }
    
   });
  }
  
  


 return JSON.parse(localStorage.getItem("user") as string );
};
const fetchlicense = () =>{
  var userid;
  if(localStorage.getItem("user")!=null)
  {
     userid=JSON.parse(localStorage.getItem("user") as string ).id;
     axios
     .get(API_URL + "licenses/user/"+userid)
     .then((response) => {
       if (response.data) {
         localStorage.setItem("userlicences", JSON.stringify(response.data,null,2));
       }
      
     });
  }


};
const fetchalllicense = () =>{

     axios
     .get(API_URL + "alllicenses")
     .then((response) => {
       if (response.data) {
         localStorage.setItem("alllicences", JSON.stringify(response.data,null,2));
       }
      
     });
  


};

const fetchlicensecatagories = () =>{

  axios
  .get(API_URL + "licenseCategories")
  .then((response) => {
    if (response.data) {
      localStorage.setItem("licenseCategories", JSON.stringify(response.data,null,2));
    }
   
  });



};


export default {
  register,
  login,
  logout,
  getCurrentUser,
  purchaselicense,
  editProfile,
  fetchlicense,
  updatelicensestatus,
  fetchalllicense,
  getontologies,
  paypalservicecall,
  fetchlicensecatagories
  
};

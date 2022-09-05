import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';



const LoginFormNew = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = data => {
    console.log(data);
    login(data);
  };

  function login(data) {
    
    // event.preventDefault();
    console.log("Ok");
    axios
      .post("https://prositegroup2.herokuapp.com/adminLogin", {
        password:data.password,
        email:data.email
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.token);
        window.localStorage.setItem("token", res.data.token);
        // alert("Successfully Login");
        navigate("/dashboard");
      });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField id="outlined-basic" label="Email" variant="outlined" {...register("email", { required: true, maxLength: 150 })}/>
        {/* <input {...register("email", { required: true, maxLength: 100 })} /> */}
      </div>
      <br/>
     <div>
        <TextField id="outlined-basic" label="Password" variant="outlined" {...register("password", { required: true, maxLength: 100 })}/>
        {/* <input {...register("password", { required: true, maxLength: 100 })} /> */}
     </div>
      <br/>
      <Button variant="contained" type="submit">Submit</Button>
      {/* <input type="submit" /> */}
    </form>
  );
}
 
export default LoginFormNew;
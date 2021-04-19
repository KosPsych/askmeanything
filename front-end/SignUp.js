import React, { Component ,useState,useEffect}  from 'react';
import axios from 'axios';
import $ from 'jquery';
import './Login.css';
import { withRouter,useHistory } from 'react-router-dom';

import 'foundation-sites/dist/css/foundation.min.css';
import { Button, Colors, Grid, Cell } from 'react-foundation';


class Signup extends React.Component {
  constructor(props) {
    super(props);
}


  handleSubmit() {
    var x = document.forms["login"]["userid"].value;
    var y = document.forms["login"]["pswrd"].value;
    var z = document.forms["login"]["repswrd"].value;
    var a = document.forms["login"]["name"].value;
    var b = document.forms["login"]["surname"].value;
    var c = document.forms["login"]["email"].value;
    if (x == ""|| y== ""||z == ""|| a== ""||b == ""|| c== "") {
      alert("All fields must be filled out");
      return false;
    }
    if (y!=""&&z!=""){
        if(z!=y){
          alert("Password and Re-enter password must be the same");
          return false;
      }
      else if(y.length<6){
        alert("Password is not strong enough(It needs to be more than 6 characters or numpers or symbols)");
        return false;
    }
    var bodyFormData = new FormData();
    bodyFormData.append('name', $('#name').val());
    bodyFormData.append('surname', $('#surname').val());
    bodyFormData.append('username', $('#username').val());
    bodyFormData.append('email', $('#email').val());
    bodyFormData.append('password', $('#password').val());
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(bodyFormData)
    }
     fetch('//127.0.0.1:3000/signup', requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', x );
        localStorage.setItem("logged", true);
        window.location = "/localhost:3000/Login"
      })
      .catch(error => {
        console.error(error);
      })
    }
  }

  render() {
    return (
      <html>
        <body className="login-body">
          <meta charSet="UTF-8" />
          <title>Login</title>

          <Grid className="body-signup dispay">
          <Cell large={ 10 } medium={ 10 }>
          <div className="header-login">
          <a href="/">
          <div>AskMe<span>Anything</span></div>
              </a>
          </div>
          <form name="login" action="/action_page.php" classNameonsubmit="return validateForm()" method="post">
            <div className="login">
            <input id="name" type="text" placeholder="Name" name="name" required/>
              <input id="surname" type="text" placeholder="Surname" name="surname" required/>
              <input id="email" type="text" placeholder="email" name="email" required/>
              <input id="username" type="text" placeholder="Username" name="userid" required/>
              <input id="password" type="password" placeholder="Password" name="pswrd" required/>
              <input id="repassword" type="password" placeholder="Re-enter password" name="repswrd" required/>
              <input type="button" onClick={this.handleSubmit.bind(this)} value="Sing up"/>
            </div>  
          </form>
          </Cell>
          </Grid>
        </body>
      </html>
    )
  }
}

export default Signup;

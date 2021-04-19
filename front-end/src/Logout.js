import React from 'react';
import { Grid, Cell } from 'react-foundation';

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-OBSERVATORY-AUTH': localStorage.getItem("token")
      },
      body: JSON.stringify({ title: 'Logout' })
    }
    fetch('//localhost:8765/evcharge/api/logout', requestOptions)
      .then(() => {
        localStorage.setItem('token', null);
        localStorage.setItem('logged', false);
        window.location = "/localhost:3000/Login";
      })
      .catch(error => {
        console.error(error);
      })
  }
  render() {
    return (
      <html>
        <body className="login-body">
          <meta charSet="UTF-8" />
          <title>Login</title>

          <Grid className="body-login dispay">
            <Cell large={10} medium={10}>
              <div className="header-login">
                <a href="/">
                  <div>Electro<span>Wheeler</span></div>
                </a>
              </div>
              <form name="login" action="/action_page.php" classNameonsubmit="return validateForm()" method="post">
                <div className="login">
                  <input id="username" type="text" placeholder="Username" name="userid" required />
                  <input id="password" type="password" placeholder="Password" name="pswrd" required />
                  <input type="button" value="Login" />
                </div>
              </form>
            </Cell>
          </Grid>
        </body>
      </html>
    )
  }
}

export default Logout;

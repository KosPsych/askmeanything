import React from 'react'
import $ from 'jquery'

class SignIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit () {
    var x = document.forms['login']['userid'].value
    var y = document.forms['login']['pswrd'].value
    if (x === '' || y === '') {
      alert('Username and password can not be empty')
      window.location.reload()
      return false
    }
    var bodyFormData1 = {
      username: $('#username').val(),
      password: $('#password').val()
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyFormData1)
    }

    try {
      const req = await fetch('http://localhost:4000/login', requestOptions)
      const data = await req.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', x)
      localStorage.setItem('logged', true)
      window.location = '//localhost:3000'
    } catch (error) {
      alert('Wrong username or password')
      window.location.reload()
      console.error(error)
    }
  }

  render () {
    return (
      <html>
        <body className='login-body'>
          <meta charSet='UTF-8' />
          <title>Login</title>

              <div className='header-login'>
                <a href='/'>
                  <div>
                    Ask<span>me</span>anything
                  </div>
                </a>
              </div>
              <form
                name='login'
                action='/action_page.php'
                classNameonsubmit='return validateForm()'
                method='post'
              >
                <div className='login'>
                  <input
                    id='username'
                    type='text'
                    placeholder='Username'
                    name='userid'
                    required
                  />
                  <input
                    id='password'
                    type='password'
                    placeholder='Password'
                    name='pswrd'
                    required
                  />
                  <input
                    type='button'
                    onClick={this.handleSubmit.bind(this)}
                    value='Sign in'
                  />
                  <h6>
                    Don't have an account? Click <a href='/SignUp'>here</a> to
                    sign up instead!
                  </h6>
                </div>
              </form>
        </body>
      </html>
    )
  }
}

export default SignIn

import React from 'react'
import $ from 'jquery'

class SignUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit () {
    localStorage.setItem('value', 'admin')
    var x = document.forms['signup']['userid'].value
    var y = document.forms['signup']['pswrd'].value
    var z = document.forms['signup']['repswrd'].value
    if (x === '' || y === '' || z === '') {
      alert('you must fill in all the fields')
      window.location.reload()
      return false
    }
    if (y !== z) {
      alert('Password and re-password can not be different')
      window.location.reload()
      return false
    }
    var bodyFormData2 = {
      username: $('#username').val(),
      password: $('#password').val()
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyFormData2)
    }
    fetch('//localhost:4000/signup', requestOptions)
      .then(response => {
        window.location = '//localhost:3000/SignIn'
        return response.json()
      })
      .catch(error => {
        alert('Something went wrong')
        window.location.reload()
        console.error(error)
      })
  }
  render () {
    return (
      <html>
        <body className='signup-body'>
          <meta charSet='UTF-8' />
          <title>Sign up</title>

              <div className='header-signup'>
                <a href='/'>
                  <div>
                    Ask<span>me</span>anything
                  </div>
                </a>
              </div>
              <form
                name='signup'
                action='/action_page.php'
                classNameonsubmit='return validateForm()'
                method='post'
              >
                <div className='signup'>
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
                    id='repassword'
                    type='password'
                    placeholder='RePassword'
                    name='repswrd'
                    required
                  />
                  <input
                    type='button'
                    onClick={this.handleSubmit.bind(this)}
                    value='Sign up'
                  />
                  <h6>
                    You already have an account then click{' '}
                    <a href='/SignIn'>here</a> !
                  </h6>
                </div>
              </form>
        </body>
      </html>
    )
  }
}

export default SignUp

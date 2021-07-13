import React from 'react'

class SignOut extends React.Component {
  componentDidMount () {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-OBSERVATORY-AUTH': localStorage.getItem('token')
      },
      body: JSON.stringify({ title: 'Signout' })
    }
    fetch('//localhost:4000/Signout', requestOptions)
      .then(() => {
        localStorage.setItem('token', null)
        localStorage.setItem('logged', false)
        window.location = '//localhost:3000/SignIn'
      })
      .catch(error => {
        console.error(error)
      })
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
                  <input type='button' value='Login' />
                </div>
              </form>
        </body>
      </html>
    )
  }
}

export default SignOut

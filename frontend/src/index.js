import React from 'react'
import ReactDOM from 'react-dom'
import 'react-datepicker/dist/react-datepicker.css'

import { Route, Switch, BrowserRouter } from 'react-router-dom'
import './index.css'
import './Login.css'
import './SignUp.css'
import SignOut from './SignOut'
import AskNewQuestion from './AskNewQuestion'
import AnswerQuestion from './AnswerQuestion.js'
import MyAnswers from './MyAnswers'
import MyQuestions from './MyQuestions'
import EditAnswer from './EditAnswer'
import EditQuestion from './EditQuestion'
import SeeAnswers from './SeeAnswers'
import Statistics from './Statistics'
import SignIn from './SignIn'
import SignUp from './SignUp'

import 'foundation-sites/dist/css/foundation.min.css'
import { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'
registerLocale('es', es)

class App extends React.Component {
  render () {
    if (localStorage.getItem('logged') === 'true') {
      return (
        <html>
          <head>
            <link
              rel='stylesheet'
              href='/node_modules/foundation-sites/dist/css/foundation.min.css'
            />
          </head>
          <body>
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1'
            />
            <link
              rel='stylesheet'
              href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
            ></link>
            <title>Ask me anything</title>
            <div className='body'></div>
            <div className='grad'></div>
            <div className='topnav'>
              <a href='/'>
                <div className='topnav-b'>
                  Ask<span>me</span>anything
                </div>
              </a>
              <a href='/Statistics'>
                <i class='fa fa-bar-chart'></i> See the statistics for all aksed
                questions
              </a>
              <a href='/AskNewQuestion'>
                <i className='fa fa-commenting-o'></i> Ask a new question
              </a>
              <a href='/AnswerQuestion'>
                <i className='fa fa-commenting-o'></i> Answer a question
              </a>
              <div className='dropdown'>
                <button className='dropbtn'>
                  <i className='fa fa-newspaper-o'></i>{' '}
                  {localStorage.getItem('username')}'s contribution
                </button>
                <div className='dropdown-content'>
                  <a href='/MyAnswers'>My answers</a>
                  <a href='/MyQuestions'>My questions</a>
                </div>
              </div>
              <div className='topnav-right'>
                <a href='/SignOut'>Sign out</a>
              </div>
            </div>
            <Switch>
              <Route path='/AskNewQuestion' component={AskNewQuestion} />
              <Route path='/AnswerQuestion' component={AnswerQuestion} />
              <Route path='/MyAnswers' component={MyAnswers} />
              <Route path='/MyQuestions' component={MyQuestions} />
              <Route path='/Statistics' component={Statistics} />
              <Route path='/EditQuestion' component={EditQuestion} />
              <Route path='/EditAnswer' component={EditAnswer} />
              <Route path='/SeeAnswers' component={SeeAnswers} />
              <Route path='/SignOut' component={SignOut} />
              <Route path='/' component={Statistics} />
            </Switch>
            <script src='/node_modules/foundation-sites/dist/js/foundation.min.js'></script>
          </body>
        </html>
      )
    } else {
      return (
        <html>
          <head>
            <link
              rel='stylesheet'
              href='/node_modules/foundation-sites/dist/css/foundation.min.css'
            />
          </head>
          <body>
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1'
            />
            <link
              rel='stylesheet'
              href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
            ></link>
            <title>Ask me anything</title>
            <div className='body'></div>
            <div className='grad'></div>
            <div className='topnav'>
              <a href='/'>
                <div className='topnav-b'>
                  Ask<span>me</span>anything
                </div>
              </a>
              <a href='/Statistics'>
                <i class='fa fa-bar-chart'></i> See the statistics for all aksed
                questions
              </a>
              <div className='topnav-right'>
                <a href='/SignIn'>
                  <i className='fa fa-fw fa-user'></i>SignIn
                </a>
                <a href='/SignUp'>
                  <i className='fa fa-fw fa-user'></i>SignUp
                </a>
              </div>
            </div>
            <Switch>
              <Route path='/Statistics' component={Statistics} />
              <Route path='/SignIn' component={SignIn} />
              <Route path='/SignUp' component={SignUp} />
              <Route path='/' component={Statistics} />
            </Switch>
            <script src='/node_modules/foundation-sites/dist/js/foundation.min.js'></script>
          </body>
        </html>
      )
    }
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)

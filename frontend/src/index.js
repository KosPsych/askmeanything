import React from 'react';
import ReactDOM from 'react-dom';
import "react-datepicker/dist/react-datepicker.css";

import { Route, Switch, BrowserRouter } from "react-router-dom";
import './index.css';
import './Login.css';
import './SignUp.css';
import SignOut from './SignOut';
import QuestionsPerKeyword from './QuestionsPerKeyword';
import QuestionsPerDate from './QuestionsPerDate';
import AskNewQuestion from './AskNewQuestion';
import AnswerQuestion from './AnswerQuestion.js';
import MyAnswers from './MyAnswers';
import MyQuestions from './MyQuestions';
import Statistics from './Statistics';
import ChooseDate from './ChooseDate';
import SignIn from './SignIn';
import SignUp from './SignUp';

import 'foundation-sites/dist/css/foundation.min.css';
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)



class App extends React.Component {

 
  render() {
    if (localStorage.getItem("logged") === "true") {
      return (
        <html>
          <head>
            <link rel="stylesheet" href="/node_modules/foundation-sites/dist/css/foundation.min.css" />
          </head>
          <body>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <title>Ask me anything</title>
            <div className="body"></div>
            <div className="grad"></div>
            <div className="topnav">
              <a href="/">
                <div className="topnav-b">Ask<span>me</span>anything</div>
              </a>
            <a href="/QuestionPerKeyword"><i className="fa fa-keyboard-o " ></i> Questions per keyword</a>
            <a href="/ChooseDate"><i className='fa fa-calendar'></i> Questions per date</a>
            <a href="/AskNewQuestion"><i className='fa fa-commenting-o'></i> Ask a new question</a>
            <a href="/AnswerQuestion"><i className='fa fa-commenting-o'></i> Answer a question</a>
            <div className="dropdown">
                <button className="dropbtn"><i className="fa fa-newspaper-o"></i> {localStorage.getItem("username")}'s contribution</button>
                <div className="dropdown-content">
                  <a href="/MyAnswers">My answers</a>
                  <a href="/MyQuestions">My questions</a>
                  <a href="/Statistics">My statistics</a>
                </div>
              </div>
              <div className="topnav-right">
                <a href="/SignOut">Sign out</a>
            </div>
            </div>
            <Switch>
              <Route path="/QuestionsPerKeyword" component={QuestionsPerKeyword} />
              <Route path="/QuestionsPerDate" component={QuestionsPerDate} />
              <Route path="/AskNewQuestion" component={AskNewQuestion} />
              <Route path="/AnswerQuestion" component={AnswerQuestion} />
              <Route path="/MyAnswers" component={MyAnswers} />
              <Route path="/MyQuestions" component={MyQuestions} />
              <Route path="/Statistics" component={Statistics} />
              <Route path="/ChooseDate" component={ChooseDate} />
              <Route path="/SignOut" component={SignOut} />
              <Route path="/" component={QuestionsPerKeyword} />
            </Switch>
            <script src="/node_modules/foundation-sites/dist/js/foundation.min.js"></script>
          </body>
        </html>
      )
    } else {
      return (
        <html>
        <head>
          <link rel="stylesheet" href="/node_modules/foundation-sites/dist/css/foundation.min.css" />
        </head>
        <body>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <title>Ask me anything</title>
          <div className="body"></div>
          <div className="grad"></div>
          <div className="topnav">
            <a href="/">
              <div className="topnav-b">Ask<span>me</span>anything</div>
            </a>
            <a href="/QuestionPerKeyword"><i className="fa fa-keyboard-o " ></i> Questions per keyword</a>
            <a href="/QuestionsPerDate"><i className='fa fa-calendar'></i> Questions per date</a>
            <div className="topnav-right">
              <a href="/SignIn"><i className="fa fa-fw fa-user"></i>SignIn</a>
              <a href="/SignUp"><i className="fa fa-fw fa-user"></i>SignUp</a>
            </div>
          </div>
          <Switch>
            <Route path="/QuestionsPerKeyword" component={QuestionsPerKeyword} />
            <Route path="/QuestionsPerDate" component={QuestionsPerDate} />
            <Route path="/SignIn" component={SignIn} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/" component={QuestionsPerKeyword} />
          </Switch>
          <script src="/node_modules/foundation-sites/dist/js/foundation.min.js"></script>
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
  document.getElementById("root")
);
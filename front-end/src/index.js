import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import "react-datepicker/dist/react-datepicker.css";

import { Route, Switch, BrowserRouter } from "react-router-dom";
import './index.css';
import './Login.css';
import Logout from './Logout';
import Login from './Login';
import SignUp from './SignUp';
import QuestionsPerKeyword from './QuestionsPerKeyword';
import QuestionsPerPeriod from './QuestionsPerPeriod';
import Answer from './Answer';
import MyContributions from './MyContributions';
import MyQuestions from './MyQuestions';
import DateQuestion from './DateQuestion';
import ChooseDate from './ChooseDate';
import Ask from './Ask';
import MyAnswers from './MyAnswers';

import 'foundation-sites/dist/css/foundation.min.css';
import { Grid, Cell } from 'react-foundation';
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)


const user = localStorage.getItem('user');
localStorage.setItem("logged", "false");
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (localStorage.getItem("logged") == "true") {
      return (
        <html>
          <head>
            <link rel="stylesheet" href="/node_modules/foundation-sites/dist/css/foundation.min.css" />
          </head>
          <body>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <title>Ask a new question</title>
            <div className="body"></div>
            <div className="grad"></div>
            <div className="header">
              <a href="/">
              <div>AskMe<span>Anything</span></div>
              </a>
            </div>
            <div className="topnav">
              <a href="/Ask"> Ask a new question</a>
              <a href="/Answer"> Answer a question</a>
              <div className="dropdown">
                <button className="dropbtn"> Questions</button>
                <div className="dropdown-content">
                  <a href="/QuestionsPerPeriod">Questions per period</a>
                  <a href="/QuestionsPerKeyword">Questions per keyword</a>
                </div>
              </div>
              <div className="dropdown">
                <button className="dropbtn"><i className="fa fa-newspaper-o"></i> {localStorage.getItem("username")}'s report</button>
                <div className="dropdown-content">
                  <a href="/MyQuestions">My questions</a>
                  <a href="/MyAnswers">My answers</a>
                  <a href="/MyContributions">My contributions</a>
                </div>
              </div>
              <div className="topnav-right">
                <a href="/Logout"><i className="fa fa-fw fa-user"></i>Sign out</a>
              </div>
            </div>
            <Switch>
            <Route path="/Ask" component={Ask} />
            <Route path="/Answer" component={Answer} />
            <Route path="/QuestionsPerPeriod" component={DateQuestion} />
            <Route path="/QuestionsPerKeyword" component={QuestionsPerKeyword} />
            <Route path="/ChooseDate" component={ChooseDate} />
            <Route path="/Logout" component={Logout} />
            <Route path="/MyQuestions" component={MyQuestions} />
            <Route path="/MyAnswers" component={MyAnswers} />
            <Route path="/MyContributions" component={MyContributions} />
            <Route path="/" component={Ask} />
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
          <title>Ask a new question</title>
          <div className="body"></div>
          <div className="grad"></div>
          <div className="header">
            <a href="/">
            <div>AskMe<span>Anything</span></div>
            </a>
          </div>
          <div className="topnav">
          <a href="/Ask"> Ask a new question</a>
              <a href="/Answer"> Answer a question</a>           
              <div className="dropdown">
                <button className="dropbtn"><i className="fa fa-fw fa-car"></i> Questions</button>
                <div className="dropdown-content">
                  <a href="/QuestionsPerPeriod">Questions per period</a>
                  <a href="/QuestionsPerKeyword">Questions per keyword</a>
                </div>
              </div>
            <div className="topnav-right">
              <a href="/Login"><i className="fa fa-fw fa-user"></i>Sign in</a>
              <a href="/SignUp"><i className="fa fa-fw fa-user"></i>Sign up</a>
            </div>
          </div>
          <Switch>
            <Route path="/Ask" component={Ask} />
            <Route path="/Answer" component={Answer} />
            <Route path="/Login" component={Login} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/QuestionsPerPeriod" component={DateQuestion} />
            <Route path="/QuestionsPerKeyword" component={QuestionsPerKeyword} />
            <Route path="/ChooseDate" component={ChooseDate} />
            <Route path="/" component={Ask} />
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

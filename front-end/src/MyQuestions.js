import React from 'react';
import $ from 'jquery';
import './Ask.css';
$.DataTable = require('datatables.net');

class MyQuestions extends React.Component {
  
  render() {
    return (
      <html>
        <body className="stations-body">
          <meta charSet="UTF-8" />
          <title>My questions</title>
          <div>
            <h2>My questions</h2>

            <table ref="main" />

          </div>
        </body>
      </html>
    )
  }
}

export default MyQuestions;
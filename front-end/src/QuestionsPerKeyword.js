import React from 'react';
import $ from 'jquery';
import './Ask.css';
$.DataTable = require('datatables.net');

class QuestionsPerKeyword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  render() {
    return (
      <html>
        <body className="stations-body">
          <meta charSet="UTF-8" />
          <title>Questions per keyword</title>
          <div>
            <h2>Questions per keyword</h2>

            <table ref="main" />

          </div>
        </body>
      </html>
    )
  }
}

export default QuestionsPerKeyword;
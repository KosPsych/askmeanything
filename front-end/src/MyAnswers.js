import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import './Ask.css';


class MyAnswers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: []
        };
      }
    render() {
        return (
            <html>
            <body className="stations-body">
              <meta charSet="UTF-8" />
              <title>My answers</title>
            <div>
                <h2>My answers</h2>

                <table ref="main" />
                
            </div>
            </body>
            </html>
        )
    }
}

export default MyAnswers;
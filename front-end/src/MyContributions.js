import React from 'react';
import $ from 'jquery';
import './Ask.css';

class MyContributions extends React.Component {
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
              <title>My contributions</title>
            <div>
                <h2>My contributions</h2>

                <table ref="main" />
                
            </div>
            </body>
            </html>
    )
  }
}

export default MyContributions;
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

  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-OBSERVATORY-AUTH': localStorage.getItem("token")
      }
    }
    fetch('//localhost:8765/evcharge/api/UserReport/' + localStorage.getItem('username') + '/' + localStorage.getItem("fromdate") + '/' + localStorage.getItem("todate"), requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        $(this.refs.main).DataTable({
          data: data.CarSummary,
          columns: [
            {
              title: 'Brand name',
              width: "15%",
              data: 'BrandName'
            },
            {
              title: 'Model',
              width: "15%",
              data: 'Model'
            },
            {
              title: 'Cost',
              width: "15%",
              data: 'Cost'
            },
            {
              title: 'Energy delivered',
              width: "15%",
              data: 'EnergyDelivered'
            },
            {
              title: 'Sessions',
              width: "15%",
              data: 'Sessions'
            }
          ],
          ordering: false
        });
      })
      .catch(error => {
        console.error(error);
      })
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
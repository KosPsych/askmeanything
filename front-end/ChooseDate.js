import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import './Ask.css';


class ChooseDate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(), startDate1: new Date()
    };
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleStartChange1 = this.handleStartChange1.bind(this);
  }

  handleStartChange = (date) => {
    this.setState({
      startDate: date
    })
  }
  handleStartChange1 = (date) => {
    this.setState({
      startDate1: date
    })
  }
  chooseDate(ev) {
    ev.preventDefault();
    const format = "yyyy-MM-DD"
    var dateTime = moment(this.state.startDate).format(format);
    localStorage.setItem("fromdate", dateTime);
    var dateTime1 = moment(this.state.startDate1).format(format);
    localStorage.setItem("todate", dateTime1);
    if (dateTime <= dateTime1) {
      if (localStorage.getItem("value") == "vehicle") {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-OBSERVATORY-AUTH': localStorage.getItem("token")
          }
        }
        fetch('//localhost:8765/evcharge/api/SessionsPerEV/' + localStorage.getItem('VehicledataId') + '/' + localStorage.getItem("fromdate") + '/' + localStorage.getItem("todate"), requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            localStorage.setItem("NumberOfVisitedPoints", data.NumberOfVisitedPoints);
            localStorage.setItem("TotalEnergyConsumed", data.TotalEnergyConsumed);
            window.location = "//localhost:3000/ShowDataVehicle";
          })
          .catch(error => {
            alert("No sessions for this vehicle these days");
            window.location = "//localhost:3000/SessionsPerVehicle";
            console.error(error);
          })
      }
      if (localStorage.getItem("value") == "station") {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-OBSERVATORY-AUTH': localStorage.getItem("token")
          }
        }
        fetch('//localhost:8765/evcharge/api/SessionsPerStation/' + localStorage.getItem('StationDataId') + '/' + localStorage.getItem("fromdate") + '/' + localStorage.getItem("todate"), requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            localStorage.setItem("NumberOfChargingSessions", data.NumberOfChargingSessions);
            localStorage.setItem("TotalEnergyDelivered", data.TotalEnergyDelivered);
            window.location = "//localhost:3000/ShowDataStation";
          })
          .catch(error => {
            alert("No sessions for this station these days");
            window.location = "//localhost:3000/SessionsPerStation";
            console.error(error);
          })
      }
      if (localStorage.getItem("value") == "point") {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-OBSERVATORY-AUTH': localStorage.getItem("token")
          }
        }
        fetch('//localhost:8765/evcharge/api/SessionsPerPoint/' + localStorage.getItem('PointDataId') + '/' + localStorage.getItem("fromdate") + '/' + localStorage.getItem("todate"), requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            localStorage.setItem("Operatortitle", " ");
            localStorage.setItem("Operatortitle", data.PointOperator);
            window.location = "//localhost:3000/ShowDataPoint";
          })
          .catch(error => {
            alert("No sessions for this point these days");
            window.location = "//localhost:3000/SessionsPerPoint";
            console.error(error);
          })
      }
      if (localStorage.getItem("value") == "provider") {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-OBSERVATORY-AUTH': localStorage.getItem("token")
          }
        }
        fetch('//localhost:8765/evcharge/api/SessionsPerProvider/' + localStorage.getItem('ProviderDataId') + '/' + localStorage.getItem("fromdate") + '/' + localStorage.getItem("todate"), requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            window.location = "//localhost:3000/ShowDataProvider";
          })
          .catch(error => {
            alert("No sessions for this provider these days");
            window.location = "//localhost:3000/SessionsPerProvider";
            console.error(error);
          })
      }
    }
    else {
      alert("It can not be the date From after the date To");
      window.location = "//localhost:3000/ChooseDate";
    }
  }

  render() {
    return (
      <html>
        <body className="stations-body">
          <meta charSet="UTF-8" />
          <title>Choose date</title>
          <div>
            <h2>Choose date</h2>

            <table ref="main" />

          </div>
          <div className="body1">
            <div className="col-75">
              <div className="container">
                <form action="/action_page.php">
                  <h3>From</h3>

                  <div className="filters">
                    <div id="filterbox">
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleStartChange} />
                    </div>
                  </div>
                  <h3>To</h3>
                  <div className="filters">
                    <div id="filterbox">
                      <DatePicker
                        selected={this.state.startDate1}
                        onChange={this.handleStartChange1} />
                    </div>
                  </div>
                  <button id="chooseDate" className="btn" onClick={this.chooseDate.bind(this)}>Show data</button>
                </form>
              </div>
            </div>
          </div>
        </body>
      </html>
    )
  }
}

export default ChooseDate;
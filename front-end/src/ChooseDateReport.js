import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import './Ask.css';


class ChooseDateReport extends React.Component {

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
                    var cost = data.TotalCost.toFixed(2);
                    localStorage.setItem("TotalCost", cost);
                    localStorage.setItem("TotalEnergy", data.TotalEnergy);
                    localStorage.setItem("TotalSessions", data.TotalSessions);
                    window.location = "//localhost:3000/UserReport";
                })
                .catch(error => {
                    console.error(error);
                })
        }
        else {
            alert("It can not be the date from after the date to");
            window.location = "//localhost:3000/ChooseDateReport";
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
                                    <button id="chooseDateReport" className="btn" onClick={this.chooseDate.bind(this)}>Show data</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        )
    }
}

export default ChooseDateReport;
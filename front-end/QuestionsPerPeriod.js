import React from 'react';
import $ from 'jquery';
import './Ask.css';


class QuestionsPerPeriod extends React.Component {
    constructor(props) {
        super(props);
        this.state = { listItems: [], vehicles: [] };
    }
    render() {
        return (
            <html>
                <body>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    <div className="body1">
                        <h2>Questions from {localStorage.getItem("DateFrom")} to {localStorage.getItem("DateTo")}</h2>
                    </div>
                </body>
            </html>
        )
        // })
    }

}

export default QuestionsPerPeriod;
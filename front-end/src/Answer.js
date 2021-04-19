import React from 'react';
import $ from 'jquery';
import './Ask.css';
import moment from 'moment';


class Answer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
        this.updateInput = this.updateInput.bind(this);
    }
    
    render() {
        return (
            <div className="body1">
                <h2>Answer a question</h2>
                
            </div>
        )
    }
}

export default Answer;
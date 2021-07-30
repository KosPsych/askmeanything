import React from 'react'
import $ from 'jquery'
import moment from 'moment'

class AnswerQuestion extends React.Component {
  constructor (props) {
    super(props)
    this.state = { Information: [] }
    this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this)
    this.handleNeverMind = this.handleNeverMind.bind(this)
  }
  componentDidMount () {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-OBSERVATORY-AUTH': localStorage.getItem('token')
      }
    }
    fetch('//askmeanything.com/home', requestOptions)
      .then(response => {
        return response.json()
      })
      .then(data => {
        var initial = data
        this.setState({ Information: initial })
      })
      .catch(error => {
        console.error(error)
      })
  }
  handleSubmitAnswer () {
    const format = 'MM/DD/yyyy'
    var newDate = new Date()
    var dateTime = moment(newDate).format(format)
    var bodyFormData1 = {
      answer_text: $('#Answertext').val(),
      question_title: localStorage.getItem('question_title'),
      question_user: localStorage.getItem('asked_by'),
      answer_date: dateTime,
      answered_by: localStorage.getItem('username')
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-OBSERVATORY-AUTH': localStorage.getItem('token')
      },
      body: JSON.stringify(bodyFormData1)
    }
    fetch('//askmeanything.com/create_answer', requestOptions)
      .then(response => {
        window.location = '//askmeanything.com/MyAnswers'
        
      })
      .catch(error => {
        console.error(error)
      })
  }
  handleNeverMind () {
    window.location = '//askmeanything.com'
  }
  render () {
    return (
      <html>
        <body>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
          ></link>
          <div className='body1'>
            <h2>
              <i className='fa fa-commenting-o'></i>Answer a question
            </h2>
            <div className='container'>
              <form action='/action_page.php'>
                <div className='row'>
                  <div className='col-50'>
                    <h4>Select question</h4>
                    <select
                      id='SelectQuestion'
                      onChange={this.SelectQuestions.bind(this)}
                    >
                      <option value='no' selected='selected'>
                        Choose an option
                      </option>
                      {this.state.Information.map(Information => (
                        <option value={Information.title}>
                          {Information.title}
                        </option>
                      ))}
                    </select>
                    <h4>Keywords: </h4>
                    <h6 id='keywords'></h6>
                    <h4>Other answers</h4>
                    <h6 id='answers'></h6>
                    <h4>Answer text</h4>
                    <textarea
                      id='Answertext'
                      className='textarea1'
                      placeholder='Answer text'
                      name='Answertext'
                    />
                    <input
                      type='button1'
                      onClick={this.handleSubmitAnswer.bind(this)}
                      value='Submit answer'
                    />
                    <h4> </h4>
                    <input
                      type='button2'
                      onClick={this.handleNeverMind.bind(this)}
                      value='Never mind'
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </body>
      </html>
    )
  }
  SelectQuestions (ev) {
    localStorage.setItem('question_title', ev.currentTarget.value)
    var types = []
    var answers = []
    this.state.Information.forEach(function (item) {
      if (ev.currentTarget.value === item.title) {
        answers.push(item.answers)
        types.push(item.keywords)
        localStorage.setItem('asked_by', item.asked_by)
      }
    })
    var replacekeywords1 = []
    answers.map(function (item) {
      var count = 0
      while (item.length !== 0 && count < item.length) {
        count++
        replacekeywords1.push(
          '<h6 value=' +
            item[count - 1].answer_text +
            '>' +
            count +
            '.' +
            item[count - 1].answer_text +
            ' (from: ' +
            item[count - 1].answered_by +
            ' ,date: ' +
            item[count - 1].answer_date +
            ')' +
            '</h6>'
        )
      }
    })
    var str1 = document.getElementById('answers').innerHTML
    var res1 = str1.replace(str1, replacekeywords1)
    document.getElementById('answers').innerHTML = res1

    var replacekeywords2 = []
    types.forEach(function (item) {
      replacekeywords2.push('<h6 value=' + item + '>' + item + '</h6>')
    })
    var str2 = document.getElementById('keywords').innerHTML
    var res2 = str2.replace(str2, replacekeywords2)
    document.getElementById('keywords').innerHTML = res2
  }
}

export default AnswerQuestion

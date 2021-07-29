import React from 'react'
import $ from 'jquery'
import moment from 'moment'

class SeeAnswers extends React.Component {
  constructor (props) {
    super(props)
    this.state = { Information: [] }
    this.BacktoQuestions = this.BacktoQuestions.bind(this)
  }
  componentDidMount () {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-OBSERVATORY-AUTH': localStorage.getItem('token')
      }
    }
    fetch('//localhost:4001/statistics', requestOptions)
      .then(response => {
        return response.json()
      })
      .then(data => {
        var initial = data
        this.setState({ Information: initial })
        var keyword = []
        var Qtext = []
        var Qtitle = []
        var answers = []
        this.state.Information.forEach(function (item) {
          if (localStorage.getItem('QuenstionId') === item._id) {
            Qtext.push(item.question_text)
            Qtitle.push(item.title)
            keyword.push(item.keywords)
            answers.push(item.answers)
          }
        })
        Qtext.forEach(function (item) {
          $('#Questiontext').append('<h6 value=' + item + '>' + item + '</h6>')
        })
        Qtitle.forEach(function (item) {
          $('#Questiontitle').append('<h6 value=' + item + '>' + item + '</h6>')
        })
        keyword.forEach(function (item) {
          $('#keyword').append('<h6 value=' + item + '>' + item + '</h6>')
        })
        answers.map(function (item) {
          var count = 0
          while (item.length !== 0 && count < item.length) {
            count++
            $('#answers').append(
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
      })
      .catch(error => {
        console.error(error)
      })
  }
  BacktoQuestions () {
    window.location = '//localhost:3000/MyQuestions'
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
                    <h4>Question title: </h4>
                    <h6 id='Questiontitle'></h6>
                    <h4>Question text: </h4>
                    <h6 id='Questiontext'></h6>
                    <h4>Keywords: </h4>
                    <h6 id='keywords'></h6>
                    <h4>Answers</h4>
                    <h6 id='answers'></h6>
                    <input
                      type='button1'
                      onClick={this.BacktoQuestions.bind(this)}
                      value='Go back to Questions'
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
}

export default SeeAnswers

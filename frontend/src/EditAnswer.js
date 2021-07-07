import React from 'react'
import $ from 'jquery'
import './index.css'

class EditAnswer extends React.Component {
  constructor (props) {
    super(props)
    this.state = { Information: [] }
    this.handleSubmitAnswer = this.handleEdit.bind(this)
    this.handleNeverMind = this.handleCancel.bind(this)
  }
  componentDidMount () {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-OBSERVATORY-AUTH': localStorage.getItem('token')
      }
    }
    fetch('//localhost:4003/statistics', requestOptions)
      .then(response => {
        return response.json()
      })
      .then(data => {
        var initial = data
        this.setState({ Information: initial })
        var Qansw = []
        var Qtext = []
        var Qtitle = []
        this.state.Information.forEach(function (item) {
          item.answers.map(function (item1) {
            if (localStorage.getItem('Answertext') === item1.answer_text) {
              Qtext.push(item.question_text)
              Qtitle.push(item.title)
              Qansw.push(item1.answer_text)
              localStorage.setItem('question_user', item.asked_by)
            }
          })
        })
        localStorage.setItem('Qtitle', Qtitle[0])
        $('#QuestionTitle').append(
          '<h6 value=' + Qtitle[0] + '>' + Qtitle[0] + '</h6>'
        )
        $('#QuenstionText').append(
          '<h6 value=' + Qtext[0] + '>' + Qtext[0] + '</h6>'
        )
        $('#AnswerText').append(
          '<h6 value=' + Qansw[0] + '>' + Qansw[0] + '</h6>'
        )
      })
      .catch(error => {
        console.error(error)
      })
  }
  handleEdit () {
    var bodyFormData1 = {
      question_title: localStorage.getItem('Qtitle'),
      answer_text: $('#Answer').val(),
      answered_by: localStorage.getItem('username'),
      quenstion_user: localStorage.getItem('question_user')
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-observatory-auth': localStorage.getItem('token')
      },
      body: JSON.stringify(bodyFormData1)
    }
    fetch('http://localhost:4002/edit_answer', requestOptions)
      .then(res => {
        window.location = '//localhost:3000/MyAnswers'
      })
      .catch(error => {
        window.location.reload()
        console.error(error)
      })
  }

  handleCancel () {
    window.location = '//localhost:3000/MyAnswers'
  }

  render () {
    return (
      <html>
        <body className='stations-body'>
          <meta charSet='UTF-8' />
          <title>Edit answer</title>
          <div className='body1'>
            <h2>
              <i className='fa fa-commenting-o'></i>Edit your answer
            </h2>
            <div className='container'>
              <form action='/action_page.php'>
                <div className='row'>
                  <div className='col-50'>
                    <h4>Question title: </h4>
                    <h6 id='QuestionTitle'></h6>
                    <h4>Quenstion text: </h4>
                    <h6 id='QuenstionText'></h6>
                    <h4>Answer text: </h4>
                    <h6 id='AnswerText'></h6>
                    <h4>Replace your answer text</h4>
                    <textarea
                      id='Answer'
                      className='textarea1'
                      placeholder='Answer'
                      name='Answer'
                      required
                    />
                    <h4> </h4>
                    <input
                      type='button1'
                      onClick={this.handleEdit.bind(this)}
                      value='Save the edit'
                    />
                    <h4> </h4>
                    <input
                      type='button2'
                      onClick={this.handleCancel.bind(this)}
                      value='Cancel'
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

export default EditAnswer

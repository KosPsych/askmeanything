import React from 'react'
import $ from 'jquery'
import moment from 'moment'
import './index.css'

class AskNewQuestion extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleSubmit () {
    var x = document.forms['ask']['Questiontitle'].value
    if (x === '') {
      alert('Question title can not be empty')
    }
    var s = $('#keywords').val()
    var keyw = s.split(',')
    const format = 'MM/DD/yyyy'
    var newDate = new Date()
    var dateTime = moment(newDate).format(format)
    var bodyFormData1 = {
      title: $('#Questiontitle').val(),
      question_text: $('#Questiontext').val(),
      keywords: keyw,
      asked_by: localStorage.getItem('username'),
      question_date: dateTime
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
    fetch('http://askmeanything.com/create_question', requestOptions)
      .then(res => {
        window.location = '//askmeanything.com/MyQuestions'
      })
      .catch(error => {
        window.location.reload()
        console.error(error)
      })
  }

  handleCancel () {
    window.location = '//askmeanything.com/MyAnswers'
  }

  render () {
    return (
      <html>
        <body className='stations-body'>
          <meta charSet='UTF-8' />
          <title>AskNewQuestion</title>
          <div className='body1'>
            <h2>
              <i className='fa fa-commenting-o'></i>Ask a new question
            </h2>
            <div className='container'>
              <form name='ask' action='/action_page.php'>
                <div className='row'>
                  <div className='col-50'>
                    <h4>Question title</h4>
                    <input
                      id='Questiontitle'
                      type='text'
                      placeholder='Question title'
                      name='Questiontitle'
                      required
                    />
                    <h4>Question text</h4>
                    <textarea
                      id='Questiontext'
                      className='textarea1'
                      placeholder='Question text'
                      name='Questiontext'
                    />
                    <h4>Keywords</h4>
                    <input
                      id='keywords'
                      type='text'
                      placeholder='Keywords separated by comma'
                      name='keywords'
                      required
                    />
                    <input
                      type='button1'
                      onClick={this.handleSubmit.bind(this)}
                      value='Submit'
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

export default AskNewQuestion

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
    fetch('//localhost:4001/get_answers', requestOptions)
      .then(response => {
        return response.json()
      })
      .then(data => {
        var replacekeywords1 = []
        var replacekeywords2 = []
        var count = 0
        data.forEach(function (item) {
            if (localStorage.getItem('Answertext') === item.answer_text) {
            count++
            localStorage.setItem('Qtitle', item.question_title)
            localStorage.setItem('Quser', item.question_user)
            replacekeywords2.push('<h6 value=' + item.question_title + '>' + item.question_title + '</h6>')
            replacekeywords1.push(
              '<h6 value=' +
                item.answer_text +
                '>' +
                count +
                '.' +
                item.answer_text +
                ' (date: ' +
                item.answer_date +
                ')' +
                '</h6>'
            )
            var str1 = document.getElementById('AnswerText').innerHTML
        var res1 = str1.replace(str1, replacekeywords1)
        document.getElementById('AnswerText').innerHTML = res1
        var str2 = document.getElementById('QuestionTitle').innerHTML
        var res2 = str1.replace(str2, replacekeywords2)
        document.getElementById('QuestionTitle').innerHTML = res2
            }
          })
        })
      .catch(error => {
        console.error(error)
      })
  }
  handleEdit () {
    var bodyFormData1 = {
      question_title: localStorage.getItem('Qtitle'),
      answer_text: $('#Answer').val(),
      question_user: localStorage.getItem('Quser')
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-observatory-auth': localStorage.getItem('token')
      },
      body: JSON.stringify(bodyFormData1)
    }
    fetch('http://localhost:4001/edit_answer', requestOptions)
      .then(res => {
        return res
      })
      .then(response => {
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

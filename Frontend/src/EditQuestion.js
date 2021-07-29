import React from 'react'
import $ from 'jquery'
import moment from 'moment'
import './index.css'

class EditQuestion extends React.Component {
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
        this.state.Information.forEach(function (item) {
          if (localStorage.getItem('QuenstionId') === item._id) {
            localStorage.setItem('Qtitle', item.title)
            Qtext.push(item.question_text)
            Qtitle.push(item.title)
            keyword.push(item.keywords)
          }
        })
        Qtext.forEach(function (item) {
          $('#QuestionText').append('<h6 value=' + item + '>' + item + '</h6>')
        })
        Qtitle.forEach(function (item) {
          $('#QuestionTitle').append('<h6 value=' + item + '>' + item + '</h6>')
        })
        keyword.forEach(function (item) {
          $('#keyword').append('<h6 value=' + item + '>' + item + '</h6>')
        })
      })
      .catch(error => {
        console.error(error)
      })
  }
  handleEdit () {
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
      question_title: localStorage.getItem('Qtitle'),
      new_question_title: $('#Questiontitle').val(),
      question_text: $('#Questiontext').val(),
      keywords: keyw,
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
    fetch('http://localhost:4001/edit_question', requestOptions)
      .then(res => {
        window.location = '//localhost:3000/MyQuestions'
      })
      .catch(error => {
        window.location.reload()
        console.error(error)
      })
  }

  handleCancel () {
    window.location = '//localhost:3000/MyQuestions'
  }

  render () {
    return (
      <html>
        <body className='stations-body'>
          <meta charSet='UTF-8' />
          <title>AskNewQuestion</title>
          <div className='body1'>
            <h2>
              <i className='fa fa-commenting-o'></i>Edit your question
            </h2>
            <div className='container'>
              <form name='ask' action='/action_page.php'>
                <div className='row'>
                  <div className='col-50'>
                    <h4>Qusetion title: </h4>
                    <h6 id='QuestionTitle'></h6>
                    <h4>Question text: </h4>
                    <h6 id='QuestionText'></h6>
                    <h4>Keywords: </h4>
                    <h6 id='keyword'></h6>
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
                    <h4>Replace your keywords</h4>
                    <input
                      id='keywords'
                      type='text'
                      placeholder='Keywords separated by comma'
                      name='keywords'
                      required
                    />
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

export default EditQuestion

import React from 'react'
import $ from 'jquery'

class MyQuestions extends React.Component {
  constructor (props) {
    super(props)
    this.state = { questions: [] }
  }
  componentDidMount () {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-OBSERVATORY-AUTH': localStorage.getItem('token')
      }
    }
    fetch('//askmeanything.com/statistics', requestOptions)
      .then(response => {
        return response.json()
      })
      .then(data => {
        const states = { data }
        var Questions = []
        data.forEach(function (item) {
          if (item.asked_by === localStorage.getItem('username')) {
            Questions.push(item)
          }
        })
        $(this.refs.main).DataTable({
          data: Questions,
          columns: [
            {
              title: 'Question title',
              width: '15%',
              data: 'title'
            },
            {
              title: 'Date',
              width: '15%',
              data: 'question_date'
            },
            {
              title: 'Question text',
              width: '15%',
              data: 'question_text'
            },
            {
              title: 'Keywords',
              width: '15%',
              data: 'keywords'
            },
            {
              title: 'Action',
              width: '15%',
              data: '_id',
              render: function (_id) {
                return (
                  '<a className="btk" class="answersBtn" id="' +
                  _id +
                  '" ><i type="button">See the answers</i></a>'
                )
              }
            },
            {
              title: 'Action',
              width: '15%',
              data: '_id',
              render: function (_id) {
                return (
                  '<a className="btk" class="editBtn" id="' +
                  _id +
                  '" ><i type="button">edit</i></a>'
                )
              }
            }
          ],
          ordering: false
        })
        $(this.refs.main).on('click', '.editBtn', function (ev) {
          localStorage.setItem('QuenstionId', ev.currentTarget.id)
          window.location = '//askmeanything.com/EditQuestion'
        })
        $(this.refs.main).on('click', '.answersBtn', function (ev) {
          localStorage.setItem('QuenstionId', ev.currentTarget.id)
          window.location = '//askmeanything.com/SeeAnswers'
        })
      })
      .catch(error => {
        console.error(error)
      })
  }
  render () {
    return (
      <html>
        <body className='stations-body'>
          <meta charSet='UTF-8' />
          <title>My questions</title>
          <div>
            <h2>My questions</h2>

            <table ref='main' />
          </div>
        </body>
      </html>
    )
  }
}

export default MyQuestions

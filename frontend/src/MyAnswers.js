import React from 'react'
import $ from 'jquery'
import dt from 'datatables.net'

class MyAnswers extends React.Component {
  constructor (props) {
    super(props)
    this.state = { answers: [] }
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
        var useranswers = []
        data.map(function (item) {
            if (
              item.answered_by === localStorage.getItem('username')
            ) {
              useranswers.push(item)
            }
        })
        $(this.refs.main).DataTable({
          data: useranswers,
          columns: [
            {
              title: 'Answer text',
              width: '15%',
              data: 'answer_text'
            },
            {
              title: 'Answer date',
              width: '15%',
              data: 'answer_date'
            },
            {
              title: 'Action',
              width: '25%',
              data: 'answer_text',
              render: function (answer_text) {
                return (
                  '<a className="btk" class="editBtn" id="' +
                  answer_text +
                  '" ><i type="button">edit</i></a>'
                )
              }
            }
          ],
          ordering: false
        })
        $(this.refs.main).on('click', '.editBtn', function (ev) {
          localStorage.setItem('Answertext', ev.currentTarget.id)
          window.location = '//localhost:3000/EditAnswer'
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
          <title>MyAnswers</title>
          <div>
            <h2>My answers</h2>

            <table ref='main' />
          </div>
        </body>
      </html>
    )
  }
}

export default MyAnswers

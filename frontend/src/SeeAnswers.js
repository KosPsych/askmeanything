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
          }
        })
        Qtext.forEach(function (item) {
          $('#Questiontext').append('<h6 value=' + item + '>' + item + '</h6>')
        })
        Qtitle.forEach(function (item) {
          $('#Questiontitle').append('<h6 value=' + item + '>' + item + '</h6>')
        })
        localStorage.setItem('question_title',Qtitle[0])
        var replacekeywords2 = []
        keyword.forEach(function (item) {
          replacekeywords2.push('<h6 value=' + item + '>' + item + '</h6>')
        })
        var str2 = document.getElementById('keywords').innerHTML
        var res2 = str2.replace(str2, replacekeywords2)
        document.getElementById('keywords').innerHTML = res2
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-OBSERVATORY-AUTH': localStorage.getItem('token')
          }
        }
        fetch(
          '//localhost:4001/get_answers/' +
            localStorage.getItem('question_title'),
          requestOptions
        )
          .then(response => {
            return response.json()
          })
          .then(data => {
            var replacekeywords1 = []
            var count = 0
            data.map(function (item) {
              count++
              replacekeywords1.push(
                '<h6 value=' +
                  item.answer_text +
                  '>' +
                  count +
                  '.' +
                  item.answer_text +
                  ' (from: ' +
                  item.answered_by +
                  ' ,date: ' +
                  item.answer_date +
                  ')' +
                  '</h6>'
              )
              var str1 = document.getElementById('answers').innerHTML
              var res1 = str1.replace(str1, replacekeywords1)
              document.getElementById('answers').innerHTML = res1
            })
          })
          .catch(error => {
            console.error(error)
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
              <i className='fa fa-commenting-o'></i>See the answer
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

import React from 'react'
import moment from 'moment'
import Chart from 'react-google-charts'

class Statistics extends React.Component {
  constructor (props) {
    super(props)
    this.state = { key1_count: 0,key2_count: 0,key3_count: 0,key4_count: 0,key5_count: 0,key1:"-", key2:"-",key3:"-",key4:"-",key5:"-",today: 0,month:0,week:0,total:0};
  }
  async componentDidMount () {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-OBSERVATORY-AUTH': localStorage.getItem('token')
      }
    }
    try{
      const req = await fetch('//localhost:4001/statistics', requestOptions)
      const data = await req.json()
        const day = 1000 * 60 * 60 * 24
        const format = 'MM/DD/yyyy'
        var count_total = 0
        var count_today = 0
        var count_week = 0
        var count_month = 0
        var keywords = []
        data.forEach(function (item) {
          var newDate = new Date()
          const today = new Date(moment(newDate).format(format))
          const created_date = new Date(
            moment(item.question_date).format(format)
          )
          const differnce = Math.abs(today - created_date)
          count_total++
          if (differnce / day <= 1) {
            count_today++
          }
          if (differnce / day <= 7) {
            count_week++
          }
          if (differnce / day <= 30) {
            count_month++
          }
          var count = 0
          while (item.keywords.length !== 0 && count < item.keywords.length) {
            count++
            keywords.push(item.keywords[count - 1])
          }
        })
        this.setState({today:count_today});
        this.setState({week:count_week});
        this.setState({month:count_month});
        this.setState({total:count_total});

        var count1 = {}
        keywords.forEach(function (i) {
          count1[i] = (count1[i] || 0) + 1
        })
        var keys = (keys = Object.keys(count1))
        var p = keys.sort(function (a, b) {
          return count1[b] - count1[a]
        })
        this.setState({key1:p[0]});
        this.setState({key2:p[1]});
        this.setState({key3:p[2]});
        this.setState({key4:p[3]});
        this.setState({key5:p[4]});
        var key1_count = 0
        var key2_count = 0
        var key3_count = 0
        var key4_count = 0
        var key5_count = 0
        keywords.forEach(function (i) {
          if (i == p[0]) {
            key1_count++
          }
          if (i == p[1]) {
            key2_count++
          }
          if (i == p[2]) {
            key3_count++
          }
          if (i == p[3]) {
            key4_count++
          }
          if (i == p[4]) {
            key5_count++
          }
        })
        this.setState({key1_count : key1_count});
        this.setState({key2_count : key2_count});
        this.setState({key3_count : key3_count});
        this.setState({key4_count : key4_count});
        this.setState({key5_count : key5_count});
    }
      catch(error){
        console.error(error)
      }
  }
  render () {
    return (
      <html>
        <body className='stations-body'>
          <meta charSet='UTF-8' />
          <title>Statistics of questions</title>
          <div>
            <h2>Statistics of questions</h2>
            <Chart
              width={'500px'}
              height={'300px'}
              chartType='BarChart'
              loader={<div>Loading Chart</div>}
              data={[
                ['Keywords', 'appearances'],
                [
                  this.state.key1,
                  this.state.key1_count*1
                ],
                [
                  this.state.key2,
                  this.state.key2_count*1
                ],
                [
                  this.state.key3,
                  this.state.key3_count*1
                ],
                [
                  this.state.key4,
                  this.state.key4_count*1
                ],
                [
                  this.state.key5,
                  this.state.key5_count*1
                ]
              ]}
              options={{
                title: 'Top 5 keywords',
                chartArea: { width: '50%' },
                hAxis: {
                  title: 'The total apperances of keywords',
                  minValue: 0
                },
                vAxis: {
                  title: 'Keywords'
                }
              }}
            />
            <Chart
              width={'500px'}
              height={'300px'}
              chartType='PieChart'
              loader={<div>Loading Chart</div>}
              data={[
                ['Task', 'Hours per Day'],
                 ['Today', this.state.today * 1],
                ['Week', this.state.week * 1],
                ['Month', this.state.month * 1],
                ['Total', this.state.total* 1]
              ]}
              options={{
                title: 'Questions statistics',
                is3D: true
              }}
            />
          </div>
        </body>
      </html>
    )
  }
}

export default Statistics

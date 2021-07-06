import React from 'react'
import moment from 'moment'
import Chart from 'react-google-charts'

class Statistics extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
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
        const day = 1000 * 60 * 60 * 24
        const format = 'MM/DD/yyyy'
        var count_total = 0
        var count_today = 0
        var count_week = 0
        var count_month = 0
        var keywords = [];
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
                keywords.push(item.keywords[count-1]);
              }
        })
        localStorage.setItem('today', count_today)
        localStorage.setItem('week', count_week)
        localStorage.setItem('month', count_month)
        localStorage.setItem('total', count_total)

        var count1 = {};
        keywords.forEach(function(i) { 
          count1[i] = (count1[i]||0) + 1;
        });
        var keys = keys = Object.keys(count1);
        var p = keys.sort(function(a,b){return count1[b]-count1[a]});
        localStorage.setItem('key1', p[0])
        localStorage.setItem('key2', p[1])
        localStorage.setItem('key3', p[2])
        localStorage.setItem('key4', p[3])
        localStorage.setItem('key5', p[4])
        var key1_count=0;
        var key2_count=0;
        var key3_count=0;
        var key4_count=0;
        var key5_count=0;
        keywords.forEach(function(i){
           if(i===localStorage.getItem("key1")){
            key1_count++
           }
           if(i===localStorage.getItem("key2")){
            key2_count++
           }
           if(i===localStorage.getItem("key3")){
            key3_count++
           }
           if(i===localStorage.getItem("key4")){
            key4_count++
           }
           if(i===localStorage.getItem("key5")){
            key5_count++
           }
        });
        localStorage.setItem('key1_count', key1_count)
        localStorage.setItem('key2_count', key2_count)
        localStorage.setItem('key3_count', key3_count)
        localStorage.setItem('key4_count', key4_count)
        localStorage.setItem('key5_count', key5_count)
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
                [localStorage.getItem("key1"), localStorage.getItem('key1_count') * 1],
                [localStorage.getItem("key2"), localStorage.getItem('key2_count') * 1],
                [localStorage.getItem("key3"), localStorage.getItem('key3_count') * 1],
                [localStorage.getItem("key4"), localStorage.getItem('key4_count') * 1],
                [localStorage.getItem("key5"), localStorage.getItem('key5_count') * 1]
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
                ['Today', localStorage.getItem('today') * 1],
                ['Week', localStorage.getItem('week') * 1],
                ['Month', localStorage.getItem('month') * 1],
                ['Total', localStorage.getItem('total') * 1]
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

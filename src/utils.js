function Statistics (questions){
    let dict = new Object();
    let dict_2 = {
      'today': 0,
      "last 7 days": 0,
      "last 30 days": 0,
      "total": 0
    };
  
    let date = new Date();
    let current_date = new Date(date.getFullYear(),date.getMonth(),date.getDate()+1);
    let seven_days_ago = new Date(current_date.getFullYear(),current_date.getMonth(),current_date.getDate()-7);
    let thirty_days_ago = new Date(current_date.getFullYear(),current_date.getMonth(),current_date.getDate()-30);
    
  
    for (i=0; i<questions.length; i++ ){
      let question_date = new Date(questions[i].question_date);
      if (question_date==current_date){
           dict_2['today'] = dict_2['today']+1
      }
      if(question_date>=seven_days_ago){
        dict_2["last 7 days"] = dict_2["last 7 days"]+1
      }
      if(question_date>=thirty_days_ago){
        dict_2["last 30 days"] = dict_2["last 30 days"]+1
      }
      dict_2["total"] = dict_2["total"]+1
  
  
      const keyword_list = questions[i].keywords
      for (j=0; j<keyword_list.length; j++){
        if (dict[keyword_list[j]]==undefined){
          dict[keyword_list[j]]=1
        }
        else{
          dict[keyword_list[j]]=dict[keyword_list[j]]+1
        }
      }
    }
    let question_keys=['today',"last 7 days","last 30 days","total"]
    let question_values = [dict_2['today'],dict_2["last 7 days"],dict_2["last 30 days"],dict_2['total']]
    
    var items = Object.keys(dict).map(function(key) {
      return [key, dict[key]];
    });
    
    items.sort(function(first, second) {
      return second[1] - first[1];
    });
    dict = items.slice(0, 5)
    let keys=[]
    let values=[]
    for (let i=0; i<dict.length; i++){
       keys.push(dict[i][0])
       values.push(dict[i][1])
       
    }
    
    return {keys,values,question_keys,question_values}
}


module.exports = {Statistics}
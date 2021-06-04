import  mongoose  from "mongoose";


interface AnswerAttrs {
    
    answer_text:string,
    answer_date:string,
    answered_by:string,
    question_title:string,
    question_user:string
}

interface AnswerModel extends mongoose.Model<AnswerDoc> {
    build(attrs :AnswerAttrs) : AnswerDoc
}

interface AnswerDoc extends mongoose.Document{
    
    answer_text:string,
    answer_date:string,
    answered_by:string,
    question_title:string,
    question_user:string
}

const AnswerSchema = new mongoose.Schema({

    answer_text:String,
    answer_date:String,
    answered_by:String,
    question_title:String,
    question_user:String
  })

AnswerSchema.statics.build = (attrs : AnswerAttrs)=>{
    return new Answer(attrs)
}



const Answer = mongoose.model<AnswerDoc,AnswerModel>('Answers',AnswerSchema)
  
export {Answer};
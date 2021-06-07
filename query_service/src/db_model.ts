import  mongoose  from "mongoose";


interface QuestionAttrs {
    keywords:string[],
    title:string,
    question_text:string,
    question_date:string,
    asked_by:string,
    answers:object[]
}

interface QuestionModel extends mongoose.Model<QuestionDoc> {
    build(attrs :QuestionAttrs) : QuestionDoc
}

interface QuestionDoc extends mongoose.Document{
    keywords:string[],
    title:string,
    question_text:string,
    question_date:string,
    asked_by:string,
    answers:object[]
}

const QuestionSchema = new mongoose.Schema({
    keywords:Array,
    answers:Array,
    title:String,
    question_text:String,
    question_date:String,
    asked_by:String
  })

QuestionSchema.statics.build = (attrs : QuestionAttrs)=>{
    return new Question(attrs)
}



const Question = mongoose.model<QuestionDoc,QuestionModel>('questions',QuestionSchema)
  
export {Question};
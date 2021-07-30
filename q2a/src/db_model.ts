import  mongoose  from "mongoose";


interface QuestionAttrs {
    keywords:string[],
    title:string,
    question_text:string,
    question_date:string,
    asked_by:string
}

interface QuestionModel extends mongoose.Model<QuestionDoc> {
    build(attrs :QuestionAttrs) : QuestionDoc
}

interface QuestionDoc extends mongoose.Document{
    keywords:string[],
    title:string,
    question_text:string,
    question_date:string,
    asked_by:string
}

const QuestionSchema = new mongoose.Schema({
    keywords:Array,
    title:String,
    question_text:String,
    question_date:String,
    asked_by:String
})

QuestionSchema.statics.build = (attrs : QuestionAttrs)=>{
    return new Question(attrs)
}

const Question = mongoose.model<QuestionDoc,QuestionModel>('questions',QuestionSchema)

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

export {Answer, Question};

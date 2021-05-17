import  mongoose  from "mongoose";


interface UserAttrs {
    username:string,
    name:string,
    surname:string,
    password:string,
    email:string
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs :UserAttrs) : UserDoc
}

interface UserDoc extends mongoose.Document{
    username:string,
    name:string,
    surname:string,
    password:string,
    email:string
}

const UserSchema = new mongoose.Schema({
    username:String,
    name:String,
    surname:String,
    password:String,
    email:String
  })

UserSchema.statics.build = (attrs : UserAttrs)=>{
    return new User(attrs)
}
const User = mongoose.model<UserDoc,UserModel>('Users',UserSchema)
  
export {User};
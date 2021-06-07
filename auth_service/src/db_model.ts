import  mongoose  from "mongoose";


interface UserAttrs {
    username:string,
    password:string
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs :UserAttrs) : UserDoc
}

interface UserDoc extends mongoose.Document{
    username:string,
    password:string
}

const UserSchema = new mongoose.Schema({
    username:String,
    password:String
  })

UserSchema.statics.build = (attrs : UserAttrs)=>{
    return new User(attrs)
}
const User = mongoose.model<UserDoc,UserModel>('Users',UserSchema)
  
export {User};
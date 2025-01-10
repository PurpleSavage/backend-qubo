import mongoose,{Schema} from "mongoose";


const userSchema=new Schema({
    name:{
        type:String,
        required:[true, 'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    },
    phoneNumber:{
        type:String,
        required:[true, 'Phone is required']
    },
    photoUrl:{
        type:String,
        required:[true, 'Phone is required']
    }
})
export const UserModel = mongoose.model('User',userSchema)
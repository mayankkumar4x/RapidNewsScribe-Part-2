const { default: mongoose, Schema } = require("mongoose");
const UserSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
})
const User=mongoose.model('user',UserSchema);
// User.createIndexes(); //for unique email
module.exports=User//name and schema


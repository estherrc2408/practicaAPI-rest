const {Schema,model} = require('mongoose');
const UserSchema = new Schema({
    nickname:{
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 12,
    },
    pass:{
        type:String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 12
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports=model('User',UserSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const userSchema = new Schema({
    name:{
        type:String,
        required: true,
        maxlength:25,
        trim:true
    },
    lastname:{
        type:String,
        maxlength:25,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    encry_password:{
        type:String,
        required:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }
},{
    timestamps:true
});


userSchema.virtual("password")
    .set(function(password){
            this._password = password
            this.salt = uuidv4();
            this.encry_password = this.securePassword(password)
            })
    .get(function(){
         return this._password
})


userSchema.methods.authenticate =  function authenticate (pass){
        return this.securePassword(pass) === this.encry_password
    },

userSchema.methods.securePassword = function securePassword (pass){
        if(!pass) return "";
        try {
            return crypto
            .createHmac("sha256",this.salt)
            .update(pass)
            .digest("hex")
        } catch (err) {
            return "";
        }
    }
   

module.exports = mongoose.model("User",userSchema)
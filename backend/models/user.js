const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select : false
    },
},
    {
        timestamps: true,
    }
);

//Encrypting password 

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10)
})

//Compare user password
userSchema.methods.comparePassword = async function (enteredPassword){
    return  await bcrypt.compare(enteredPassword, this.password); 
}

// Return JWT Token
userSchema.methods.getJwtToken = function (){
    return jwt.sign({id: this._id} , process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRES_TIME
    });
}

module.exports = mongoose.model('User', userSchema)
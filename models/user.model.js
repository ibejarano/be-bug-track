const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: false,
    },
    isDev: {
        type: Boolean,
        required: true
    }
});

UserSchema.pre('save', function(next){
    let user = this;
    bcrypt.hash(user.password, 10 , function(err, hash){
        if(err){
            return next(err)
        }
        user.password = hash;
        next();
    });
});

UserSchema.statics.authenticate = function(email,password, callback){
    User.findOne({email: email})
        .exec(function (err,user){
            if(err){
                return callback(err)
            } else if (!user){
                let err = new Error('User not found.')
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function(err, result){
                if (result === true){
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        })
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
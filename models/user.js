let mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({

    First_Name : { 

        type: String
    },

    Last_Name : {
        
        type: String
    },
    
    Email : {

        type: String,
        unique: true
    },
    
    Password : {

        type: String
    }  
})

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    return bcrypt.compareSync(candidatePassword, this.Password);
}

UserSchema.pre('save', function () {
    this.Password = bcrypt.hashSync(this.Password);
});

UserSchema.path('Email').validate((val) => {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(val);
  }, 'Valid E-mail please.');

  

module.exports = mongoose.model('User', UserSchema);

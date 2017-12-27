import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import passport from 'passport';

let UserSchema = mongoose.Schema({
	name:{
  		type: String,
  		index: true
  	},
  	email:{
  		type: String
  	},
  	password:{
  		type: String
  	}
});

export const User = mongoose.model('User', UserSchema);

export const createUser = (newUser, callback) => {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(newUser.password, salt, function(err, hash) {
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}

export const getUserByEmail = (email, callback) => {
  let Obj = {email: email}
  User.findOne(Obj, callback);
}

export const comparePassword = (password, hash, callback) => {
	bcrypt.compare(password, hash, function(err, isMatch){
		if(err) throw err;
		callback(null, isMatch);
	});
}

export const getUserById = (id, callback) => {
  	User.findById(id, callback);
}
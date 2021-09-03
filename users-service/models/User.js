const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'name is required'],
		unqiue: true,
		trim: true
	},
	phoneNumber: {
		type: String,
		required: [true, 'phoneNumber is required'],
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: [true, 'password is required'],
		select: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

UserSchema.statics.generateJWT = function(userData) {
	let jwtKey = undefined;
	if(userData['id'])
		jwtKey = jwt.sign({id: userData['id']}, `fithubapplication`, {expiresIn: `30d`});
	return jwtKey;
}

module.exports = mongoose.model('User', UserSchema);
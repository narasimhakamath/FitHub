const User = require('../models/User');


exports.getUserByID = async (request, response, next) => {
	const responseData = {result: false, message: `Invalid request.`};
	const userData = await User.findById(request['params']['id']);

	if(!userData) {
		responseData['message'] = `No resource found in the system.`;
	} else {
		responseData['result'] = true;
		responseData['message'] = `Resource found.`;
		responseData['data'] = userData;
	}

	response.json(responseData);
};

exports.createUser = async (request, response, next) => {
	responseData = {result: false, message: `Invalid request.`};

	const { name, phoneNumber, password } = request['body'];

	const userData = await User.create({name: name, phoneNumber: phoneNumber, password: password});

	if(!userData) {
		responseData['result'] = false;
		responseData['message'] = `Invalid credentials.`;
	} else {
		responseData['result'] = true;
		responseData['message'] = `User created successfully.`;
		responseData['jwt'] = User.generateJWT(userData);
		responseData['data'] = userData;
	}

	response.json(responseData);
};
const jwt = require('jsonwebtoken');

const serviceRequest = require('../utilities/serviceRequest');

exports.getUserByID = async(request, response, next) => {
	const responseData = {success: false, message: `Invalid request.`, statusCode: 500};
	const userID = request['params']['userID'];

	const userServiceResponse = await serviceRequest.get(`http://users-service:4000/api/users/${userID}`);
	if(userServiceResponse) {
		if(userServiceResponse['success']) {
			responseData['success'] = userServiceResponse['success'];
			responseData['message'] = userServiceResponse['message'];
			responseData['data'] = userServiceResponse['data'];
			responseData['statusCode'] = 201;
		} else {
			responseData['message'] = userServiceResponse['message'];
			responseData['statusCode'] = 404;
		}
	}

	response.status(responseData['statusCode']).json(responseData);
};

exports.createUser = async(request, response, next) => {
	const responseData = {success: false, message: `Invalid request.`, statusCode: 500};

	const userServiceResponse = await serviceRequest.post(`http://users-service:4000/api/users/register`, request['body']);
	if(userServiceResponse) {
		if(userServiceResponse['success']) {
			responseData['success'] = userServiceResponse['success'];
			responseData['message'] = userServiceResponse['message'];
			responseData['jwt'] = generateJWT(userServiceResponse['data']);
			responseData['data'] = userServiceResponse['data'];
			responseData['statusCode'] = 201;
		} else {
			responseData['message'] = userServiceResponse['message'];
			responseData['statusCode'] = 404;
		}
	}

	response.status(responseData['statusCode']).json(responseData);
};

const generateJWT = function(userData) {
	let jwtKey = undefined;
	if(userData['_id'])
		jwtKey = jwt.sign({userID: userData['id']}, `fithubapplication`, {expiresIn: `30d`});
	return jwtKey;
}
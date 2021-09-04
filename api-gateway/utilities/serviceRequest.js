const axios = require('axios');

exports.get = async (requestURL) => {
	try {
		let responseData = await axios.get(requestURL);
		if(responseData['data'])
			return responseData['data'];
	} catch(error) {
		return {};
	}

	return {};
}

exports.post = async (requestURL, requestBody) => {
	try {
		let responseData = await axios.post(requestURL, requestBody);
		if(responseData['data'])
			return responseData['data'];
	} catch(error) {
		return {};
	}

	return {};
}

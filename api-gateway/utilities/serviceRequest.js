const axios = require('axios');

exports.get = async (getURL) => {
	try {
		let responseData = await axios.get(getURL);
		if(responseData['data'])
			return responseData['data'];
	} catch(error) {
		return {};
	}
}

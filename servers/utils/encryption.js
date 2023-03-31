// encryption.js
const CryptoJS = require('crypto-js');

const SECRET = process.env.SECRET_KEY;

const encryptData = (data) => {
	const encryptedData = CryptoJS.AES.encrypt(data, SECRET).toString();
	return encryptedData;
};

const decryptData = (data) => {
	const decryptedData = CryptoJS.AES.decrypt(data, SECRET).toString(
		CryptoJS.enc.Utf8
	);
	return decryptedData;
};

module.exports = { encryptData, decryptData };

// encryption.js
const CryptoJS = require('crypto-js');

const SECRET = process.env.SECRET_KEY;

const encryptAES = (data) => {
	const encryptedData = CryptoJS.AES.encrypt(data, SECRET).toString();
	return encryptedData;
};

const decryptAES = (data) => {
	const decryptedData = CryptoJS.AES.decrypt(data, SECRET).toString(
		CryptoJS.enc.Utf8
	);
	return decryptedData;
};

const encryptDES = (data) => {
	const encryptedData = CryptoJS.DES.encrypt(data, SECRET).toString();
	return encryptedData;
};

const decryptDES = (data) => {
	const decryptedData = CryptoJS.DES.decrypt(data, SECRET).toString(
		CryptoJS.enc.Utf8
	);
	return decryptedData;
};

module.exports = {
	encryptAES,
	decryptAES,
	encryptDES,
	decryptDES,
};

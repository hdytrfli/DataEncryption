const prisma = require('../connections/prisma');
const { encryptData, decryptData } = require('../utils/encryption');
const { generateMockData } = require('../utils/factory');

// function to create a new user
const createUser = async (req, res) => {
	// get the data from the request body
	// const {
	// 	nama,
	// 	nik,
	// 	jenisKelamin,
	// 	telefon,
	// 	email,
	// 	alamat,
	// 	pekerjaan,
	// 	golDarah,
	// } = req.body;

	const data = {
		nama: req.body.nama,
		nik: req.body.nik,
		jenisKelamin: req.body.jenisKelamin,
		telefon: req.body.telefon,
		email: req.body.email,
		alamat: req.body.alamat,
		pekerjaan: req.body.pekerjaan,
		golDarah: req.body.golDarah,
	};

	// encrypt the data using
	const encryptedData = {};

	Object.keys(data).forEach((key) => {
		encryptedData[key] = encryptData(data[key]);
	});

	const user = await prisma.user.create({
		data: encryptedData,
	});

	// set status code and send the response
	res.status(201).json(user);
};

// function to get all users
const getUsers = async (req, res) => {
	// get all users from the database
	const users = await prisma.user.findMany();

	// decrypt the data
	const decryptedData = users.map((user) => {
		const decryptedData = {};
		Object.keys(user).forEach((key) => {
			if (key === 'id') return;
			decryptedData[key] = decryptData(user[key]);
		});
		return decryptedData;
	});

	// set status code and send the response
	res.status(200).json(decryptedData);
};

// function to generate mock data
const generateUsers = async (req, res) => {
	// get number from query params
	const { number } = req.query;

	try {
		// call the generateMockData function from utils/factory.js
		const mockData = generateMockData(number);

		// res.status(200).json(mockData);

		// encrypt the data
		const encryptedData = mockData.map((data) => {
			const encryptedData = {};
			Object.keys(data).forEach((key) => {
				encryptedData[key] = encryptData(data[key]);
			});
			return encryptedData;
		});

		// create the mock data
		const users = await prisma.user.createMany({ data: encryptedData });
		res.status(201).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const deleteAllUsers = async (req, res) => {
	try {
		// delete all users
		const users = await prisma.user.deleteMany();
		res.status(200).json(users);
	} catch (error) {
		// catch any error
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

module.exports = { createUser, getUsers, generateUsers, deleteAllUsers };

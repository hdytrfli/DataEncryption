const prisma = require('../connections/prisma');

const {
	encryptAES,
	decryptAES,
	encryptDES,
	decryptDES,
} = require('../utils/encryption');

const { generateMockData } = require('../utils/factory');

const getUsers = async (req, res) => {
	const { count, method } = req.query;

	if (!count || !method) {
		return res
			.status(400)
			.json({ message: 'Bad request, count and method are required' });
	}

	const users = await prisma.user.findMany({
		take: parseInt(count),
	});

	if (users.length === 0) {
		return res.status(404).json({ message: 'Users not found' });
	}

	const decryptedData = users.map((user) => {
		return Object.keys(user).reduce((acc, key) => {
			if (key === 'id') {
				acc[key] = user[key];
				return acc;
			}
			acc[key] =
				method === 'aes'
					? decryptAES(user[key])
					: decryptDES(user[key]);
			return acc;
		}, {});
	});

	res.status(200).json(decryptedData);
};

const generateUsers = async (req, res) => {
	const { count, method } = req.query;

	if (!count || !method) {
		return res
			.status(400)
			.json({ message: 'Bad request, count and method are required' });
	}

	try {
		const mockData = generateMockData(count);

		const encryptedData = mockData.map((data) => {
			return Object.keys(data).reduce((acc, key) => {
				acc[key] =
					method === 'aes'
						? encryptAES(data[key])
						: encryptDES(data[key]);
				return acc;
			}, {});
		});

		const users = await prisma.user.createMany({ data: encryptedData });
		res.status(201).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const deleteUsers = async (req, res) => {
	try {
		const users = await prisma.user.deleteMany();
		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

module.exports = {
	getUsers,
	generateUsers,
	deleteUsers,
};

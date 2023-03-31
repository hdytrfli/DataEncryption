const { faker } = require('@faker-js/faker');

// set the locale to id_ID
faker.setLocale('id_ID');

const generateMockData = (count) => {
	// initialize the mockData array
	const mockData = [];

	// loop through the count
	for (let i = 0; i < count; i++) {
		// get random first name and last name
		let firstName = faker.name.firstName();
		let lastName = faker.name.lastName();

		// generate random data
		const data = {
			nama: `${firstName} ${lastName}`,
			nik: faker.random.numeric(16),
			jenisKelamin: faker.helpers.arrayElement([
				'Laki-laki',
				'Perempuan',
			]),
			telefon: faker.phone.number('+628##########'),
			email: faker.internet.email(firstName, lastName),
			alamat: faker.address.city(),
			pekerjaan: faker.name.jobTitle(),
			golDarah: faker.helpers.arrayElement(['A', 'B', 'AB', 'O']),
		};

		// push the data to the mockData arrays
		mockData.push(data);
	}

	// return the mock data
	return mockData;
};

module.exports = { generateMockData };

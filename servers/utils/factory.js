const { faker } = require('@faker-js/faker');

faker.setLocale('id_ID');

const generateMockData = (count) => {
	const mockData = [];

	for (let i = 0; i < count; i++) {
		let firstName = faker.name.firstName();
		let lastName = faker.name.lastName();

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

		mockData.push(data);
	}

	return mockData;
};

module.exports = { generateMockData };

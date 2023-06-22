const express = require('express');
const cors = require('cors');
const app = express();

const prisma = require('./servers/connections/prisma');

const userRoutes = require('./servers/routes/user');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/v1/users', userRoutes);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use((req, res) => {
	res.status(404).send('Not Found');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const app = express();

// setup prisma orm
const prisma = require('./servers/connections/prisma');

// setup routes of the app
const userRoutes = require('./servers/routes/user');

// use middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// setup routes
app.use('/api/v1/users', userRoutes);

// test routes
app.get('/', (req, res) => {
	res.send('Hello World!');
});

// fallback route
app.use((req, res) => {
	res.status(404).send('Not Found');
});

// listen in port 3000 (or any other port)
const PORT = process.env.PORT || 3000;

// start the server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

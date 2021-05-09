const express = require('express');

const app = express();

app.get('/', (request, response) => {
	return response.json({ message: 'Test nodemon' })
});

app.listen('3333', () => {
	console.log('Server starter')
});

const express = require('express');

const app = express();

app.get('', (request, response) => {});

app.listen('3333', () => {
	console.log('Server starter')
});

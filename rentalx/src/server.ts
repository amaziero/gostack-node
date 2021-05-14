import express, { Request, Response } from 'express';

const app = express();

app.listen('/', (request, response) => {
	return response.json({ message: 'Hello word' });
})

app.listen(3333, () => {
	console.log('Server starter!');
});

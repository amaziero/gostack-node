const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const custumers = [];

function verifyOfExistesAccountCPF(request, response, next) {
	const { cpf } = request.headers;

	const custumer = custumers.find(custumerFund => custumerFund.cpf === cpf);
	
	if(!custumer) {
		return response.status(400).json({ error: "Custumer not fund" })
	}

	request.custumer = custumer;

	return next();
};

app.post('/account', (request, response) => {
	const { cpf, name } = request.body;

	const custumerAlreadyExists = custumers.some(
		(custumer) => custumer.cpf === cpf
	);

	if(custumerAlreadyExists) {
		return response.status(400).json({ message: 'Custumer already exists' })
	}

	custumers.push({
		cpf,
		name,
		id: uuidv4(),
		statement: []
	})

	return response.status(201).send('Salvo com sucesso')
});

app.get('/statement', verifyOfExistesAccountCPF, (request, response) => {
	const { custumer } = request;	

	return response.status(200).json(custumer.statement);
})

app.post('/deposit',(request, reponse) => {});

app.listen('3333', () => {
	console.log('Server starter')
});

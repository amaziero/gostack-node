const { response } = require('express');
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

function getBalance(statement)  {
	const balance = statement.reduce((acc, operation) => 
	{
		if(operation.type === 'credit') {
			return acc + operation.amount;
		} else {
			return acc - operation.amount;
		}
	}, 0);

	return balance;
}

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

app.post('/deposit', verifyOfExistesAccountCPF, (request, response) => {
	const { description, amount } = request.body;
	const { custumer } = request;

	const statementOperation = {
		description,
		amount,
		create_at: new Date(),
		type: "credit"
	};

	custumer.statement.push(statementOperation);

	return response.status(200).json(custumer.statement.amount)
});

app.post('/withdraw', verifyOfExistesAccountCPF, (request, response) => {
	const { amount } = request.body;
	const { custumer } = request;

	const balance = getBalance(custumer.statement);
	
	console.log(balance)

	if(balance < amount){
		return response.status(400).json({ error: "Not enough funds!" })
	}

	const statementOperation = {
		amount,
		create_at: new Date(),
		type: "debit"
	};

	custumer.statement.push(statementOperation);

	return response.status(200).send();
});

app.get('/statement/date', verifyOfExistesAccountCPF, (request, response) => {
	const { custumer } = request;
	const { date } = request.query;

	const dateFormate = new Date(date + " 00:00");

	const statement = custumer.statement.filter(
		(statement) => statement
			.create_at
			.toDateString() === new Date(dateFormate).toDateString()
	);

	return response.status(200).json(statement);
})

app.put('/account', verifyOfExistesAccountCPF, (request, response) => {
	const { name } = request.body;
	const { custumer } = request;

	custumer.name = name;

	return response.status(200).send();
});

app.get('/account', verifyOfExistesAccountCPF, (request, response) => {
	const { custumer } = request;

	return response.json(custumer);
});

app.delete('/account', verifyOfExistesAccountCPF, (request, response) => {
	const { custumer } = request;

	custumers.splice(custumer, 1);

	// Retornando o 200 para ver o retorno sem a conta deletada, o retorno deveria
	// ser 204
	return response.status(200).json(custumers);
})

app.listen('3333', () => {
	console.log('Server starter')
});

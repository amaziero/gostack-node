# CADASTRO DE CARRO

**REQUISITOS FUNCIONAIS**

Deve ser possivel cadastrar um novo carro.
Deve ser possível listar todas as categorias.

**REGRA DE NEGÓCIO**

Não deve ser possível cadastrar um carro com a placa já existente.
Não deve ser possivel alterar a placa do carro já cadastrado.
O carro deve ser cadastrado por padrão com disponibilidade.
O usuário responsável pelo cadastro deve ser um administrador.

# LISTAGEM DE CARROS

**REQUISITOS FUNCIONAIS**

Deve ser possível listar todos os carros disponiveis.
Deve ser possível listar todos os carros disponiveis pelo nome da categoria.
Deve ser possível listar todos os carros disponiveis pelo nome do carro.
Deve ser possível listar todos os carros disponiveis pelo nome da marca.

**REGRA DE NEGÓCIO**

O usuário não precisa estar logado no sistema para listar carros.

# CADASTRO DE ESPECIFICAÇÃO NO CARRO

**REQUISITOS FUNCIONAIS**

Deve ser possivel cadastrar uma especificação para um carro.
Deve ser possivel listar todas as especificações.
Deve ser possível listar todos os carros.

**REGRA DE NEGÓCIO**

Não deve ser possivel cadastrar uma especificação para carro inexistente.
Não deve ser possivel duplicar especificação em um mesmo carro.
O usuário responsável pelo cadastro deve ser um administrador.

# CADASTRO DE IMAGENS DO CARRO

**REQUISITOS FUNCIONAIS**

Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**REQUISITOS NÃO FUNCIONAIS**

Utilizar o multer para upload de arquivos.

**REGRA DE NEGÓCIO**

O usuário deve poder cadastrar mais de uma imagem por carro.
O usuário responsável pelo cadastro deve ser um administrador.

# ALUGUEL

**REQUISITOS FUNCIONAIS**

Deve ser possivel cadastrar um aluguel.

**REGRA DE NEGÓCIO**

O aluguel deve ter duração minima de 24 horas.
Nao deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Nao deve ser possivel cadastrar um novo aluguel caso carro já esteja alugado.
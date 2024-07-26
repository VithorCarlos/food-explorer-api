# Food Explorer API

# Requisitos funcionais

[] Deve ser possível salvar as refeições nos favoritos
[] Deve ser possível criar um refeição nova (admim)
[] Deve ser possível criar uma nova conta de usuário comum
[] Deve ser possível listar os dados de uma refeição
[] Deve ser possivel listar todas as refeições disponíveis
[] Deve ser possível fazer upload de imagem para a aws
[] Deve ser possível editar uma refeição (admim)
[] Deve ser possível se autenticar
[] Deve ser possível obter o usuário logado

# Regras de negócio

[] O usuário não pode se registar com um email existente
[] O Administrador não pode cadastrar uma refeição que já existe
[] As refeições só podem ser cadastradas por um administrador
[] Não deve ser possível que um usuário edite um prato
[] O usuário só pode realizar o pedido de 20 itens por vez do mesmo prato

# Requisitos não funcionais

[] A senha deve ser criptografada
[] Os dados da aplicação devem ser persistidas no banco de dados Postgres
[] Todos as refeições devem ser paginadas com 20 items por página
[] O usário deve ser identificado com JWT Token
[] Deve-se ter refresh token, e gerar um novo token a cada 20min

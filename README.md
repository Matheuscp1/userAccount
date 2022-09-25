## Versão
Esse projeto utiliza NodeJS v16.14.0

## Funcionalidades, estrutura, comandos e arquivos de configuração para o back-end
Esse projeto já possui algumas bibliotecas e funcionalidades prontas, como as seguintes:
* [x] TypeORM (ORM para modelagem de Banco de Dados)
* [x] Mysql
* [x] ESLint (Ferramenta para manter o código padronizado e evitar erros)
* [x] Git Commit Linter (Verifica todo commit realizado se ele segue as convenções de nomenclatura do GIT)
* [x] Express para servidor web
* [x] Typescript para tipagem
* [x] JWT para autenticação

## Arquivo de configuração
# Crie arquivo .env na pasta raiz do back-end, copie as variavéis do arquivo .env.example e cole no arquivo .env
# Altere as varivéis DB para as configuraçãos do seu banco de dados mysql e altere as varivéis SERVER para a porta e ip desejavel
# Api esta rondando na porta 8680

## Estrutura
O projeto está estruturado de forma que consiga desacoplar o máximo de funcionalidades da outra, para que haja o mínimo de dependências do mesmo arquivo e para que possam reaproveitar funções sem a necessidade de duplicar o mesmo código.

A pasta "Routes", está separada de acordo com a entidade necessária, e todas elas são unificadas dentro do arquivo "router.ts". 
Caso queira que a rota seja autenticada, é necessário adicionar o middleware "AuthMiddleWare", sendo assim, ele irá verificar se a requisição possui um token válido.


## Comandos
Para baixar as depêndencias do projeto de desenvolvimento, certifique-se de estar utilizando a versão correta do NodeJS e execute o seguinte comando:

```
npm install
```
Para criar as tabelas no banco de dados mysql:
```
npm run typeorm migration:run
```

Para executar o projeto em ambiente de desenvolvimento:
```
npm run dev
```

## Banco de Dados
Para manter o banco de dados versionado, este projeto utiliza a orm TypeORM e utiliza o modelo de migrations.

Para gerar uma nova migration:
```
npm run typeorm migration:generate -- -n [nomeMigration]
```

Para reverter a última migration:
```
npm run typeorm migration:revert
```

Para executar a migration:
```
npm run typeorm migration:run
```

## Funcionalidades, comandos e arquivos de configuração para o front-end
Esse projeto já possui algumas bibliotecas e funcionalidades prontas, como as seguintes:
* [x] Axios (para o consumo da api)
* [x] React (paginas SPA)
* [x] ESLint (Ferramenta para manter o código padronizado e evitar erros)
* [x] Git Commit Linter (Verifica todo commit realizado se ele segue as convenções de nomenclatura do GIT)
* [x] React-Icons (icones)
* [x] Validador de CPF e CEP
* [x] Mascara para inputs (mascara para CPF)
* [x] react-toastify 


## Arquivo de configuração
# Crie arquivo .env na pasta raiz do front-end, copie as variavéis do arquivo .env.example e cole no arquivo .env
# Altere as varivéis REACT para a porta e servidor da api para o consumo
# aplição front-end esta rondando na porta 3000


## Comandos
Para baixar as depêndencias do projeto de desenvolvimento, certifique-se de estar utilizando a versão correta do NodeJS e execute o seguinte comando:

```
npm install
```

Para executar o projeto em ambiente de produção:
```
npm start
```



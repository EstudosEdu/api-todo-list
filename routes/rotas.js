const express = require('express');
const app = express();
const ConnectionDatabase = require('../models/database.js');
const db = new ConnectionDatabase();

module.exports  = app.get('/', async (req, res) => {
    res.json('bem vindo á nossa api')
})

// autenticação de usuario
module.exports  = app.post('/autenticate', async (req, res) => {
    const { user, pass, email } = req.body;
    const autentica = await db.autenticate(user, pass, email);
    res.json(autentica);
})

//recebe algo criptografado e verifica se esse crypt é um user
module.exports  = app.post('/descryptUser', async (req, res) => {
    const crypt = req.body.crypt;
    const user_descript = await db.user_descript(crypt)
    res.json(user_descript);
})

//create Table's ==============================================================

module.exports = app.get('/createModelUser', async (req, res) => {
    res.send('Tabela User Criada!');
    await db.createModelUser(true);
});

module.exports = app.get('/createModelProduto', async (req, res) => {
    res.send('Tabela Produto Criada!');
    await db.createModelProduto(true);
});


// create's ==============================================================

module.exports = app.get('/createUser/:user/:password/:email', async (req, res) => {
    const {user, password, email} = req.params;
    await db.createUser(user, password, email);
    res.send('Usuario criado com sucesso!');
});

module.exports = app.get('/createProduto/:nome/:descricao/:idUser', async (req, res) => {
    const { nome, descricao, idUser } = req.params;
    await db.createProduto(nome, descricao, idUser);
    res.send('Produto criado com sucesso!');
})


//delete's ==============================================================

module.exports = app.get('/deleteUser/:idUser', async (req, res) => {
    const idUser = req.params.idUser;
    await db.deleteUser(idUser);
    res.send('Usuario deletado com sucesso!')
});

module.exports = app.get('/DeleteProduto/:idProduto', async (req, res) => {
    await db.deleteProduto(idProduto)
    res.send('Produto Deletado!');
});
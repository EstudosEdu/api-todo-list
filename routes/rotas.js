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

module.exports = app.get('/createProduto/:nome/:checked/:idUser', async (req, res) => {
    const { nome, checked, idUser } = req.params;
    await db.createProduto(nome, checked, idUser);
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

// Rotas de CRUD do produto ==============================================
module.exports = app.post('/ReadProducts', async (req, res) => {
    const {userId} = req.body;
    const produtos = await db.readProducts(userId)
    res.json(produtos);
});

module.exports = app.post('/CreateProducts', async (req, res) => {
    const {name, checked, userId} = req.body;
    const createProd = await db.CreateProducts(name, checked, userId)
    res.json(createProd);
});

module.exports = app.post('/UpdateProducts', async (req, res) => {
    const {id_Prod, checked} = req.body;
    const updateProd = await db.UpdateProducts(id_Prod, checked)
    res.json(updateProd);
});

module.exports = app.post('/DeleteProducts', async (req, res) => {
    const {idProduto} = req.body;
    const DeleteProd = await db.DeleteProduto(idProduto)
    res.send(DeleteProd);
});
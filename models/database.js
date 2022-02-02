const Sequelize = require('sequelize');
const tableUser = require('./user.js');
const tableProduto = require('./produto.js');
var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");

class ConnectionDatabase
{
    constructor()
    {
        this.database = new Sequelize(
            'loja_relacionamento',
            'root2',
            '1234',
            {
                host: 'localhost',
                dialect: 'mysql'
            }
        );
        
        this.TableUser = this.database.define(tableUser.name, tableUser.table, tableUser.options);
        this.TableProduto = this.database.define(tableProduto.name, tableProduto.table, tableProduto.options);
        
        //relacionamento de tabelas ================================================
        // define que TableProduto pertence a TableUser e que a ForeignKey é: id_User
        this.TableProduto.belongsTo(this.TableUser,{
            constraint: true,
            foreignKey: 'id_User',
            onDelete: 'CASCADE'
        })

        // define que TableUser tem ou pode ter varios TableProduto e a ForeignKey é: id_User
        this.TableUser.hasMany(this.TableProduto,{
            foreignKey: 'id_User'
        })
    }

    async createModelUser(forca = null)
    {
        if(forca) await this.TableUser.sync({force: true});
        if(!forca) return Table;
    }

    async createModelProduto(forca = null)
    { 
        if(forca) await this.TableProduto.sync({force: true});
        if(!forca) return Table;
    }

    async createUser(user, password, email)
    {
        const table = await this.TableUser;
        await table.create(
            {
                name: user,
                password: password,
                email: email
            }
        )
    }

    async createProduto(nome, checked, idUser) {
        const table = await this.TableProduto;
        await table.create(
            {
                name: nome,
                checked: checked,
                id_User: idUser
            }
        )
    }

    async deleteUser(idUser)
    {
        const table = await this.TableUser;
        const tableProd = await this.TableProduto;
        const Delete = await table.findByPk(idUser)
        tableProd.destroy({ where: { id_User: idUser}});
        Delete.destroy();
    }

    async deleteProduto(idProduto)
    {
        const table = await this.TableProduto;
        const Delete = await table.findByPk(idProduto);
        Delete.destroy();
    }

    async autenticate(user, password, email)
    {
        const users = await this.TableUser;
        const dados = await users.findAll({
            where: {
                password: password,
                email: email
            }
        });

        const infos = await users.findAll({
            where:{
                email: email
            }
        });

        if(dados.length > 0) {
            const UserName = CryptoJS.AES.encrypt(infos[0].name, '1234').toString();
            const UserId = CryptoJS.AES.encrypt(infos[0].id.toString(), '1234').toString();

            return {session: true, infoUser: [UserId, UserName]};
        }
        else return false;
    }

    async user_descript(dado)
    {
        let descriptando = CryptoJS.AES.decrypt(dado, '1234');
        let userOriginal = descriptando.toString(CryptoJS.enc.Utf8);
        return userOriginal
    }

    async readProducts(userId)
    {
        const Produtos = await this.TableProduto;
        let descriptando = CryptoJS.AES.decrypt(userId, '1234');
        let userId_Original = descriptando.toString(CryptoJS.enc.Utf8);
        const Todos_Produtos = await Produtos.findAll({
            where: {
                id_User: userId_Original
            }
        })
        let [...rows] = Todos_Produtos
        for(let i = 0; i < rows.length; i++)
        {
            rows[i].id_User = userId;
        }
        return rows;
    }

    async CreateProducts(name, checked, id_User)
    {
        let descriptando = CryptoJS.AES.decrypt(id_User, '1234');
        let userId_Original = descriptando.toString(CryptoJS.enc.Utf8);
        const Produtos = await this.TableProduto;
        await Produtos.create(
            {
                name: name,
                checked: checked,
                id_User: userId_Original
            }
        )
        return true;
    }

    async UpdateProducts(id_Prod, checked)
    {
        const Produtos = await this.TableProduto;
        const update = await Produtos.findByPk(id_Prod);
        update.checked = checked;
        update.save();

        return 'Update Feito Com Sucesso!';
    }

    async DeleteProduto(idProduto)
    {
        const Produtos = await this.TableProduto;
        const Delete = await Produtos.findByPk(idProduto);
        Delete.destroy();
        return 'Produto Excluido Com Sucesso!'   
    }
}

module.exports = ConnectionDatabase;
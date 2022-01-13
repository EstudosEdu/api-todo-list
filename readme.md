# API Simples usando JavaScript
- #### Feito somente para estudos e tirar duvidas;
----
## Tecnologias Usadas:
- JavaScript
- Node.js
- Sequelize ( _ORM_ )
- Insomnia ( _utilizar api / testa-la_ )
----
## Tabela geral da API
| Função | Tipo | ROTA |
| ---|---|--- |
| Criar Novo Usuario | Get | `/createUser/usuarios/password/email` |
| Criar Novo Produto | Get | `/createProduto/nome/checked/idUsuario` |
| Criar Tabela de Usuarios | Get | `/createModelUser` |
| Criar Tabela de Produtos | Get | `/createModelProduto` |
| Deletar Usuarios (deleta todos produtos desse Usuarios | Get | `/deleteUser/:idUsuario` |
| Deletar Produtos | Get  | `/DeleteProduto/:idProduto` |
| Autenticar Usuario | Post | `/autenticate` |
| Descriptar hash do user la do front | Post | `/descryptUser` |
| Criar Novo Produto | Post | `/CreateProducts` |
| Listar Todos os Produtos do usuario | Post | `/ReadProducts` |
| Editar produto | Post | `/UpdateProducts` |
| Deletar Produto | Post | `/DeleteProducts` |
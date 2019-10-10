<h1 align="center"> Commands </h1>
<p align="center">Está pasta é onde ficam os comandos</p>

### Como são identificados
 Os comandos estão identificado da seguinte madeira:

```
(categoria).(nome do comando).js
```

### Como comando é formado
Os comandos estão feitos desta madeira:

```js
module.exports = {
    //informações que informações do comando
    help: {
        name: "/* Nome do comando aqui */",
        aliases: ["x1", "x2"], //alternativas para ativar o comando ("x1" e "x2" são exemplos)
        description: "/* Descrição que o comando */"
    },

    //configurações do comando
    config: {
        private: false,  //se o comando fica escondido ou não do help
        dev: false,      //se o comando é só para desenvolvedor
        permBot: 0,      //permissões necessárias para o bot
        permMember: 0    //permissões necessárias para o membro
    },

    //função executada quando comando é adicionado
    run: async (client, message, args, cmd) => {
        try {
            /*
                Codigo do comando
                                    */
        } catch (error) { //se deu erro no codigo executa isso
            CMDs.erro(client, message, cmd, error)
        } finally { //quando terminar a função (não importa se deu erro)
            message.channel.stopTyping(true)
        }
    }
}
```

<h3 align="center"> FAQ </h3>
<p align="center">/////// ||*WIP*|| \\\\\\\</p>

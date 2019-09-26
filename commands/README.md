<h1 align="center"> Commands </h1>
<h3 align="center">Está pasta é onde ficam os comandos</h3>

# Como são identificados?
 Os comandos estão identificado da seguinte madeira:

> `(categoria).(nome do comando).js`

# Como comando é formado?
Os comandos estão feitos desta madeira:

> ```js
>module.exports = {
>    help: {
>        name: "ping",
>        description: "Latencia de respostas do bot!!"
>    },
>
>    config: {
>        private: false,  //se o comando fica escondido ou não do help
>        dev: false,      //se o comando é só para desenvolvedor
>        permBot: 0,      //permissões necessárias para o bot 
>        permMember: 0    //permissões necessárias para o membro
>    },
>
>    // eslint-disable-next-line no-unused-vars
>    run: async (client, message, args) => {
>        try {
>            /* 
>                Codigo do comando
>                                    */
>        } catch (error) {
>            CMDs.erro(client, message, this.help.name, error)
>        }
>    }
>}
>```
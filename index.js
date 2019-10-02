/*global tags, CMDs*/
/*eslint no-undef: "error"*/

//chamar os recrimentos globais
const tokens = require("./data/tokens.json")
const config = require("./data/config.json")
const firebase = require("firebase")
global.tags = require("./data/messages/console/tags.json")

//iniciar firebase
const p1 = new Promise((resolve) => {
    //verificar se existe algo no json sobre os dados da database
    for (let i in tokens.firebase.config) {
        if (!tokens.firebase.config[i]) {
            console.log(`[${tags.WARNING}] Faltam dados para que a firebase funcionam!!`)
            return process.exit()
        }
    }

    //iniciar os dados da database
    firebase.initializeApp(tokens.firebase.config)

    //função se que é ativada quando não houver autenticação!!
    async function NoAuthentication() {
        console.log(`[${tags.SUCCESS}] Ligada mas sem Autenticação!!\n[${tags.WARNING}] A sua Autenticação não fui isso significa que só pode usar dados publicos!!`)
        return resolve()
    }

    //verfica se fui escrito alguma Autenticação no json
    if(!tokens.firebase.authentication.email || !tokens.firebase.authentication.password){
        NoAuthentication()
        return
    }

    //então se existir dados tentar logar na conta
    firebase.auth().signInWithEmailAndPassword(tokens.firebase.authentication.email, tokens.firebase.authentication.password)
        .then(async () => { //se logou na database
            console.log(`[${tags.SUCCESS}] Banco de Dados autenticado com sucesso`)
            resolve()
        }, async (error) => { //se falhou ao logar
            if (error.code === "auth/operation-not-allowed") { //se deu o error da operação não ter permição
                console.log(`[${tags.WARNING}] Autenticação não fui ativada ligando!!`)
                NoAuthentication()
                return
            }
            console.log(`[${tags.ERROR}] Falha ao autenticar o banco de dados!!`)
            console.log(`Motivo do erro: ${error.code}`)
            console.log(error.message)
            return process.exit()
        })
})
//depois de iniciar o banco de dados

//ligar o bot
p1.then(async () => {
    //chamar a discord.js para que o bot funcione
    const Discord = require("discord.js")
    const client = new Discord.Client()

    //variaveis necessárias para tudo funcionar
    client.prefix = config.discord.prefix               //prexixo padrão
    client.dev = config.discord.dev                     //desenvolvedores com permição suprema no bot
    client.db = firebase.database()                     //variavel responsavel pela database
    client.cooldown = new Set()                         //sistema para dar delay nos comandos
    global.startRun = Date.now()                        //Hora em o bot iniciou
    global.commands = {}                                //varialvel por conter os comandos
    global.CMDs = require("./GlobalFuncions/cmd.js")    //global com funções dos comandos
    global.up = require("./GlobalFuncions/uptime.js")   //função sobre uptime do bot
    global.playingNow = {}
    global.cnt = {}

    //chamar o fs para ler as pastas
    const fs = require('fs')

    //carregar os comandos
    const cmdFiles = fs.readdirSync('./commands/')          //lê o que esta no diretório dos comandos
    cmdFiles.forEach(async (file) => {                      //executa uma funçao para tudo que esteja lá
        try {                                               //tenta registrar o comando
            if (file.split('.').slice(-1)[0] === 'js') {    //verifica se o ficheiro encontrado é js
                const cmd = require(`./commands/${file}`)   //se sim chama o ficheiro
                await CMDs.register(cmd, file, client.db)   //chama a função dos comandos que registra
            }
        } catch (error) { //deu erro dá um aviso aqui
            console.log(`[${tags.ERROR}] Não fui possivel executar o comando ${file}:`)
            console.log(error)
        }
    })

    //carregar os eventos
    //primeiro carregar o eventos que vão ficar sempre ligado
    const onFiles = fs.readdirSync('./events/on/')
    onFiles.forEach(async (file) => {
        if (file.split('.').slice(-1)[0] === 'js') {
            const onName = file.split('.')[0]
            const run = require(`./events/on/${file}`)
            client.on(onName, run.bind(null, client))
        }
    })


    //agora carregar eventos que só acontece uma vez
    const onceFiles = fs.readdirSync('./events/once/')
    onceFiles.forEach(async (file) => {
        if (file.split('.').slice(-1)[0] === 'js') {
            const onceName = file.split('.')[0]
            const run = require(`./events/once/${file}`)
            client.once(onceName, run.bind(null, client))
        }
    })

    //sistema para que o bot ligue no discord
    client.login(tokens.discord.token)
})
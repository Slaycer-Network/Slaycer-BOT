const tokens = require("./data/tokens.json")
const config = require("./data/config")
const firebase = require("firebase")
global.tags = require("./data/messages/console/tags.json")

const p1 = new Promise(resolve => {
    for (let i in tokens.firebase.config) {
        if (tokens.firebase.config[i]) return
        console.log(`[${tags.WARNING}] Faltam dados para que a firebase funcionam!!`)
        process.exit()
    }
    firebase.initializeApp(tokens.firebase.config)

    async function NoAuthentication() {
        console.log(`[${tags.SUCCESS}] Ligada mas sem Autenticação!! \n [${tags.WARNING}] A sua Autenticação não fui isso significa que só pode usar dados publicos!!`)
        resolve()
    }

    if(!tokens.firebase.authentication.email) return NoAuthentication()
    if(!tokens.firebase.authentication.password) return NoAuthentication()

    firebase.auth().signInWithEmailAndPassword(tokens.firebase.authentication.email, tokens.firebase.authentication.password)
        .then(async () => {
            console.log(`[${tags.SUCCESS}] Banco de Dados autenticado com sucesso`)
            resolve()
        }, async (error) => {
            if (error.code == "auth/operation-not-allowed") return NoAuthentication()
            console.log(`[${tags.ERROR}] Falha ao autenticar o banco de dados!!`)
            console.log('Motivo do erro: ' + error.code)
            console.log(error.message)
            return process.exit()
        })
})
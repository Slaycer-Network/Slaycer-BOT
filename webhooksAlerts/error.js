const 
    { WebhookClient, MessageEmbed } = require("discord.js"),
    { errorCode } = require("../configs/tokens.js").discord.webhooksAlets,
    webLocale = require("../locales/webhook/error.js"),
    consoleLocale = require("../locales/console/webhook.js")

const webhook = new WebhookClient(errorCode.hookID, errorCode.token)

async function hookErrorAlert(erro = "", shardID) {
    const embed = new MessageEmbed()
        .setTitle(webLocale.embed.title(shardID))
        .setColor("RED")
        .setTimestamp()
        .setFooter(webLocale.embed.footer)
    
    let messageERR
    if (erro.length > 2000) messageERR = erro.slice(-2000)
    else messageERR = erro

    embed.setDescription(`\`\`\`\n${messageERR}\n\`\`\``)
    
    try {
        await webhook.send({
            embeds: [
                embed
            ]
        })
        console.log()
    } catch (error) {
        
    }
    
}

module.exports = {
    hookErrorAlert
}
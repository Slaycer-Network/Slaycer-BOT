const 
    { WebhookClient, MessageEmbed } = require("discord.js"),
    { errorCode } = require("../configs/tokens.js").discord.webhooksAlets

const webhook = new WebhookClient(errorCode.hookID, errorCode.token)

async function hookErrorAlert(erro = "", shardID) {
    const embed = new MessageEmbed()
        .setTitle(`[Shard-${shardID}] Erro de Codigo`)
        .setColor("RED")
        .setTimestamp()
        .setFooter()
    
    let messageERR
    if (erro.length > 2020) messageERR = erro.slice(-2020)
    else messageERR = erro

    embed.setDescription(`\`\`\`\n${messageERR}\n\`\`\``)
    
    try {
        await webhook.send({
            embeds: [
                embed
            ]
        })
    } catch (error) {
        
    }
    
}

module.exports = {
    hookErrorAlert
}
const discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: "love",
    aliases: ["affinity"],
    category: "FUN",
    description: "Calculates the love affinity you have for another person.",
    run: async (client, message, args) => {
 
        let person = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]);

        if (!person || message.author.id === person.user.id) {
            person = message.guild.members.cache
                .filter(m => !m.user.bot)
                .random();
        }

        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "❤️".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const embed = new discord.MessageEmbed()
            .setColor(config.color)
            .addField(`**${person.user.tag}** loves **${message.author.tag}** this much:`,
            ` ͔  \n💟 ${Math.floor(love)}%\n\n${loveLevel}`);

        message.channel.send(embed).catch(e => {
        
        let err = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(e);

        if (e.lenght > 2048) return;

        message.channel.send(e)
      })
    }
}
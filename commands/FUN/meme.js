const discord = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
        name: "meme",
        aliases: ["memem"],
        description: "Get a **FUN** meme",
        category: "FUN",
    run: async (client, message, args) => {
    const subReddits = ["dankmeme", "meme", "me_irl", 'memes', 'Discordmemes'];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    const img = await randomPuppy(random);
    const embed = new discord.MessageEmbed()
      .setColor(`RANDOM`)
      .setTitle(random)
      .setImage(img)
      .setURL(`https://reddit.com/r/${random}`);
    message.channel.send(embed).catch(e => {
        
        let err = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(e);

        if (e.lenght > 2048) return;

        message.channel.send(e)
      })
    }
}
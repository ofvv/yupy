const moment = require('moment');
const discord = require('discord.js');
const config = require('../../config.json');

const statuses = {
	dnd: '<:dnd:731209945541771354> | Do Not Disturb',
	idle: '<:idle:731212505023643679> | Idle',
	online: '<:online:731213044083982427> | Online',
	offline: '<:offline:731213187462201484> | Offline'
};

const flags = {
    DISCORD_EMPLOYEE: '<:DiscordStaff:753998532922572911>',
    DISCORD_PARTNER: '<:PartneredServerOwner:753998458452574209>',
    BUGHUNTER_LEVEL_1: '<:BugHunter:753998213039783984>',
    BUGHUNTER_LEVEL_2: '<:CH_BadgeBugHunterGold:753999273410166914>',
    HYPESQUAD_EVENTS: '<:HypeSquadEvents:753998401582137395>',
    HOUSE_BRAVERY: '<:HypeSquadBravery:753998354228314272>',
    HOUSE_BRILLIANCE: '<:HypeSquadBrilliance:753998303166857248>',
    HOUSE_BALANCE: '<:HypeSquadBalance:753998256853483601>',
    EARLY_SUPPORTER: '<:EarlySupporter:753998119691354123>',
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: '<:VerifiedBot:754001169981898934>',
    VERIFIED_DEVELOPER: '<:EarlyVerifiedBotDeveloper:753998037554167850>'
};

module.exports = {
  name: "userinfo",
  description:
    "Get Information for discord user",
  usage: "userinfo @user",
  aliases: ["whois"],
  category: "Information",
  run: async (client, message, args, prefix) => {

      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || message.member;

      const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);

      const userFlags = member.user.flags.toArray();

      let embed = new discord.MessageEmbed()
      .setTitle(`Userinfo for ${member.displayName}`)
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(config.color)
      			.addField('User', [
				`**🡺 Username:** ${member.user.tag}`,
				`**🡺 ID:** ${member.id}`,
				`**🡺 Badges:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
				`**🡺 Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} (${moment(member.user.createdTimestamp).fromNow()})`,
				`**🡺 Status:** ${statuses[member.user.presence.status]}`,
				`**🡺 Game:** ${member.user.presence.game || 'Not playing a game.'}`,
				`\u200b`
			])
			.addField('Member', [
				`**🡺 Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
				`**🡺 Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
				`**🡺 Hoisted Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`
			])
      .setFooter(client.user.username, client.user.avatarURL())

    message.channel.send(embed).catch(e => {
        
        let err = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(e);

        if (e.lenght > 2048) return;

        message.channel.send(e)
      })
  }
}
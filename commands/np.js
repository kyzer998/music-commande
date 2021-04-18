const { MessageEmbed } = require("discord.js")

const { COLOR } = require("../config.json");

module.exports = {
  name: "np",
  description: "Obtenez le nom de la chanson en cours de lecture",
  execute (client, message, args) {
    let embed = new MessageEmbed()
.setColor(COLOR)
      
    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("VOUS DEVEZ ÊTRE DANS LE CANAL VOCAL :/")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("Le bot ne joue rien")
      return message.channel.send(embed);
    }
    
    embed.setDescription(`**Lecture en cours** - ${serverQueue.songs[0].title}`)
    .setThumbnail(serverQueue.songs[0].thumbnail)
    message.channel.send(embed)

    
    
    
  }
}
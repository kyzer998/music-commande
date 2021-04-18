const { MessageEmbed } = require("discord.js");
const { COLOR } = require("../config.json");
module.exports = {
  name: "drop",
  description: "Supprimer la chanson de la file d'attente",
  execute(client, message, args) {
    let embed = new MessageEmbed().setColor(COLOR);
    const { channel } = message.member.voice;
    if (!channel) {
      embed.setAuthor("VOUS N'ÊTES PAS DANS LE CANAL VOCAL");
      return message.channe.send(embed);
    }

    const serverQueue = client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("La file d'attente est vide");
      return message.channel.send(embed);
    }
    
     if(isNaN(args[0])) {
      embed.setAuthor("Please Use Numerical Values Only")
      return message.channel.send(embed)
    }
   
    if(args[0] > serverQueue.songs.length) {
      embed.setAuthor("Unable to find this song")
      return message.channel.send(embed)
    }
    
    
    serverQueue.songs.splice(args[0] - 1, 1)
    embed.setDescription("DROPED THE SONG FROM QUEUE")
    embed.setThumbnail(client.user.displayAvatarURL())
    return message.channel.send(embed)
  }
};

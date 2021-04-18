const { MessageEmbed } = require("discord.js");

const { COLOR } = require("../config.json");
module.exports = {
  name: "volume",
  description: "Gérer le volume de la chanson",
  execute(client, message, args) {
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("Vous n'êtes pas autorisé à modifier le volume de la musique")
    }
    

    
    let embed = new MessageEmbed().setColor(COLOR);

    
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
    
    if(!args[0]) {
      embed.setAuthor(`Le volume actuel est ${serverQueue.volume}`)
      return message.channel.send(embed)
    }
    
    if(isNaN(args[0])) {
      embed.setAuthor("Veuillez n'utiliser que des valeurs numériques")
      return message.channel.send(embed)
    }
    
    if(args[0] > 200) {
      embed.setAuthor("Vous mourrez si vous atteignez la limite de 200 :)")
      return message.channel.send(embed)
    }
    
    serverQueue.volume = args[0]
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100)
    embed.setDescription(`Volume réglé sur ${args[0]}`)
    embed.setThumbnail(client.user.displayAvatarURL())
    message.channel.send(embed)
    
  }
};

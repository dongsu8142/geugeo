import { Message, MessageEmbed } from 'discord.js';
import request from 'request';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class MusicCommand extends BaseCommand {
  constructor() {
    super('음악차트', 'util', [], '음악차트를 알려줍니다.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    request(`https://manyyapi.herokuapp.com/music`, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const accountObj = JSON.parse(body);
        const embed = new MessageEmbed().setTitle('음악차트');
        for (let count = 1; count < 25; count++) {
          embed.addField(`${count}위`, accountObj[count], true);
        }
        message.channel.send(embed);
      }
    });
  }
}

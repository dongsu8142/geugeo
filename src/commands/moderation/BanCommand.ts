import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class BanCommand extends BaseCommand {
  constructor() {
    super('벤', 'moderation', [], '유저를 벤합니다.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const { mentions } = message;

    if (message.member?.hasPermission('BAN_MEMBERS')) {
      if (message.guild?.me?.hasPermission('BAN_MEMBERS')) {
        const target = mentions.users.first();
        if (target) {
          const member = message.guild?.members.cache.get(target.id);
          member?.ban();
          message.channel.send(`${member?.user.username}을 벤하였습니다.`);
        } else {
          message.channel.send('대상이 지정되지 않았습니다.');
        }
      } else {
        message.channel.send('봇의 권한이 부족합니다.');
      }
    } else {
      message.channel.send('권한이 충분하지 않습니다.');
    }
  }
}

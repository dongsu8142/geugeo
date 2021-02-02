import { Message, MessageEmbed, WebhookClient } from 'discord.js';
import config from '../../config.json';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class FeedbackCommand extends BaseCommand {
  constructor() {
    super('피드백', 'util', [], '제작자에게 피드백이 갑니다.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const msg = args.join(' ');
    try {
      const wc = new WebhookClient(
        config['webhook-id'],
        config['webhook-token'],
      );
      wc.send(msg, {
        username: message.author.tag,
        avatarURL: message.author.displayAvatarURL({ dynamic: true }),
      });

      message.channel.send(`피드백을 전송하였습니다. 내용: ${msg}`);
    } catch (err) {
      message.channel.send('피드백 전송에 실패하였습니다.');
    }
  }
}

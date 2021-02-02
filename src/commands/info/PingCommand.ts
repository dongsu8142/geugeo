import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class PingCommand extends BaseCommand {
  constructor() {
    super('핑', 'info', [], '딜레이를 보여줍니다.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send('측정중').then((resultMessage) => {
      const ping: number =
        resultMessage.createdTimestamp - message.createdTimestamp;

      resultMessage.edit(`딜레이: ${ping}, API 딜레이: ${client.ws.ping}`);
    });
  }
}

import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class BackCommand extends BaseCommand {
  constructor() {
    super('가사', 'music', ['자막'], '노래의 가사를 보여줍니다.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const lyrics = await client.player.lyrics(args.join(" "));
    message.channel.send(lyrics.lyrics ? lyrics.lyrics : "자막을 찾을 수 없습니다.");
  }
}

import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { Lyrics } from "@discord-player/extractor";

export default class BackCommand extends BaseCommand {
  constructor() {
    super('자막', 'music', [], '이전 노래를 재생합니다.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
        const lyrics = await Lyrics(args.join(" "));
        message.channel.send(lyrics.lyrics ? lyrics.lyrics : "자막을 찾을 수 없습니다.");
  }
}

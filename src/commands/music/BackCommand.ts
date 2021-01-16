import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

export default class BackCommand extends BaseCommand {
  constructor() {
    super("뒤로", "music", [], "이전 노래를 재생합니다.");
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (client.player.isPlaying(message)) {
      try {
        client.player.back(message);
        message.channel.send("이전 노래를 재생합니다.");
      } catch (err) {
        message.channel.send("뒤에 음악이 없습니다.");
      }
    } else {
      message.channel.send("재생중인 음악이 없습니다!");
    }
  }
}

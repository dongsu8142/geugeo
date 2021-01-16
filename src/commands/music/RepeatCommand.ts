import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

export default class RepeatCommand extends BaseCommand {
  constructor() {
    super("반복", "music", [], "음악을 반복합니다.");
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (client.player.isPlaying(message)) {
      const queue = client.player.getQueue(message);
      const repeat = queue.repeatMode;
      await client.player.setRepeatMode(message, !repeat);
      message.channel.send(
        !repeat ? "반복를 활성화 했습니다." : "반복를 비활성화 했습니다."
      );
    } else {
      message.channel.send("재생중인 음악이 없습니다!");
    }
  }
}

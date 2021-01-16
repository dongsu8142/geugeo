import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

export default class LoopCommand extends BaseCommand {
  constructor() {
    super("루프", "music", [], "재생목록을 반복합니다.");
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (client.player.isPlaying(message)) {
      const queue = client.player.getQueue(message);
      const loop = queue.loopMode;
      await client.player.setLoopMode(message, !loop);
      message.channel.send(
        !loop ? "루프를 활성화 했습니다." : "루프를 비활성화 했습니다."
      );
    } else {
      message.channel.send("재생중인 음악이 없습니다!");
    }
  }
}

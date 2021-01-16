import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { Queue } from "discord-player";

export default class VolumeCommand extends BaseCommand {
  constructor() {
    super("볼륨", "music", [], "음량을 조정하거나 현재 음량을 보려줍니다.");
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (client.player.isPlaying(message)) {
      if (args[0]) {
        try {
          client.player.setVolume(message, Number(args[0]));
          message.channel.send(`음량을 ${args[0]}으로 변경했습니다.`);
        } catch (err) {
          message.channel.send("에러가 발생했습니다.");
        }
      } else {
        const queue: Queue = client.player.getQueue(message);
        const volume: Number = queue.volume;
        message.channel.send(`현재 볼륨은 ${volume}입니다.`);
      }
    } else {
      message.channel.send("재생중인 음악이 없습니다!");
    }
  }
}

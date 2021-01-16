import { Message, TextChannel } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

export default class ClearCommand extends BaseCommand {
  constructor() {
    super("청소", "moderation", [], "메시지를 삭제합니다.");
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (message.member?.hasPermission("MANAGE_MESSAGES")) {
      if (message.guild?.me?.hasPermission("MANAGE_MESSAGES")) {
        if (isNaN(parseInt(args[0]))) {
          if (0 < parseInt(args[0]) || 100 > parseInt(args[0])) {
            if (message.channel.type == "text") {
              message.channel.bulkDelete(parseInt(args[0]) + 1)
            }
          } else {
            message.channel.send("숫자는 1부터 99까지 가능합니다.");
          }
        } else {
          message.channel.send("숫자를 입력해주세요.");
        }
      } else {
        message.channel.send("봇의 권한이 부족합니다.");
      }
    } else {
      message.channel.send("권한이 충분하지 않습니다.");
    }
  }
}

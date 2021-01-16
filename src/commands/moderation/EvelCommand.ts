import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import config from "../../config.json";

export default class EvelCommand extends BaseCommand {
  constructor() {
    super("실행", "moderation", [], "유저를 멸령어를 실행합니다.");
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (config.owners.some((word) => message.author.id.includes(word))) {
      let embed2 = new MessageEmbed();
      embed2.setAuthor(message.author.username, message.author.avatarURL()!);
      embed2.setTitle("오류");
      embed2.setDescription("잘못된 클라이언트 종료 방식입니다.");
      embed2.setColor("RED");

      let text = args.join(" ");

      if (text.indexOf("exit") != -1 && text.indexOf("process") != -1) {
        return message.channel.send(embed2);
      } else {
        const result = new Promise((resolve) => resolve(eval(text)));
        return result
          .then((output: any) => {
            if (typeof output !== "string")
              output = require("util").inspect(output, {
                depth: 0,
              });

            if (output.includes(config.token))
              output = output.replace(config.token, "토큰");
            if (output.length > 1010) output = output.slice(0, 1010) + "\n...";

            let embed = new MessageEmbed();
            embed.setColor("#5fe9ff");
            embed.setDescription(
              "입력 :\n```js\n" +
                text +
                "\n```\n출력 :```js\n" +
                output +
                "\n```"
            );
            message.channel.send({ embed: embed });
          })
          .catch((error) => {
            error = error.toString();
            error = error.replace(config.token, "토큰");

            if (error.includes(config.token))
              error = error.replace(config.token, "토큰");

            let embed = new MessageEmbed();
            embed.setAuthor(
              message.author.username,
              message.author.avatarURL()!
            );
            embed.setTitle("오류");
            embed.setDescription(error);
            embed.setColor("RED");
            message.channel.send({ embed: embed });
          });
      }
    } else {
      let embed = new MessageEmbed();
      embed.setColor("#5fe9ff");
      embed.setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
      embed.setDescription("봇 관리자만 가능한 명령어에요!");
      message.channel.send({ embed: embed });
    }
  }
}

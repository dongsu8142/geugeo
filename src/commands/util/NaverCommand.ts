import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import request from "request";

export default class NaverCommand extends BaseCommand {
  constructor() {
    super("실검", "util", [], "실시간 검색어를 알려줍니다.");
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    request(`https://manyyapi.herokuapp.com/naver`, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const accountObj = JSON.parse(body);
        const embed = new MessageEmbed().setTitle("실시간검색어");
        for (let count = 1; count < 21; count++) {
          embed.addField(`${count}위`, accountObj[count], true);
        }
        message.channel.send(embed);
      }
    });
  }
}

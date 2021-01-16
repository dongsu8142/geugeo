import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { stripIndent } from "common-tags";

export default class HelpCommand extends BaseCommand {
  constructor() {
    super("도움말", "info", [], "도움말을 알려줍니다.");
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const categories: string[] = ["moderation", "info", "music", "util", "level"];
    const embed: MessageEmbed = new MessageEmbed()
      .setTitle("명령어 모음집")
      .setFooter("한동준#7777에게 문의")
      .setColor("RANDOM");

    const commands = (category: string) => {
      return client.commands
        .filter(cmd => cmd.getCategory() === category)
        .map(cmd => `- \`${cmd.getName()}\`: ${cmd.getDescription()}`)
        .join("\n");
    };

    const info = categories
      .map(
        cat =>
          stripIndent`**${cat[0].toLowerCase() + cat.slice(1)}** \n${commands(
            cat
          )}`
      )
      .reduce((string, category) => string + "\n" + category);

    message.channel.send(embed.setDescription(info + "\n\n[초대링크](<https://discord.com/oauth2/authorize?client_id=697315780013850634&scope=bot&permissions=1945201982>)"));
  }
}

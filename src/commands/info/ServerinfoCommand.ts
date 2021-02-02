import { Message, MessageEmbed } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class ServerinfoCommand extends BaseCommand {
  constructor() {
    super('서버정보', 'info', [], '서버정보를 보여줍니다.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const { guild } = message;

    const embed = new MessageEmbed()
      .setDescription(`${guild?.name}의 정보`)
      .setColor(message.guild?.me?.displayHexColor || 'BLUE')
      .setThumbnail(guild?.iconURL({ dynamic: true })!)
      .addField('일반', [
        `**❯ 이름:** ${guild?.name}`,
        `**❯ 아이디:** ${guild?.id}`,
        `**❯ 소유자:** ${guild?.owner?.user.tag}`,
        `**❯ 위치:** ${guild?.region}`,
        `**❯ 부스트 티어:** ${
          guild?.premiumTier ? `${guild?.premiumTier}티어` : `없습니다.`
        }`,
        `**❯ 보안 레벨:** ${guild?.verificationLevel}`,
        `**❯ 생성일:** ${new Date(guild?.createdTimestamp!).toLocaleString()}`,
      ]);
    message.channel.send(embed);
  }
}

import { Message, MessageEmbed } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class UserinfoCommand extends BaseCommand {
  constructor() {
    super('유저정보', 'info', [], '유저정보를 보여줍니다.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const { mentions, guild } = message;
    let target;
    if (mentions.users.first()) {
      target = mentions.users.first();
    } else {
      target = message.author;
    }
    const member = guild?.members.cache.get(target?.id!);
    const roles = member?.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString())
      .slice(0, -1);
    const embed = new MessageEmbed()
      .setTitle(target?.username + nickname(member?.nickname!))
      .setAuthor(target?.username, target?.displayAvatarURL())
      .setDescription(
        `**이름**: ${target?.username}\n**태그**: ${target?.username}#${target?.discriminator}\n**아이디**: ${target?.id}`,
      )
      .addField('상태', member?.user.presence.status, true)
      .addField(
        '게임',
        member?.user.presence.activities[1]?.name || '게임을하지 않음.',
        true,
      )
      .addField(
        '서버 참여 시간',
        new Date(member?.joinedTimestamp!).toLocaleString(),
        true,
      )
      .addField(
        '계정 생성 일',
        new Date(target?.createdTimestamp!).toLocaleString(),
        true,
      )
      .addField(
        '역할',
        `**[${roles?.length}]:** ${
          roles?.length! < 10
            ? roles?.join(', ')
            : roles?.length! > 10
            ? client.utils.trimArray(roles)
            : 'None'
        }`,
        true,
      );
    message.channel.send(embed);
  }
}

function nickname(name: string) {
  if (name == null) {
    return '';
  }
  return `(${name})`;
}

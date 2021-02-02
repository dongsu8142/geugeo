import { Message, MessageEmbed, User } from 'discord.js';
import Levels from 'discord-xp-ts';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class RankCommand extends BaseCommand {
  constructor() {
    super('랭크', 'level', [], '랭크를 보여줍니다.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const { mentions } = message;
    let target: User | undefined;
    if (mentions.users.first()) {
      target = mentions.users.first();
    } else {
      target = message.author;
    }
    const user = await Levels.fetch(target?.id!, message.guild?.id!);
    if (user) {
      const neededXp = Levels.xpFor(parseInt(String(user.level!)) + 1);
      const rawLeaderboard = await Levels.fetchLeaderboard(
        message.guild?.id!,
        999999,
      );
      const leaderboard = await Levels.computeLeaderboard(
        client,
        rawLeaderboard,
        true,
      );
      const rank = leaderboard.find((lb) => lb.userID === target?.id);
      const embed = new MessageEmbed()
        .setTitle('Rank')
        .addField('경험치', user.xp, true)
        .addField('레벨', user.level, true)
        .addField('필요한 경험치', neededXp, true)
        .addField('랭크', rank?.position, true);
      message.channel.send(embed);
    } else {
      message.channel.send('정보를 가지고 오는데 실패했습니다.');
    }
  }
}

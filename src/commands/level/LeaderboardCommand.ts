import { Message } from 'discord.js';
import Levels from 'discord-xp-ts';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class LeaderboardCommand extends BaseCommand {
  constructor() {
    super('리더보드', 'level', [], '리더보드를 보여줍니다.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const rawLeaderboard = await Levels.fetchLeaderboard(
      message.guild?.id!,
      10,
    );
    if (!(rawLeaderboard.length < 1)) {
      const leaderboard = Levels.computeLeaderboard(client, rawLeaderboard);

      const lb = (await leaderboard).map(
        (e) =>
          `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${
            e.level
          }\nXP: ${e.xp.toLocaleString()}`,
      );
      message.channel.send(`${lb.join('\n')}`);
    } else {
      message.channel.send('아직 리더보드 안에 아무도 없습니다.');
    }
  }
}

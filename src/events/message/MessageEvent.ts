import { Message } from 'discord.js';
import Levels from 'discord-xp-ts';
import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';

Levels.setURL('mongodb://localhost:27017');

export default class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }

  async run(client: DiscordClient, message: Message) {
    if (!message.guild) return;
    if (message.author.bot) return;
    const randomXp = Math.floor(Math.random() * 9) + 1;
    const hasLeveledUp = await Levels.appendXp(
      message.author.id,
      message.guild.id,
      randomXp,
    );
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      if (user) {
        message.channel.send(`레벨업!! 현재레벨: ${user.level}`);
      }
    }
    client.prefix.map((prefix) => {
      if (message.content.startsWith(prefix)) {
        const [cmdName, ...cmdArgs] = message.content
          .slice(prefix.length)
          .trim()
          .split(/\s+/);
        const command = client.commands.get(cmdName);
        if (command) {
          global.log(
            `${message.author.username}이 ${
              message.guild?.name
            }에서 ${command.getName()} 실행`,
          );
          command.run(client, message, cmdArgs);
        }
      }
    });
  }
}

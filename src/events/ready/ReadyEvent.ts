import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';

export default class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }

  async run(client: DiscordClient) {
    await global.update(client.guilds.cache.size);
    global.log('Bot has logged in.');
    client.user?.setActivity('그거야 도움말', { type: 'PLAYING' });
  }
}

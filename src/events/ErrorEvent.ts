// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-error
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';

export default class ErrorEvent extends BaseEvent {
  constructor() {
    super('error');
  }
  
  async run(client: DiscordClient, error: Error) {
    console.error('The WebSocket encountered an error:', error);
  }
}

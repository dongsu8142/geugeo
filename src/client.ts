import { Client, ClientOptions } from 'discord.js';
import { Player } from 'discord-player';

export default class DiscordClient extends Client {
  private _player = new Player(new Client(this.options));

  constructor(options: ClientOptions) {
    super(options);
  }

  get player(): Player {
    return this._player;
  }

  set player(player: Player) {
    this._player = player;
  }
}
import { Client, ClientOptions } from 'discord.js';
import { Player } from 'discord-player';
import { IConfig } from './interface/config';

export default class DiscordClient extends Client {
  private _player = new Player(new Client(this.options));
  private _config: IConfig | undefined;

  constructor(options: ClientOptions) {
    super(options);
  }

  get player(): Player {
    return this._player;
  }

  get config(): IConfig | undefined {
    return this._config
  }

  set player(player: Player) {
    this._player = player;
  }

  set config(config: IConfig | undefined) {
    this._config = config
  }
}
import { Client, ClientOptions, Collection } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import BaseCommand from "../utils/structures/BaseCommand";
import { Player } from "discord-player";

export default class DiscordClient extends Client {
  private _commands = new Collection<string, BaseCommand>();
  private _events = new Collection<string, BaseEvent>();
  private _player = new Player(new Client());
  private _prefix: string[] = ['!', '/'];
    utils: any;

  constructor(options?: ClientOptions) {
    super(options);
  }

  get commands(): Collection<string, BaseCommand> {
    return this._commands;
  }
  get events(): Collection<string, BaseEvent> {
    return this._events;
  }
  get prefix(): string[] {
    return this._prefix;
  }
  get player(): Player {
    return this._player;
  }

  set prefix(prefix: string[]) {
    this._prefix = prefix;
  }
  set player(player: Player) {
    this._player = player;
  }
}

interface IConfig {
  bot: Bot;
}

interface Bot {
  token: string;
  prefix: string;
  botOwners: string[];
  testServers: string[]
}

export { IConfig };

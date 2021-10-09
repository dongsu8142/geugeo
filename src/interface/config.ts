interface IConfig {
  bot: Bot;
  apiKey: ApiKey
}

interface Bot {
  token: string;
  prefix: string;
  botOwners: string[];
  testServers: string[]
}

interface ApiKey {
  genius: string
}

export { IConfig };

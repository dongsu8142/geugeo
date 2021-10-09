interface IConfig {
  bot: Bot;
  database: Database;
  apiKey: ApiKey;
}

interface Bot {
  token: string;
  prefix: string;
  botOwners: string[];
  testServers: string[];
}

interface Database {
  uri: string;
}

interface ApiKey {
  genius: string;
}

export { IConfig };

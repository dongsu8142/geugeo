import chalk from "chalk";
import moment from "moment-timezone";
import fetch, { Response } from "node-fetch";
import config from "../config.json";
const BASEURL = "https://api.koreanbots.dev";
const token = config.kbtoken;

function update(serverCount: number): Promise<Response> {
  return fetch(BASEURL + "/bots/servers", {
    method: "POST",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify({ servers: serverCount }),
  });
}

function getTime(): string {
  return moment().tz("Asia/Seoul").locale("ko").format("11 dddd LTS");
}

function log(...texts: String[]): void {
  return console.log(chalk.yellow(`[${getTime()}]:  ${texts.join(" ")}`));
}

declare global {
  namespace NodeJS {
    interface Global {
      update: (serverCount: number) => Promise<Response>;
      log: (...texts: String[]) => void;
    }
  }
}

global.log = log;
global.update = update;

import chalk from "chalk";
import moment from "moment-timezone";
import fetch from "node-fetch";
import config from "../config.json";
const BASEURL = "https://api.koreanbots.dev";
const token = config.kbtoken;

function update(serverCount: number) {
  fetch(BASEURL + "/bots/servers", {
    method: "POST",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify({ servers: serverCount }),
  })
}

function getTime() {
  return moment().tz("Asia/Seoul").locale("ko").format("11 dddd LTS");
}

function log(...texts: String[]) {
  console.log(chalk.yellow(`[${getTime()}]:  ${texts.join(" ")}`));
}

declare global {
  namespace NodeJS {
    interface Global {
      update: any;
      log: any;
    }
  }
}

global.log = log;
global.update = update;
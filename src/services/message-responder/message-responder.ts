import {Message} from "discord.js";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {PingFinder} from "../finders/ping-finder/ping-finder";

@injectable()
export class MessageResponder {
  private pingFinder: PingFinder;

  constructor(@inject(TYPES.PingFinder) pingFinder: PingFinder) {
    this.pingFinder = pingFinder;
  }

  handle(message: Message): Promise<Message | Message[]> {
    if (this.pingFinder.isPing(message.content)) {
      //If the message is a Ping
      return message.reply("pong!");
    }

    return Promise.reject();
  }
}

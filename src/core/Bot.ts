import {Bot as GrammyBot, Context} from "grammy";
import StartModule from "../modules/start/StartModule";
import { EmojiFlavor, emojiParser } from "@grammyjs/emoji";

export type MyContext = EmojiFlavor<Context>;

export default class Bot {

    readonly clientBot: GrammyBot<MyContext>;

    constructor(tokenBot: string) {
        this.clientBot = new GrammyBot<MyContext>(tokenBot);
    }

    private registerBotModule(): void {
        const startModule = new StartModule();

        startModule.register(this.clientBot);

        return undefined;
    }

    async startBot(): Promise<void> {
        this.clientBot.use(emojiParser());
        this.registerBotModule();

        await this.clientBot.start();
    }
}
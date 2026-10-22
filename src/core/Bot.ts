import {Bot as GrammyBot, Context, session, SessionFlavor} from "grammy";
import StartModule from "../modules/start/StartModule";
import {EmojiFlavor, emojiParser} from "@grammyjs/emoji";
import DateModule from "../modules/date/DateModule";
import {SharedModule} from "../share/SharedModule";
import {DateSession} from "../modules/date/domains/DateSession";

export type MyContext = EmojiFlavor<Context> & SessionFlavor<DateSession>;

export default class Bot {

    readonly clientBot: GrammyBot<MyContext>;

    constructor(tokenBot: string) {
        this.clientBot = new GrammyBot<MyContext>(tokenBot);
    }

    private registerBotModule(): void {
        const listModules: Set<SharedModule<MyContext>> = new Set([
            new StartModule(),
            DateModule.create()
        ]);

        for (const module of listModules) {
            module.register(this.clientBot);
        }

        return undefined;
    }

    async startBot(): Promise<void> {
        const dateSession = DateModule.create();
        this.clientBot.use(emojiParser());
        dateSession.session(this.clientBot);

        this.registerBotModule();
        await this.clientBot.start();
    }
}
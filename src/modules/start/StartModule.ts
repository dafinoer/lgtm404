import {Bot} from "grammy";
import {MyContext} from "../../core/Bot";
import {Emoji} from "../../share/Emoji";

export default class StartModule {

    register(bot: Bot<MyContext>): void {
        bot.command("start", async (ctx) => {
            const userName = ctx.from?.username ?? "User";
            await ctx.replyWithEmoji`Hello ${userName} ${Emoji.WAVEHAND}`;
        });
    }
}
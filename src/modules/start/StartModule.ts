import {Bot} from "grammy";
import {MyContext} from "../../core/Bot";
import {Emoji} from "../../share/Emoji";
import {SharedModule} from "../../share/SharedModule";

export default class StartModule implements SharedModule<MyContext> {

    register(bot: Bot<MyContext>): void {
        bot.command("start", async (ctx) => {
            const userName = ctx.from?.username ?? "User";
            await ctx.replyWithEmoji`Hello ${userName} ${Emoji.WAVEHAND}`;
        });
    }
}
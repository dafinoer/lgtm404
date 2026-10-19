import {SharedModule} from "../../share/SharedModule";
import {MyContext} from "../../core/Bot";
import {Bot, session} from "grammy";
import {SessionModule} from "../../share/SessionModule";
import DateHandler from "./presentation/DateHandler";
import {DateSession} from "./domains/DateSession";


export default class DateModule implements SharedModule<MyContext>, SessionModule<MyContext> {

    register(bot: Bot<MyContext>): void {
        const dateHandler = new DateHandler();

        bot.command("utcToLocal", async (ctx) => {
            ctx.session.step = "date";
            await ctx.replyWithEmoji`Please send me a ${"calendar"} in UTC format`;
        })
        bot.on("message:text", async (ctx) => {
            if (ctx.session.step !== "date") return;
            const text = ctx.message.text;
            if (text) {
                const result = dateHandler.convertUtcToLocal(text);
                ctx.session.step = "idle";

                if (result === "INVALID_DATE") {
                    await ctx.replyWithEmoji`${"cross_mark"} Invalid date format, please try again execute /utcToLocal`;
                    return;
                }

                ctx.session.date = result;

                await ctx.replyWithEmoji`${"check_mark_button"} Result Convert: ${ctx.session.date}`;
            }
        });
    }

    session(bot: Bot<MyContext>): void {
        bot.use(session(
                {
                    initial: (): DateSession => ({
                        step: "idle"
                    })
                }
            )
        )
    }
}
import {SharedModule} from "../../share/SharedModule";
import {MyContext} from "../../core/Bot";
import {Bot, session} from "grammy";
import {SessionModule} from "../../share/SessionModule";
import DateHandler from "./presentation/DateHandler";
import {DateSession} from "./domains/DateSession";
import {ErrorCodeMessage} from "../../share/ErrorCodeMessage";


export default class DateModule implements SharedModule<MyContext>, SessionModule<MyContext> {

    private readonly dateHandler: DateHandler;

    constructor(dateHandler: DateHandler) {
        this.dateHandler = dateHandler;
    }

    static create() {
        return new DateModule(new DateHandler());
    }

    register(bot: Bot<MyContext>): void {
        bot.command("utcToLocal", async (ctx) => {
            ctx.session.step = "date";
            await ctx.reply(ctx.emoji`Please send me a ${"calendar"} in UTC format. example: 2023-01-01T00:00:00+07:00 Asia/Jakarta`, {
                reply_markup: {
                    force_reply: true
                },
            });
        })
        bot.on("message:text", async (ctx) => {
            if (ctx.session.step !== "date") return;
            const text = ctx.message.text;
            const [utcDate, timeZone] = text.trim().split(" ");
            ctx.session.step = "idle";

            if (utcDate) {
                const result = this.dateHandler.convertUtcToLocal(utcDate, timeZone);

                if (result === ErrorCodeMessage.INVALID_DATE) {
                    await ctx.replyWithEmoji`${"cross_mark"} Invalid date format, please try again execute /utcToLocal`;
                    return;
                }

                if (result === ErrorCodeMessage.INVALID_TIMEZONE) {
                    await ctx.replyWithEmoji`${"cross_mark"} Invalid timezone, please try again execute /utcToLocal`;
                    return;
                }

                ctx.session.date = result;

                return await ctx.replyWithEmoji`${"check_mark_button"} Result Convert: ${ctx.session.date}`;
            }

            return await ctx.replyWithEmoji`${"cross_mark"} Invalid date format, please try again execute /utcToLocal`;
        });
    }

    session(bot: Bot<MyContext>): void {
        bot.use(session(
                {
                    initial: (): DateSession => ({
                        step: "idle"
                    }),
                }
            )
        )
    }
}

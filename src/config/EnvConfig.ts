export default class EnvConfig {

    load(): string {
        const botToken = process.env.BOT_TOKEN;
        if (botToken) return botToken;

        throw new Error("BOT_TOKEN is not defined");
    }
}
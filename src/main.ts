import "dotenv/config";
import EnvConfig from "./config/EnvConfig";
import Bot from "./core/Bot";

async function main() {
    const configEnv = new EnvConfig();
    const grammyBotApp = new Bot(configEnv.load());

    await grammyBotApp.startBot();
}

main().then(value => {
    console.log("Bot started");
}).catch((error) => {
    console.error(error);
    process.exit(1);
});
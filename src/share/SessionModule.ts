import {Bot, Context} from "grammy";

export interface SessionModule<T extends Context> {

    session(bot: Bot<T>): void;
}
import {Bot, Context} from "grammy";


export interface SharedModule<T extends Context> {

    register(bot: Bot<T>): void;
}
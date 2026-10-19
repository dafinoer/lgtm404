import {z} from "zod";

export default class DateHandler {


    convertUtcToLocal(date: string): string {
        const parseDate = z.string().datetime().safeParse(date);
        if (parseDate.error) return "INVALID_DATE";

        const dateLocal = new Date(date);
        const hourFormat = new Intl.DateTimeFormat("en-US", {
                hour12: false,
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                day: "numeric",
                month: "numeric",
                year: "numeric"
            }
        );
        return hourFormat.format(dateLocal);
    }
}
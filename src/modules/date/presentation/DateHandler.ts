import {z} from "zod";

export default class DateHandler {

    convertUtcToLocal(date: string, timeZone?: string): string {
        const parseDate = z.string().datetime({offset: true}).safeParse(date);
        const parseTimeZone = z.string().refine(this.isValidTimeZone, {message: "Invalid timezone"})
            .optional()
            .safeParse(timeZone);

        if (parseDate.error) return "INVALID_DATE";

        if (parseTimeZone.error) return "INVALID_TIMEZONE";

        const dateLocal = new Date(date);
        const hourFormat = new Intl.DateTimeFormat("en-US", {
                hourCycle: "h23",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                timeZone: parseTimeZone.data ?? "Asia/Jakarta",
                timeZoneName: "short"
            }
        );
        return hourFormat.format(dateLocal);
    }

    private isValidTimeZone(timeZone: string): boolean {
        try {
            new Intl.DateTimeFormat("en-US", {timeZone});
            return true;
        } catch {
            return false;
        }
    }
}

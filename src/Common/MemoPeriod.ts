import * as dayjs from "dayjs";
import { createContext } from "react";

export default class MemoPeriod {
  static MEMO_PERIOD_KEY = "memo_period";
  static defaultPeriod = "1 2 3 4 5 6 7 10 20 30";

  static isMemoInPeriod(memo: Memo, period: string): boolean {
    const periodDays = period.split(" ");
    const day = dayjs().diff(dayjs(memo.reviewDate), "day") + 1;
    const index = periodDays.indexOf(`${day}`);
    return index >= 0;
  }

  static getMemoProgress(memo: Memo, period: string): number {
    const periodDays = period.split(" ");
    const day = dayjs().diff(dayjs(memo.reviewDate), "day") + 1;
    const index = periodDays.indexOf(`${day}`);
    return (index + 1) / periodDays.length;
  }
}

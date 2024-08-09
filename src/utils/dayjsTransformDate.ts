import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");
// import localizedFormat from 'dayjs/plugin/localizedFormat' // ES 2015

dayjs.extend(localizedFormat);

dayjs().format("L LT");

export function dayjsTransformDate(date: Date): string {
  return dayjs(date).format("LL");
}
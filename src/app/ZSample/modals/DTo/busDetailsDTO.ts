import { BusPath } from "../buspath";
import { Schedule } from "../schedule";

export interface busDetails{
  schedule: Schedule[];
  busPath?: BusPath
}

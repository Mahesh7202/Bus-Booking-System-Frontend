import { Bus } from "../bus";
import { Schedule } from "../schedule";

export interface BusAssignedDataDTO{
  schedules: Schedule[];
  bus: Bus;

}

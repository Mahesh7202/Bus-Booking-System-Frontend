import { Bus } from "./bus";
import { BusPath } from "./buspath";
import { Driver } from "./driver";

export interface Schedule {
  scheduleID?: number;
  busID: number;
  bus?: Bus; // Define the Bus type if it's available
  pathID: number;
  busPath?: BusPath; // Define the BusPath type if it's available
  departureTime: Date;
  driverID: number;
  driver?: Driver;
  arrivalTime: Date;
  status: string;
}

export interface BusAssignDataDTO {
  busID: number;
  model: string;
  type: string;
  licensePlate: string;
  currentLocation: string;
  upperSeatsCount: number;
  lowerSeatsCount: number;
  capacity: number;
  driverName: string;
  pathName: string;
  departureTime: Date;
  arrivalTime: Date;
  status: string;
}

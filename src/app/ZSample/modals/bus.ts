
export interface Bus {
  busID?: number;
  licensePlate: string;
  model: string;
  type: string;
  capacity: number;
  busSeatID?:number;
  currentLocation: string;
  upperSeatsCount: number;
  lowerSeatsCount: number;
}


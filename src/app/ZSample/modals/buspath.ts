// bus-path.model.ts
export interface BusPath {
  pathID?: number;
  pathName: string;
  startingPoint: string;
  endingPoint: string;
  distance: number;
  imageURL?: string;
}

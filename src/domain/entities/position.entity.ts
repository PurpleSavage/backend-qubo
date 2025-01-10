export interface GeoJSONPoint {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  }
export class PositionEntity{
    constructor(
        public id :string,
        public email:string,
        public reason:string,
        public coordinates: GeoJSONPoint
    ){}
}

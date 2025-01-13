import { GeoJSONPoint } from "../../entities/position.entity";

export class SearchNearestLocationsDto{
    constructor(
        public email:string,
        public radiusDistance:number,
        public coordinates: GeoJSONPoint
    ){}
    static create( object: { [ key: string ]: any; } ): [ string?, SearchNearestLocationsDto?]{
        const {email,radiusDistance,coordinates}=object
    
        if(!email) return ['Missing email']
        if(!radiusDistance) return ['Missing radius distance']
        
        
        return [
            undefined,
            new SearchNearestLocationsDto(email,radiusDistance,coordinates)
        ];
    }
}
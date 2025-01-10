import { Validators } from "../../../config";
import { GeoJSONPoint } from "../../entities/position.entity";

export class SharedLocationDto{
    constructor(
        public email:string,
        public reason:string,
        public coordinates: GeoJSONPoint
    ){}
    static create( object: { [ key: string ]: any; } ): [ string?, SharedLocationDto?]{
        const {reason,coordinates,email}=object
        if(!reason) return ['Missing reason']
        if(!email) return ['Missing email']
        if(!Validators.maxCharacters(reason)) return ['Watch out, you’ve exceeded the 60-character limit! Less is more']
        return [
          undefined,
          new SharedLocationDto(email,reason,coordinates)
        ];
    }
}
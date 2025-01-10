import { CustomError } from "../../domain"
import { PositionEntity } from "../../domain/entities/position.entity"

export class PositionMapper{
    static positionEntityFromObject (object:{[key:string]:any}){
        const {id,_id,coordinates,reason,email}=object
        if(!_id || !id) throw CustomError.badRequest(' Missing id')
        if(!reason) throw CustomError.badRequest('Missing reason')
         return new  PositionEntity(
            _id || id,
            email,
            reason,
            coordinates
         )
    }
    
}
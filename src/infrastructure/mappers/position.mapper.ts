import { CustomError } from "../../domain"
import { PositionEntity } from "../../domain/entities/position.entity"

export class PositionMapper{
    static positionEntityFromObject (object:{[key:string]:any}){
        const {id,_id,coordinates,reason,email,userId}=object
        if(!_id || !id) throw CustomError.badRequest(' Missing id')
        if(!reason) throw CustomError.badRequest('Missing reason')
         return new  PositionEntity(
            _id || id,
            userId,
            email,
            reason,
            coordinates
         )
    }
    
}
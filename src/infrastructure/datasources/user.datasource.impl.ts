import { PositionModel } from "../../data/mongodb";
import { CustomError, SharedLocationDto, UserDataSource } from "../../domain";
import { PositionEntity } from "../../domain";
import { PositionMapper } from "../mappers/position.mapper";


export class UserDatasourceImpl implements UserDataSource{
    constructor(){}
    async sharedLocation(sharedLocationDto: SharedLocationDto): Promise<PositionEntity> {
        const {reason,coordinates,email}=sharedLocationDto
    
        try {
            const position = await PositionModel.create({
                email,
                reason,
                coordinates
            })
            await position.save()
            return PositionMapper.positionEntityFromObject(position)
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer()
        }
    }
}